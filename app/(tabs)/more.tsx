import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import { ScrollView } from "react-native";
import { Divider, List, Modal, Portal, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Contact, Faq, Follow } from "../../components/others";
import { useSchedule } from "../../hooks/query/other-query";
import { deleteProfile } from "../../api/other";
import { useFlowStore } from "../../store/flow-store";
import { FLOW_STAGES } from "../../constants/flow";
import { IEventData } from "@/types/api/events.types";

export default function MoreScreen() {
  const [visible, setVisible] = React.useState(false);
  const [deleteVisible, setDeleteVisible] = React.useState(false);

  const { data: Others, isLoading, refetch } = useSchedule();
  const setFlow = useFlowStore((state) => state.setFlow);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showDeleteModal = () => setDeleteVisible(true);
  const hideDeleteModal = () => setDeleteVisible(false);

  const handleLogout = async () => {
    setFlow(FLOW_STAGES.AUTH);
    await AsyncStorage.removeItem("Esummit24email");
    router.replace("/(auth)/signin");
  };

  const handleDeleteAccount = async () => {
    try {
      const email = await AsyncStorage.getItem("Esummit24email");
      if (email) {
        await deleteProfile(email);
        handleLogout();
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            <TouchableOpacity
              style={{ alignItems: "flex-end", marginVertical: 15 }}
              onPress={hideModal}
            >
              <Text style={{ color: "#fff" }}>X</Text>
            </TouchableOpacity>
          </Modal>
          <Modal
            visible={deleteVisible}
            onDismiss={hideDeleteModal}
            contentContainerStyle={styles.deleteContainerStyle}
          >
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalMessage}>
              This action will delete your account, and you will lose all data
              associated with E-Summit 25.
            </Text>
            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={hideDeleteModal}
                style={styles.noButton}
                labelStyle={styles.buttonText}
              >
                No
              </Button>
              <Button
                mode="contained"
                onPress={handleDeleteAccount}
                style={styles.yesButton}
                labelStyle={styles.buttonText}
              >
                Yes
              </Button>
            </View>
          </Modal>
        </Portal>
        <Faq />
        <Divider style={styles.divider} />
        <Contact />
        <Divider style={styles.divider} />
        <View style={styles.content1}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 16,
            }}
            onPress={() => Linking.openURL("https://ecell.in/")}
          >
            <Text style={styles.follow}>ABOUT E-CELL</Text>
            <List.Icon icon="chevron-right" color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.content1}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 16,
            }}
            onPress={showDeleteModal}
          >
            <Text style={styles.follow}>DELETE ACCOUNT</Text>
            <List.Icon icon="chevron-right" color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        {Others?.data?.map((item: any, index: number) => (
          <View style={styles.content1} key={index}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 16,
              }}
              onPress={() => Linking.openURL(item.link)}
            >
              <Text style={styles.follow}>{item.name}</Text>
              <List.Icon icon="chevron-right" color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ))}
        <Follow />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content1: {},
  follow: {
    color: "#FFFFFF",
    fontFamily: "ProximaBold",
    fontSize: 16,
    lineHeight: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)",
  },
  containerStyle: {
    backgroundColor: "#1F2122",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignSelf: "center",
    height: "75%",
    width: "90%",
  },
  deleteContainerStyle: {
    backgroundColor: "#1F2122",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: "90%",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontFamily: "ProximaBold",
    fontSize: 20,
    marginBottom: 10,
  },
  modalMessage: {
    color: "#CCCCCC",
    fontFamily: "Proxima",
    fontSize: 14,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noButton: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    width: "45%",
  },
  yesButton: {
    backgroundColor: "#FF4D4D",
    width: "45%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "ProximaBold",
  },
});
