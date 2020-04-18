import React, { FC } from 'react';
import { Image, View } from 'react-native';
import styled from "styled-components"

const StyledImage = styled(Image)`
  height: 52%;
  width: 75%;
`

const Background = styled(View)`
  flex: 1;
  background-color: rgb(51, 56, 62);
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Header: FC = () => (
  <Background>
    <StyledImage source={require('../images/logo.png')}/>
  </Background>
)

export default Header
