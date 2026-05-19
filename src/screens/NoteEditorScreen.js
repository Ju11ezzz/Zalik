import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { COLORS, NOTE_COLORS } from '../constants/colors';
import { addNote, deleteNote, updateNote } from '../storage/notesStorage';

function getCurrentDate() {
  const date = new Date();

  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function NoteEditorScreen({ navigation, route }) {
  const editingNote = route.params?.note || null;

  const [title, setTitle] = useState(editingNote?.title || '');
  const [text, setText] = useState(editingNote?.text || '');
  const [selectedColor, setSelectedColor] = useState(
    editingNote?.color || NOTE_COLORS[0]
  );

  const isEditing = Boolean(editingNote);

  async function handleSave() {
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (!trimmedTitle && !trimmedText) {
      Alert.alert('Помилка', 'Нотатка не може бути порожньою.');
      return;
    }

    if (isEditing) {
      const updatedNote = {
        ...editingNote,
        title: trimmedTitle,
        text: trimmedText,
        color: selectedColor,
        updatedAt: getCurrentDate(),
      };

      await updateNote(updatedNote);
    } else {
      const newNote = {
        id: Date.now().toString(),
        title: trimmedTitle,
        text: trimmedText,
        color: selectedColor,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
      };

      await addNote(newNote);
    }

    Keyboard.dismiss();
    navigation.goBack();
  }

  async function handleDelete() {
    Alert.alert(
      'Видалити нотатку?',
      'Після видалення її не можна буде відновити.',
      [
        {
          text: 'Скасувати',
          style: 'cancel',
        },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            await deleteNote(editingNote.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formBlock}>
            <Text style={styles.label}>Заголовок</Text>

            <TextInput
              style={styles.titleInput}
              placeholder="Наприклад: Список справ"
              placeholderTextColor={COLORS.muted}
              value={title}
              onChangeText={setTitle}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />

            <Text style={styles.label}>Текст нотатки</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Введи текст нотатки..."
              placeholderTextColor={COLORS.muted}
              value={text}
              onChangeText={setText}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.label}>Колір нотатки</Text>

            <View style={styles.colorsRow}>
              {NOTE_COLORS.map((color) => {
                const isSelected = selectedColor === color;

                return (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorItem,
                      {
                        backgroundColor: color,
                        borderColor: isSelected ? COLORS.primary : COLORS.white,
                      },
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {isSelected && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                {isEditing ? 'Зберегти зміни' : 'Зберегти'}
              </Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Видалити нотатку</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  formBlock: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 14,
  },
  titleInput: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  textInput: {
    minHeight: 190,
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  colorsRow: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 8,
  },
  colorItem: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 3,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: 18,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
});