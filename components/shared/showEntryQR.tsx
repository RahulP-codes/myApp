import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

interface EntryQRProps {
  email: string;
  qrcode?: string;
  children?: React.ReactNode;
}

export const EntryQR: React.FC<EntryQRProps> = ({ 
  email, 
  qrcode, 
  children
}) => {
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const hideModal = () => setVisible(false);

  const modalStyles = {
    backgroundColor: '#000000',
    width: 300,
    alignSelf: 'center' as const,
    padding: 10,
    paddingtop: 0,
    borderRadius: 10,
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modalStyles}>
          <View>
            {qrcode ? (
              <>
                {imageLoading && <ActivityIndicator animating={true} color="#4E8FB4" size="large" style={{ marginTop: 20 }} />}
                <Image 
                  source={{ uri: qrcode }} 
                  onLoadStart={() => setImageLoading(true)}
                  onLoad={() => setImageLoading(false)}
                  style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 10 }} 
                />
              </>
            ) : (
              <View style={{ backgroundColor: 'white', alignItems: 'center', marginHorizontal: 25, paddingVertical: 30, marginTop: 10 }}>
                <QRCode value={email} size={150} />
              </View>
            )}
            <Text style={{
              fontSize: 18,
              fontFamily: 'Proxima',
              lineHeight: 22,
              color: '#FFFFFF',
              padding: 10,
              textAlign: 'center',
            }}>
              Scan this QR code at the registration desk to get your pass.
            </Text>
          </View>
        </Modal>
      </Portal>
      
      <TouchableOpacity onPress={() => setVisible(true)}>
        {children}
      </TouchableOpacity>
    </>
  );
};