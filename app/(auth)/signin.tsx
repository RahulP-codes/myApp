import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { TextInput } from '../../components/form';
import { ADMIN_EMAIL, Validator } from '../../constants';
import { useCreateOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';

export default function SignInScreen() {
  const email = useProfileStore((state) => state.email);
  const setEmail = useProfileStore((state) => state.setEmail);
  const setProfile = useProfileStore((state) => state.setProfile);

  const toast = useToast();
  const { mutateAsync: CreateOtp } = useCreateOtpMutation();

  const handleSubmit = () => {
    if (email.toLowerCase() === ADMIN_EMAIL) {
      setProfile({
        email: email,
        image: "https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png",
        name: "Admin User",
        pass: "Not Purchased",
        isSignedIn: true,
        isAdmin: true,
      });
      router.replace('/(tabs)');
      return;
    } else {
      CreateOtp({ email }).then((data) => {
        console.log(data);
        if (data.success) {
          toast.show("OTP sent to your email", { type: "success" });
          router.push('/otp');
        } else {
          toast.show("Some error has occured. Try again later", {
            type: "danger",
          });
        }
      });
    }
  };

  return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#E6CC00", "#161616"]}
          start={[0.5, 0]}
          end={[0.5, 1]}
          locations={[0, 0.7]}
          style={{ height: 214, alignItems: "center", paddingTop: 100 }}
        >
          <View>
            <Image
              source={require('../../assets/images/esummitLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.subheading}>Enter your E-mail ID to proceed</Text>

          <TextInput
            label="Email Id"
            value={email}
            onChangeText={setEmail}
            validator={Validator.email}
            onSubmit={handleSubmit}
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    width: "100%",
    height: "100%",
  },
  section: {
    padding: 20,
    backgroundColor: "#161616",
    height: "100%",
  },
  heading: {
    fontFamily: "ProximaBold",
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  subheading: {
    fontFamily: "Proxima",
    fontSize: 14,
    lineHeight: 17,
    color: "#A2A2A2",
  },
  logo: {
    width: 310,
    height: 106,
  },
});
