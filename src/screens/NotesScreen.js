import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import NoteCard from '../components/NoteCard';
import { COLORS } from '../constants/colors';
import { getNotes } from '../storage/notesStorage';

export default function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  async function loadNotes() {
    const savedNotes = await getNotes();
    setNotes(savedNotes);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) {
      return notes;
    }

    return notes.filter((note) => {
      const title = (note.title || '').toLowerCase();
      const text = (note.text || '').toLowerCase();

      return title.includes(normalizedSearch) || text.includes(normalizedSearch);
    });
  }, [notes, searchText]);

  function openEditor(note = null) {
    navigation.navigate('NoteEditor', { note });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Мій нотатник</Text>
          <Text style={styles.subtitle}>
            Усього нотаток: {notes.length}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => openEditor()}
        >
          <Text style={styles.smallButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Пошук нотатки..."
        placeholderTextColor={COLORS.muted}
        value={searchText}
        onChangeText={setSearchText}
      />

      {isLoading ? (
        <View style={styles.centerBlock}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : notes.length === 0 ? (
        <>
          <View style={styles.emptyBlock}>
            <Text style={styles.emptyTitle}>Нотаток поки немає</Text>

            <Text style={styles.emptyText}>
              Створи першу нотатку, щоб вона зʼявилася у списку.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => openEditor()}
          >
            <Text style={styles.mainButtonText}>Створити нотатку</Text>
          </TouchableOpacity>
        </>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard note={item} onPress={() => openEditor(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
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
  smallButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    fontSize: 30,
    lineHeight: 32,
    color: COLORS.white,
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 16,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  listContent: {
    paddingBottom: 20,
  },
});