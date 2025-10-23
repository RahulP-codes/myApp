import React from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { mapUrl } from '../../utils/helper';

interface ILocationProps {
  name: string;
  image: string;
  latitude: string;
  longitude: string;
}

export const Location = (props: ILocationProps) => {
  const url = mapUrl(props.latitude, props.longitude);
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url as string)}>
      <View style={styles.container}>
        <Text style={styles.name}>{props.name.length > 12 ? `${props.name.slice(0, 12)}...` : props.name}</Text>
        <Image source={{ uri: props.image }} style={styles.image} resizeMode="contain" />
        <Image source={require('../../assets/images/directionYellow.png')} style={styles.icon} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1.13,
    width: (Dimensions.get('window').width - 80) / 2,
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
    borderWidth: 0.5,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.1)',
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 25,
    padding: 20,
    paddingBottom: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: 125,
    flex: 1,
    width: 100,
    position: 'absolute',
    bottom: -13,
    left: 10,
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  name: {
    zIndex: 100,
    fontFamily: 'Proxima',
    fontSize: 18,
    color: '#fff',
  },
});
