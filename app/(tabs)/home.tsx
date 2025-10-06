import ScreenWrapper from '@/components/ScreenWrapper';
import { auth } from '@/config/firebase';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Gradska toplana</Text>
        </View>

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

        {/* FEATURES
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funkcionalnosti</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('Surveys')}>
              <Icon name="poll" size={36} color="#a3e635" />
              <Text style={styles.cardText}>Ankete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('Reports')}>
              <Icon name="file-alert-outline" size={36} color="#a3e635" />
              <Text style={styles.cardText}>Reporti</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('Tips')}>
              <Icon name="lightbulb-on-outline" size={36} color="#a3e635" />
              <Text style={styles.cardText}>Saveti</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigateTo('Profile')}>
              <Icon name="account-circle" size={36} color="#a3e635" />
              <Text style={styles.cardText}>Profil</Text>
            </TouchableOpacity>
          </View>
        </View> */}



        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.introTitle}>O Toplani</Text>
          <Text style={styles.introText}>
            Gradska toplana Niš je najveći pružalac usluga snabdevanja i distribucije toplotne energije u Nišu. Sistem daljinskog grejanja obezbeđuje toplotu za stanovnike tokom zimske sezone. Glavni izvori toplote su moderne kotlarnice, a distribucija se vrši preko 67 km toplovodne mreže. Toplana opslužuje preko 1.140 stambenih i poslovnih objekata.
          </Text>
        </View>

        {/* HISTORY */}
        <View style={styles.section}>
          <Text style={styles.introTitle}>Istorijat</Text>
          <Text style={styles.introText}>
            Prva centralna grejanja u Nišu uvedena su 1930. godine za institucije poput Doma zdravlja i Trgovačke akademije. Nakon Drugog svetskog rata, fokus je bio na obnovi stambenog fonda. Godine 1973. donet je Program toplifikacije, čime je osnovana Gradska toplana, sa kapacitetom od 22,62 MW, opslužujući 104.951 m² stambenog i 9.327 m² poslovnog prostora.
          </Text>
        </View>

        {/* LINKS */}
        <View style={styles.section}>
          <Text style={styles.introTitle}>Korisni Linkovi</Text>
          <View style={styles.linksRow}>
            <TouchableOpacity style={styles.linkCard}>
              <MaterialCommunityIcons name="web" size={28} color="#a3e635" />
              <Text style={styles.linkText}>Sajt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkCard}>
              <MaterialCommunityIcons name="file-document-outline" size={28} color="#a3e635" />
              <Text style={styles.linkText}>Dokumenti</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkCard}>
              <MaterialCommunityIcons name="help-circle-outline" size={28} color="#a3e635" />
              <Text style={styles.linkText}>FAQ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutCard}>
          <MaterialCommunityIcons name="logout-variant" size={30} color="#E0E0E0" />
          <Text style={styles.logoutText}>Odjavi se</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a3e635',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 12,
    lineHeight: 20,
  },
  mapContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626', // Matches card backgrounds
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#a3e635', // Green accent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    gap: 12,
  },
  mapTextBox: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#a3e635', // Green for titles
    marginBottom: 4,
  },
  mapText: {
    fontSize: 13,
    color: '#E0E0E0', // Light gray for readability
    lineHeight: 18,
  },
//   sectionSubtitle: {
//   fontSize: 14,
//   color: '#555',
//   marginBottom: 10,
//   marginTop: -2,
// },

// mapContainer: {
//   flexDirection: 'column',
//   gap: 12,
// },

// mapCard: {
//   flexDirection: 'row',
//   alignItems: 'flex-start',
//   backgroundColor: '#f8f9fc',
//   padding: 12,
//   borderRadius: 10,
//   borderLeftWidth: 4,
//   shadowColor: '#000',
//   shadowOpacity: 0.05,
//   shadowRadius: 3,
//   elevation: 2,
//   gap: 10,
// },

// mapTextBox: {
//   flex: 1,
// },

// mapTitle: {
//   fontSize: 15,
//   fontWeight: '700',
//   color: '#222',
//   marginBottom: 2,
// },

// mapText: {
//   fontSize: 13,
//   color: '#444',
//   lineHeight: 18,
// },

  scrollContent: {
    paddingBottom: 40,
    backgroundColor: '#171717', // Darker background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#a3e635', // Greenish header
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Subtle border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Increased for visibility
    shadowRadius: 4,
    elevation: 4,
    borderBottomRightRadius: 25,
    // borderBottomLeftRadius: 25,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    margin: 16,
    borderRadius: 10,
    backgroundColor: '#262626', // Slightly lighter than #171717
    borderWidth: 1,
    borderColor: '#a3e635', // Green accent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#E0E0E0',
  },



  introBox: {
      // introBox: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#262626',
  paddingHorizontal: 16,
  paddingVertical: 12,
},
introTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: colors.primary,
  marginBottom: 6,
  textAlign: 'center',
},
introText: {
    //   fontSize: 14,
    color: '#E0E0E0',
    // lineHeight: 22,
  fontSize: 14,
  // color: '#333',
  textAlign: 'center',
  lineHeight: 20,
},
  // introBox: {
  //   margin: 16,
  //   padding: 16,
  //   borderRadius: 10,
  //   backgroundColor: '#262626',
  //   // borderLeftWidth: 4,
  //   // borderLeftColor: '#a3e635',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   elevation: 4,
  // },
  // introTitle: {
  //   fontSize: 18,
  //   fontWeight: '700',
  //   color: '#a3e635',
  //   marginBottom: 8,
  // },
  // introText: {
  //   fontSize: 14,
  //   color: '#E0E0E0',
  //   lineHeight: 22,
  // },
  // section: {
  //   marginHorizontal: 16,
  //   marginBottom: 20,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: '#a3e635',
  //   marginBottom: 8,
  // },
  sectionText: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  card: {
    width: '48%',
    height: 120,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#E0E0E0',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  linkCard: {
    alignItems: 'center',
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  linkText: {
    fontSize: 13,
    marginTop: 6,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a3e635',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E0E0',
    marginLeft: 8,
  },
});