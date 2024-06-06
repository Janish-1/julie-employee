import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
          <Image source={require('../assets/images/back arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Notifications</Text>
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.label}>Today 11:10AM</Text>
        <View style={styles.task}>
          <Image source={require('../assets/images/taskcreated.png')} style={styles.icon} />
          <View>
            <Text style={styles.title}>Task Created</Text>
            <Text style={styles.description}>Asad Qureshi created a new task due on 02/01/2023 5:03pm.</Text>
          </View>
        </View>
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.label}>Yesterday 10:03AM</Text>
        <View style={styles.reminder}>
          <Image source={require('../assets/images/vector1.png')} style={styles.icon} />
          <View>
            <Text style={styles.title}>Reminder</Text>
            <Text style={styles.description}>Your task is due in next 3 hours. Heads up and complete your task.</Text>
          </View>
        </View>
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.label}>12Nov 2:25PM</Text>
        <View style={styles.task}>
          <Image source={require('../assets/images/vector1.png')} style={styles.icon} />
          <View>
            <Text style={styles.title}>Task Created</Text>
            <Text style={styles.description}>Asad Qureshi created a new task due on 02/01/2023 5:03pm.</Text>
          </View>
        </View>
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.label}>12Nov 2:25PM</Text>
        <View style={styles.reminder}>
          <Image source={require('../assets/images/taskcreated.png')} style={styles.icon} />
          <View>
            <Text style={styles.title}>Reminder</Text>
            <Text style={styles.description}>Your task is due in next 3 hours. Heads up and complete your task.</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomItem} onPress={() => navigation.navigate("Dashboard")}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.bottomItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem} onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.bottomItemText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.bottomItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem}>
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text style={styles.bottomItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem}>
            <Ionicons name="exit-outline" size={24} color="black" />
            <Text style={styles.bottomItemText}>Logout</Text>
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
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
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

export default NotificationScreen;
