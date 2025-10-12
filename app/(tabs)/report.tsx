import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { firestore as db } from "../../config/firebase";




export default function ReportScreen() {
  
  const {user} = useAuth();
  const [tip, setTip] = useState("tehnicki");
  const [opis, setOpis] = useState("");


  const posaljiReport = async () => {
    // console.log(user);
    if (!opis.trim()) {
      Alert.alert("Greška", "Unesite opis problema.");
      return;
    }

    try {
      if (!user || !user.uid) {
        console.log('xdd')
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

  const typeOptions = [
  { label: 'Tehnički problem', value: 'tehnicki' },
  { label: 'Administrativni problem', value: 'administrativni' },
  { label: 'Korisnički problem', value: 'korisnicki' },
  { label: 'Infrastrukturni problem', value: 'infrastrukturni' },
  { label: 'Predlog za unapređenje', value: 'predlog' },
  { label: 'Drugo', value: 'drugo' },
];

  return (
    <ScreenWrapper>
      <Header text="Prijava problema" />
      <View style={styles.container}>
        <View style={styles.report}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Izaberi tip prijave:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={tip}
                onValueChange={(itemValue) => setTip(itemValue)}
                dropdownIconColor="#fff"
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {typeOptions.map((opt) => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>


          <Text style={styles.label2}>Opis problema:</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={6}
            placeholder="Unesite opis..."
            placeholderTextColor="white"
            value={opis}
            onChangeText={setOpis}
          />

          <TouchableOpacity style={styles.button} onPress={() => posaljiReport()}>
            <Text style={styles.buttonText}>Pošalji</Text>
          </TouchableOpacity>
        </View>
      </View>
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
}

const styles = StyleSheet.create({
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
    pickerContainer: {
    marginTop: 15,
  },
  pickerWrapper: {
    backgroundColor: '#262626',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    fontSize: 18,
    height: 60,
    width: '100%',
  },
  pickerItem: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#262626',
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryShadow,
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
    justifyContent: "flex-start", 
    paddingTop: 20,
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
    padding: 16,
    elevation: 4,
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
    padding: 12,
    marginBottom: 10,
    textAlignVertical: "top",
    fontSize: 18,
    color: "white",
    minHeight: 120,
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