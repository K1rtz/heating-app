import ScreenWrapper from '@/components/ScreenWrapper';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { firestore as db } from '../../config/firebase';

interface Report {
  id: string;
  reportType: string;
  description: string;
  userFirstName: string;
  userLastName: string;
  address: string;
  district: string;
  email: string;
}

const ReceivedReports = () => {

    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
        collection(db, 'reports'),
        (snapshot) => {
            const fetchedReports: Report[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            reportType: doc.data().type,
            description: doc.data().description,
            userFirstName: doc.data().userFirstName,
            userLastName: doc.data().userLastName,
            address: doc.data().address,
            district: doc.data().district,
            email: doc.data().email
            }));
            setReports(fetchedReports);
            setLoading(false);
            console.log(fetchedReports);
        },
        (error) => {
            Alert.alert('Greška', 'Nije moguće učitati prijave: ' + error.message);
            setLoading(false);
        }
        );

        return () => unsubscribe(); // prekini listener kada se komponenta unmountuje
    }, []);

      return (
        <View style={{ flex: 1 }}>
        {loading ? (
          <Text>Učitavanje...</Text>
        ) : (
          <ScreenWrapper>
            <View style={styles.header}>
              <Text style={styles.headerText}>Poslate prijave</Text>
            </View>
            <ScrollView>
              {reports.map((r) => (
                <View key={r.id} style={styles.reportItem}>
                  <Text style={styles.text}>
                    {r.reportType}: {r.description}
                  </Text>
                  <Text style={styles.text}>
                    {r.userFirstName} {r.userLastName}, {r.address}, {r.district}, {r.email}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </ScreenWrapper>
        )}
      </View>
     )
}


export default ReceivedReports;

const styles = StyleSheet.create({
  reportItem: {
    padding:15,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  text: {
    color: "white",
    fontSize: 18,
    padding: 3
  },
  header: {

    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#a3e635', // Greenish header
    borderBottomWidth: 2,
    borderBottomColor: '#262626', // Navbar color
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Black for contrast
  },
})