import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, DrawerLayoutAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const navigation = useNavigation();

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      drawerRef.current.closeDrawer();
    } else {
      drawerRef.current.openDrawer();
    }
    setIsDrawerOpen(prevState => !prevState);
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      drawerBackgroundColor="#f0f0f0"
      renderNavigationView={() => (
        <View style={styles.drawer}>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Dashboard")}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("LeavePage")}>
            <Ionicons name="bookmark-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Salary")}>
            <Ionicons name="wallet-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Salary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("TaskDetails")}>
            <Ionicons name="list-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Task Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Progress")}>
            <Ionicons name="stats-chart-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.drawerItem, { color: 'red' }]} onPress={() => console.log("Logout Pressed")}>
            <Ionicons name="exit-outline" size={24} color="black" />
            <Text style={styles.drawerItemText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.hamburgerIcon} onPress={toggleDrawer}>
          <Ionicons name={isDrawerOpen ? 'close' : 'menu'} size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.mainContent}>
          <View style={styles.header}>
            <View style={styles.logo}>
              <Image
                source={require("../assets/images/profile-2user.png")}
                style={styles.logoImage}
              />
            </View>
          </View>

          <Text style={styles.contentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac ante risus. In eget eros at dui lacinia accumsan. 
            Fusce vitae odio quis nunc rutrum tincidunt. Integer luctus ultricies arcu, nec posuere leo consectetur in. 
            Vivamus volutpat ut justo non viverra. Donec ut lectus libero. Duis vestibulum metus sed neque ultrices, eget mattis tortor viverra. 
            In hac habitasse platea dictumst. Nulla efficitur ipsum in iaculis ultricies. Nullam vel diam at tellus laoreet rhoncus. 
            Sed non condimentum leo. Fusce eu mi lacus.
          </Text>
        </View>

        {/* Bottom bar */}
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
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  drawerItem: {
    marginBottom: 10,
    fontSize: 18,
  },
  drawerItemText: {
    fontSize: 20,
  },
  hamburgerIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  logo: {
    alignItems: "center",
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  contentText: {
    fontSize: 18,
    textAlign: "justify",
    color: '#333333',
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
  },
  bottomItemText: {
    fontSize: 12,
    marginTop: 5,
    color: '#333333',
  }
});

export default Dashboard;
