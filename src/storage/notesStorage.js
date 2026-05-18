import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_STORAGE_KEY = 'COLOR_NOTES';

export async function getNotes() {
  try {
    const data = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Помилка читання нотаток:', error);
    return [];
  }
}

export async function saveNotes(notes) {
  try {
    await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.log('Помилка збереження нотаток:', error);
  }
}

export async function addNote(note) {
  const notes = await getNotes();
  const updatedNotes = [note, ...notes];

  await saveNotes(updatedNotes);

  return updatedNotes;
}

export async function updateNote(updatedNote) {
  const notes = await getNotes();

  const updatedNotes = notes.map((note) =>
    note.id === updatedNote.id ? updatedNote : note
  );

  await saveNotes(updatedNotes);

  return updatedNotes;
}

export async function deleteNote(noteId) {
  const notes = await getNotes();

  const updatedNotes = notes.filter((note) => note.id !== noteId);

  await saveNotes(updatedNotes);

  return updatedNotes;
}