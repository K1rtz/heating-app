import CustomTabs from '@/components/CustomTabs'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}
      initialRouteName='home'
      tabBar = {(props)=> <CustomTabs {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="surveyHistory"/>
      <Tabs.Screen name="createSurvey" />
      <Tabs.Screen name="receivedReports" />

    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})