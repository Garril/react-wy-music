import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {
  HotRecommendWrapper,
} from './style'
import { getHotRecommendsAction } from '../../store/actionCreators'
import { HOT_RECOMMEND_LIMIT } from 'common/contants'

import ThemeHeaderRCM from 'components/theme-header-rcm'
import SongsCover from 'components/songs-cover'

const HotRecommend = memo(() => {
  // state

  // redux hooks
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }), shallowEqual)

  const dispatch = useDispatch()
  // other hooks
  useEffect(() => {
    dispatch(getHotRecommendsAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title="热门推荐" keywords={["华语","流行","民谣","摇滚","电子"]}/>
      <div className='recommend-list'>
        {
          hotRecommends.map((item,index) => {
            return (
              <SongsCover key={item.id} info={item}/>
            ) 
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})

export default HotRecommend