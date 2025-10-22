import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, View, StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";
import { BlurView } from "expo-blur";

export const Background = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ImageBackground
          source={require("../../assets/images/tabsBG.png")}
          style={styles.bgimg}
          resizeMode="cover"
        ></ImageBackground>
          <Svg width={350} height={350} style={styles.svg}>
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
              cx={350 / 2}
              cy={350 / 2}
              rx={350 / 2}
              ry={350 / 2}
              fill="url(#radial)"
            />
          </Svg>
        <Svg width={123} height={123} style={styles.svg2}>
          <Defs>
            <RadialGradient
              id="purpleGrad"
              gradientUnits="userSpaceOnUse"
              cx={123 / 2}
              cy={123 / 2}
              rx={123 / 2}
              ry={123 / 2}
              fx={123 / 2}
              fy={123 / 2}
            >
              <Stop offset="0%" stopColor="#FFE60074" stopOpacity="0.2" />
              <Stop offset="100%" stopColor="#FFE600" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Ellipse
            cx={123 / 2}
            cy={123 / 2}
            rx={120 / 2}
            ry={120 / 2}
            fill="url(#purpleGrad)"
          />
        </Svg>
      </View>
      <View style={styles.child}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "#000000ff",
    flex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  child: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  bgimg: {
    flex: 1,
    opacity: 0.1,
  },
  svg: {
    flex: 1,
    position: "absolute",
    top: -39,
    left: -163,

  },
  svg2: {
    flex: 1,
    position: "absolute",
    top: 500,
    left: 290,
  },
});
