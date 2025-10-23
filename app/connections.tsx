import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useProfileStore } from '../store/profile-store';
import { useGetYourConnectQuery } from '../hooks/query/user-query';
import { ConnectCard } from '../components/connect';
import CrossSvg from '../components/svgs/cross';

export default function ConnectionsScreen() {
  const email = useProfileStore(state => state.email);
  const { data: ConnectData, isLoading, refetch } = useGetYourConnectQuery(email);
  const [page, setPage] = useState('accepted');

  const accepted = ConnectData?.accepted;
  const waiting = ConnectData?.waiting;
  const received = ConnectData?.received;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <CrossSvg />
        </TouchableOpacity>
        <Text style={styles.title}>Your Connections</Text>
      </View>

      <View style={styles.tabContainer}>
        <Button
          style={[styles.tabButton, { backgroundColor: page === 'accepted' ? '#FFE600' : 'hsla(0, 0.00%, 100.00%, 0.05)' }]}
          onPress={() => setPage('accepted')}
        >
          <Text style={[styles.tabText, { color: page === 'accepted' ? '#000000' : '#ffffff' }]}>
            Connections
          </Text>
        </Button>
        <Button
          style={[styles.tabButton, { backgroundColor: page === 'sent' ? '#FFE600' : 'hsla(0, 0.00%, 100.00%, 0.05)' }]}
          onPress={() => setPage('sent')}
        >
          <Text style={[styles.tabText, { color: page === 'sent' ? '#000000' : '#ffffff' }]}>
            Sent
          </Text>
        </Button>
        <Button
          style={[styles.tabButton, { backgroundColor: page === 'received' ? '#FFE600' : 'hsla(0, 0.00%, 100.00%, 0.05)' }]}
          onPress={() => setPage('received')}
        >
          <Text style={[styles.tabText, { color: page === 'received' ? '#000000' : '#ffffff' }]}>
            Received
          </Text>
        </Button>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      >
        {isLoading ? (
          <ActivityIndicator animating={true} color="#FFE600" size="large" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.section}>
            {page === 'accepted' && accepted && accepted.map((item, index) => (
              <ConnectCard
                key={index}
                id={item.id}
                name={item.name}
                company_name={item.company_name}
                url="https://ecell.in"
                persontype={item.persontype}
                description="Connected"
                navigation={{
                  navigate: (screen: string, params: any) => console.log('Navigate to:', screen, params)
                }}
                btnText="Know more"
              />
            ))}
            
            {page === 'sent' && waiting && waiting.map((item, index) => (
              <ConnectCard
                key={index}
                id={item.id}
                name={item.name}
                company_name={item.company_name}
                url="https://ecell.in"
                persontype={item.persontype}
                description="Request sent"
                navigation={{
                  navigate: (screen: string, params: any) => console.log('Navigate to:', screen, params)
                }}
                btnText="Requested"
              />
            ))}
            
            {page === 'received' && received && received.map((item, index) => (
              <ConnectCard
                key={index}
                id={item.id}
                name={item.name}
                company_name={item.company_name}
                url="https://ecell.in"
                persontype={item.persontype}
                description="Wants to connect"
                navigation={{
                  navigate: (screen: string, params: any) => console.log('Navigate to:', screen, params)
                }}
                btnText="Accept"
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    // paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'ProximaBold',
    marginLeft: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  tabText: {
    fontFamily: 'Proxima',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
});