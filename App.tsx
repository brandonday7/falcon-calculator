import React from 'react'
import { ScrollView, View } from 'react-native'
import Calculator from "./components/Calculator"
import Header from "./components/Header"
import styled from "styled-components"

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Fixed = styled(View)`
  height: 50px;
  background-color: rgb(51, 56, 62);
`

const StyledView = styled(ScrollView)`
  flex: 1;
`

export default function App() {
  return (
    <Container>
      <Fixed />
      <StyledView>
        <Header />
        <Calculator />
      </StyledView>
    </Container>
  );
}
