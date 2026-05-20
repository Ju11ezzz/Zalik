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

import ColorFilter from '../components/ColorFilter';
import NoteCard from '../components/NoteCard';
import { COLORS } from '../constants/colors';
import { getNotes } from '../storage/notesStorage';

export default function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

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

    return notes.filter((note) => {
      const title = (note.title || '').toLowerCase();
      const text = (note.text || '').toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        text.includes(normalizedSearch);

      const matchesColor =
        selectedColor === null || note.color === selectedColor;

      return matchesSearch && matchesColor;
    });
  }, [notes, searchText, selectedColor]);

  const hasActiveFilters =
    searchText.trim().length > 0 || selectedColor !== null;

  const sectionTitle =
    notes.length === 0
      ? 'Поки порожньо'
      : hasActiveFilters
        ? 'Результати'
        : 'Усі записи';

  const sectionSubtitle = hasActiveFilters
    ? `Знайдено: ${filteredNotes.length} з ${notes.length}`
    : `Усього нотаток: ${notes.length}`;

  function openEditor(note = null) {
    navigation.navigate('NoteEditor', { note });
  }

  function resetFilters() {
    setSearchText('');
    setSelectedColor(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {sectionTitle}
          </Text>

          <Text style={styles.subtitle} numberOfLines={1}>
            {sectionSubtitle}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => openEditor()}
          activeOpacity={0.8}
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

      <ColorFilter
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
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
            activeOpacity={0.85}
          >
            <Text style={styles.mainButtonText}>Створити нотатку</Text>
          </TouchableOpacity>
        </>
      ) : filteredNotes.length === 0 ? (
        <View style={styles.emptyBlock}>
          <Text style={styles.emptyTitle}>Нічого не знайдено</Text>

          <Text style={styles.emptyText}>
            Спробуй змінити текст пошуку або вибрати інший колір.
          </Text>

          {hasActiveFilters && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={resetFilters}
              activeOpacity={0.85}
            >
              <Text style={styles.clearButtonText}>Скинути фільтри</Text>
            </TouchableOpacity>
          )}
        </View>
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
  titleBlock: {
    flex: 1,
    marginRight: 12,
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
    marginBottom: 14,
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
  clearButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  clearButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 20,
  },
});