import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { ActivityIndicator, Button, Modal, Portal } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { useProfileStore } from '../store/profile-store';
import { useGetProfileQuery } from '../hooks/query/user-query';
import { sendRequest, accept, disconnect } from '../api/user';
import CrossSvg from '../components/svgs/cross';

export default function ConnectProfileScreen() {
  const { id } = useLocalSearchParams();
  const email = useProfileStore(state => state.email);
  const { data: ProfileData, isLoading, refetch } = useGetProfileQuery(id as string, email);
  const toast = useToast();
  const [visible, setVisible] = React.useState(false);

  const profile = ProfileData?.profile;
  const persontype = profile?.persontype;

  const handleConnect = async () => {
    try {
      const data = await sendRequest(email, profile?.id);
      if (data.success) {
        toast.show('Connection Request Sent!', { type: 'success' });
        refetch();
      } else {
        toast.show('Some error occurred. Try Later', { type: 'danger' });
      }
    } catch (error) {
      toast.show('Some error occurred. Try Later', { type: 'danger' });
    }
  };

  const handleAccept = async () => {
    try {
      const data = await accept(id as string, email);
      if (data.success) {
        toast.show('Success!', { type: 'success' });
        refetch();
      } else {
        toast.show('Some error occurred. Try Later', { type: 'danger' });
      }
    } catch (error) {
      toast.show('Some error occurred. Try Later', { type: 'danger' });
    }
  };

  const handleDisconnect = async () => {
    try {
      const data = await disconnect(profile?.id);
      if (data.success) {
        toast.show('Disconnected!', { type: 'success' });
        setVisible(false);
        router.back();
      } else {
        toast.show('Some error occurred. Try Later', { type: 'danger' });
      }
    } catch (error) {
      toast.show('Some error occurred. Try Later', { type: 'danger' });
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating={true} color="#FFE600" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <CrossSvg />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
          <Text style={styles.modalText}>Are you sure you want to disconnect?</Text>
          <View style={styles.modalActions}>
            <Button onPress={handleDisconnect}>
              <Text style={styles.modalButton}>Yes</Text>
            </Button>
            <Button onPress={() => setVisible(false)}>
              <Text style={styles.modalButton}>No</Text>
            </Button>
          </View>
        </Modal>
      </Portal>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.imageContainer}>
            {persontype === 'Founder' ? (
              <Image source={require('../assets/images/founder.png')} style={styles.profileImage} />
            ) : persontype === 'Mentor' ? (
              <Image source={require('../assets/images/mentor.png')} style={styles.profileImage} />
            ) : persontype === 'Professional' ? (
              <Image source={require('../assets/images/prof.png')} style={styles.profileImage} />
            ) : persontype === 'Student' ? (
              <Image source={require('../assets/images/student.png')} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/images/investor.png')} style={styles.profileImage} />
            )}
          </View>

          <View style={styles.details}>
            <Text style={styles.name}>{profile?.name || 'Field is empty'}</Text>
            <Text style={styles.company}>{profile?.company_name || 'Field is empty'}</Text>
            <Text style={styles.persontype}>● {profile?.persontype || 'Field is empty'}</Text>

            <View style={styles.actions}>
              {ProfileData?.isconnected ? (
                <>
                  <Button style={styles.disconnectButton} onPress={() => setVisible(true)}>
                    <Text style={styles.buttonText}>Disconnect</Text>
                  </Button>
                  <Button style={styles.messageButton} onPress={() => Linking.openURL('https://wa.me/91' + String(profile?.contact))}>
                    <Text style={styles.buttonText}>Message</Text>
                  </Button>
                </>
              ) : ProfileData?.status ? (
                ProfileData?.isreceived ? (
                  <Button style={styles.connectButton} onPress={handleAccept}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </Button>
                ) : (
                  <Button style={styles.requestedButton} disabled={true}>
                    <Text style={styles.buttonText}>Request Sent!</Text>
                  </Button>
                )
              ) : (
                <Button style={styles.connectButton} onPress={handleConnect}>
                  <Text style={styles.buttonText}>Connect</Text>
                </Button>
              )}
            </View>
          </View>

          {/* Profile Details based on person type */}
          {persontype === 'Student' && (
            <>
              <Text style={styles.heading}>Skills</Text>
              <Text style={styles.para}>{profile?.skills || 'No skills listed'}</Text>
              <Text style={styles.heading}>Achievements</Text>
              <Text style={styles.para}>{profile?.achievements || 'No achievements listed'}</Text>
            </>
          )}

          {persontype === 'Founder' && (
            <>
              <Text style={styles.heading}>Sector</Text>
              <Text style={styles.para}>{profile?.sector || 'No sector listed'}</Text>
              <Text style={styles.heading}>Stage</Text>
              <Text style={styles.para}>{profile?.stage || 'No stage listed'}</Text>
              <Text style={styles.heading}>Description</Text>
              <Text style={styles.para}>{profile?.description || 'No description'}</Text>
              <Text style={styles.heading}>Achievements</Text>
              <Text style={styles.para}>{profile?.achievements || 'No achievements listed'}</Text>
            </>
          )}

          {persontype === 'Investor' && (
            <>
              <Text style={styles.heading}>Sector</Text>
              <Text style={styles.para}>{profile?.sector || 'No sector listed'}</Text>
              <Text style={styles.heading}>Designation</Text>
              <Text style={styles.para}>{profile?.designation || 'No designation listed'}</Text>
              <Text style={styles.heading}>Portfolio</Text>
              <Text style={styles.para}>{profile?.portfolio || 'No portfolio listed'}</Text>
              <Text style={styles.heading}>Description</Text>
              <Text style={styles.para}>{profile?.description || 'No description'}</Text>
            </>
          )}

          {persontype === 'Mentor' && (
            <>
              <Text style={styles.heading}>Sector</Text>
              <Text style={styles.para}>{profile?.sector || 'No sector listed'}</Text>
              <Text style={styles.heading}>Designation</Text>
              <Text style={styles.para}>{profile?.designation || 'No designation listed'}</Text>
              <Text style={styles.heading}>Achievements</Text>
              <Text style={styles.para}>{profile?.achievements || 'No achievements listed'}</Text>
            </>
          )}

          {persontype === 'Professional' && (
            <>
              <Text style={styles.heading}>Designation</Text>
              <Text style={styles.para}>{profile?.designation || 'No designation listed'}</Text>
              <Text style={styles.heading}>Skills</Text>
              <Text style={styles.para}>{profile?.skills || 'No skills listed'}</Text>
              <Text style={styles.heading}>Achievements</Text>
              <Text style={styles.para}>{profile?.achievements || 'No achievements listed'}</Text>
            </>
          )}

          <Text style={styles.heading}>Interests</Text>
          <View style={styles.interestsContainer}>
            {profile?.interests?.length === 0 ? (
              <Text style={styles.para}>No Interests</Text>
            ) : (
              profile?.interests?.map((item: any, index: number) => (
                <Text key={index} style={styles.interestTag}>
                  {item.viewValue}
                </Text>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
  },
  details: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    color: '#ffffff',
    fontFamily: 'ProximaBold',
    fontSize: 24,
    margin: 5,
  },
  company: {
    color: '#ffffff',
    fontFamily: 'Proxima',
    fontSize: 16,
    margin: 5,
  },
  persontype: {
    color: '#FFE600',
    fontSize: 14,
    marginBottom: 20,
  },
  actions: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  connectButton: {
    margin: 5,
    borderWidth: 2,
    borderColor: '#FFE600',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  disconnectButton: {
    margin: 5,
    borderWidth: 2,
    borderColor: '#FF4444',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  messageButton: {
    margin: 5,
    borderWidth: 2,
    backgroundColor: '#FFE600',
    borderColor: '#FFE600',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  requestedButton: {
    margin: 5,
    borderWidth: 2,
    borderColor: '#666666',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'Proxima',
    color: '#ffffff',
    fontSize: 12,
  },
  heading: {
    fontFamily: 'ProximaBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  para: {
    fontSize: 14,
    fontFamily: 'Proxima',
    borderRadius: 10,
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
    padding: 15,
    marginBottom: 10,
    color: '#ffffff',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#FFE600',
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
    color: '#000000',
    fontFamily: 'Proxima',
    padding: 8,
    fontSize: 12,
  },
  modal: {
    backgroundColor: '#1F2122',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    width: '90%',
  },
  modalText: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
  },
});