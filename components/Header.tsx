import React, { FC } from 'react';
import { Image, View, Dimensions } from 'react-native';
import styled from "styled-components"

const LOGO_WIDTH = 1925
const LOGO_HEIGHT = 699
const IMAGE_SIZE_RATIO = 0.75

const StyledImage = styled(Image)<{width: string, height: string}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const Background = styled(View)`
  flex: 1;
  background-color: rgb(51, 56, 62);
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
`


const Header: FC = () => {
  const win = Dimensions.get('window')
  const ratio = win.width / LOGO_WIDTH
  const width = `${win.width  * IMAGE_SIZE_RATIO}px`
  const height = `${LOGO_HEIGHT * ratio * IMAGE_SIZE_RATIO}px`
  return(
    <Background>
      <StyledImage source={require('../images/logo3.png')} width={width} height={height} />
    </Background>
  )

}

export default Header
