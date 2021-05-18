import AsyncStorage from '@react-native-async-storage/async-storage';

export const localGetFlashcards = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('flashcards');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
}

export const localSaveFlashcards = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('flashcards', jsonValue);
  } catch (e) {}
}

export const useAsyncHook = () => {
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchBookList() {
      try {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem('flashcards');
        jsonValue = (jsonValue != null) ? JSON.parse(jsonValue) : null;
        setResult(
          jsonValue.map(flashcard => {
            return flashcard;
          })
        );
      } catch (error) {
        setLoading(null);
      }
    }
  }, [searchBook]);

  return [result, loading];
}