import React, { memo, useEffect } from 'react'
// import { connect } from 'react-redux'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getTopBannerAction } from './store/actionCreators'

const WYRecommend = memo((props) => {

  // 组件和redux关联：获取数据和进行操作
  const { topBanners } = useSelector(state => ({
    // 这里的state是最外层，合并后的完整的state
    // 这里返回的对象，作为结果返回
    topBanners: state.recommend.topBanners
  }), shallowEqual)
  
  const dispatch = useDispatch()

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction())
  },[dispatch])

  return (
    <div>WYRecommend:{topBanners.length}</div>
  )
})

export default WYRecommend


// 没有用redux的hooks，写法如下：
/* const WYRecommend = memo((props) => {

  const { getBanners,topBanners } = props

  useEffect(() => {
    getBanners()
  },[getBanners])

  return (
    <div>WYRecommend:{topBanners.length}</div>
  )
})

const mapStateToProps = state => ({
  // 这里的state是最外层，合并后的完整的state
  topBanners: state.recommend.topBanners
})
const mapDispatchToProps = dispatch => ({
  getBanners: () => {
    dispatch(getTopBannerAction())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(WYRecommend) */