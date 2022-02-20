import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  SetterSongerWrapper
} from "./style";
import {
  getSizeImage
} from "utils/format-utils";

import ThemeHeaderSmall from 'components/theme-header-small';
import { getSettleSingers } from '../../store/actionCreators';

const SettleSinger = memo(() => {
  // redux
  const dispatch = useDispatch()

  const { settleSings } = useSelector((state) => ({
    settleSings: state.getIn(["recommend", "settleSings"])
  }), shallowEqual)

  useEffect(() => {
    dispatch(getSettleSingers())
  },[dispatch])

  return (
    <SetterSongerWrapper>
      <ThemeHeaderSmall title="入驻歌手" more="查看全部>" />
      <div className="singer-list">
        {
          settleSings?.map((item,index) => {
            return (
              <a href="/todo" key={item.id} className='item'>
                <img src={getSizeImage(item.img1v1Url,62)} alt="" />
                <div className='info'>
                  <div className='title'>{item.alias.join("") || item.name}</div>
                  <div className='name'>{item.name}</div>
                </div>
              </a>
            )
          })
        }
      </div>
      <div className="apply-for">
        <a href="/abc">申请成为网易音乐人</a>
      </div>
    </SetterSongerWrapper>
  )
})

export default SettleSinger