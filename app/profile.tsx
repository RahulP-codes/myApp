import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, List } from "react-native-paper";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ProfileSection } from "../components/profile";
import { useProfileStore } from "../store/profile-store";
import { useFlowStore } from "../store/flow-store";
import { FLOW_STAGES } from "../constants/flow";
import { EntryQR } from "../components/shared/showEntryQR";
import { Background } from "../components/layout/profileBG";
import CrossSvg from "../components/svgs/cross";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const name = useProfileStore((state) => state.name);
  const email = useProfileStore((state) => state.email);
  const image = useProfileStore((state) => state.image);
  const pass = useProfileStore((state) => state.pass);
  const qrcode = useProfileStore((state) => state.qrcode);
  const isAdmin = useProfileStore((state) => state.isAdmin);
  const isguest = useProfileStore((state) => state.isGuest);
  const setFlow = useFlowStore((state) => state.setFlow);

  const handleLogout = async () => {
    setFlow(FLOW_STAGES.AUTH);
    await AsyncStorage.removeItem("Esummit24email");
    router.replace("/(auth)/signin");
  };

  return (
    <Background>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={{ width: 40 }}>
            <CrossSvg />
          </View>
        </TouchableOpacity>
        <Image
          source={require("../assets/images/esummitLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ProfileSection name={name} email={email} image={image as string} />

      <View style={styles.passContainer}>
        <View style={styles.passContent}>
          <Text style={styles.boldSmallText}>Pass : </Text>
          {pass === null || pass === undefined ? (
            <Text style={styles.boldSmallText}>Not Purchased</Text>
          ) : (
            <Text style={styles.boldSmallText}>{pass}</Text>
          )}
        </View>
      </View>

      {pass === null || pass === undefined || isguest ? (
        <TouchableOpacity
          onPress={() => Linking.openURL("https://ecell.in/esummit/pass")}
        >
          {/* <LinearGradient
        colors={["#413000", "#FFD560", "#413000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.passContainer2Border}
      > */}
      <View style={styles.passContainer2Border}>
            <View style={styles.passContent2}>
              <Image
                source={require("../assets/images/gold.png")}
                style={styles.icons}
              />
              <Text style={[styles.boldSmallText, { color: "#E5BE52" }]}>
                {" "}
                Buy VIP Pass{" "}
              </Text>
            </View>
      {/* </LinearGradient> */}
      </View>
        </TouchableOpacity>
       ) : null}

      <Text style={styles.title}>More</Text>

      {isguest ? (
        <TouchableOpacity
          onPress={() => Linking.openURL("https://ecell.in/esummit/register/")}
        >
          <View style={[styles.section, { justifyContent: "space-between" }]}>
            <Text style={styles.text}>Register Now </Text>
            <List.Icon icon="chevron-right" color="#FFF" />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/profile-edit")}>
          <View style={[styles.section, { justifyContent: "space-between" }]}>
            <Text style={styles.text}>Edit Your Profile </Text>
            <List.Icon icon="chevron-right" color="#FFF" />
          </View>
        </TouchableOpacity>
      )}

      <EntryQR email={email} qrcode={qrcode}>
        <View style={styles.section}>
          <Text style={styles.text}>Show QR Code </Text>
          <Icon
            name="qr-code"
            size={24}
            style={{ paddingRight: 10 }}
            color="#FFF"
          />
        </View>
      </EntryQR>

      <LinearGradient
        colors={["#413000", "#FFD560", "#413000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.logoutBorder}
      >
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Image
            source={require("../assets/images/logout.png")}
            style={styles.icons}
          />
          <Text style={styles.boldSmallText}> Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: {
    width: 150,
    height: 45,
  },
  section: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "hsla(0, 0.00%, 100.00%, 0.05)",
    marginHorizontal: 50,
    marginVertical: 5,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.02)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passContainer2Border: {
    // padding: 1,
    width: 200,
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 19,
    alignSelf: "center",
    margin: 15, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passContent2: {
    width: 200,
    // backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontFamily: "ProximaBold",
    fontSize: 28,
    color: "#FFFFFF",
    paddingHorizontal: 65,
  },
  text: {
    fontSize: 18,
    fontFamily: "ProximaBold",
    lineHeight: 22,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  boldSmallText: {
    fontSize: 15,
    fontFamily: "ProximaBold",
    lineHeight: 22,
    color: "#FFFFFF",
  },
  icons: {
    height: 24,
    width: 24,
  },
  logoutBorder: {
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 25,
    padding: 1,
  },
  logout: {
    backgroundColor: "#4c4723",
    width: 200,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
