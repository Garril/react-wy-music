// 第三方
import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom' 

// 自己配置
import routes from './router'

// 组件
import WYMusicHeader from 'components/app-header'
import WYMusicFooter from 'components/app-footer'

const App = memo(() => {
  return (
    <HashRouter>
      <WYMusicHeader/>
      {renderRoutes(routes)}
      <WYMusicFooter/>
    </HashRouter>
  )
})

export default App
