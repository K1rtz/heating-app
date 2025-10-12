import { SurveyCard as Sc } from "@/components/cardtest";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/authContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  console.log(user?.isProfileComplete);
  const fetchActiveSurveys = async () => {
    if (!userId) {
      Alert.alert('Greška', 'Niste prijavljeni!');
      setLoading(false);
      return;
    }

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
        const responseRef = doc(db, `surveys/${docSnapshot.id}/responses`, userId);
        const responseSnap = await getDoc(responseRef);

        const hasAnswered = responseSnap.exists();

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
  }, [userId]); 

  return (
    <ScreenWrapper>
      <Header text='Aktuelne Ankete'/>
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
          {!user?.isProfileComplete && (
      <View style={styles.overlay}>
        <MaterialCommunityIcons name='information-outline' size={50} color="#FFD700" />
        <Text style={styles.overlayText}>
          Molimo popunite profil pre pristupa anketama
        </Text>
      </View>
    )}
    </ScreenWrapper>
  );
};

export default Surveys;

const styles = StyleSheet.create({
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlayText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
});