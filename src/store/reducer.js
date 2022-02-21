import { combineReducers } from "redux-immutable";

import { reducer as recommendReducer } from '../pages/discover/child-pages/recommend/store'
import { reducer as playReducer } from '../pages/player/store'
// 做reducer的combine
const combReducer = combineReducers({
  recommend: recommendReducer,
  player: playReducer
})
// combineReducers要求传入对象---用到Object.keys，不能直接用immutable的Map进行优化
// 所以用到 redux-immutable，combineReducers从 redux-immutable导入

export default combReducer