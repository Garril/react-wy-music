import { combineReducers } from "redux";
import { reducer as recommendReducer } from '../pages/discover/child-pages/recommend/store'

// 做reducer的combine
const combReducer = combineReducers({
  recommend: recommendReducer
})

export default combReducer