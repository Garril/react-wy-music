// 依赖
import React, { memo } from 'react'

// style
import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style'
// 导入子组件
import TopBanner from './child-cpns/top-banner'
import HotRecommend from './child-cpns/hot-recommend'
import NewAlbum from './child-cpns/new-album'
import Ranking from './child-cpns/ranking'

const WYRecommend = memo((props) => {

  return (
    <RecommendWraper>

      <TopBanner></TopBanner>

      <Content className='wrap-v2'>
        
        <RecommendLeft>
          <HotRecommend></HotRecommend>
          <NewAlbum></NewAlbum>
          <Ranking></Ranking>
        </RecommendLeft>

        <RecommendRight></RecommendRight>

      </Content>
      
    </RecommendWraper>
  )
})

export default WYRecommend


// 没有用redux的hooks，写法如下：--- 现在轮播图数据让top-banner自己管理
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