import React, { FC } from 'react';
import { Image } from 'react-native';
import styled from "styled-components"

const StyledImage = styled(Image)`
  height: 270px;
  width: auto;
`

const Header: FC = () => (
  <StyledImage source={require('../images/falconBanner.jpg')}/>
)

export default Header
