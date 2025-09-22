import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SurveyCard from "../../components/SurveyCard";

const Surveys = () => {
  const [activeSurvey, setActiveSurvey] = useState<number | null>(null);

  const surveys = [
    {
      question: "Koliko ste zadovoljni grejanjem u zgradi?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Koliko ste zadovoljni uslugama?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Neko pitanje?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
  ];

  const handleVote = (optionId: string) => {
    console.log("Glasao za:", optionId);
    Alert.alert("Hvala!", `Glasali ste za opciju ${optionId}`);
    // ovde možeš poslati glas na backend / API
  };

  return (
    <ScrollView style={styles.container}>
      

      {/* Ako nema aktivnog survey-a → prikaz liste pitanja */}
      {activeSurvey === null ? (
        <View>
          <Text style={styles.titleText}>Aktuelne ankete</Text>
          {surveys.map((s, index) => (
            <TouchableOpacity
              key={index}
              style={styles.questionButton}
              onPress={() => setActiveSurvey(index)}
            >
              <Text style={styles.questionText}>{s.question}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.titleText}>Anketa</Text>
          {/* Prikazi odabrani SurveyCard */}
          <SurveyCard
            question={surveys[activeSurvey].question}
            options={surveys[activeSurvey].options}
            onVote={handleVote}
          />
          <TouchableOpacity style={styles.button} onPress={() => setActiveSurvey(null)}>
                      <Text style={styles.buttonText}>Nazad</Text>
                    </TouchableOpacity> 
        </View>
      )}
    </ScrollView>
  );
};

export default Surveys;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#f9f9f9",
  },
  titleText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  questionButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
      backgroundColor: "#050505ff",
      marginTop: 15,
      marginLeft: 100,
      marginRight: 100,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    card: {
      flex: 1,
      justifyContent: "center", 
      alignItems: "center",
    }
});
