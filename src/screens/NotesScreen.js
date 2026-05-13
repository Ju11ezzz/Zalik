import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мій нотатник</Text>

      <Text style={styles.subtitle}>
        Початковий екран додатку для роботи з нотатками.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Залікова робота</Text>

        <Text style={styles.cardText}>
          Варіант №16. У цьому проєкті буде реалізовано додавання,
          редагування, видалення та пошук нотаток. Також кожну нотатку
          можна буде позначити окремим кольором.
        </Text>
      </View>

      <Text style={styles.hint}>
        Далі буде додано екрани для списку нотаток та їх редагування.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    lineHeight: 24,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: COLORS.muted,
    lineHeight: 22,
  },
  hint: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});