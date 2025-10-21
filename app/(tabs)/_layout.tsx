import { Tabs } from "expo-router";
import { Image } from "react-native";
import { Navbar } from "../../components/layout/tabsNavbar";
import { Footer } from "../../components/layout/tabsFooter";
import { Background } from "../../components/layout/tabsBG";

const getIconStyle = (focused: boolean) => ({
  width: 30,
  height: 30,
  tintColor: "#000000",
  opacity: focused ? 1 : 0.5,
});

export default function TabLayout() {
  return (
    <Background>
      <Tabs
        tabBar={(props) => <Footer {...props} />}
        screenOptions={{
          headerShown: true,
          header: () => <Navbar />,
          sceneStyle: {
            backgroundColor: "transparent",
          },
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
    </Background>
  );
}
