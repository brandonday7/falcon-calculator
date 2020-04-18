import React, { FC, useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styled from "styled-components"
import { formatThousands } from "../utils/utilFuncs"
import Incrementer from "./Incrementer"

const DARK_NAVY = "rgb(51, 56, 62)"
const NAVY = "rgb(56, 62, 68)"

const StackContainer = styled(View)<{color?: string, divider?: boolean}>`
  padding: 20px;
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
`

const Title = styled(Text)`
  color: rgb(204, 204, 204);
  font-size: 13px;
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

const Value = styled(TextInput)`
  font-size: 25px;
  font-weight: 400;  
`

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
    setNetInitialYield(passingRent / grossPurchasePrice * 100)
    setGrossInitialYield(passingRent / netPurchasePrice * 100)
    setRevisionaryYield(rentalValue / grossPurchasePrice * 100)
    setLoanAmount(netPurchasePrice * loanToValue / 100)
    setEquityRequirement(grossPurchasePrice - loanAmount + loanAmount * loanArrangementFee / 100)
    setGrossCashOnCash(((passingRent - (totalInterestRate / 100 * loanAmount)) / equityRequirement) * 100)
  }, [
    netPurchasePrice, 
    purchaseCosts,
    totalFloorArea,
    passingRent, 
    rentalValue,
    loanToValue,
    loanArrangementFee,
    totalInterestRate
  ])

  return(
    <>
      <StackContainer>
        <Title>Net Purchase Price</Title>
        <Center spaceBetween>
          <Incrementer type="minus" onPress={() => setNetPurchasePrice(Number(netPurchasePrice) - 1)}></Incrementer>
          <Value 
            keyboardType='numeric'
            value={formatThousands(netPurchasePrice)} 
            onChangeText={input => setNetPurchasePrice(input)}
          />
          <Incrementer type="plus" onPress={() => setNetPurchasePrice(Number(netPurchasePrice) + 1)}></Incrementer>
        </Center>
      </StackContainer>

      <StackContainer>
        <Title>Purchase Costs</Title>
        <Center spaceBetween>
          <Incrementer type="minus" onPress={() => setPurchaseCosts(Number(purchaseCosts) - 0.1)}></Incrementer>
          <Value
            keyboardType='numeric'
            value={purchaseCosts.toFixed(2) + '%'}
            onChangeText={input => setPurchaseCosts(input)}
          />
          <Incrementer type="plus" onPress={() => setPurchaseCosts(Number(purchaseCosts) + 0.1)}></Incrementer>
        </Center>
      </StackContainer>

      <StackContainer color={DARK_NAVY}>
        <Title>Gross Purchase Price</Title>
        <Center>
          <Result>{formatThousands(Math.floor(grossPurchasePrice))}</Result>
        </Center>
      </StackContainer>

      <StackContainer>
        <Title>Total Floor Area (sq ft)</Title>
        <Center spaceBetween>
          <Incrementer type="minus" onPress={() => setTotalFloorArea(Number(totalFloorArea) - 1000)}></Incrementer>
          <Value
            keyboardType='numeric'
            value={formatThousands(totalFloorArea)}
            onChangeText={input => setTotalFloorArea(input)}
          />
          <Incrementer type="plus" onPress={() => setTotalFloorArea(Number(totalFloorArea) + 1000)}></Incrementer>
        </Center>
      </StackContainer>

        <StackContainer>
          <Title>Passing Rent</Title>
          <Center spaceBetween>
            <Incrementer type="minus" onPress={() => setPassingRent(Number(passingRent) - 10000)}></Incrementer>
            <Value
              keyboardType='numeric'
              value={formatThousands(passingRent)}
              onChangeText={input => setPassingRent(input)}
              />
            <Incrementer type="plus" onPress={() => setPassingRent(Number(passingRent) + 10000)}></Incrementer>
          </Center>
        </StackContainer>
        <SideNote color={DARK_NAVY}>
            <PerSqFt>{(passingRent / totalFloorArea).toFixed(2)} /sq ft</PerSqFt>
        </SideNote>

        <StackContainer>
          <Title>Rental Value</Title>
          <Center spaceBetween>
            <Incrementer type="minus" onPress={() => setRentalValue(Number(rentalValue) - 10000)}></Incrementer>
            <Value
              keyboardType='numeric'
              value={formatThousands(rentalValue)}
              onChangeText={input => setRentalValue(input)}
              />
            <Incrementer type="plus" onPress={() => setRentalValue(Number(rentalValue) + 10000)}></Incrementer>
          </Center>
        </StackContainer>
        <SideNote color={NAVY}>
          <PerSqFt>{(rentalValue / totalFloorArea).toFixed(2)} /sq ft</PerSqFt>
        </SideNote>

      <StackContainer color={NAVY}>
        <Title>Net Multiple</Title>
        <Center>
          <Result>{(100/netInitialYield).toFixed(2)} x</Result>
        </Center>
      </StackContainer>

      <Row>
        <StackContainer color={DARK_NAVY}>
          <Title>Gross Initial Yield</Title>
          <Center>
            <Result>{grossInitialYield.toFixed(2)}%</Result>
          </Center>
        </StackContainer>
        <StackContainer color={NAVY} divider>
          <Title>Net Initial Yield</Title>
          <Center>
            <Result>{netInitialYield.toFixed(2)}%</Result>
          </Center>
        </StackContainer>
        <StackContainer color={DARK_NAVY}>
          <Title>Revisionary Yield</Title>
          <Center>
            <Result>{revisionaryYield.toFixed(2)}%</Result>
          </Center>
        </StackContainer>
      </Row>

      <StackContainer color={NAVY}>
        <Title>Loan Amount</Title>
        <Center>
          <Result>{formatThousands(Math.floor(loanAmount))}</Result>
        </Center>
      </StackContainer>

      <StackContainer>
        <Title>Loan to Value</Title>
        <Center spaceBetween>
          <Incrementer type="minus" onPress={() => setLoanToValue(Number(loanToValue) - 1)}></Incrementer>
          <Value
            keyboardType='numeric'
            value={loanToValue.toFixed(2) + '%'}
            onChangeText={input => setLoanToValue(input)}
          />
          <Incrementer type="plus" onPress={() => setLoanToValue(Number(loanToValue) + 1)}></Incrementer>
        </Center>
      </StackContainer>

      <StackContainer>
        <Title>Loan Arrangement Fee</Title>
        <Center spaceBetween>
          <Incrementer type="minus" onPress={() => setLoanArragementFee(Number(loanArrangementFee) - 0.1)}></Incrementer>
          <Value
            keyboardType='numeric'
            value={loanArrangementFee.toFixed(2) + '%'}
            onChangeText={input => setLoanArragementFee(input)}
          />
          <Incrementer type="plus" onPress={() => setLoanArragementFee(Number(loanArrangementFee) + 0.1)}></Incrementer>
        </Center>
      </StackContainer>

      <StackContainer>
        <Title>Total Interest Rate</Title>
        <Center spaceBetween>
          <Incrementer type="minus" onPress={() => setTotalInterestRate(Number(totalInterestRate) - 0.1)}></Incrementer>
          <Value
            keyboardType='numeric'
            value={totalInterestRate.toFixed(2) + '%'}
            onChangeText={input => setTotalInterestRate(input)}
          />
          <Incrementer type="plus" onPress={() => setTotalInterestRate(Number(totalInterestRate) + 0.1)}></Incrementer>
        </Center>
      </StackContainer>

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
