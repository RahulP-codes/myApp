import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";
import { OtpBox } from "../../components/form";
import { useCreateOtpMutation } from "../../hooks/mutation/user-action-mutation";
import { useProfileStore } from "../../store/profile-store";

const TIMEOUT = 60 * 5;

export default function OTPScreen() {
  const [timer, setTimer] = useState(TIMEOUT);
  const email = useProfileStore((state) => state.email);
  const { mutateAsync: CreateOtp } = useCreateOtpMutation();
  const toast = useToast();

  const handleResend = () => {
    setTimer(TIMEOUT);
    CreateOtp({ email }).then((data) => {
      console.log(data);
      if (data.success) {
        toast.show("OTP has been resent to your email", { type: "success" });
      } else {
        toast.show("Some error has occured. Try again later", {
          type: "danger",
        });
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#e6cb00ff", "#161616"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.7]}
        style={{ height: 214, alignItems: "center", paddingTop: 100 }}
      >
        <View style={{ width: 287, height: 60 }}>
          <Image
            source={require("../../assets/images/esummitLogo.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.heading}>VERIFY DETAILS</Text>

        {timer > 0 ? (
          <Text style={styles.subheading}>
            This OTP will expire in {timer} seconds
          </Text>
        ) : (
          <Text style={styles.subheading}>
            The OTP is expired. Please request a Resend OTP
          </Text>
        )}

        <Text style={styles.subheading2}>Enter OTP</Text>

        <OtpBox length={4} handleResend={handleResend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    width: "100%",
    height: Dimensions.get("window").height,
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
    marginBottom: 3,
  },
  subheading: {
    fontFamily: "Proxima",
    fontSize: 14,
    lineHeight: 17,
    color: "#FFF266",
  },
  subheading2: {
    fontFamily: "Proxima",
    fontSize: 14,
    lineHeight: 17,
    color: "#FFF266",
    paddingTop: 20,
    paddingBottom: 10,
  },
});
