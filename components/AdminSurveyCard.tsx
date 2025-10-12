import { deleteDoc, doc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { firestore as db } from '../config/firebase';

import {
  Alert,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AdminSurveyCardProps {
  surveyId: string;
  surveyName: string;
  question: string;
  options: { id: string; text: string }[];
  optionsCount: Record<string, number>;
  totalVotes: number;
  isDeletable: boolean;
  onDelete?: () => void;   
}

export const AdminSurveyCard: React.FC<AdminSurveyCardProps> = ({
  surveyId,
  surveyName,
  question,
  options,
  optionsCount,
  totalVotes,
  isDeletable,
  onDelete, 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current; 

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height + 32); 
  };

const handleDeleteSurvey = async (id: string) => {
  Alert.alert('Potvrda', 'Da li želite da obrišete ovu anketu?', [
    { text: 'Otkaži', style: 'cancel' },
    {
      text: 'Obriši',
      style: 'destructive',
      onPress: async () => {
        try {
          await deleteDoc(doc(db, 'surveys', id));
          onDelete?.();
          Alert.alert('Uspeh', 'Anketa je uspešno obrisana.');
        } catch (err: any) {
          Alert.alert('Greška', 'Brisanje nije uspelo: ' + err.message);
        }
      },
    },
  ]);
};


  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const contentMaxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight], 
  });

  const getOptionStats = (optionId: string) => {
    const votes = optionsCount[optionId] || 0;
    const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : '0.0';
    return `${percentage}% (${votes})`;
  };

  const renderContent = () => (
    <View style={[styles.content, !isExpanded && styles.hiddenContent]} onLayout={onContentLayout}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <View key={option.id} style={styles.optionRow}>
            <Text style={styles.optionText}>{option.text}</Text>
            <Text style={styles.optionStats}>{getOptionStats(option.id)}</Text>
          </View>
        ))}
      </View>
      {
        isDeletable ? 
          <View style={styles.doleText}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteSurvey(surveyId)}>
                <Text style={styles.deleteIcon}>✖</Text>
                <Text style={styles.deleteText}>Obriši</Text>
            </TouchableOpacity>
            <Text style={styles.totalVotes}>Ukupno glasova: {totalVotes}</Text>
       </View>
       :
        <Text style={styles.totalVotes}>Ukupno glasova: {totalVotes}</Text>

    }
    </View>
  );

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={styles.header}
        accessibilityRole="button"
        accessibilityLabel={`Toggle ${surveyName} survey card`}
      >
        <Text style={styles.surveyName}>{surveyName}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            maxHeight: contentMaxHeight,
            opacity: animation, 
          },
        ]}
      >
        {renderContent()}
      </Animated.View>
      {!isExpanded && (
        <View style={[styles.hiddenContent, { position: 'absolute', top: -9999 }]}>
          {renderContent()}
        </View>
      )}
    </View>
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
    overflow: 'hidden', 
  },
  header: {
    padding: 16,
    backgroundColor: '#a3e635',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  surveyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  contentContainer: {
    overflow: 'hidden', 
  },
  content: {
    padding: 16,
    backgroundColor: '#262626',
  },
  hiddenContent: {
    opacity: 0, 
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
doleText: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},

deleteButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#3a0000', 
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderWidth: 1,
  borderColor: '#ca1b1bff',
  shadowColor: '#ca1b1bff',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
},

deleteIcon: {
  color: '#ca1b1bff',
  fontSize: 14,
  marginRight: 6,
  fontWeight: '700',
},

deleteText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#ca1b1bff',
},
});

export default AdminSurveyCard;