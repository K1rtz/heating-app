import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'

const Welcome = () => {
  return (
    <ScreenWrapper>
      {/* <Text style={{color: 'white'}}>welcome</Text>
       */}
       <Typo size={30} fontWeight={500} > Welcome Page</Typo>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({})