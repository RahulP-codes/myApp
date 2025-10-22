import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Location } from '../../components/map';
import { useVenues } from '../../hooks/query/other-query';

export default function MapsScreen() {
  const { data: Venues, isLoading, refetch } = useVenues();
  const venuedata = Venues?.data;

  console.log('Venues Response:', Venues);
  console.log('Venue Data:', venuedata);
  console.log('Is Loading:', isLoading);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#4E8FB4"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={{ height: '100%', marginBottom: 80 }}>
            <Text style={styles.title}>VENUES</Text>
            <View style={styles.content}>
              {venuedata && venuedata.length > 0 ? (
                venuedata.map((item, index) => (
                  <View key={index}>
                    <Location
                      name={item.name}
                      image={item.image}
                      latitude={item.latitude}
                      longitude={item.longitude}
                    />
                  </View>
                ))
              ) : (
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
                  {Venues ? 'No venues available' : 'Loading venues...'}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
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
    justifyContent: 'space-between',
    padding: 10,
  },
});