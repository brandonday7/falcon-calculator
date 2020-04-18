import React from 'react';
import { ScrollView } from 'react-native';
import Calculator from "./components/Calculator"
import Header from "./components/Header"
import styled from "styled-components"

const StyledView = styled(ScrollView)`
  flex: 1;
  /* overflow: scroll; */
`

export default function App() {
  return (
    <StyledView>
      <Header />
      <Calculator />
    </StyledView>
  );
}
