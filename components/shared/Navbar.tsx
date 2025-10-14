import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, usePathname } from 'expo-router';
import CrossSvg from '../svgs/cross';
import { useProfileStore } from '../../store/profile-store';
import { getRelativeCoords } from 'react-native-reanimated';

export const Navbar = () => {
  const pathname = usePathname();
  const name = useProfileStore(state => state.name);

  const handleClick = () => {
    if (pathname === '/profile') {
      router.back();
    } else {
      router.push('/profile');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#000000' }}>
      <ImageBackground
        source={require('../../assets/images/building.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.header}>
          <View style={styles.headcont}>
            <TouchableOpacity onPress={handleClick}>
              {pathname === '/profile' ? (
                <View style={{ width: 40 }}>
                  <CrossSvg />
                </View>
              ) : (
                <View style={styles.profileIcon}>
                  <TouchableOpacity onPress={() => router.push('/profile')}>
                    <Text style={styles.profileiconText}>{name?.[0] || 'U'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.innerheadcont}>
              <Image
                source={require('../../assets/images/esummitlogo.png')}
                style={[{ width: 150, height: 45 }]}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
  },
  backgroundImageStyle: {
    top: 50,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingBottom: 25,
    width: '100%'
  },
  headcont: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    // backgroundColor: "#05020E",
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  innerheadcont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    // backgroundColor: "#05020E",
    width: '100%',
    marginRight: 10,
  },
  profileIcon: {
    borderRadius: 50,
    backgroundColor: '#7C3AED',
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
});
