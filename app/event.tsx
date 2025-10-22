import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FAB } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { SegmentButton } from '../components/form';
import {
  useSetReminderMutation,
  useSetTagMutation,
} from '../hooks/mutation/user-action-mutation';
import { useEventById } from '../hooks/query/events-query';
import { useGetTagsAndReminder } from '../hooks/query/user-query';
import { useProfileStore } from '../store/profile-store';
import { getTime, mapUrl } from '../utils/helper';
// import * as Notifications from 'expo-notifications';
import CrossSvg from '../components/svgs/cross';

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const { data: EventData, isLoading } = useEventById(id as string);

  const [value, setValue] = useState('');
  const [isNotified, setIsNotified] = useState(false);

  const email = useProfileStore(state => state.email);
  const name = useProfileStore(state => state.name);

  const { data: ReminderAndTagData, isLoading: ReminderAndTagLoading } =
    useGetTagsAndReminder(email, id as string);

  const handleVenueClick = async () => {
    const url = mapUrl(EventData?.data.venue.latitude, EventData?.data.venue.longitude);
    return Linking.openURL(url as string);
  };

  const { mutateAsync: setReminder } = useSetReminderMutation();
  const { mutateAsync: setTag } = useSetTagMutation();

  const toast = useToast();
  const startTime: any = EventData?.data.startTime;
  const endTime: any = EventData?.data.endTime;

  useEffect(() => {
    if (!ReminderAndTagLoading) {
      if (ReminderAndTagData?.data.tag) {
        setValue(ReminderAndTagData?.data.tag);
      }
      setIsNotified(ReminderAndTagData?.data.reminders || false);
    }
  }, [ReminderAndTagLoading]);

  const handleScheduleNotification = async () => {
    // Notification scheduling disabled for now
    console.log('Notification would be scheduled for:', EventData?.data.name);
  };

  const handleNotify = async () => {
    setReminder({ id: id as string, email: email }).then(data => {
      if (data.success) {
        handleScheduleNotification();
        if (isNotified) {
          toast.show('Notification cancelled', {
            type: 'danger',
          });
        } else {
          toast.show('We will notify 15 minutes before the event', {
            type: 'success',
          });
        }
        isNotified ? setIsNotified(false) : setIsNotified(true);
      } else {
        toast.show('Some Error has occured. Please try again later.', {
          type: 'danger',
        });
      }
    });
  };

  const handleTag = async (val: string) => {
    setTag({ id: id as string, email: email, tag: val }).then(data => {
      if (data.success) {
        // if (val !== 'not going') {
        //   handleScheduleNotification();
        // }
        toast.show('Response has been recorded', {
          type: 'success',
        });
        setValue(val);
      } else {
        if (data.isdeleted) {
          toast.show('Response Deleted', {
            type: 'danger',
          });
          setValue('');
        } else {
          toast.show('All seats are full', {
            type: 'danger',
          });
          setValue('');
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={{ width: 40 }}>
            <CrossSvg />
          </View>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/esummitLogo.png')}
            style={[{ width: 150, height: 45 }]}
            resizeMode="contain"
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color="#FFE600"
          size="large"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View style={{ height: '100%', paddingBottom: 180 }}>
            <View style={styles.imageContainer}>
              <View style={styles.imageWrapper}>
                {EventData?.data.image === null || EventData?.data.image === undefined ? (
                  <Image
                    source={require('../assets/images/profile.png')}
                    resizeMode={'contain'}
                    style={styles.eventImage}
                  />
                ) : (
                  <Image
                    source={{ uri: EventData?.data.image }}
                    resizeMode={'contain'}
                    style={styles.eventImage}
                  />
                )}
              </View>
            </View>

            <Text style={styles.name}>{EventData?.data.name}</Text>

            {value === 'reserve a seat' ? (
              <SegmentButton
                value={value}
                onValueChange={handleTag}
                buttons={['seat reserved']}
              />
            ) : (
              <SegmentButton
                value={value}
                onValueChange={handleTag}
                buttons={['reserve a seat']}
              />
            )}

            <TouchableOpacity onPress={handleVenueClick}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading2}>Venue: </Text>
                <Text style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                  {EventData?.data.venue.name}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Event On: </Text>
              {EventData?.data.day === '1' ? (
                <Text style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                  1st February
                </Text>
              ) : (
                <Text style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                  2nd February
                </Text>
              )}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Timings: </Text>
              <Text style={[styles.heading2, { fontFamily: 'Proxima' }]}>
                {getTime(startTime)} - {getTime(endTime)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>Speakers: </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.description, { fontFamily: 'Proxima' }]}>
                {EventData?.data.speakers}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.heading2}>About Session</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.description}>
                {EventData?.data.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 10,
          bottom: 20,
          backgroundColor: '#FFE600',
        }}
        icon={isNotified ? 'bell-off' : 'bell-badge'}
        label={isNotified ? 'We will notify you' : 'Notify Me'}
        onPress={handleNotify}
        color="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    width: '100%',
    marginRight: 10,
  },
  imageContainer: {
    height: 200,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    position: 'relative',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '90%',
    borderRadius: 20,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    // backgroundColor: '#161616',
  },
  name: {
    fontFamily: 'ProximaBold',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  heading2: {
    fontSize: 16,
    margin: 5,
    fontFamily: 'ProximaBold',
    color: '#FFFFFF',
    paddingVertical: 3,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    width: '100%',
    padding: 10,
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
    borderRadius: 10,
    marginBottom: 10,
  },
});