import Header from '@/components/Header';
import ScreenWrapper from '@/components/ScreenWrapper';
import { auth } from '@/config/firebase';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Home = () => {
  const { user } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      Alert.alert('Greška', 'Nije moguće odjaviti se: ' + err.message);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Header  text='Gradska toplana'/>
        {/* STATUS */}
        <View style={styles.statusBox}>
          <MaterialCommunityIcons name="radiator" size={24} color="#a3e635" />
          <Text style={styles.statusText}>Grejna sezona je aktivna od 15. oktobra</Text>
        </View>

        {/* INTRO */}
        <View style={styles.introBox}>
          <Text style={styles.introTitle}>Dobrodošli u aplikaciju Vaše Toplane</Text>
          <Text style={styles.introText}>
            Ova aplikacija vam omogućava da pratite obaveštenja, učestvujete u anketama, prijavite probleme i dobijete savete za racionalnu potrošnju energije.
          </Text>
        </View>

{/* MAPA APLIKACIJE */}
<View style={styles.section}>
  {/* <Text style={styles.sectionTitle}>Mapa aplikacije</Text> */}
  {/* <Text style={styles.sectionSubtitle}> */}
    {/* Upoznajte glavne funkcionalnosti i kako ih možete koristiti. */}
  {/* </Text> */}

  <View style={styles.mapContainer}>
    {/* Ankete */}



    <TouchableOpacity style={[styles.mapCard, { borderLeftColor: '#4e73df' }]}
      onPress={() => router.push('/(tabs)/surveys')}
    >
      
      <MaterialCommunityIcons name="poll" size={26} color="#4e73df" />
      <View style={styles.mapTextBox}>
        <Text style={styles.mapTitle}>Ankete</Text>
        <Text style={styles.mapText}>
          Učestvujte u aktivnim anketama i podelite vaše mišljenje o radu toplane.
        </Text>
      </View>
    </TouchableOpacity>

    {/* Reporti */}
    <TouchableOpacity style={[styles.mapCard, { borderLeftColor: '#e74a3b' }]}
      onPress={() => router.push('/(tabs)/report')}
    >
      <MaterialCommunityIcons name="file-alert-outline" size={26} color="#e74a3b" />
      <View style={styles.mapTextBox}>
        <Text style={styles.mapTitle}>Reporti</Text>
        <Text style={styles.mapText}>
          Prijavite tehničke probleme, curenja ili nepravilnosti direktno službi podrške.
        </Text>
      </View>
    </TouchableOpacity>

    {/* Saveti */}
    <TouchableOpacity style={[styles.mapCard, { borderLeftColor: '#1cc88a' }]}
      onPress={() => router.push('/(tabs)/tips')}
    >
      <MaterialCommunityIcons name="lightbulb-on-outline" size={26} color="#1cc88a" />
      <View style={styles.mapTextBox}>
        <Text style={styles.mapTitle}>Saveti</Text>
        <Text style={styles.mapText}>
          Pogledajte korisne savete za uštedu energije i efikasnije grejanje.
        </Text>
      </View>
    </TouchableOpacity>

    {/* Profil */}
    <TouchableOpacity style={[styles.mapCard, { borderLeftColor: '#f6c23e' }]}
      onPress={() => router.push('/(tabs)/profile')}
    >
      <MaterialCommunityIcons name="account-circle-outline" size={26} color="#f6c23e" />
      <View style={styles.mapTextBox}>
        <Text style={styles.mapTitle}>Profil</Text>
        <Text style={styles.mapText}>
          Pregledajte i ažurirajte vaše podatke, kontakt informacije i lozinku.
        </Text>
      </View>
    </TouchableOpacity>
  </View>
</View>

 <View style={styles.section}>
  <Text style={styles.introTitle}>O Toplani</Text>
  <Text style={styles.introText}>
    Gradska toplana Niš je najveći pružalac usluga snabdevanja i distribucije toplotne energije u Nišu. Sistem daljinskog grejanja obezbeđuje toplotu za stanovnike tokom zimske sezone. Glavni izvori toplote su moderne kotlarnice, a distribucija se vrši preko 67 km toplovodne mreže. Toplana opslužuje preko 1.140 stambenih i poslovnih objekata
    <Text>...</Text>
  </Text>

  <TouchableOpacity 
    onPress={() => Linking.openURL('https://nitoplana.rs/istorijat')}
  >
    <Text style={{color: '#787b75ff', marginTop: 4}}>Pročitaj više...</Text>
  </TouchableOpacity>
</View>

 <View style={styles.section}>
  <Text style={styles.introTitle}>Istorijat</Text>
  <Text style={styles.introText}>
     Prva centralna grejanja u Nišu uvedena su 1930. godine za institucije poput Doma zdravlja i Trgovačke akademije. Nakon Drugog svetskog rata, fokus je bio na obnovi stambenog fonda. Godine 1973. donet je Program toplifikacije, čime je osnovana Gradska toplana, sa kapacitetom od 22,62 MW, opslužujući 104.951 m² stambenog i 9.327 m² poslovnog prostora.
    <Text>...</Text>
  </Text>

  <TouchableOpacity 
    onPress={() => Linking.openURL('https://nitoplana.rs/istorijat')}
  >
    <Text style={{color: '#787b75ff', marginTop: 4}}>Pročitaj više...</Text>
  </TouchableOpacity>
</View>

        {/* LINKS */}
      <View style={styles.section}>
        <Text style={styles.introTitle}>Korisni Linkovi</Text>
        <View style={styles.linksRow}>
          <TouchableOpacity 
            style={styles.linkCard} 
            onPress={() => Linking.openURL('https://nitoplana.rs/')}
          >
            <MaterialCommunityIcons name="web" size={28} color="#a3e635" />
            <Text style={styles.linkText}>Sajt</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard} 
            onPress={() => Linking.openURL('https://nitoplana.rs/documents')}
          >
            <MaterialCommunityIcons name="file-document-outline" size={28} color="#a3e635" />
            <Text style={styles.linkText}>Dokumenta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkCard} 
            onPress={() => Linking.openURL('https://nitoplana.rs/foto_gallery')}
          >
            <MaterialCommunityIcons name="folder-image" size={28} color="#a3e635" />
            <Text style={styles.linkText}>Galerija</Text>
          </TouchableOpacity>
        </View>
      </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutCard}>
          <MaterialCommunityIcons name="logout-variant" size={30} color="#353333ff" />
          <Text style={styles.logoutText}>Odjavi se</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

// 
const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    margin: 16,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#a3e635',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
  },

  introBox: {
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
    textAlign: 'left',
  },
  introText: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
    textAlign: 'justify',
  },

  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },

  mapContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#a3e635',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  mapTextBox: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4e4e4e',
    marginBottom: 4,
  },
  mapText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 18,
  },

  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  linkCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  linkText: {
    fontSize: 13,
    marginTop: 6,
    color: '#333333',
    fontWeight: '500',
  },

  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#242121ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b1514ff',
    marginLeft: 8,
  },
});

