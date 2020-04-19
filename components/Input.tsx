import React, { FC } from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from "styled-components"
import { formatThousands } from "../utils/utilFuncs"
import Incrementer from "./Incrementer"

interface Props {
  id: string
  title: string
  value: number
  setter(value: number): void
  incrementValue: number
  setTempVal(value: string): void
  tempVal: string
  focusedElement: string;
  setFocusedElement(id: string): void
  percentage?: boolean
}


const StackContainer = styled(View)`
  padding: 20px;
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
  setter(valueAsNumber)
}

const formatValue = (value: number, percentage?: boolean) => {
  if (percentage) {
    return value.toFixed(2)
  }
  return formatThousands(value)
}

const Input: FC<Props> = ({ 
  id, 
  title, 
  value, 
  setter, 
  incrementValue,
  setTempVal, 
  tempVal,
  focusedElement, 
  setFocusedElement,
  percentage, 
}) => {
  return (
    <StackContainer>
      <Title>{title}</Title>
      <Center>
        <Incrementer type="minus" onPress={() => setter(Number(value) - incrementValue)}></Incrementer>
        <Row>
          <Value
            keyboardType='numeric'
            value={focusedElement === id ? tempVal : formatValue(value, percentage)}
            onFocus={() => {
              setTempVal(formatValue(value, percentage))
              setFocusedElement(id)
            }}
            onBlur={() => {
              updateValue(setter, tempVal)
              setFocusedElement('')
            }}
            onChangeText={input => setTempVal(input)}
            />
            {percentage && <Percent>%</Percent>}
        </Row>
        <Incrementer type="plus" onPress={() => setter(Number(value) + incrementValue)}></Incrementer>
      </Center>
    </StackContainer>
  )
}

export default Input
