import { StatusBar } from 'expo-status-bar';
import NotesScreen from './src/screens/NotesScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NotesScreen />
    </>
  );
}