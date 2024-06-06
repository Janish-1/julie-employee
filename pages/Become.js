import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { BACKEND_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Become = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    password: "",
    address: "",
    street_area: "",
    aadhar_number: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const fetchUserProfile = async () => {
    try {
      const mobile = await AsyncStorage.getItem('mobile');
      const response = await axios.get(`${BACKEND_URL}/api/user-profile/?phone_number=${mobile}`);
      const userData = response.data;
      setFormData(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  
  const handleSubmit = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/user-profile/`, formData);
      navigation.navigate("Camera");
    } catch (error) {
      console.error("Error submitting profile data:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.iconButton}
        >
          <Icon name="arrow-left" size={30} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.iconButton}
        >
          <Icon name="edit" size={30} color="#007bff" />
        </TouchableOpacity>

        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Set Up your Profile</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={formData.phone_number}
              onChangeText={(value) => handleInputChange("phone_number", value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="*********"
              secureTextEntry={true}
              maxLength={30}
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="India"
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Street/Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Area"
              value={formData.street_area}
              onChangeText={(value) => handleInputChange("street_area", value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Aadhar Number"
              keyboardType="numeric"
              maxLength={12}
              value={formData.aadhar_number}
              onChangeText={(value) => handleInputChange("aadhar_number", value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.customButton}>
          <Text style={styles.customButtonText}>Become an Employee</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  iconButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  headerWrapper: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  customButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Become;
