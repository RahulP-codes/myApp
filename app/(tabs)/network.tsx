import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { useProfileStore } from "../../store/profile-store";
import { useGetConnectQuery } from "../../hooks/query/user-query";
import { ConnectCard } from "../../components/connect";
import { filterConnect } from "../../utils/helper";

export default function NetworkScreen() {
  const email = useProfileStore((state) => state.email);
  const name = useProfileStore((state) => state.name);
  const { data: ConnectData, isLoading, refetch } = useGetConnectQuery(email);

  const Connects = ConnectData?.connects;
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headcont}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileiconText}>{name?.[0] || "U"}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: "60%" }}>
            <TextInput
              style={styles.input}
              selectionColor="#ffffff"
              placeholder="Search"
              placeholderTextColor="white"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <View>
            <Button
              style={styles.connectbutton}
              onPress={() => router.push("/connections")}
            >
              <Text style={styles.connectbtnText}>Connects</Text>
            </Button>
          </View>
        </View>
      </View>

      <ScrollView
        style={[styles.scrollView, { marginTop: 80 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#4E8FB4"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            <Text style={styles.heading}>People with Similar Interests</Text>
            <View style={[styles.section, { paddingBottom: 100 }]}>
              {Connects === null || Connects === undefined ? (
                <Text style={styles.guestText}>
                  You are a guest user. Sign In with registered email to access
                  networking feature
                </Text>
              ) : (
                filterConnect(Connects, searchText).map((item, index) => (
                  <View key={index}>
                    <ConnectCard
                      id={item.id}
                      name={item.name}
                      company_name={item.company_name}
                      url="https://ecell.in"
                      persontype={item.persontype}
                      description="This is the description"
                      navigation={{
                        navigate: (screen: string, params: any) => {
                          if (screen === "SingleConnect") {
                            // Navigate to single connect page when implemented
                            console.log(
                              "Navigate to single connect:",
                              params.id
                            );
                          }
                        },
                      }}
                      btnText="Connect"
                    />
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    marginVertical: 20,
    position: "absolute",
    top: 0,
    width: "100%",
    justifyContent: "center",
    zIndex: 10,
  },
  headcont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  profileIcon: {
    borderRadius: 50,
    backgroundColor: "#FFE600",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  profileiconText: {
    fontFamily: "ProximaBold",
    textTransform: "uppercase",
    color: "#000000",
    fontSize: 16,
  },
  connectbutton: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#FFE600",
  },
  connectbtnText: {
    color: "#ffffff",
    fontSize: 10,
    paddingHorizontal: 20,
    fontFamily: "Proxima",
  },
  input: {
    backgroundColor: "#161616",
    color: "#FFFFFF",
    fontSize: 14,
    paddingHorizontal: 15,
    width: "100%",
    borderRadius: 20,
    height: "100%",
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 25,
    fontFamily: "ProximaBold",
    marginBottom: 20,
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  guestText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginLeft: 25,
    fontFamily: "ProximaBold",
    marginBottom: 20,
  },
});
