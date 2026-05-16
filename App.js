import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotesScreen from './src/screens/NotesScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import { COLORS } from './src/constants/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: '700',
            color: COLORS.text,
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            title: 'Мої нотатки',
          }}
        />

        <Stack.Screen
          name="NoteEditor"
          component={NoteEditorScreen}
          options={{
            title: 'Нотатка',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}