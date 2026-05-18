import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function NoteCard({ note, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: note.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || 'Без назви'}
        </Text>

        <Text style={styles.text} numberOfLines={3}>
          {note.text || 'Порожня нотатка'}
        </Text>

        <Text style={styles.date}>{note.updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  content: {
    gap: 8,
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
  },
  date: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },
});