import ScreenWrapper from '@/components/ScreenWrapper';
import { colors } from '@/constants/theme';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firestore as db } from '../../config/firebase';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['']);
  const [duration, setDuration] = useState('24h'); 

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (text: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleCreateSurvey = async () => {
    if (title.trim().length === 0) {
      Alert.alert('Greška', 'Naslov ne može biti prazan!');
      return;
    }
    if (question.trim().length === 0) {
      Alert.alert('Greška', 'Pitanje ne može biti prazno!');
      return;
    }
    if (options.some(o => o.trim().length === 0)) {
      Alert.alert('Greška', 'Popunite sve opcije!');
      return;
    }

    try {
      const surveysRef = collection(db, 'surveys');
      const initialOptionsCount: Record<string, number> = {};
      options.forEach((_, idx) => {
        initialOptionsCount[idx.toString()] = 0;
      });

      const now = new Date();
      let endDate: Date;
      switch (duration) {
        case '24h':
          endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;
        case '48h':
          endDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);
          break;
        case '1week':
          endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          endDate = now;
      }

      const newSurvey = await addDoc(surveysRef, {
        title,
        question,
        options: options.map((o, index) => ({
          id: index.toString(),
          text: o,
        })),
        optionsCount: initialOptionsCount,
        createdAt: Timestamp.fromDate(now),
        endDate: Timestamp.fromDate(endDate),
        status: 'active',
      });

      Alert.alert('Uspešno!', 'Anketa je kreirana!');
      setTitle('');
      setQuestion('');
      setOptions(['']);
      setDuration('24h');
    } catch (err: any) {
      Alert.alert('Greška', err.message);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.headerText}>Kreiraj novu anketu</Text>
      </View>
<ScrollView contentContainerStyle={styles.container}>
  <View style={styles.formWrapper}>
    <Text style={styles.label}>Naslov ankete</Text>
    <TextInput
      style={styles.input}
      placeholderTextColor={'#bbbbbbff'}
      placeholder="Unesi naslov"
      value={title}
      onChangeText={setTitle}
    />

    <Text style={styles.label}>Pitanje</Text>
    <TextInput
      style={styles.input}
      placeholder="Unesi pitanje"
      placeholderTextColor={'#bbbbbbff'}
      value={question}
      onChangeText={setQuestion}
    />

    <Text style={styles.label}>Trajanje ankete</Text>
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={duration}
        onValueChange={setDuration}
        style={styles.picker}
      >
        <Picker.Item label="24 sata" value="24h" />
        <Picker.Item label="48 sati" value="48h" />
        <Picker.Item label="1 nedelja" value="1week" />
      </Picker>
    </View>

    <Text style={styles.label}>Odgovori</Text>
    {options.map((opt, idx) => (
      <View key={idx} style={styles.optionRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={`Opcija ${idx + 1}`}
          placeholderTextColor={'#bbbbbbff'}
          value={opt}
          onChangeText={(text) => handleOptionChange(text, idx)}
        />
        <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemoveOption(idx)}>
          <Text style={styles.removeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    ))}

    <TouchableOpacity style={styles.addBtn} onPress={handleAddOption}>
      <Text style={styles.addBtnText}>+ Dodaj opciju</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.publishBtn} onPress={handleCreateSurvey}>
      <Text style={styles.publishBtnText}>Objavi anketu</Text>
    </TouchableOpacity>
  </View>
</ScrollView>
    </ScreenWrapper>
  );
};

export default CreateSurvey;

const styles = StyleSheet.create({
  formWrapper: {
  backgroundColor: '#262626',
  borderRadius: 12,
  padding: 16,
  marginHorizontal: 6,
  borderWidth: 1,
  borderColor: '#333333',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
},
  pickerWrapper: {
    borderRadius: 15,
    borderWidth: 1,
    overflow: 'hidden',
    width: 140,
    marginTop: 6,
    backgroundColor: '#333',
  },
  container: {
    padding: 16,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    color: 'white',
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15, 
    color: 'white',
    backgroundColor: '#333',
    overflow: 'hidden',
  },
  addBtn: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  publishBtn: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  publishBtnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  removeBtn: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ff4d4d',
    borderRadius: 6,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryShadow,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
});