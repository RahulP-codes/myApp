import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { Button } from '../components/form';
import { useProfileStore } from '../store/profile-store';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EditProfileScreen() {
  const email = useProfileStore(state => state.email);
  const toast = useToast();

  const [selectedSchool, setSelectedSchool] = useState('');
  const [achievements, setAchievements] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = () => {
    toast.show('Profile Updated', { type: 'success' });
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#000000' }}>
        <View style={styles.header}>
          <View style={styles.headcont}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="close" size={30} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.innerheadcont}>
              <Image source={require('../assets/images/esummitLogo.png')} style={{ width: 150, height: 45 }} resizeMode="contain" />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerx}>
          <View style={styles.section}>
            <Text style={styles.label}>College/School Name</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 10 }}>
              <TextInput style={styles.input} value={selectedSchool} onChangeText={setSelectedSchool} />
            </View>

            <Text style={styles.label}>Your Achievement:</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
              <TextInput multiline={true} numberOfLines={10} style={[styles.input, styles.multilineInput]} value={achievements} onChangeText={setAchievements} textAlignVertical="top" />
            </View>

            <Text style={styles.label}>Your Skills:</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
              <TextInput multiline={true} numberOfLines={10} style={[styles.input, styles.multilineInput]} value={skills} onChangeText={setSkills} textAlignVertical="top" />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#05020E',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingBottom: 25,
    width: '100%',
  },
  headcont: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  innerheadcont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    width: '100%',
    marginRight: 10,
  },
  containerx: {
    height: '100%',
    marginBottom: 100,
  },
  section: {
    padding: 20,
  },
  label: {
    color: '#fff',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.02)',
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 2,
    padding: 10,
    width: '100%',
  },
  multilineInput: {
    minHeight: 120,
  },
});
