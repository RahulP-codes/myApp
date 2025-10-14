import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import { router } from 'expo-router';
import { Button } from '.';
import { useVerifyOtpMutation } from '../../hooks/mutation/user-action-mutation';
import { useProfileStore } from '../../store/profile-store';

interface OtpBoxProps {
  length: number;
  handleResend: any;
}

export const OtpBox = (props: OtpBoxProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: props.length });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const setProfile = useProfileStore((state) => state.setProfile);
  const toast = useToast();
  const { mutateAsync: verifyOtpData } = useVerifyOtpMutation();
  const email = useProfileStore((state) => state.email);

  const [isValid, setValid] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
     clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    console.log('handleVerify called'); // Debug log
    setButtonDisabled(true); // Disable the button
    setTimer(15); // Start the 15-second timer

    try {
      await verifyOtpData({ email, value }).then(async (res) => {
        console.log('Response received:', res); // Debug log

        if (!res.success) {
          console.log('Verification failed:', res.data.error);
          toast.show(res.data.error, { type: 'danger' });
        } else {
          console.log('Verification succeeded:', res.data);
          await AsyncStorage.setItem('Esummit24email', email);
          // console.log('Email stored in AsyncStorage:', email);

          if (res.data.isGuest) {
            setProfile({
              email: email,
              image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
              name: 'Guest User',
              pass: 'Not Purchased',
              isSignedIn: true,
              isGuest: true,
            });
            toast.show('Signed In as a guest user!', { type: 'success' });
            router.replace('/(tabs)');
          } else {
            let summitPassLevel;
            switch (res.data.user.summit_pass) {
              case 'lvl1':
                summitPassLevel = 'Silver';
                break;
              case 'lvl2':
                summitPassLevel = 'Gold';
                break;
              case 'lvl3':
                summitPassLevel = 'Platinum';
                break;
              default:
                summitPassLevel = 'Unknown';
            }

            if (res.data.user.isadmin) {
              console.log('Admin user detected');
              setProfile({
                email: res.data.user.email,
                image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
                name: `${res.data.user.firstName} ${res.data.user.lastName}`,
                pass: summitPassLevel,
                isSignedIn: true,
                isAdmin: true,
              });
              toast.show('Signed In as Admin', { type: 'success' });
            } else {
              setProfile({
                email: res.data.user.email,
                image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
                name: `${res.data.user.firstName} ${res.data.user.lastName}`,
                pass: summitPassLevel,
                isSignedIn: true,
              });
              toast.show('OTP verified successfully', { type: 'success' });
            }

            router.replace('/(tabs)');
          }
        }
      });
    } catch (error) {
      console.error('Error in handleVerify:', error);
    } finally {
      // Re-enable the button after 15 seconds
      setTimeout(() => {
        setButtonDisabled(false);
      }, 15000);
    }
  };

  const handleTextChange = (text) => {
    if (text.length === props.length) {
      setValid(true);
    } else {
      setValid(false);
    }
    setValue(text);
  };

  return (
    <>
      <View style={styles.container}>
        <CodeField
          ref={ref}
          value={value}
          onChangeText={handleTextChange}
          cellCount={props.length}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View>
        <TouchableOpacity onPress={props.handleResend}>
          <Text style={styles.resend}>Resend OTP</Text>
        </TouchableOpacity>
        <Button
          title={timer > 0 ? `Wait ${timer}s` : 'Verify and Continue'}
          isDisabled={!isValid || isButtonDisabled}
          onPress={handleVerify}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    backgroundColor: '#1F2122',
    width: 54,
    height: 71,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 30,
    lineHeight: 37,
    color: '#FFFFFF',
    marginHorizontal: 17,
    paddingTop: 15,
  },
  resend: {
    fontSize: 15,
    lineHeight: 18,
    color: '#4E8FB4',
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 10,
  },
});
