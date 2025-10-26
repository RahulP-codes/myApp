import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { useProfileStore } from '../../store/profile-store';
import { sendRequest, accept } from '../../api/user';

interface IConnectBoxProps {
  id: string;
  url: string;
  name: string;
  company_name: string;
  persontype: string;
  btnText: string;
  description: string;
  navigation: any;
}

export const ConnectCard = (props: IConnectBoxProps) => {
  const toast = useToast();
  const email = useProfileStore(state => state.email);

  const handleSubmit = async () => {
    const id = props.id;
    if (props.btnText === 'Connect') {
      try {
        const data = await sendRequest(email, id);
        if (data.success) {
          toast.show('Connection Request Sent!', { type: 'success' });
        } else {
          toast.show('Some error occurred. Try Later', { type: 'danger' });
        }
      } catch (error) {
        toast.show('Some error occurred. Try Later', { type: 'danger' });
      }
    } else if (props.btnText === 'Accept') {
      try {
        const data = await accept(id, email);
        if (data.success) {
          toast.show('Success!', { type: 'success' });
        } else {
          toast.show('Some error occurred. Try Later', { type: 'danger' });
        }
      } catch (error) {
        toast.show('Some error occurred. Try Later', { type: 'danger' });
      }
    } else if (props.btnText === 'Know more') {
      props.navigation.navigate('SingleConnect', { id: props.id });
    }
  };

  // pick image based on type
  const getImage = () => {
    switch (props.persontype) {
      case 'Founder':
        return require('../../assets/images/founder.png');
      case 'Mentor':
        return require('../../assets/images/mentor.png');
      case 'Professional':
        return require('../../assets/images/prof.png');
      case 'Student':
        return require('../../assets/images/student.png');
      default:
        return require('../../assets/images/investor.png');
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('SingleConnect', { id: props.id })
      }>
      <View style={styles.card}>
        {/* LEFT: Avatar with Glow */}
        <View style={styles.avatarContainer}>
          <View style={styles.glowCircle}>
            <Image source={getImage()} style={styles.avatar} />
          </View>
        </View>

        {/* RIGHT: Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.nameText}>
            {props.name ? props.name : 'Field is empty'}
          </Text>

          <Text numberOfLines={1} style={styles.instituteText}>
            {props.company_name ? props.company_name : 'Field is empty'}
          </Text>

          <Text style={styles.typeText}>
            {'● '}
            {props.persontype ? props.persontype : 'Field is empty'}
          </Text>

          <TouchableOpacity
            style={{ width: '60%', alignSelf: 'flex-start' }}
            disabled={props.btnText === 'Requested'}>
            <Button
              style={styles.button}
              onPress={handleSubmit}
              disabled={props.btnText === 'Requested'}>
              <Text style={styles.buttonText}>{props.btnText}</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginVertical: 10,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  glowCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 230, 0, 0.15)', // soft yellow glow
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFE600',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  instituteText: {
    fontFamily: 'Poppins-Regular',
    color: '#C4C4C4',
    fontSize: 14,
    marginBottom: 3,
  },
  typeText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFE600',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FFE600',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 190,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ab9e9eff',
  },
});

export default ConnectCard;
