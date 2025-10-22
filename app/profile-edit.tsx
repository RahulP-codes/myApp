import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useProfileStore } from "../store/profile-store";
import { router } from "expo-router";
import { useGetPersonalProfileQuery } from "../hooks/query/user-query";
import CrossSvg from "@/components/svgs/cross";

export default function ProfileEditScreen() {
  const email = useProfileStore((state) => state.email);
  const toast = useToast();
  const [selectedSchool, setSelectedSchool] = useState("");
  const [achievements, setAchievements] = useState("");
  const [skills, setSkills] = useState("");
  
  const { data: ProfileData, isLoading } = useGetPersonalProfileQuery(email);

  useEffect(() => {
    if (ProfileData?.profile) {
      setSelectedSchool(ProfileData.profile.company_name || "");
      setAchievements(ProfileData.profile.achievements || "");
      setSkills(ProfileData.profile.skills || "");
    }
  }, [ProfileData]);

  const handleSubmit = () => {
    console.log('Profile data:', ProfileData?.profile);
    toast.show("Profile Updated", { type: "success" });
    router.back();
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headcont}>
          <TouchableOpacity onPress={() => router.back()}>
            <CrossSvg></CrossSvg>
          </TouchableOpacity>
          <View style={styles.innerheadcont}>
            <Image
              source={require("../assets/images/esummitLogo.png")}
              style={{ width: 150, height: 45 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerx}>
          <View style={styles.section}>
            <Text style={styles.label}>College/School Name</Text>
            <TextInput
              style={styles.input}
              value={selectedSchool}
              onChangeText={setSelectedSchool}
              placeholder="Enter college/school name"
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Your Achievement:</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={[styles.input, styles.multilineInput]}
              value={achievements}
              onChangeText={setAchievements}
              textAlignVertical="top"
              placeholder="Enter your achievements"
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Your Skills:</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={[styles.input, styles.multilineInput]}
              value={skills}
              onChangeText={setSkills}
              textAlignVertical="top"
              placeholder="Enter your skills"
              placeholderTextColor="#666"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#05020E",
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "100%",
  },
  headcont: {
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  innerheadcont: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    width: "100%",
    marginRight: 10,
  },
  containerx: {
    height: "100%",
    marginBottom: 100,
  },
  section: {
    padding: 20,
  },
  label: {
    color: "#fff",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "hsla(54, 100%, 50%, 0.02)",
    fontFamily: "Proxima",
    color: "#FFFFFF",
    borderColor: "hsla(54, 100%, 50%, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 2,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  multilineInput: {
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: "#FFE600",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "ProximaBold",
  },
});