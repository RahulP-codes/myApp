import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { Social } from '../../constants/social';

export const Follow = () => {
  return (
    <View style={styles.content1}>
      <Text style={styles.follow}>FOLLOW US ON</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 15 }}>
        <TouchableOpacity onPress={() => Linking.openURL(Social.insta)}>
          <Image source={require('../../assets/images/insta.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.twitter)}>
          <Image source={require('../../assets/images/twitter.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.linkedin)}>
          <Image source={require('../../assets/images/linkedin.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.fb)}>
          <Image source={require('../../assets/images/fb.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(Social.yt)}>
          <Image source={require('../../assets/images/yt.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content1: {},
  follow: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 16,
    lineHeight: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  icon: {
    width: 51,
    height: 51,
  },
});
