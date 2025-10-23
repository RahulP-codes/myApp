import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import axios from "axios";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profession, setProfession] = useState(null);
  const [isProfessionDropdownOpen, setProfessionDropdownOpen] = useState(false);

  const professionOptions = [
    { label: "Student", value: "student" },
    { label: "Professional", value: "professional" },
    { label: "Entrepreneur", value: "entrepreneur" },
    { label: "Other", value: "other" },
  ];

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !contactNumber ||
      !profession
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://apiserver.ecell.in/app25/user/register/",
        {
          email,
          password,
          firstName,
          lastName,
          contact: contactNumber,
          profession,
          state: "App",
          country: "App",
          pincode: "111111",
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "You have registered successfully!");
        router.replace("/signin");
      } else {
        Alert.alert("Error", response.data.message || "Registration failed.");
        console.log(response.data);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#E6CC00", "#161616"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.9]}
        style={styles.header}
      >
        <Image
          source={require("../../assets/images/esummitLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>

      <Text style={styles.heading}>Register</Text>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.section}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            textColor="#FFFFFF"
            activeUnderlineColor="#FFF260"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            textColor="#FFFFFF"
            activeUnderlineColor="#FFF260"
          />
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            textColor="#FFFFFF"
            activeUnderlineColor="#FFF260"
          />
          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            textColor="#FFFFFF"
            activeUnderlineColor="#FFF260"
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            textColor="#FFFFFF"
            activeUnderlineColor="#FFF260"
          />
          <TextInput
            label="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            style={styles.input}
            textColor="#FFFFFF"
            activeUnderlineColor="#FFF260"
          />
          <DropDownPicker
            open={isProfessionDropdownOpen}
            value={profession}
            items={professionOptions}
            setOpen={setProfessionDropdownOpen}
            setValue={setProfession}
            placeholder="Select your profession"
            style={styles.dropdown}
            textStyle={{ color: "#FFFFFF" }}
            dropDownContainerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            contentStyle={{ padding: 10 }}
          >
            Register
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    flex: 1,
  },
  header: {
    height: 200,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  section: {
    paddingHorizontal: 20,
    flex: 1,
  },
  heading: {
    fontFamily: "ProximaBold",
    fontSize: 23,
    lineHeight: 28,
    color: "#FFFFFF",
    textTransform: "uppercase",
    margin: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  dropdown: {
    marginBottom: 15,
    backgroundColor: "#1F2122",
    borderColor: "#4E8FB4",
  },
  dropdownContainer: {
    backgroundColor: "#1F2122",
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#E6CC00",
  },
  logo: {
    width: 300,
    height: 106,
  },
});
