import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, NOTE_COLORS } from '../constants/colors';

export default function ColorFilter({ selectedColor, onSelectColor }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Фільтр за кольором</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.colorsRow}
      >
        <TouchableOpacity
          style={[
            styles.allButton,
            selectedColor === null && styles.activeAllButton,
          ]}
          onPress={() => onSelectColor(null)}
        >
          <Text
            style={[
              styles.allButtonText,
              selectedColor === null && styles.activeAllButtonText,
            ]}
          >
            Усі
          </Text>
        </TouchableOpacity>

        {NOTE_COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              {
                backgroundColor: color,
                borderColor: selectedColor === color ? COLORS.primary : COLORS.white,
              },
            ]}
            onPress={() => onSelectColor(color)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  colorsRow: {
    alignItems: 'center',
    paddingRight: 4,
  },
  allButton: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  activeAllButton: {
    borderColor: COLORS.primary,
  },
  allButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  activeAllButtonText: {
    color: COLORS.primary,
  },
  colorButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 3,
    marginRight: 10,
  },
});