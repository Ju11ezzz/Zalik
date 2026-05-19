import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function NoteCard({ note, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: note.color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || 'Без назви'}
        </Text>
      </View>

      <Text style={styles.text} numberOfLines={3}>
        {note.text || 'Порожня нотатка'}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>Змінено: {note.updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  text: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 21,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(31, 41, 55, 0.12)',
    paddingTop: 8,
  },
  date: {
    fontSize: 12,
    color: COLORS.muted,
  },
});