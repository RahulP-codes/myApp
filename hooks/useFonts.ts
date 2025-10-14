import { useFonts as useExpoFonts } from 'expo-font';

export function useFonts() {
  const [loaded] = useExpoFonts({
    Proxima: require('../assets/fonts/Proxima.ttf'),
    ProximaBold: require('../assets/fonts/ProximaBold.otf'),
    ProximaBoldit: require('../assets/fonts/ProximaBoldit.otf'),
    ProximaExtraBold: require('../assets/fonts/ProximaExtraBold.otf'),
    ProximaLight: require('../assets/fonts/ProximaLight.otf'),
  });

  return loaded;
}