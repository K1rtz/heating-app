import ScreenWrapper from "@/components/ScreenWrapper";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalSelector from 'react-native-modal-selector';
import { firestore as db } from "../../config/firebase";

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
      if (!user) {
        Alert.alert("Greška", "Morate biti prijavljeni da biste poslali prijavu.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        Alert.alert("Greška", "Podaci o korisniku nisu pronađeni u bazi.");
        return;
      }

      const userData = userSnapshot.data();

      await addDoc(collection(db, "reports"), {
        type: tip,
        description: opis,
        userFirstName: userData.firstName,
        userLastName: userData.lastName,
        address: userData.address,
        district: userData.district,
        email: userData.email
      });

      Alert.alert("Uspeh", "Prijava je uspešno poslata administratoru ✅");
      setOpis("");
      setTip("tehnicki");
    } catch (err: any) {
      Alert.alert("Greška", "Nije moguće sačuvati prijavu: " + err.message);
    }
  };

  const options = [
  { key: 'tehnicki', label: 'Tehnički problem' },
  { key: 'administrativni', label: 'Administrativni problem' },
  { key: 'korisnicki', label: 'Korisnički problem' },
  { key: 'infrastrukturni', label: 'Infrastrukturni problem' },
  { key: 'predlog', label: 'Predlog za unapređenje' },
  { key: 'drugo', label: 'Drugo' },
];

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Prijava problema</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.report}>
          <Text style={styles.label}>Izaberi tip prijave:</Text>
          <ModalSelector
            data={options}
            initValue="Izaberi tip prijave"
            initValueTextStyle={{color:"white", fontSize:18, alignSelf:"flex-start", padding:3}}
            onChange={(option) => setTip(option.key)}
            style={{ backgroundColor: '#262626', borderRadius: 8 }}
            selectStyle={{ backgroundColor: '#262626', borderRadius: 8 }}
            selectTextStyle={{ color: '#fff' }}
            optionTextStyle={{ color: '#fff', fontSize:18 }}
            optionContainerStyle={{ backgroundColor: '#000' }}
            cancelTextStyle={{ color: 'black', fontSize:18 }}
          />

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
    marginBottom: 15,
  },
  label2: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    fontSize: 18,
    color: "white"
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
