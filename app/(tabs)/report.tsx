import ScreenWrapper from "@/components/ScreenWrapper";
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
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Prijava problema</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.report}>
          <Text style={styles.label}>Izaberi tip prijave:</Text>
          <Picker style={{color:"white"}} mode="dropdown" dropdownIconColor={"white"} selectedValue={tip} onValueChange={(v) => setTip(v)}>
            <Picker.Item color="black" label="Tehnički problem" value="tehnicki" style={styles.label}/>
            <Picker.Item color="black" label="Administrativni problem" value="administrativni" style={styles.label}/>
            <Picker.Item color="black" label="Korisnicki problem" value="korisnicki" style={styles.label}/>
            <Picker.Item color="black" label="Infrastrukturni problem" value="infrastrukturni" style={styles.label}/>
            <Picker.Item color="black" label="Predlog za unapređenje" value="predlog" style={styles.label}/>
            <Picker.Item color="black" label="Drugo" value="drugo" style={styles.label}/>
          </Picker>

          <Text style={styles.label2}>Opis problema:</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Unesite opis..."
            placeholderTextColor={
              "white"
            }
            value={opis}
            onChangeText={setOpis}
          />

          <TouchableOpacity style={styles.button} onPress={() => posaljiReport()}>
            <Text style={styles.buttonText}>Pošalji</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#eb1a1aff',
    borderBottomWidth: 2,
    borderBottomColor: '#ef4444',
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
    alignItems: "center",
    justifyContent: "center"
  },
  report: {
    backgroundColor: '#262626',
    borderRadius: 12,
    marginVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 350,
    marginBottom: 40,
    padding: 16,
    elevation: 4,
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 0,
  },
  label2: {
    color: "white",
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
      backgroundColor: "#ef4444",
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
