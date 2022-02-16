import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { dicoverMenu } from 'common/local-data'

import {
  DiscoverWrapper,
  TopMenu
} from "./style"
import { renderRoutes } from 'react-router-config'

const WYDiscover = memo((props) => {

  const { route } = props

  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className='wrap-v1'>
          {
            dicoverMenu.map((item,index) => {
              return (
                <div className='item' key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>

      {renderRoutes(route.routes)}
      
    </DiscoverWrapper>
  )
})

export default WYDiscover