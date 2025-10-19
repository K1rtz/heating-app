import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';

const Tips = () => {
  const tips = [
    { title: "Iskoristite sunčevu toplotu", text: "Otvori roletne i zavese tokom dana da pustiš sunce unutra, a zatvori ih noću da zadržiš toplotu.", image: require('@/assets/images/sun.png') },
    { title: "Odzrači radijatore redovno", text: "Vazduh u radijatorima smanjuje efikasnost grejanja – povremeno ih odzrači za bolju cirkulaciju toplote.", image: require('@/assets/images/radiator.png') },
    { title: "Ne blokiraj radijatore", text: "Radijatori treba da budu slobodni i neblokirani nameštajem, zavesama ili drugim predmetima. Kada je radijator pokriven, to sprečava cirkulaciju toplog vazduha i smanjuje efikasnost grejanja.", image: require('@/assets/images/radiatorblock.png') },
    { title: "Čisti radijatore od prašine", text: "Prašina na radijatoru smanjuje širenje toplote. Redovno čišćenje pomaže da grejanje bude efikasnije.", image: require('@/assets/images/brush.png') },
    { title: "Kako provetriti prostoriju?", text: "Otvorite prozore širom na 5–10 minuta, nekoliko puta dnevno, kako biste osvežili vazduh, a da pritom ne izgubite previše toplote.", image: require('@/assets/images/window.png') },
    { title: "Tepisi čuvaju toplotu", text: "Dodavanjem tepiha na hladnim podovima smanjuješ gubitak toplote i stvaraš osećaj toplijeg prostora.", image: require('@/assets/images/carpet.png') },
    { title: "Kontrola ventila", text: "Ventile zatvarajte u sobama koje ne koristite često. Idealna dnevna temperatura je 20–22 °C, dok spavaće sobe mogu biti hladnije, oko 17–19 °C.", image: require('@/assets/images/thermometer.png') },
  ];

  const [page, setPage] = useState(0);

  return (
    <ScreenWrapper>
      <Header text={tips[page].title} />
      <View style={styles.container}>
        <PagerView
          style={styles.container}
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
  );
};

export default Tips;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // bela pozadina
  },
  pageContent: {
    alignItems: 'center',
    padding: 16,
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
    color: '#333', // tamno siva za tekst
    lineHeight: 24,
    marginTop: 10,
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666', // svetlija siva za footer tekst
  },
});
