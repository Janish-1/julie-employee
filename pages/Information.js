import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const InformationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <View style={styles.innerTask}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../assets/images/back arrow.png')} style={styles.userImage} />
          </TouchableOpacity>
          <Text style={styles.textInner}>Full Fill The Details</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Enter Your name:</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputField} placeholder="Firstname" />
            <TextInput style={styles.inputField} placeholder="Lastname" />
          </View>
          <Text style={styles.label}>Enter Your Address:</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputField} placeholder="Area/Street Rad" />
            <TextInput style={styles.inputField} placeholder="Town/City" />
            <TextInput style={styles.inputField} placeholder="House No." />
          </View>
          <Text style={styles.label}>Enter Your Adhar Number:</Text>
          <TextInput style={styles.inputField} placeholder="4572-6571-2761" />
          <Text style={styles.label}>Enter Your Date Of Birth:</Text>
          <TextInput style={styles.inputField} placeholder="01/06/2000" />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomItem}>
          <Image source={require('../assets/images/home-2.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}>
          <Image source={require('../assets/images/note.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomItem, styles.activeItem]}>
          <Image source={require('../assets/images/profile-2user.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}>
          <Image source={require('../assets/images/order-delivery 1.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomItem}>
          <Image source={require('../assets/images/profile.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  task: {
    marginBottom: 20,
  },
  innerTask: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textInner: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {},
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeItem: {
    backgroundColor: '#eee',
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default InformationScreen;
