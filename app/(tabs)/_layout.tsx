import { Tabs } from 'expo-router';
import { Image, Platform } from 'react-native';
import { Navbar } from '../../components/shared/Navbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9D9D9D',
        headerShown: true,
        header: () => <Navbar />,
        tabBarStyle: {
          backgroundColor: '#382ad5',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: insets.bottom,
          margin :'2%',
          borderRadius: 50,
        },
        tabBarLabelStyle: {
          fontFamily: 'Proxima',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/homeicon.png')}
              style={{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          title: 'Network',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/networkicon.png')}
              style={{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Maps',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/mapicon.png')}
              style={{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/moreicon.png')}
              style={{ width: 28, height: 28, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}