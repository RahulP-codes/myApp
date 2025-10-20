import { Tabs } from "expo-router";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Navbar } from "../../components/shared/Navbar";
import { LinearGradient } from "expo-linear-gradient";


const getIconStyle = (focused: boolean) => ({
  width: 30,
  height: 30,
  tintColor: "#000000ff",
  opacity: focused ? 1 : 0.5,
});

function CustomTabBar({ state, descriptors, navigation }: any) {

  return (
    <View style={[styles.tabBarContainer, { bottom: 10 }]}>
      <View style={styles.shadowWrapper}>
        <LinearGradient
          colors={["#24347F", "#4A4C8B"]}
          style={styles.borderContainer}
        >
          <LinearGradient
            colors={["#B6A400", "#998A00"]}
            style={styles.mainGradient}
          >
            <View style={styles.tabsWrapper}>
              {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.tabItem}
                    onPress={onPress}
                  >
                    {options.tabBarIcon({ focused: isFocused })}
                    <Text
                      style={[
                        styles.tabLabel,
                        {
                          color: isFocused
                            ? "#0d0d0dff"
                            : "hsla(0, 0%, 0%, 0.6)",
                        },
                      ]}
                    >
                      {options.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </LinearGradient>
        </LinearGradient>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        header: () => <Navbar />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/homeicon.png")}
              style={getIconStyle(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          title: "Network",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/networkicon.png")}
              style={getIconStyle(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: "Maps",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/mapicon.png")}
              style={getIconStyle(focused)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/moreicon.png")}
              style={getIconStyle(focused)}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: "2%",
    right: "2%",
    zIndex: 1000,
  },
  shadowWrapper: {
    shadowColor: "#5647f5",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 30,
    borderRadius: 50,
  },
  borderContainer: {
    padding: 2,
    borderRadius: 50,
  },
  mainGradient: {
    borderRadius: 49,
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  tabsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    marginTop: 5,
    fontFamily: "Proxima",
    fontSize: 13,
  },
});
