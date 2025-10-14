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
        <Image source={{ uri: props.image }} style={styles.image} resizeMode="cover" />
        <Image source={require('../../assets/images/direction.png')} style={styles.icon} resizeMode="cover" />
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
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: 117,
    aspectRatio: 1,
    bottom: 11,
    right: 18,
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  name: {
    fontFamily: 'Proxima',
    fontSize: 18,
    color: '#fff',
  },
});
