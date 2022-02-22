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
  changeSequenceAction
} from '../store/actionCreator'


const AppPlayerBar = memo(() => {

  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
  },[currentSong])

  const audioRef = useRef()

  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  },[isPlaying])
  
  const sliderChange = useCallback((value) => { // value为进度，0-100
    setIsChanging(true)
    const currSlideTime = ((value / 100) * currentSong.dt) // 单位 ms
    setCurrentTime(currSlideTime)
    setProgress(value)
  },[currentSong])

  const sliderAfterChange = useCallback((value) => { // value为进度，0-100
    const finalTime = ((value / 100) * currentSong.dt) / 1000 // 单位 s
    audioRef.current.currentTime = finalTime
    setCurrentTime(finalTime * 1000) // 单位 ms
    setIsChanging(false)
    if(!isPlaying) {
      playMusic();
    }
  },[currentSong,playMusic,isPlaying])

  // methods
  const timeUpdate = (e) => { // e括号不可省略
    if(!isChanging) {
      setCurrentTime(e.target.currentTime * 1000) // 传入setCurrentTime单位为 s
      setProgress((currentTime / currentSong.dt) * 100) // 数值---百分比进度
    }
  }
  const changeSequence = () => {
    let curSequence = (sequence + 1) % 3;
    dispatch(changeSequenceAction(curSequence))
  }
  const changeMusic = (sign) => {
    if(sign) { // 下一曲

    } else { // 前一曲

    }
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

      <audio ref={audioRef} onTimeUpdate={timeUpdate} />

    </PlaybarWrapper>
  )
})

export default AppPlayerBar