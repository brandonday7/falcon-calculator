import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled from "styled-components"


interface Props {
  type: string;
  onPress(): void
}

const Icon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: rgb(51, 56, 62);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Line = styled(View)`
  height: 2px;
  width: 20px;
  background-color: white;
`

const VerticalLine = styled(View)`
  height: 20px;
  width: 2px;
  background-color: white;
  position: absolute;
`

const Incrementer: FC<Props> = ({ type, onPress }) => {  
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon>
        {type === "minus" ? (
          <Line></Line>
        ) : (
            <>
              <Line></Line>
              <VerticalLine></VerticalLine>
            </>
        )}
      </Icon>
    </TouchableOpacity>
  )
}

export default Incrementer
