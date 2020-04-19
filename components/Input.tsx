import React, { FC, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from "styled-components"
import { formatThousands } from "../utils/utilFuncs"
import Incrementer from "./Incrementer"

interface Props {
  title: string
  value: number
  setter(value: number): void
  incrementValue: number
  percentage?: boolean
}


const StackContainer = styled(View)`
  padding: 15px;
  background-color: white;
  min-height: 140px;
  flex: 1;
  margin-top: 1px;
`

const Title = styled(Text)`
  color: rgb(204, 204, 204);
`

const Center = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`

const Value = styled(TextInput)`
  font-size: 25px;
  font-weight: 400;  
`

const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Percent = styled(Text)`
  font-size: 25px;
`

const updateValue = (setter: (newValue: number) => void, value: string, percentage?: boolean) => {
  const valueAsNumber = Number(value.replace(/[^\d.-]/g, ''))
  if (valueAsNumber < 0) {
    setter(0)
  } else {
    setter(valueAsNumber)
  }
}

const formatValue = (value: number, percentage?: boolean) => {
  if (percentage) {
    return value.toFixed(2)
  } else {
    const cleanValue = Number(value.toString().replace(/[^\d.-]/g, ''))
    return formatThousands(cleanValue)
  }
}

// We want the user to be able to type whatever they want 
// and not have formatting rules get in the way (0 instead of empty, 
// double decimal place, thousand markers). So we store what they 
// type in a temp val, and only submit to real variables onBlur

const Input: FC<Props> = ({ 
  title, 
  value, 
  setter, 
  incrementValue,
  percentage, 
}) => {
  const [isFocused, setFocus] = useState(false)
  const [tempVal, setTempVal] = useState('')

  return (
    <StackContainer>
      <Title>{title}</Title>
      <Center>
        <Incrementer type="minus" onPress={() => setter(Number(value) - incrementValue)}></Incrementer>
        <Row>
          <Value
            keyboardType='numeric'
            value={isFocused ? tempVal : formatValue(value, percentage)}
            onFocus={() => {
              setTempVal('')
              setFocus(true)
            }}
            onBlur={() => {
              updateValue(setter, tempVal)
              setTempVal('')
              setFocus(false)
            }}
            onChangeText={input => percentage ? setTempVal(input) : setTempVal(formatValue(input))}
            />
            {percentage && <Percent>%</Percent>}
        </Row>
        <Incrementer type="plus" onPress={() => setter(Number(value) + incrementValue)}></Incrementer>
      </Center>
    </StackContainer>
  )
}

export default Input
