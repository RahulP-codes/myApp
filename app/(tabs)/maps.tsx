import React from 'react';
import { ActivityIndicator, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Location } from '../../components/map';
import { useVenues } from '../../hooks/query/other-query';

export default function MapsScreen() {
  const { data: Venues, isLoading, refetch } = useVenues();
  const venuedata = Venues?.data;
  
  console.log('Venues:', Venues);
  console.log('venuedata:', venuedata);

  return (
    <ImageBackground source={require('../../assets/images/mapsBg.png')} style={StyleSheet.absoluteFill} resizeMode="cover">
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
          {isLoading ? (
            <ActivityIndicator animating={true} color="#4E8FB4" size="large" style={{ marginTop: 20 }} />
          ) : (
            <View style={{ marginBottom: 80 }}>
              <Text style={styles.title}>VENUES</Text>
              <View style={styles.content}>
                {venuedata?.map((item, index) => (
                  <View key={index}>
                    <Location name={item.name} image={item.image} latitude={item.latitude} longitude={item.longitude} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'ProximaExtraBold',
    fontSize: 36,
    color: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});