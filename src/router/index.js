import React from 'react'
import { Redirect } from 'react-router-dom'


import HYDiscover from 'pages/discover'
import HYFriend from 'pages/friend'
import HYMine from 'pages/mine'


import WYAlbum from '../pages/discover/child-pages/album'
import WYArtist from '../pages/discover/child-pages/artist'
import WYDjradio from '../pages/discover/child-pages/djradio'
import WYRanking from '../pages/discover/child-pages/ranking'
import WYRecommend from '../pages/discover/child-pages/recommend'
import WYSongs from '../pages/discover/child-pages/songs'
import WYPlayer from '../pages/player'


const routes = [
  {
    path:"/",
    exact: true,
    render: () => (
      <Redirect to="/discover"/>
    )
  },
  {
    path:"/discover",
    component: HYDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => ( // 注意，是括号！！！ ，下面 to 可以为 to = {"/discover/recommend" /}
          <Redirect to="/discover/recommend"/>
        )
      },
      {
        path: "/discover/recommend",
        component: WYRecommend
      },
      {
        path: "/discover/ranking",
        component: WYRanking
      },
      {
        path: "/discover/songs",
        component: WYSongs
      },
      {
        path: "/discover/djradio",
        component: WYDjradio
      },
      {
        path: "/discover/artist",
        component: WYArtist
      },
      {
        path: "/discover/album",
        component: WYAlbum
      },
      {
        path: "/discover/player",
        component: WYPlayer
      }
    ]
  },
  {
    path:"/mine",
    component: HYMine
  },
  {
    path:"/friend",
    component: HYFriend
  },
]

export default routes