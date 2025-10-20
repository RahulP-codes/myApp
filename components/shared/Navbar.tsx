import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import CrossSvg from "../svgs/cross";
import { useProfileStore } from "../../store/profile-store";
import { getRelativeCoords } from "react-native-reanimated";

export const Navbar = () => {
  const pathname = usePathname();
  const name = useProfileStore((state) => state.name);

  const handleClick = () => {
    if (pathname === "/profile") {
      router.back();
    } else {
      router.push("/profile");
    }
  };

  return (
    <>
      <StatusBar style="auto" backgroundColor="#000000" />
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "transparent" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClick}>
            {pathname === "/profile" ? (
              <View style={{ width: 40 }}>
                <CrossSvg />
              </View>
            ) : (
              <View style={styles.profileIcon}>
                <TouchableOpacity onPress={() => router.push("/profile")}>
                  <Text style={styles.profileiconText}>{name?.[0] || "U"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/esummitLogo.png")}
              style={[{ width: 150, height: 45 }]}
              resizeMode="contain"
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingBottom: 25,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    width: "100%",
    marginRight: 10,
  },
  profileIcon: {
    borderRadius: 50,
    backgroundColor: "#FFE600",
    width: 40,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileiconText: {
    fontFamily: "ProximaBold",
    textTransform: "uppercase",
    color: "#000000ff",
    fontSize: 16,
  },
});
