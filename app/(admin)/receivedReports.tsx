import ScreenWrapper from '@/components/ScreenWrapper';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // 🔹 Učitavanje reportova u realnom vremenu
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
          email: doc.data().email,
        }));
        setReports(fetchedReports);
        setLoading(false);
      },
      (error) => {
        Alert.alert('Greška', 'Nije moguće učitati prijave: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Funkcija za proširivanje / skupljanje prijava
  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((x) => x !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  // 🔹 Brisanje prijave
  const handleDelete = async (id: string) => {
    Alert.alert(
      'Potvrda',
      'Da li ste sigurni da želite da obrišete ovu prijavu?',
      [
        { text: 'Otkaži', style: 'cancel' },
        {
          text: 'Obriši',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'reports', id)); // brisanje iz Firestore-a
              setReports((prev) => prev.filter((r) => r.id !== id)); // ažuriraj lokalno stanje
              Alert.alert('Uspeh', 'Prijava je uspešno obrisana.');
            } catch (err: any) {
              Alert.alert('Greška', 'Brisanje nije uspelo: ' + err.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      {loading ? (
        <Text style={styles.loadingText}>Učitavanje...</Text>
      ) : (
        <ScreenWrapper>
          <View style={styles.header}>
            <Text style={styles.headerText}>Poslate prijave</Text>
          </View>
          <ScrollView>
            {reports.map((r) => {
              const isExpanded = expandedIds.includes(r.id);
              return (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => toggleExpand(r.id)}
                  style={[styles.reportItem, isExpanded && styles.expandedItem]}
                >
                  <View style={styles.titleRow}>
                    <Text style={styles.reportTitle}>{r.reportType}</Text>
                    <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
                  </View>

                  {isExpanded && (
                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailText}>Opis: {r.description}</Text>
                      <Text style={styles.detailText}>
                        Korisnik: {r.userFirstName} {r.userLastName}
                      </Text>
                      <Text style={styles.detailText}>Adresa: {r.address}</Text>
                      <Text style={styles.detailText}>Opština: {r.district}</Text>
                      <Text style={styles.detailText}>Email: {r.email}</Text>

                      {/* Dugme za brisanje */}
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(r.id)}
                      >
                        <Text style={styles.deleteButtonText}>Obriši</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ScreenWrapper>
      )}
    </View>
  );
};

export default ReceivedReports;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#a3e635',
    borderBottomWidth: 2,
    borderBottomColor: '#262626',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  reportItem: {
    backgroundColor: '#2d2d2d',
    marginVertical: 6,
    marginHorizontal: 12,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  expandedItem: {
    backgroundColor: '#3a3a3a',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  detailText: {
    color: '#ddd',
    fontSize: 16,
    marginVertical: 2,
  },
  deleteButton: {
    backgroundColor: 'black',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
