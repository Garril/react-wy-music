import * as actionTypes from './constants'
import { 
  getSongDetail,
  getLyric
} from "service/player"
import {
  parseLyric
} from 'utils/parse-lyric'

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
})
const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_CURRENT_PLAYLIST,
  playList
})
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index
})
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
})
export const changeLyricAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC,
  lyricList
})

export const changePrevNextSongAction = (sign) => {
  return (dispatch, getState) => {
    
    const sequence = getState().getIn(["player","sequence"])
    let currentSongIndex = getState().getIn(["player","currentSongIndex"])
    const playList = getState().getIn(["player","playList"])
    const len = playList.length

    switch(sequence) {
      case 1:  // 1 随机播放
        let randomIndex = -1;
        if(len === 1) break;
        do {
          randomIndex = Math.floor(Math.random() * len)
        } while(randomIndex === currentSongIndex)
        currentSongIndex = randomIndex
        break;
      default: // 0 列表循环 ，2 随机播放
        if(sign) { // 上一首
          if(currentSongIndex === 0) {
            currentSongIndex = len - 1
          } else {
            currentSongIndex -= 1
          }
        } else { // 下一首
          currentSongIndex = (currentSongIndex + 1) % len
        }
        break;
    }
    const currentSong = playList[currentSongIndex]
    if(currentSong) {
      dispatch(changeCurrentSongAction(currentSong))
      dispatch(changeCurrentSongIndexAction(currentSongIndex))
      // 请求歌词
      dispatch(getLyricAction(currentSong.id))
    }
  }
}

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 根据ids 查询是否playList中已经有该歌曲
    const playList = getState().getIn(["player","playList"])
    const songIndex = playList.findIndex(song => song.id === ids)
    // 判断是否找到了歌曲
    if(songIndex !== -1) { // 找到了歌曲
      dispatch(changeCurrentSongIndexAction(songIndex))
      const song = playList[songIndex]
      dispatch(changeCurrentSongAction(song))
      // 请求歌词
      dispatch(getLyricAction(song.id))
    } else { // 没找到
      // 请求歌曲数据
      getSongDetail(ids).then(res => {
        const song = res.songs[0]
        if(!song) return;
        // 将最新请求到的歌曲插入playList
        const newPlayList = [...playList]
        newPlayList.push(song)
        // 更新redux中值
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length-1))
        dispatch(changeCurrentSongAction(song))
        // 请求歌词
        dispatch(getLyricAction(song.id))
      })
    }
  }
}

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricAction(lyricList))
    })
  }
}