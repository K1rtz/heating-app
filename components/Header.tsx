import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  text: string;
};

const Header = ({text} : HeaderProps) => {
  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>{text}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#a3e635', 
    borderBottomColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
})