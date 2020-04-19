import React, { FC, useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styled from "styled-components"
import { formatThousands } from "../utils/utilFuncs"
import Incrementer from "./Incrementer"
import Input from "./Input"

const DARK_NAVY = "rgb(51, 56, 62)"
const NAVY = "rgb(56, 62, 68)"

const StackContainer = styled(View)<{color?: string, divider?: boolean}>`
  padding: 15px;
  background-color: ${({ color }) => color || 'white'};
  min-height: 140px;
  flex: 1;
  margin-top: 1px;
  margin-left: ${({ divider }) => divider ? '1px' : '0'};
  margin-right: ${({ divider }) => divider ? '1px' : '0'};
`

const SideNote = styled(View)`
  background-color: #a3a7ad;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1px;
  height: 70px;
`

const PerSqFt = styled(Text)`
  color: white;
  font-size: 16px;
`

const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Text)<{small?: boolean}>`
  color: rgb(204, 204, 204);
font-size: ${({ small }) => small ? '10px' : '13px'};
`

const Result = styled(Text)`
  color: white;
  font-size: 25px;
`

const Center = styled(View)<{spaceBetween?: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ spaceBetween }) => spaceBetween ? 'space-between' : 'center'};
  align-items: center;
  margin: 30px 0;
`

const updateValue = (setter: (newValue: number) => void, value: string, percentage?: boolean) => {
  const valueAsNumber = Number(value.replace(/[^\d.-]/g, ''))
  setter(valueAsNumber)
}

const Calculator: FC = () => {
  const [netPurchasePrice, setNetPurchasePrice] = useState(10000000)
  const [purchaseCosts, setPurchaseCosts] = useState(6.8)
  const [totalFloorArea, setTotalFloorArea] = useState(40000)
  const [passingRent, setPassingRent] = useState(500000)
  const [rentalValue, setRentalValue] = useState(550000)
  const [loanToValue, setLoanToValue] = useState(60)
  const [loanArrangementFee, setLoanArragementFee] = useState(1)
  const [totalInterestRate, setTotalInterestRate] = useState(2.5)
  
  const [grossPurchasePrice, setGrossPurchasePrice] = useState(purchaseCosts / 100 * netPurchasePrice + netPurchasePrice)
  const [netInitialYield, setNetInitialYield] = useState(passingRent / grossPurchasePrice * 100)
  const [grossInitialYield, setGrossInitialYield] = useState(passingRent / netPurchasePrice * 100)
  const [revisionaryYield, setRevisionaryYield] = useState(rentalValue / grossPurchasePrice * 100)
  const [loanAmount, setLoanAmount] = useState(netPurchasePrice * loanToValue / 100)
  const [equityRequirement, setEquityRequirement] = useState(grossPurchasePrice - loanAmount + loanAmount * loanArrangementFee / 100)
  const [grossCashOnCash, setGrossCashOnCash] = useState(((passingRent - (totalInterestRate/100 * loanAmount)) / equityRequirement) * 100)
  
  useEffect(() => {
    setGrossPurchasePrice(purchaseCosts / 100 * netPurchasePrice + netPurchasePrice)
  }, [purchaseCosts, netPurchasePrice])

  useEffect(() => {
    setNetInitialYield(passingRent / grossPurchasePrice * 100)
  }, [passingRent, grossPurchasePrice])

  useEffect(() => {
    setGrossInitialYield(passingRent / netPurchasePrice * 100)
  }, [passingRent, netPurchasePrice])

  useEffect(() => {
    setRevisionaryYield(rentalValue / grossPurchasePrice * 100)
  }, [rentalValue, grossPurchasePrice])

  useEffect(() => {
    setLoanAmount(netPurchasePrice * loanToValue / 100)
  }, [netPurchasePrice, loanToValue])

  useEffect(() => {
    setEquityRequirement(grossPurchasePrice - loanAmount + loanAmount * loanArrangementFee / 100)
  }, [grossPurchasePrice, loanAmount, loanArrangementFee])
  
  useEffect(() => {
    setGrossCashOnCash(((passingRent - (totalInterestRate / 100 * loanAmount)) / equityRequirement) * 100)
  }, [passingRent, totalInterestRate, loanAmount, equityRequirement])

  return(
    <>
      <Input 
        title='Net Purchase Price'
        value={netPurchasePrice}
        setter={setNetPurchasePrice}
        incrementValue={10000}
      />

      <Input
        title='Purchase Costs'
        value={purchaseCosts}
        setter={setPurchaseCosts}
        percentage
        incrementValue={0.1}
      />

      <StackContainer color={DARK_NAVY}>
        <Title>Gross Purchase Price</Title>
        <Center>
          <Result>{formatThousands(Math.floor(grossPurchasePrice))}</Result>
        </Center>
      </StackContainer>

      <Input
        title='Total Floor Area (sq ft)'
        value={totalFloorArea}
        setter={setTotalFloorArea}
        incrementValue={1000}
      />

      <Input
        title='Passing Rent'
        value={passingRent}
        setter={setPassingRent}
        incrementValue={10000}
      />
      <SideNote color={DARK_NAVY}>
          <PerSqFt>{(passingRent / totalFloorArea).toFixed(2)} /sq ft</PerSqFt>
      </SideNote>

      <Input
        title='Rental Value'
        value={rentalValue}
        setter={setRentalValue}
        incrementValue={10000}
      />
      <SideNote color={NAVY}>
        <PerSqFt>{(rentalValue / totalFloorArea).toFixed(2)} /sq ft</PerSqFt>
      </SideNote>

      <Row>
        <StackContainer color={DARK_NAVY}>
          <Title small>Gross Initial Yield</Title>
          <Center>
            <Result>{grossInitialYield.toFixed(2)}%</Result>
          </Center>
        </StackContainer>
        <StackContainer color={NAVY} divider>
          <Title small>Net Initial Yield</Title>
          <Center>
            <Result>{netInitialYield.toFixed(2)}%</Result>
          </Center>
        </StackContainer>
        <StackContainer color={DARK_NAVY}>
          <Title small>Revisionary Yield</Title>
          <Center>
            <Result>{revisionaryYield.toFixed(2)}%</Result>
          </Center>
        </StackContainer>
      </Row>

      <Row>
        <StackContainer color={NAVY}>
          <Title small>Gross Multiple</Title>
          <Center>
            <Result>{(100 / grossInitialYield).toFixed(2)} x</Result>
          </Center>
        </StackContainer>
        <StackContainer color={DARK_NAVY} divider>
          <Title small>Net Multiple</Title>
          <Center>
            <Result>{(100 / netInitialYield).toFixed(2)} x</Result>
          </Center>
        </StackContainer>
        <StackContainer color={NAVY}>
          <Title small>Revisionary Multiple</Title>
          <Center>
            <Result>{(100 / revisionaryYield).toFixed(2)} x</Result>
          </Center>
        </StackContainer>
      </Row>

      <StackContainer color={NAVY}>
        <Title>Loan Amount</Title>
        <Center>
          <Result>{formatThousands(Math.floor(loanAmount))}</Result>
        </Center>
      </StackContainer>

      <Input
        title='Loan to Value'
        value={loanToValue}
        setter={setLoanToValue}
        incrementValue={1}
        percentage
      />

      <Input
        title='Loan Arrangement Fee'
        value={loanArrangementFee}
        setter={setLoanArragementFee}
        incrementValue={0.1}
        percentage
      />

      <Input
        title='Total Interest Rate'
        value={totalInterestRate}
        setter={setTotalInterestRate}
        incrementValue={0.1}
        percentage
      />

      <StackContainer color={DARK_NAVY}>
        <Title>Equity Requirement</Title>
        <Center>
          <Result>{formatThousands(Math.floor(equityRequirement))}</Result>
        </Center>
      </StackContainer>

      <StackContainer color={NAVY}>
        <Title>Gross Cash on Cash (pre-tax)</Title>
        <Center>
          <Result>{grossCashOnCash.toFixed(2)}%</Result>
        </Center>
      </StackContainer>
    </>
  )
}

export default Calculator
