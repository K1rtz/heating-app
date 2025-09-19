import Typo from '@/components/Typo';
import { auth } from '@/config/firebase';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { signOut } from 'firebase/auth';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const adminmain = () => {

      const {user} = useAuth();
      console.log("user", user)
    
      const handleLogout = async() =>{
        await signOut(auth);
      }


  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout} style={{}}>
        <Typo color={colors.black}>Logout</Typo>
      </TouchableOpacity>
    </View>
  )
}

export default adminmain

const styles = StyleSheet.create({})