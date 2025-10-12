import ScreenWrapper from '@/components/ScreenWrapper';
import { auth, firestore } from '@/config/firebase';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { verticalScale } from '@/utils/styling';
import { Picker } from '@react-native-picker/picker';
import { doc, updateDoc } from 'firebase/firestore';
import * as Icons from 'phosphor-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [floor, setFloor] = useState('');
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [district, setDistrict] = useState('');

  React.useEffect(() => {
    if (isEditing && user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setDistrict(user.district || '');
      setAddress(user.address || '');
      setFloor(user.floor !== undefined && user.floor !== null ? String(user.floor) : '');
    }
  }, [isEditing, user]);

  const districtOptions = [
    'Crveni Krst',
    'Pantelej',
    'Palilula',
    'Niska Banja',
    'Medijana',
  ];
// const { user } = useAuth();

  const { updateUserData } = useAuth(); 

  const handleFinalize = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert('Greška', 'Nema aktivnog korisnika.');
        return;
      }

      const userRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userRef, {
        firstName,
        lastName,
        district,
        address,
        floor,
      });
      await updateUserData(currentUser.uid);

      Alert.alert('Uspešno', 'Profil je sačuvan!');
      console.log(user)
      console.log('isProfileComplete:', user?.isProfileComplete);

      setIsEditing(false);
    } catch (err: any) {
      Alert.alert('Greška', err.message);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profil</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Icons.Gear size={verticalScale(28)} weight="regular" color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.inputDisplay}
            value={auth.currentUser?.email || ''}
            editable={false}
            selectTextOnFocus={false}
          />

          <Text style={styles.labelText}>Ime</Text>
          <TextInput
            placeholder={user?.firstName || 'Unesite ime'}
            placeholderTextColor="#999"
            style={isEditing ? styles.inputEdit : styles.inputDisplay}
            value={isEditing ? firstName : user?.firstName || ''}
            editable={isEditing}
            onChangeText={setFirstName}
          />

          <Text style={styles.labelText}>Prezime</Text>
          <TextInput
            placeholder={user?.lastName || 'Unesite prezime'}
            placeholderTextColor="#999"
            style={isEditing ? styles.inputEdit : styles.inputDisplay}
            value={isEditing ? lastName : user?.lastName || ''}
            editable={isEditing}
            onChangeText={setLastName}
          />

          <Text style={styles.labelText}>Opština</Text>
          {isEditing ? (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={district || user?.district}
                style={styles.picker}
                onValueChange={(itemValue) => setDistrict(itemValue)}
              >
                <Picker.Item label="-- Izaberi opštinu --" value="" />
                {districtOptions.map((opt) => (
                  <Picker.Item key={opt} label={opt} value={opt} />
                ))}
              </Picker>
            </View>
          ) : (
            <TextInput
              placeholder="Unesite opštinu"
              placeholderTextColor="#999"
              style={styles.inputDisplay}
              value={user?.district || ''}
              editable={false}
            />
          )}

          <Text style={styles.labelText}>Adresa</Text>
          <TextInput
            placeholder={user?.address || 'Unesite adresu'}
            placeholderTextColor="#999"
            style={isEditing ? styles.inputEdit : styles.inputDisplay}
            value={isEditing ? address : user?.address || ''}
            editable={isEditing}
            onChangeText={setAddress}
          />

          <Text style={styles.labelText}>Broj sprata</Text>
          <TextInput
            placeholder={String(user?.floor ?? 'Unesite sprat')}
            placeholderTextColor="#999"
            style={isEditing ? styles.inputEdit : styles.inputDisplay}
            value={isEditing ? floor : String(user?.floor ?? '')}
            editable={isEditing}
            onChangeText={setFloor}
            keyboardType="numeric"
          />

          {isEditing && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>Otkaži</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleFinalize}>
                <Text style={styles.buttonText}>Sačuvaj</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    // backgroundColor: '#a3e635', 
    // backgroundColor: '#f6c23e',
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#171717', // Dark background
  },
  contentContainer: {
    paddingBottom: 40, // Extra padding for scroll
  },
  card: {
    backgroundColor: '#262626', // Card background
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputDisplay: {
    backgroundColor: '#2E2E2E',
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  inputEdit: {
    backgroundColor: '#333333',
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  pickerWrapper: {
    backgroundColor: '#333333',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  picker: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: '#a3e635',
    padding: 14,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: '#827e7eff',
    borderWidth: 1,
    borderColor: '#2b2c2bff',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});