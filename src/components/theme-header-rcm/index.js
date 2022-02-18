import React, {memo} from 'react';
import PropTypes from "prop-types";

import {
  HeaderWrapper
} from "./style";

const ThemeHeaderRCM = memo((props) => {
  /* const { title = "默认标题" } = props; --- 默认值方法，这里用了 prop-types */
  const { title, keywords } = props;

  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keyword">
          {
            keywords.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <span className="link">{item}</span>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <a href='http://localhost:3000/#/discover/recommend'>更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  )
})

ThemeHeaderRCM.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array
}
ThemeHeaderRCM.defaultProps = {
  keywords: []
}

export default ThemeHeaderRCM;
