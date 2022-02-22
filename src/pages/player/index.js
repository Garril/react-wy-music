import React, { memo } from 'react'


import {
  PlayerLeft,
  PlayerRight,
  PlayerWrapper
} from './style'

import SongInfo from './child-cpns/song-info'
import SongComment from './child-cpns/song-comment'
import SongRelevant from './child-cpns/song-relevant'

const WYPlayer = memo(() => {
  return (
    <PlayerWrapper>
      <div className='content wrap-v2'>
        
        <PlayerLeft>
          <SongInfo></SongInfo>
          <SongComment></SongComment>
        </PlayerLeft>

        <PlayerRight>
          <SongRelevant></SongRelevant>
        </PlayerRight>

      </div>
    </PlayerWrapper>
  )
})

export default WYPlayer