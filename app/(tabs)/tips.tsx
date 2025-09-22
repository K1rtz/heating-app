import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/theme';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';


const tips = () => {

  const tips = [
    { title: "Kako provetriti prostoju?", text: "Otvorite prozore širom na 5–10 minuta, nekoliko puta dnevno, kako biste osvežili vazduh, a da pritom ne izgubite previše toplote. Za brži efekat, napravite promaju otvaranjem prozora na suprotnim stranama prostorije i zatvorite radijator dok provetravate.", image: require('@/assets/images/window.png') },
    { title: "Kontrola ventila", text: "Ventile zatvarajte u sobama koje ne koristite često ili kada provetravate prostoriju, a otvarajte ih u prostorijama u kojima boravite. Idealna dnevna temperatura u dnevnom boravku je oko 20–22 °C, dok spavaće sobe mogu biti malo hladnije, oko 17–19 °C. Pravilno balansiranje ventila sprečava pregrevanje i štedi energiju.", image: require('@/assets/images/thermometer.png') },
    { title: "Ne blokiraj radijatore", text: "Radijatori treba da budu slobodni i neblokirani nameštajem, zavjesama ili drugim predmetima. Kada je radijator pokriven, to sprečava cirkulaciju toplog vazduha i smanjuje efikasnost grejanja. Održavanje prostora ispred radijatora omogućava ravnomerno grejanje i smanjuje potrošnju energije.", image: require('@/assets/images/radiatorblock.png') },
    // ...dodaj koliko želiš
  ];
  const [page, setPage] = useState(0);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>{tips[page].title}</Text>
      </View>
    <View style={styles.container}>
      <PagerView style={styles.container}
      initialPage={0}
      onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        {tips.map((tip, index) => (
          <View key={index} style={styles.pageContent}>
            <Image source={tip.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>{tip.text}</Text>
          </View>
        ))}
      </PagerView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {page + 1} od {tips.length}
        </Text>
      </View>
    </View>
    </ScreenWrapper>
  )
}

export default tips
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.primary, // semi-transparent
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryShadow,
  },
  headerText: {
  fontSize: 20,
  fontWeight: '600'
 },
  pager: { flex: 1 },
  pageContent: {
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 16
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
  },
  footerText:{
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  footer:{
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
  }
});