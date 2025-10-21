import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const Footer = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={[styles.tabBarContainer]}>
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
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    width: "94%",
    bottom: "1.5%",
    left: "3%",
    right: "3%",
  },
  shadowWrapper: {
    shadowColor: "#5647f5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 30,
    borderRadius: 50,
    position: "relative",
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
