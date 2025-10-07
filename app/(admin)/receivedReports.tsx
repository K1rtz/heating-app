import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { firestore as db } from '../../config/firebase';

interface Report {
  id: string;
  reportType: string;
  description: string;
  userId: string;
}

interface User {
  id: string;
  address: string;
  district: string;
  email: string;
  firstName: string;
  lastName: string;
}

const ReceivedReports = () => {

    const [reports, setReports] = useState<Report[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
        collection(db, 'reports'),
        (snapshot) => {
            const fetchedReports: Report[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            reportType: doc.data().type,
            description: doc.data().description,
            userId: doc.data().userId,
            }));
            setReports(fetchedReports);
            setLoading(false);
        },
        (error) => {
            Alert.alert('Greška', 'Nije moguće učitati prijave: ' + error.message);
            setLoading(false);
        }
        );

        return () => unsubscribe(); // prekini listener kada se komponenta unmountuje
    }, []);

      return (
    <View>
      {loading ? (
        <Text>Učitavanje...</Text>
      ) : (
        reports.map((r) => (
          <Text key={r.id}>
            {r.reportType}: {r.description}: {r.userId}
          </Text>
        ))
      )}
    </View>
  )
}


export default ReceivedReports;

const styles = StyleSheet.create({})