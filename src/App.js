// 第三方
import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// 自己配置
import routes from './router';
import store from './store';

// 组件
import WYMusicHeader from 'components/app-header';
import WYMusicFooter from 'components/app-footer';

const App = memo(() => {
  return (
    <Provider store={store}>

    <HashRouter>

      <WYMusicHeader/>

      {renderRoutes(routes)}
      
      <WYMusicFooter/>

    </HashRouter>

    </Provider>
  )
})

export default App
