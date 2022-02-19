import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'

import ThemeHeaderRCM from 'components/theme-header-rcm'
import RankingList from 'components/ranking-list'

import { RankingWrapper } from './style'
import { getTopListAction } from '../../store/actionCreators'
import { useSelector } from 'react-redux'

const Ranking = memo(() => {
  
  const {upRanking,newRanking,originRanking} = useSelector(state => ({
    upRanking: state.getIn(["recommend","upRanking"]),
    newRanking: state.getIn(["recommend","newRanking"]),
    originRanking: state.getIn(["recommend","originRanking"])
  }),shallowEqual)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))
  }, [dispatch])

  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单"></ThemeHeaderRCM>
      <div className='tops'>
        <RankingList info={upRanking} />
        <RankingList info={newRanking} />
        <RankingList info={originRanking} />
      </div>
    </RankingWrapper>
  )
})

export default Ranking