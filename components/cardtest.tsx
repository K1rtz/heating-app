import { useAuth } from '@/contexts/authContext';
import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { firestore as db } from '../config/firebase';

interface SurveyCardProps {
  surveyId: string;
  surveyName: string;
  question: string;
  options: string[];
  hasAnswered: boolean;
  onSubmit?: () => void; // Optional callback to refresh surveys
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ surveyId, surveyName, question,
  options, hasAnswered, onSubmit}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const { user } = useAuth();

  const hasMeasuredHeight = useRef(false);

  async function submitSurveyResponse(surveyId: string, userId: string, selectedOption: string, district: string) {
    try {
      if (hasAnswered) {
        Alert.alert('Greška', 'Već ste odgovorili na ovu anketu!');
        return false;
      }
      if (!selectedOption || !district) {
        Alert.alert('Greška', 'Morate izabrati opciju i imati definisan distrikt!');
        return false;
      }

      const surveyRef = doc(db, 'surveys', surveyId);
      const surveySnap = await getDoc(surveyRef);
      if (!surveySnap.exists()) {
        Alert.alert('Greška', 'Anketa ne postoji!');
        return false;
      }

      const surveyData = surveySnap.data();
      const validOptions = surveyData.options.map((opt: { id: string; text: string }) => opt.text);
      if (!validOptions.includes(selectedOption)) {
        Alert.alert('Greška', 'Izabrana opcija nije validna!');
        return false;
      }

      const responseRef = doc(db, `surveys/${surveyId}/responses`, userId);
      const responseSnap = await getDoc(responseRef);
      if (responseSnap.exists()) {
        Alert.alert('Greška', 'Već ste odgovorili na ovu anketu!');
        return false;
      }

      await setDoc(responseRef, {
        userId,
        selectedOption,
        district,
        submittedAt: Timestamp.fromDate(new Date()),
      });

      const optionIndex = surveyData.options.findIndex((opt: { text: string }) => opt.text === selectedOption);
      const updatedOptionsCount = {
        ...surveyData.optionsCount,
        [optionIndex.toString()]: (surveyData.optionsCount[optionIndex.toString()] || 0) + 1,
      };
      await updateDoc(surveyRef, { optionsCount: updatedOptionsCount });

      Alert.alert('Uspešno!', 'Odgovor je poslat!');
      if(onSubmit){
        onSubmit();
      }
      return true;
    } catch (err: any) {
      Alert.alert('Greška', err.message);
      return false;
    }
  }

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!user?.uid) {
      Alert.alert('Greška', 'Niste prijavljeni!');
      return;
    }
    if (!user?.district) {
      Alert.alert('Greška', 'Vaš profil nema definisan distrikt!');
      return;
    }
    if (!selectedOption) {
      Alert.alert('Greška', 'Morate izabrati opciju!');
      return;
    }
    const success = await submitSurveyResponse(surveyId, user.uid, selectedOption, user.district);
    if (success) {
      setSelectedOption(null); // Reset selection
      onSubmit?.(); // Refresh surveys
    }
  };

  const onContentLayout = (event: LayoutChangeEvent) => {
    if (!hasMeasuredHeight.current) {
      const { height } = event.nativeEvent.layout;
      setContentHeight(height + 60);
      hasMeasuredHeight.current = true;
    }
  };

  const cardHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, contentHeight + 100 || 400],
  });

  return (
    <Animated.View style={[styles.card, hasAnswered ? styles.answeredCard : null]}>
      <TouchableOpacity onPress={toggleExpand} style={hasAnswered ? styles.headerDone :  styles.header}>
        <Text style={styles.surveyName}>{hasAnswered ? surveyName + '- odgovoreno' : surveyName}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content} onLayout={onContentLayout}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                  hasAnswered ? styles.disabledButton : null,
                ]}
                onPress={() => !hasAnswered && handleOptionSelect(option)}
                disabled={hasAnswered}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.submitButton, hasAnswered ? styles.disabledButton : null]}
            onPress={handleSubmit}
            disabled={hasAnswered}
          >
            <Text style={styles.submitButtonText}>{hasAnswered? 'Vec ste odgovorili' : 'Posalji'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({

  card: {
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
    elevation: 4,
    overflow: 'hidden', // Prevent content from overflowing during animation
  },
  header: {
    padding: 16,
    backgroundColor: '#4e73df',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerDone:{
    padding: 16,
    backgroundColor: '#434343',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  surveyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  contentContainer: {
    overflow: 'hidden', // Clip content during collapse
  },
  content: {
    padding: 16,
    backgroundColor: '#262626',
  },
  hiddenContent: {
    opacity: 0, // Hidden but measurable
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E0E0',
    marginBottom: 12,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2E2E2E',
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E0E0E0',
    flex: 1,
  },
  optionStats: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a3e635',
  },
  totalVotes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E0E0E0',
    textAlign: 'right',
  },

  answeredCard: {
    backgroundColor: '#d3d3d3', // Gray for answered surveys
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
    opacity: 0.6,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default SurveyCard;