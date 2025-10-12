import ScreenWrapper from '@/components/ScreenWrapper';
import { collection, deleteDoc, doc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AdminSurveyCard } from '../../components/AdminSurveyCard'; // Adjust path if needed
import { firestore as db } from '../../config/firebase';

interface Survey {
  id: string;
  surveyName: string;
  question: string;
  options: { id: string; text: string }[];
  optionsCount: Record<string, number>;
  totalVotes: number;
}

const SurveyHistory = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpiredSurveys = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const surveysQuery = query(
        collection(db, 'surveys'),
        where('endDate', '<=', Timestamp.fromDate(now))
      );
      const querySnapshot = await getDocs(surveysQuery);

      const fetchedSurveys: Survey[] = [];
      for (const docSnapshot of querySnapshot.docs) {
        const surveyData = docSnapshot.data();
        const optionsCount = surveyData.optionsCount || {};
        const totalVotes = 0; // Ako kasnije računaš glasove, možeš vratiti sumu

        fetchedSurveys.push({
          id: docSnapshot.id,
          surveyName: surveyData.title,
          question: surveyData.question,
          options: surveyData.options,
          optionsCount,
          totalVotes,
        });
      }
      setSurveys(fetchedSurveys);
    } catch (err: any) {
      Alert.alert('Greška', 'Nije moguće učitati završene ankete: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiredSurveys();
  }, []);

  const handleDeleteSurvey = async (id: string) => {
  Alert.alert('Potvrda', 'Da li želite da obrišete ovu anketu?', [
    { text: 'Otkaži', style: 'cancel' },
    {
      text: 'Obriši',
      style: 'destructive',
      onPress: async () => {
        try {
          await deleteDoc(doc(db, 'surveys', id));
          setSurveys(prev => prev.filter(s => s.id !== id));
          Alert.alert('Uspeh', 'Anketa je uspešno obrisana.');
        } catch (err: any) {
          Alert.alert('Greška', 'Brisanje nije uspelo: ' + err.message);
        }
      },
    },
  ]);
};

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Završene Ankete</Text>
      </View>
      <ScrollView style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Učitavanje...</Text>
        ) : surveys.length === 0 ? (
          <Text style={styles.noSurveysText}>Nema završenih anketa</Text>
        ) : (
          surveys.map((survey) => (
            <View key={survey.id} style={styles.surveyCard}>
              <AdminSurveyCard
                surveyId={survey.id}
                surveyName={survey.surveyName}
                question={survey.question}
                options={survey.options}
                optionsCount={survey.optionsCount}
                totalVotes={survey.totalVotes}
                onDelete={handleDeleteSurvey}
              />
            </View>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default SurveyHistory;

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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#171717',
  },
  surveyCard: {
    backgroundColor: '#262626',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#E0E0E0',
  },
  noSurveysText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#E0E0E0',
  },
});
