import { Map } from "immutable";
import * as actionTypes from './constants'

const defaultState = Map({
  currentSong: {}, // 当前播放歌曲
  playList: [], // 播放列表
  currentSongIndex: 0, // 当前歌曲在list中index
  sequence: 0, // 0 列表循环 1 随机播放 2 单曲循环
  lyricList: [], // 歌词
})

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong)
    case actionTypes.CHANGE_CURRENT_PLAYLIST:
      return state.set("playList", action.playList)
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.index)
    case actionTypes.CHANGE_SEQUENCE:
      return state.set("sequence", action.sequence)
    case actionTypes.CHANGE_LYRIC: 
      return state.set("lyricList", action.lyricList)
    default:
      return state;
  }
}