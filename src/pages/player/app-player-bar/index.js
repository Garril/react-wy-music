import React, { memo, useState, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

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

import { getSongDetailAction } from '../store/actionCreator'

const AppPlayerBar = memo(() => {

  const [currentTime, setCurrentTime] = useState(0);
  
  const { currentSong } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"])
  }),shallowEqual)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSongDetailAction(1910623420))
  },[dispatch])

  const audioRef = useRef()

  // methods
  const playMusic = () => {
    audioRef.current.src = getPlayUrl(currentSong.id)
    audioRef.current.play()
  }
  const timeUpdate = (e) => { // e括号不可省略
    setCurrentTime(e.target.currentTime * 1000)
  }
  const progress = (currentTime / currentSong.dt) * 100

  return (
    <PlaybarWrapper className='sprite_playbar'>

      <div className='content wrap-v2'>

        <Control>
          <button className='sprite_playbar prev'></button>
          <button className='sprite_playbar play'
                  onClick={e => playMusic()}></button>
          <button className='sprite_playbar next'></button>
        </Control>

        <PlayInfo>
          <div className='image'>
            <a href="/todo">
              <img src={getSizeImage(currentSong?.al?.picUrl,35)} alt="" />
            </a>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{(currentSong.name)||"未知"}</span>
              <a href="#/" className='singer-name'>{(currentSong?.ar?.[0]?.name)||"未知歌手"}</a>
            </div>
            <div className='progress'>
              <Slider defaultValue={0} value={progress} />
              <div className='time'>
                <span className='now-time'>{formatDate(currentTime,"mm:ss")}</span>
                <span className='divider'>/</span>
                <span className='duration'>{formatDate(currentSong.dt,"mm:ss")}</span>
              </div>
            </div>
          </div>
        </PlayInfo>

        <Operator>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist"></button>
          </div>          
        </Operator>

      </div>

      <audio ref={audioRef} onTimeUpdate={timeUpdate} />

    </PlaybarWrapper>
  )
})

export default AppPlayerBar