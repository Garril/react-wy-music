import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Slider } from 'antd'
import { 
  getSizeImage,
  formatDate,
  getPlayUrl,

} from 'utils/format-utils'

import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style'

import { 
  getSongDetailAction,
  changeSequenceAction,
  changePrevNextSongAction
} from '../store/actionCreator'


const AppPlayerBar = memo(() => {
  // state
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // redux
  const { currentSong, sequence, playList } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(["player","sequence"]),
    playList: state.getIn(["player","playList"])
  }), shallowEqual)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getSongDetailAction(1810940102))
  },[dispatch])

  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id)
    // audioRef.current.play() 返回一个promise --- 处理部分歌曲请求失败或者要vip，无播放权限
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    })
  },[currentSong])

  const audioRef = useRef()

  // methods

  // 播放音乐
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  },[isPlaying])

  // 进度条进行滑动
  const sliderChange = useCallback((value) => { // value为进度，0-100
    setIsChanging(true)
    const currSlideTime = ((value / 100) * currentSong.dt) // 单位 ms
    setCurrentTime(currSlideTime)
    setProgress(value)
  },[currentSong])

  // 进度滑动结束
  const sliderAfterChange = useCallback((value) => { // value为进度，0-100
    const finalTime = ((value / 100) * currentSong.dt) / 1000 // 单位 s
    audioRef.current.currentTime = finalTime
    setCurrentTime(finalTime * 1000) // 单位 ms
    setIsChanging(false)
    if(!isPlaying) {
      playMusic();
    }
  },[currentSong,playMusic,isPlaying])

  // 音乐播放时间变化时
  const timeUpdate = (e) => { // e括号不可省略
    if(!isChanging) {
      setCurrentTime(e.target.currentTime * 1000) // 传入setCurrentTime单位为 s
      setProgress((currentTime / currentSong.dt) * 100) // 数值---百分比进度
    }
  }
  // 音乐播放结束时
  const handleMusicEnded = (e) => {
    if(sequence === 2 || playList.length === 1) { // 单曲循环
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else { // 随机/顺序播放
      dispatch(changePrevNextSongAction(false))
    }
  }
  // 改变播放模式
  const changeSequence = () => {
    let curSequence = (sequence + 1) % 3;
    dispatch(changeSequenceAction(curSequence))
  }
  const changeMusic = (sign) => {
    dispatch(changePrevNextSongAction(sign))
  }

  return (
    <PlaybarWrapper className='sprite_playbar'>

      <div className='content wrap-v2'>

        <Control isPlaying={isPlaying}>
          <button className='sprite_playbar prev'
                  onClick={e => changeMusic(true)}></button>
          <button className='sprite_playbar play'
                  onClick={e => playMusic()}></button>
          <button className='sprite_playbar next'
                  onClick={e => changeMusic(false)}></button>
        </Control>

        <PlayInfo>
          <div className='image'>
            <NavLink to="/discover/player">
              <img src={getSizeImage(currentSong?.al?.picUrl,35)} alt="" />
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{(currentSong.name)||"未知"}</span>
              <a href="#/" className='singer-name'>{(currentSong?.ar?.[0]?.name)||"未知歌手"}</a>
            </div>
            <div className='progress'>
              <Slider defaultValue={0} 
                      value={progress}
                      onChange={sliderChange} 
                      onAfterChange={sliderAfterChange}
                      tipFormatter={null}/>
              <div className='time'>
                <span className='now-time'>{formatDate(currentTime,"mm:ss")}</span>
                <span className='divider'>/</span>
                <span className='duration'>{formatDate(currentSong.dt,"mm:ss")}</span>
              </div>
            </div>
          </div>
        </PlayInfo>

        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" onClick={e => {changeSequence()}}></button>
            <button className="sprite_playbar btn playlist">{playList.length}</button>
          </div>          
        </Operator>

      </div>

      <audio ref={audioRef} 
            onTimeUpdate={timeUpdate} 
            onEnded={handleMusicEnded}/>

    </PlaybarWrapper>
  )
})

export default AppPlayerBar