import { getSongDetail } from "service/player"
import * as actionTypes from './constants'

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
      })
    }
  }
}