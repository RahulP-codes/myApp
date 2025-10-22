import { ReactNode } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

export const Background = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.container}>
      <Svg width={500} height={500} style={styles.svg}>
        <Defs>
          <RadialGradient
            id="radial"
            gradientUnits="userSpaceOnUse"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor="#FFE600" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#FFE600" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fill="url(#radial)"
        />
      </Svg>
      <View style={styles.child}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#000000ff",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  svg: {
    flex: 1,
    position: "absolute",
    top: -35,
    alignSelf: "center",
  },
  child: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});
