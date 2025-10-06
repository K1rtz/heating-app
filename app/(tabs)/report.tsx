import { Picker } from "@react-native-picker/picker";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const auth = getAuth();
const user = auth.currentUser;

export default function ReportScreen() {
  const [tip, setTip] = useState("tehnicki");
  const [opis, setOpis] = useState("");

  const posaljiReport = async () => {
    if (!opis.trim()) {
      Alert.alert("Greška", "Unesite opis problema.");
      return;
    }

    try {
      let response = await fetch("https://tvoj-api.com/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tip, opis })
      });

      if (response.ok) {
        Alert.alert("Uspeh", "Report je poslat administratoru.");
        setOpis("");
        setTip("tehnicki");
      } else {
        Alert.alert("Greška", "Nije moguće poslati report.");
      }
    } catch (err) {
      Alert.alert("Greška", "Nije ostvarena konekcija sa bazom podataka.");
    }
  };

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.titleText}>Prijava problema</Text>
      </View>
    <View style={styles.container}>
      <View style={styles.report}>
        <Text style={styles.label}>Izaberi tip prijave:</Text>
        <Picker selectedValue={tip} onValueChange={(v) => setTip(v)}>
          <Picker.Item label="Tehnički problem" value="tehnicki" style={styles.label}/>
          <Picker.Item label="Administrativni problem" value="administrativni" style={styles.label}/>
          <Picker.Item label="Korisnicki problem" value="korisnicki" style={styles.label}/>
          <Picker.Item label="Infrastrukturni problem" value="infrastrukturni" style={styles.label}/>
          <Picker.Item label="Predlog za unapređenje" value="predlog" style={styles.label}/>
          <Picker.Item label="Drugo" value="drugo" style={styles.label}/>
        </Picker>

        <Text style={styles.label2}>Opis problema:</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Unesite opis..."
          value={opis}
          onChangeText={setOpis}
        />

        <TouchableOpacity style={styles.button} onPress={() => posaljiReport()}>
          <Text style={styles.buttonText}>Pošalji</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center"
  },
  report: {
    backgroundColor: "#fff",
    width: 350,
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 0,
  },
  label2: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    fontSize: 18,
  },
  titleText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 20,
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
});
