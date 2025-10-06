import { SurveyCard as Sc } from "@/components/cardtest";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/authContext";
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { firestore as db } from '../../config/firebase';

interface Survey {
  id: string;
  surveyName: string;
  question: string;
  options: { id: string; text: string }[];
  hasAnswered: boolean;
}



const Surveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const {user} = useAuth();

  const fetchActiveSurveys = async () => {
    if (!userId) {
      Alert.alert('Greška', 'Niste prijavljeni!');
      setLoading(false);
      return;
    }
    console.log(userId, user?.uid)

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
        // Check if user has responded
        const responseRef = doc(db, `surveys/${docSnapshot.id}/responses`, userId);
        const responseSnap = await getDoc(responseRef);
        
        // Debug: Log responseSnap to verify
        console.log(`Survey ${docSnapshot.id} response for user ${userId}:`, {
          exists: responseSnap.exists(),
          data: responseSnap.data(),
          path: responseRef.path,
        });

        const hasAnswered = responseSnap.exists(); // Use exists() for compatibility

        fetchedSurveys.push({
          id: docSnapshot.id,
          surveyName: surveyData.title,
          question: surveyData.question,
          options: surveyData.options,
          hasAnswered,
        });
      }
      setSurveys(fetchedSurveys);
    } catch (err: any) {
      Alert.alert('Greška', 'Nije moguće učitati ankete: ' + err.message);
      console.error('Error fetching surveys:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveSurveys();
  }, [userId]); // Add userId as dependency to refetch if user changes

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Aktuelne Ankete</Text>
      </View>
      <ScrollView style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Učitavanje...</Text>
        ) : surveys.length === 0 ? (
          <Text style={styles.noSurveysText}>Nema aktivnih anketa</Text>
        ) : (
          surveys.map(survey => (
            <Sc
              key={survey.id}
              surveyId={survey.id}
              surveyName={survey.surveyName}
              question={survey.question}
              options={survey.options.map(opt => opt.text)}
              hasAnswered={survey.hasAnswered}
              onSubmit = {fetchActiveSurveys}
            />
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Surveys;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#4e73df',
    borderBottomWidth: 2,
    borderBottomColor: '#283c77ff',
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
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