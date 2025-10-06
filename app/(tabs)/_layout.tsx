import CustomTabs from '@/components/CustomTabs'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}
      initialRouteName='surveys'
      tabBar = {(props)=> <CustomTabs {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="tips" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="surveys" />
      <Tabs.Screen name="report" />

    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})