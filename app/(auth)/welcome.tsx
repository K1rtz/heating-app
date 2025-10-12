import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import React from 'react'
import { StyleSheet } from 'react-native'

const Welcome = () => {
  return (
    <ScreenWrapper>
       <Typo size={30} fontWeight={500} > Welcome Page</Typo>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({})