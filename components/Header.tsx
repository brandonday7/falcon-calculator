import React, { FC } from 'react'
import { Image, View, Dimensions, TouchableOpacity, Linking } from 'react-native'
import styled from "styled-components"

const LOGO_WIDTH = 1925
const LOGO_HEIGHT = 699

const WEBSITE_URL = "https://falconfinancialmodelling.com/"

const StyledImage = styled(Image)<{width: string, height: string}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

const Background = styled(View)<{ipad?: boolean}>`
  flex: 1;
  background-color: rgb(51, 56, 62);
  height: ${({ ipad }) => ipad ? '220px' : '190px'};
  display: flex;
  justify-content: center;
  align-items: center;
`


const Header: FC = () => {
  const win = Dimensions.get('window')
  const windowWidth = win.width
  const IMAGE_SIZE_RATIO = windowWidth > 1000 ? 0.5 : 0.75
  const ratio = windowWidth / LOGO_WIDTH
  const width = `${windowWidth * IMAGE_SIZE_RATIO}px`
  const height = `${LOGO_HEIGHT * ratio * IMAGE_SIZE_RATIO}px`
  return(
    <Background ipad={windowWidth > 1000}>
      <TouchableOpacity onPress={() => Linking.openURL(WEBSITE_URL)}>
        <StyledImage source={require('../images/logoFinal.png')} width={width} height={height} />
      </TouchableOpacity>
    </Background>
  )

}

export default Header
