import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';


const tips = () => {

  const tips = [
    { title: "Iskoristite suncevu toplotu", text: "Otvori roletne i zavese tokom dana da pustiš sunce unutra, a zatvori ih noću da zadržiš toplotu.", image: require('@/assets/images/sun.png') },
    { title: "Odzrači radijatore redovno", text: "Vazduh u radijatorima smanjuje efikasnost grejanja – povremeno ih odzrači za bolju cirkulaciju toplote.", image: require('@/assets/images/radiator.png') },
    // { title: "Zatvori vrata prostorija koje ne koristiš", text: "Ako neka soba nije u upotrebi, smanji grejanje i zatvori vrata da toplota ne „beži“.", image: require('@/assets/images/door-open.png') },
    { title: "Ne blokiraj radijatore", text: "Radijatori treba da budu slobodni i neblokirani nameštajem, zavjesama ili drugim predmetima. Kada je radijator pokriven, to sprečava cirkulaciju toplog vazduha i smanjuje efikasnost grejanja. Održavanje prostora ispred radijatora omogućava ravnomerno grejanje i smanjuje potrošnju energije.", image: require('@/assets/images/radiatorblock.png') },
    { title: "Čisti radijatore od prašine", text: "Prašina na radijatoru smanjuje širenje toplote. Redovno čišćenje pomaže da grejanje bude efikasnije.", image: require('@/assets/images/brush.png') },
    { title: "Kako provetriti prostoju?", text: "Otvorite prozore širom na 5–10 minuta, nekoliko puta dnevno, kako biste osvežili vazduh, a da pritom ne izgubite previše toplote. Za brži efekat, napravite promaju otvaranjem prozora na suprotnim stranama prostorije i zatvorite radijator dok provetravate.", image: require('@/assets/images/window.png') },
    { title: "Tepisi čuvaju toplotu", text: "Dodavanjem tepiha na hladnim podovima smanjuješ gubitak toplote i stvaraš osećaj toplijeg prostora.", image: require('@/assets/images/carpet.png') },
    { title: "Kontrola ventila", text: "Ventile zatvarajte u sobama koje ne koristite često ili kada provetravate prostoriju, a otvarajte ih u prostorijama u kojima boravite. Idealna dnevna temperatura u dnevnom boravku je oko 20–22 °C, dok spavaće sobe mogu biti malo hladnije, oko 17–19 °C. Pravilno balansiranje ventila sprečava pregrevanje i štedi energiju.", image: require('@/assets/images/thermometer.png') },



  ];
  const [page, setPage] = useState(0);

  return (
    <ScreenWrapper>
      <Header  text={tips[page].title}/>
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

  pager: { flex: 1 },
  pageContent: {
    alignItems: 'center',
    padding: 16
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.35,
    marginTop: 40,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E0E0E0',
    lineHeight: 24,
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