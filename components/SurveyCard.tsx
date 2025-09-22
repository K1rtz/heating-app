import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Option = {
    id: string;
    text: string;
  };
  
  type SurveyCardProps = {
    question: string;
    options: Option[];
    onVote: (optionId: string) => void;
    active: number;
    onBack: () => void;
  };

const sendSurvey = (onBack: () => void) => {
  console.log("Add pressed!");
  // ovde logika za API
  onBack(); // vrati se nazad posle slanja
};

  const SurveyCard = ({ question, options, onVote, active, onBack }: SurveyCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionButton}
          onPress={() => onVote(option.id)}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}  
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => sendSurvey(onBack)}>
          <Text style={styles.buttonText}>Pošalji</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Text style={styles.buttonText}>Nazad</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SurveyCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        width: 350,
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginTop: 20,
        elevation: 3,
      },
    question: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
    },
    optionButton: {
      backgroundColor: "#f0f0f0",
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    optionText: {
      fontSize: 16,
    },
    button: {
      backgroundColor: "#050505ff",
      marginTop: 15,
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
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 15,
      marginBottom: 15,
    }
})