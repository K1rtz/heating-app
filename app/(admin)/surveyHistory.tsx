import ScreenWrapper from '@/components/ScreenWrapper';
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AdminSurveyCard } from '../../components/AdminSurveyCard'; // Adjust path as needed
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
        const optionsCount: Record<string, number> = surveyData.optionsCount || {};
        const totalVotes = Object.values(optionsCount).reduce((sum, count) => sum + count, 0);

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
      Alert.alert('Greška', 'Nije moguće učitati zavrsene ankete: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiredSurveys();
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Zavrsene Ankete</Text>
      </View>
      <ScrollView style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Učitavanje...</Text>
        ) : surveys.length === 0 ? (
          <Text style={styles.noSurveysText}>Nema zavrsenih anketa</Text>
        ) : (
          surveys.map(survey => (
            <AdminSurveyCard
              key={survey.id}
              surveyId={survey.id}
              surveyName={survey.surveyName}
              question={survey.question}
              options={survey.options}
              optionsCount={survey.optionsCount}
              totalVotes={survey.totalVotes}
              isDeletable = {true}
              onDelete={fetchExpiredSurveys}
            />
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
    backgroundColor: '#a3e635', // Greenish header
    borderBottomWidth: 2,
    borderBottomColor: '#262626', // Navbar color
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000', // Black for contrast
  },
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#171717', // Dark background
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#E0E0E0', // Light gray for readability
  },
  noSurveysText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#E0E0E0',
  },
});