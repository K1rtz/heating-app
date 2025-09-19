import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Register = () => {

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {register: registerUser} = useAuth();

  const handleRegistration = async() =>{
    if(!emailRef.current || !passwordRef.current || !confirmPasswordRef.current){
      Alert.alert("Sign up", "Please fill all the fields");
      return
    }else if(passwordRef.current != confirmPasswordRef.current){
      Alert.alert("Sign up", "Password do not match");
      return
    }

    setIsLoading(true);
    const res = await registerUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    console.log('registration result:', res);
    if(!res.success){
      Alert.alert('Sign up', res.msg);
    }
  }



  return (
 <ScreenWrapper style={{marginTop:0, paddingTop: 0}}>
        <StatusBar translucent barStyle={'default'}/>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require('../../assets/images/test6.png')}
      >

        <View style={styles.centerWrapper}>
          <View style={styles.formContainer}> 
            <Text style={[styles.title, { fontFamily: 'October Crow' }]}>
              Sign Up
            </Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={value=>emailRef.current = value}
                placeholder="Email"
                placeholderTextColor="#929090ff"
                autoCapitalize="none"
                keyboardType="default"
                style={styles.textInput}
              />
            </View>

            {/* Password */}
            <View style={styles.passwordWrapper}>
              <TextInput
                onChangeText={value=>passwordRef.current = value}
                placeholder="Password"
                placeholderTextColor="#929090ff"
                secureTextEntry
                style={styles.passwordInput}
              />
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                onChangeText={value=>confirmPasswordRef.current = value}
                placeholder="Confirm Password"
                placeholderTextColor="#929090ff"
                secureTextEntry
                style={styles.passwordInput}
              />
            </View>

            {/* Sign In Button */}
            <View style={styles.buttonWrapper}>
              {/* {isLoading ? ( */}
                {/* <View style={styles.loadingWrapper}> */}
                  {/* <TouchableOpacity style={styles.signInButton}> */}
                    {/* <View> */}
                      {/* <Loading size={hp(2.2)} /> */}
                    {/* </View> */}
                  {/* </TouchableOpacity> */}
                  {/* <Pressable>
                    <Text style={styles.noAccountText}>
                      Don't have an account?
                    </Text>
                  </Pressable>
                </View>
              ) : ( */}
                <View style={styles.loadingWrapper}>
                  <TouchableOpacity  onPress={handleRegistration} style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>Sign Un</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.noAccountButton}>
                    <Pressable>
                      <Text onPress={()=>router.push('./login')} style={styles.noAccountText}>
                        Already got an account?
                      </Text>
                    </Pressable>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScreenWrapper>
  )
  
}

export default Register

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000", // fallback ako se slika ne učita
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(25, 25, 25, 0.8)', // tamno siva sa providnošću
    padding: 28,
    width: '95%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(22, 17, 17, 1)', // zlatna nijansa na ivici
  },
  title: {
    fontSize: 28,
    color: '#ffffffff', // zlatno/žuta boja
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(22, 17, 17, 1)', // diskretna žuta ivica
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 12,
  },
  passwordWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  passwordInput: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(22, 17, 17, 1)',
    color: '#ffffff',
    paddingHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 4,
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontSize: 12,
    color: '#c0baba',
  },
  buttonWrapper: {
    marginTop: 4,
  },
  loadingWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
signInButton: {
  backgroundColor: '#1c1c1c', // tamno siva - osnovna boja dugmeta
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  width: '100%',
  paddingVertical: 14,
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.97)', // diskretna zlatna ivica
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 4,
},
signInButtonText: {
  textAlign: 'center',
  color: '#f1f1f1',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: 1,
},
  noAccountButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  noAccountText: {
    fontSize: 13,
    color: '#9d9191',
    textAlign: 'center',
  },
});
