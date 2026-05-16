import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function NotesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мій нотатник</Text>
        <Text style={styles.subtitle}>Тут буде відображатися список нотаток</Text>
      </View>

      <View style={styles.emptyBlock}>
        <Text style={styles.emptyTitle}>Нотаток поки немає</Text>

        <Text style={styles.emptyText}>
          Створи першу нотатку, щоб перевірити роботу додатку.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('NoteEditor')}
      >
        <Text style={styles.mainButtonText}>Створити нотатку</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginTop: 4,
  },
  emptyBlock: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 18,
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});