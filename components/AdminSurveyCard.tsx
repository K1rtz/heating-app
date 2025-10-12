import React, { useRef, useState } from 'react';
import {
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
}

export const AdminSurveyCard: React.FC<AdminSurveyCardProps> = ({
  surveyId,
  surveyName,
  question,
  options,
  optionsCount,
  totalVotes,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current; // Use ref for animation to avoid re-renders

  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    // Add padding/margins to ensure full content fits
    setContentHeight(height + 32); // Adjust for padding (16 top + 16 bottom)
  };

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // maxHeight doesn't support native driver
    }).start();
    setIsExpanded(!isExpanded);
  };

  // Interpolate maxHeight for animation
  const contentMaxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight], // Collapse to 0, expand to content height
  });

  const getOptionStats = (optionId: string) => {
    const votes = optionsCount[optionId] || 0;
    const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : '0.0';
    return `${percentage}% (${votes})`;
  };

  // Render content (visible or hidden for measurement)
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
      <Text style={styles.totalVotes}>Ukupno glasova: {totalVotes}</Text>
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
            opacity: animation, // Fade in/out with maxHeight
          },
        ]}
      >
        {renderContent()}
      </Animated.View>
      {/* Hidden content for measurement when collapsed */}
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
    overflow: 'hidden', // Prevent content from overflowing during animation
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
});

export default AdminSurveyCard;