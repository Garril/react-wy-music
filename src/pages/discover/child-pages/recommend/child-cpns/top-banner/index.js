import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
// import { connect } from 'react-redux'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getTopBannerAction } from '../../store/actionCreators'
import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style'

import { Carousel } from 'antd'

const TopBanner = memo(() => {
  // state
  const [curIndex, setCurIndex] = useState(0);

  // 组件和redux关联：获取数据和进行操作
  const { topBanners } = useSelector(state => ({
    // 这里的state是最外层，合并后的完整的state
    // 这里返回的对象，作为结果返回
    topBanners: state.getIn(["recommend", "topBanners"]) // 下面的语法糖
    // topBanners: state.get("recommend").get("topBanners") 
  }), shallowEqual)
  
  const dispatch = useDispatch()

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction())
  },[dispatch])

  // 拿到轮播图ref
  const bannerRef = useRef();
  const bannerChange = useCallback((from,to) => {
    setCurIndex(to)
  },[])
  // 拿到背景图片
  const bgImage = topBanners[curIndex] && (topBanners[curIndex].imageUrl + "?imageView&blur=40x20")

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className='banner wrap-v2'>
        <BannerLeft>
          <Carousel autoplay effect="fade" ref={bannerRef} beforeChange={bannerChange}>
              {
                topBanners.map((item, index) => {
                  return (
                    <div className="banner-item" key={item.imageUrl}>
                      <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                    </div>
                  )
                })
              }
            </Carousel>          
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className='btn left' onClick={e => bannerRef.current.prev()}></button>
          <button className='btn right' onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

export default TopBanner