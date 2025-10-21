import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useProfileStore } from '../../store/profile-store';

export default function NetworkScreen() {
  const name = useProfileStore(state => state.name);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headcont}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <View style={styles.profileIcon}>
                <Text style={styles.profileiconText}>{name?.[0] || 'U'}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: '60%' }}>
              <TextInput
                style={styles.input}
                selectionColor="#ffffff"
                placeholder="Search"
                placeholderTextColor="white"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <View>
              <Button style={styles.connectbutton} onPress={() => {}}>
                <Text style={styles.connectbtnText}>Connects</Text>
              </Button>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => {}} />}>
          {isLoading ? (
            <ActivityIndicator animating={true} color="#4E8FB4" size="large" style={{ marginTop: 20 }} />
          ) : (
            <>
              <Text style={styles.heading}>People with Similar Interests</Text>
              <View style={styles.section}>
                <Text style={styles.guestText}>You are a guest user. Sign In with registered email to access networking feature</Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '100%',
    justifyContent: 'center',
  },
  headcont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  profileIcon: {
    borderRadius: 50,
    backgroundColor: '#7C3AED',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileiconText: {
    fontFamily: 'ProximaBold',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
  connectbutton: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#382ad3',
  },
  connectbtnText: {
    color: '#ffffff',
    fontSize: 10,
    paddingHorizontal: 20,
    fontFamily: 'Proxima',
  },
  input: {
    backgroundColor: '#161616',
    color: '#FFFFFF',
    fontSize: 14,
    paddingHorizontal: 15,
    width: '100%',
    borderRadius: 20,
    height: 40,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 25,
    fontFamily: 'ProximaBold',
    marginBottom: 20,
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  guestText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'ProximaBold',
  },
});
