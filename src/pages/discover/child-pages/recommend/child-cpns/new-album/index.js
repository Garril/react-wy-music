import React, { memo, useEffect, useRef } from 'react'

import ThemeHeaderRCM from 'components/theme-header-rcm'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getNewAlbumAction } from '../../store/actionCreators'
import { NEW_ALBUM_LIMIT } from 'common/contants'

import { Carousel } from 'antd'
import AlbumCover from 'components/album-cover'

import { 
  AlbumWrapper,

} from './style'
import { NEW_ALBUM_PER_PAGE } from 'common/contants'

const NewAlbum = memo(() => {

  const { newAlbums } = useSelector(state => ({
    newAlbums: state.getIn(["recommend", "newAlbums"])
  }), shallowEqual)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT))
  }, [dispatch])

  const pageRef = useRef()

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架"></ThemeHeaderRCM>
      <div className='content'>
        <button className='arrow arrow-left sprite_02'
                onClick={e => pageRef.current.prev()}>
        </button>
        <div className='album'>
          <Carousel dots={false} ref={pageRef}>
            {
              [0, 1].map((item,index) => {
                return (
                  <div key={item} className="page">
                    {
                      newAlbums.slice(item*NEW_ALBUM_PER_PAGE, (item + 1)*NEW_ALBUM_PER_PAGE).map((itemm,indexx) => {
                        return (
                          <AlbumCover key={itemm.id} 
                                      info={itemm} 
                                      size={100} 
                                      width={118} 
                                      bgp="-570px"/>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className='arrow arrow-right sprite_02'
                onClick={e => pageRef.current.next()}>
        </button>
      </div>
    </AlbumWrapper>
  )
})

export default NewAlbum