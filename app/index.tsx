// Splash Screen - Entry point
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfileStore } from '../store/profile-store';
import { useUserDetailMutation } from '../hooks/mutation/user-action-mutation';
import LogoSvg from '../components/svgs/logo';
import EcellSvg from '../components/svgs/ecell';
import { ADMIN_EMAIL } from '../constants';

export default function SplashScreen() {
  const setProfile = useProfileStore(state => state.setProfile);
  const { mutateAsync: autoLogin } = useUserDetailMutation();

  const checkAuth = async () => {
    const email = await AsyncStorage.getItem("Esummit24email");
  
    if (email !== null) {
      if (email === ADMIN_EMAIL) {
        setProfile({
          email: email,
          image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
          name: "Admin User",
          pass: "Not Purchased",
          isSignedIn: true,
          isAdmin: true,
        });
        router.replace('/(tabs)');
      } else {
        autoLogin({ email }).then((res) => {
          if (res.success) {
            if (res.data.isGuest) {
              setProfile({
                email: email,
                image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
                name: "Guest User",
                pass: "Not Purchased",
                isSignedIn: true,
                isGuest: true,
              });
              router.replace('/(tabs)');
            } else {
              const summitPassLevel = 
                res.data.user.summit_pass === 'lvl1' ? 'Silver' :
                res.data.user.summit_pass === 'lvl2' ? 'Gold' :
                res.data.user.summit_pass === 'lvl3' ? 'Platinum' : 'Unknown';

              setProfile({
                email: res.data.user.email,
                image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
                name: res.data.user.firstName + " " + res.data.user.lastName,
                pass: summitPassLevel,
                isSignedIn: true,
                isAdmin: res.data.user.isadmin || false,
                isGuest: false
              });

              if (res.profileBuilt) {
                router.replace('/(tabs)');
              } else {
                router.replace('/(profile-build)');
              }
            }
          } else {
            router.replace('/signin');
          }
        });
      }
    } else {
      router.replace('/signin');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <LogoSvg />
      <View style={styles.section}>
        <Text style={styles.text}>from</Text>
        <EcellSvg width={85.6} height={90} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  section: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 28,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'lowercase',
  },
});