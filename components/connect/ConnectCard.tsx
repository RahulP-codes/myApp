import React, { useEffect, useState } from 'react';
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
import { usesendRequest, useaccept } from '../../hooks/mutation/user-action-mutation';

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
  const [connecttext, setconnecttext] = useState(props.btnText);
  const [isdisable, setdisable] = useState(false);
  
  const toast = useToast();
  const email = useProfileStore(state => state.email);
  
  const { mutateAsync: sendRequest } = usesendRequest();
  const { mutateAsync: accept } = useaccept();

  const handleSubmit = () => {
    const id = props.id;
    if (connecttext === 'Connect') {
      sendRequest({ email, id: id }).then(data => {
        if (data.success) {
          toast.show('Connection Request Sent!', { type: 'success' });
          setconnecttext('Requested');
        } else {
          toast.show('Some error occurred. Try Later', { type: 'danger' });
        }
      });
    } else if (connecttext === 'Accept') {
      accept({ id: id, email: email }).then((data) => {
        if (data.success) {
          toast.show('Success!', { type: 'success' });
          setconnecttext('Know more');
        } else {
          toast.show('Some error occurred. Try Later', { type: 'danger' });
        }
      });
    } else if (connecttext === 'Know more') {
      props.navigation.navigate('SingleConnect', { id: props.id });
    } else {
      setdisable(true);
    }
  };

  useEffect(() => {
    setconnecttext(props.btnText);
    setdisable(props.btnText === 'Requested');
  }, [props.btnText]);

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('SingleConnect', { id: props.id })}>
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.content}>
            {props.persontype === 'Founder' ? (
              <Image source={require('../../assets/images/founder.png')} />
            ) : props.persontype === 'Mentor' ? (
              <Image source={require('../../assets/images/mentor.png')} />
            ) : props.persontype === 'Professional' ? (
              <Image source={require('../../assets/images/prof.png')} />
            ) : props.persontype === 'Student' ? (
              <Image source={require('../../assets/images/student.png')} />
            ) : (
              <Image source={require('../../assets/images/investor.png')} />
            )}
          </View>

          <View style={styles.content2}>
            {props.name === null || props.name === undefined ? (
              <Text style={styles.event}>Field is empty</Text>
            ) : (
              <Text style={styles.event}>{props.name}</Text>
            )}

            {props.company_name === null || props.company_name === undefined ? (
              <Text style={styles.venue}>Field is empty</Text>
            ) : (
              <Text numberOfLines={2} style={styles.venue}>{props.company_name}</Text>
            )}

            {props.persontype === null || props.persontype === undefined ? (
              <Text style={styles.persontype}>{'●'} Field is empty</Text>
            ) : (
              <Text style={styles.persontype}>{'●'} {props.persontype}</Text>
            )}
          </View>
          
          <View>
            <TouchableOpacity style={{ width: '100%', alignSelf: 'center' }}>
              <Button style={[styles.button, { marginTop: 10 }]} onPress={handleSubmit} disabled={isdisable}>
                <Text style={styles.buttonText}>{connecttext}</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').height / 2.5,
  },
  container2: {
    width: '100%',
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
    borderRadius: 14,
    padding: 25,
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content2: {
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  event: {
    fontFamily: 'ProximaBold',
    color: '#fff',
    fontSize: 16,
  },
  venue: {
    fontFamily: 'Proxima',
    color: '#9D9D9D',
    fontSize: 12,
  },
  persontype: {
    color: '#FFE600',
    fontSize: 10,
  },
  button: {
    paddingHorizontal: 11,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#FFE600',
    color: '#000000',
    width: '100%',
  },
  buttonText: {
    fontSize: 10,
    lineHeight: 15,
    color: '#000000',
  },
});