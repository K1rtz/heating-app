import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/theme';
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import * as Icons from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const Home = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveSurveys = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const surveysQuery = query(
        collection(db, 'surveys'),
        where('status', '==', 'active'),
        where('endDate', '>', Timestamp.fromDate(now))
      );
      const querySnapshot = await getDocs(surveysQuery);

      const fetchedSurveys: Survey[] = [];
      for (const docSnapshot of querySnapshot.docs) {
        const surveyData = docSnapshot.data();
        const optionsCount = surveyData.optionsCount || {};
        const totalVotes = Object.values(optionsCount).reduce((sum: number, count: number) => sum + count, 0);

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
      Alert.alert('Greška', 'Nije moguće učitati ankete: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveSurveys();
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Aktivne Ankete</Text>
        <TouchableOpacity style={styles.iconRight} onPress={(fetchActiveSurveys)}>
          <Icons.ArrowsClockwiseIcon size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Učitavanje...</Text>
        ) : surveys.length === 0 ? (
          <Text style={styles.noSurveysText}>Nema aktivnih anketa</Text>
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
            />
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
  height: 70,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.primary,
  borderBottomWidth: 2,
  borderBottomColor: colors.primaryShadow,
  position: 'relative',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  iconRight: {
    position: "absolute",
    right: 16,  // odmakne ikonu od desne ivice
    top: "50%",
    transform: [{ translateY: -12 }], // vertikalno centriranje
  },
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
  noSurveysText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
});