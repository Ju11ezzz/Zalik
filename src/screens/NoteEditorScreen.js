import {
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
  
  export default function NoteEditorScreen() {
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
            <Text style={styles.label}>Заголовок</Text>
  
            <TextInput
              style={styles.titleInput}
              placeholder="Наприклад: Список справ"
              placeholderTextColor={COLORS.muted}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
  
            <Text style={styles.label}>Текст нотатки</Text>
  
            <TextInput
              style={styles.textInput}
              placeholder="Введи текст нотатки..."
              placeholderTextColor={COLORS.muted}
              multiline
              textAlignVertical="top"
            />
  
            <Text style={styles.label}>Колір нотатки</Text>
  
            <View style={styles.colorsRow}>
              {NOTE_COLORS.map((color) => (
                <View
                  key={color}
                  style={[
                    styles.colorItem,
                    {
                      backgroundColor: color,
                    },
                  ]}
                />
              ))}
            </View>
  
            <TouchableOpacity
              style={styles.saveButton}
              onPress={Keyboard.dismiss}
            >
              <Text style={styles.saveButtonText}>Зберегти</Text>
            </TouchableOpacity>
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
    label: {
      fontSize: 15,
      fontWeight: '700',
      color: COLORS.text,
      marginBottom: 8,
      marginTop: 14,
    },
    titleInput: {
      backgroundColor: COLORS.white,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: COLORS.text,
    },
    textInput: {
      minHeight: 180,
      backgroundColor: COLORS.white,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: COLORS.text,
      lineHeight: 22,
    },
    colorsRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    colorItem: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 2,
      borderColor: COLORS.white,
    },
    saveButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginTop: 'auto',
    },
    saveButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '700',
    },
  });