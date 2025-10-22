import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface IProfileSectionProps {
  name: string;
  email: string;
  image: string;
}

export const ProfileSection = (props: IProfileSectionProps) => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/images/profileIcon.png')}
      style={styles.image}
    />
    <View style={styles.content}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.email}>{props.email}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    gap: 15,
  },
  image: {
    width: 154,
    height: 154,
    borderRadius: 77,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 5,
  },
  name: {
    fontSize: 24,
    fontFamily: 'ProximaBold',
    lineHeight: 24,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Proxima',
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.5,
    textTransform: 'lowercase',
  },
});
