import React, { memo } from 'react'
import PropTypes from 'prop-types';

import { HeaderWrapper } from './style'

const ThemeHeaderSmall = memo((props) => {
  const { title, more } = props

  return (
    <HeaderWrapper>
      <h3>{title}</h3>
      <a href="/todo">{more}</a>
    </HeaderWrapper>
  )
})

ThemeHeaderSmall.prototype = {
  title: PropTypes.string.isRequired,
  more: PropTypes.string
}

export default ThemeHeaderSmall