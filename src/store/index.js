import { createStore,applyMiddleware,compose }  from 'redux';
import thunk from "redux-thunk";
// 导入整合后的reducer
import reducer from './reducer';

// 配置chrome的redux插件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,composeEnhancers(
  applyMiddleware(thunk)
))

export default store