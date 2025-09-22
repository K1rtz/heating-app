import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SurveyCard from "../../components/SurveyCard";

const Surveys = () => {
  const [expandedSurvey, setExpandedSurvey] = useState<number | null>(null);

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
      question: "Koliko ste zadovoljni grejanjem u zgradi zgradi2?",
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
    {
      question: "Bla?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Blabla?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Blabla2?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Blabla3?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Blabla4?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Blabla5?",
      options: [
        { id: "1", text: "Vrlo zadovoljni" },
        { id: "2", text: "Zadovoljni" },
        { id: "3", text: "Nezadovoljni" },
        { id: "4", text: "Veoma nezadovoljni" },
      ],
    },
    {
      question: "Blabla6?",
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
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Aktuelne ankete</Text>
      {surveys.map((s, index) => (
        <View key={index}>
          {/* Pitanje */}
          {expandedSurvey != index && (
          <TouchableOpacity
            style={styles.questionButton}
            onPress={() =>
              setExpandedSurvey(expandedSurvey === index ? null : index)
            }
          >
            <Text style={styles.questionText}>{s.question}</Text>
          </TouchableOpacity>
          )}

          {/* Ako je kliknuto baš ovo pitanje → prikaži SurveyCard ispod */}
          {expandedSurvey === index && (
            <View style={styles.centeredCardContainer}>
            <SurveyCard
              question={s.question}
              options={s.options}
              onVote={handleVote}
              onBack={() => setExpandedSurvey(null)}
            />
            </View>
          )}
        </View>
      ))}
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
    marginBottom: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
  },
    centeredCardContainer: {
      flex: 1,
      justifyContent: "center", // vertikalno centrirano
      alignItems: "center",     // horizontalno centrirano
      backgroundColor: "#f9f9f9"
    }
});
