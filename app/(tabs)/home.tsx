import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { auth } from '@/config/firebase'
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { signOut } from 'firebase/auth'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Home = () => {

  const {user} = useAuth();
  console.log("user", user)

  const handleLogout = async() =>{
    await signOut(auth);
  }

  return (
    <ScreenWrapper>
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout} style={{}}>
        <Typo color={colors.black}>Logout</Typo>
      </TouchableOpacity>
    </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})