import { getAuth } from "firebase/auth";
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const auth = getAuth();
const user = auth.currentUser;

type Option = {
    id: string;
    text: string;
  };
  
  type SurveyCardProps = {
    question: string;
    options: Option[];
    onVote: (optionId: string) => void;
    onBack: () => void;
  };

const sendSurvey = (selected: string | null, onBack: () => void) => {
  // Ovo treba da se upise u bazu!
  // Jos uvek nemamo ankete u bazi podataka! idAnkete nije relevantan
  console.log("Posalji podatke u bazu! Podaci: idKorisnika ", user?.uid, ", idAnkete ", 12, ", ocena ", selected);
  onBack(); 
};

  const SurveyCard = ({ question, options, onVote, onBack }: SurveyCardProps) => {

    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
    setSelected(id);
    onVote(id);
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity>
                  <Text style={styles.question}>{question}</Text>
                </TouchableOpacity>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selected === option.id && styles.selectedOption, // ako je kliknuto
          ]}
          onPress={() => handleSelect(option.id)}
        >
          <Text style={styles.optionText}>
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}  
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => sendSurvey(selected, onBack)}>
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
        marginBottom: 20,
        padding: 16,
        marginVertical: 8,
        elevation: 3,
      },
    question: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
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
    },
    selectedOption: {
      //backgroundColor: "black",
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 5,
    }
})