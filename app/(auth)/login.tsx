import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Login = () => {

    const [isLoading, setLoading] = useState(false);
    const router = useRouter()
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const {login: loginUser} = useAuth();

    const handleLogin = async() =>{
        if(!emailRef.current || !passwordRef.current){
            Alert.alert('Sign in', 'Please fill in both fields!')
            return
        }
        setLoading(true);
        const res = await loginUser(emailRef.current, passwordRef.current);
        setLoading(false);
        if(!res.success){
          Alert.alert('Log in', res.msg);
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
            <Text style={[styles.title]}>
              Prijavi se!
            </Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={value=>emailRef.current = value}
                placeholder="Email"
                placeholderTextColor="#ccc"
                autoCapitalize="none"
                keyboardType="default"
                style={styles.textInput}
              />
            </View>

            <View style={styles.passwordWrapper}>
              <TextInput
              onChangeText={value=>passwordRef.current = value}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={styles.passwordInput}
              />

              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Zaboravili ste lozinku?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonWrapper}>
                <View style={styles.loadingWrapper}>
                  <TouchableOpacity  onPress={handleLogin} style={styles.signInButton}>
                    <Text style={styles.signInButtonText}>Prijava</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.noAccountButton}>
                    <Pressable onPress={()=>router.push('./register')}>
                      <Text style={styles.noAccountText}>
                        Prvi put ovde? Kreirajte nalog!
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

export default Login

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(25, 25, 25, 0.8)',
    padding: 28,
    width: '95%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(22, 17, 17, 1)',
  },
  title: {
    fontSize: 28,
    color: '#ffffffff',
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(22, 17, 17, 1)',
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
    backgroundColor: 'rgba(255,255,255,0.05)',
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
  backgroundColor: '#1c1c1c',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  width: '100%',
  paddingVertical: 14,
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.97)',
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
