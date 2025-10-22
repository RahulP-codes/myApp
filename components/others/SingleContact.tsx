import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { IconButton } from 'react-native-paper';

interface ISingleContactProps {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export const SingleContact = (props: ISingleContactProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: props.image }} style={styles.avatar} />
        <Text style={[styles.center, { paddingHorizontal: 10 }, styles.name]}>{props.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={[styles.center, styles.iconCircle]} onPress={() => Linking.openURL(`tel:${props.phone}`)}>
          <IconButton icon="phone" size={20} iconColor="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.center, styles.iconCircle]} onPress={() => Linking.openURL(`mailto:${props.email}`)}>
          <IconButton icon="email" size={20} iconColor="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  center: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  name: {
    fontSize: 15,
    lineHeight: 18,
    color: '#D3D3D3',
    textTransform: 'capitalize',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#413000',
  },
  iconCircle: {
    backgroundColor: '#413000',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});