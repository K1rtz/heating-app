import ScreenWrapper from '@/components/ScreenWrapper';
import { auth } from '@/config/firebase';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeAdmin = () => {
  const { user } = useAuth();
  const router = useRouter();

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

      <View style={styles.header}>
        <Text style={styles.headerText}>Administrativni Panel</Text>
      </View>

        <View style={styles.introBox}>
          <Text style={styles.introTitle}>Dobrodošli u administrativni deo aplikacije</Text>
          <Text style={styles.introText}>
            Ovde možete upravljati anketama, pratiti odgovore korisnika i pregledati prijave
            tehničkih problema. Svi podaci se automatski sinhronizuju sa korisničkim delom aplikacije.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.mapContainer}>

            <TouchableOpacity
              style={[styles.mapCard, { borderLeftColor: '#4e73df' }]}
              onPress={() => router.push('/(admin)/activeSurveys')}
            >
              <MaterialCommunityIcons name="note-multiple-outline" size={26} color="#4e73df" />
              <View style={styles.mapTextBox}>
                <Text style={styles.mapTitle}>Aktivne ankete</Text>
                <Text style={styles.mapText}>
                  Pregledajte i upravljajte svim aktivnim anketama koje su trenutno dostupne korisnicima.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mapCard, { borderLeftColor: '#858796' }]}
              onPress={() => router.push('/(admin)/surveyHistory')}
            >
              <MaterialCommunityIcons name="archive-outline" size={26} color="#858796" />
              <View style={styles.mapTextBox}>
                <Text style={styles.mapTitle}>Istekle ankete</Text>
                <Text style={styles.mapText}>
                  Pregledajte rezultate i arhivu prethodno završenih anketa.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mapCard, { borderLeftColor: '#1cc88a' }]}
              onPress={() => router.push('/(admin)/createSurvey')}
            >
              <MaterialCommunityIcons name="note-plus-outline" size={26} color="#1cc88a" />
              <View style={styles.mapTextBox}>
                <Text style={styles.mapTitle}>Kreiraj novu anketu</Text>
                <Text style={styles.mapText}>
                  Napravite novu anketu i postavite je aktivnim korisnicima.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.mapCard, { borderLeftColor: '#e74a3b' }]}
              onPress={() => router.push('/(admin)/receivedReports')}
            >
              <MaterialCommunityIcons name="alert-circle-outline" size={26} color="#e74a3b" />
              <View style={styles.mapTextBox}>
                <Text style={styles.mapTitle}>Prijave problema</Text>
                <Text style={styles.mapText}>
                  Pregledajte sve prijave tehničkih problema koje su korisnici poslali putem aplikacije.
                </Text>
              </View>
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

export default HomeAdmin;

const styles = StyleSheet.create({
    header: {

    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.primary, 
    borderBottomWidth: 2,
    borderBottomColor: '#95d431ff', 
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', 
  },
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
    borderColor: colors.primary,
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
