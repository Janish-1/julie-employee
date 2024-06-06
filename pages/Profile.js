import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from "@env";

const Profile = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [streetArea, setStreetArea] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const mobile = await AsyncStorage.getItem('mobile');
      const response = await axios.get(`${BACKEND_URL}/api/user-profile/?phone_number=${mobile}`);
      const userData = response.data;
      setName(userData.name);
      setMobileNumber(userData.phone_number);
      setAddress(userData.address);
      setStreetArea(userData.street_area);
      setAadharNumber(userData.aadhar_number);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const validateMobileNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setMobileNumber(cleaned.slice(0, 10));
  };

  const validateAadharNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    setAadharNumber(cleaned.slice(0, 12));
  };

  const handleSubmit = async () => {
    try {
      const profileData = {
        name,
        phone_number: mobileNumber,
        password,
        address,
        street_area: streetArea,
        aadhar_number: aadharNumber,
      };
      await axios.put(`${BACKEND_URL}/api/user-profile/`, profileData);
      navigation.navigate("Camera");
    } catch (error) {
      console.error("Error submitting profile data:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Image
            style={styles.backArrow}
            source={require("../assets/images/back arrow.png")}
          />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Set Up your Profile</Text>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
            ) : (
              <Text style={styles.imageUploadText}>+</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={(text) => setName(text.replace(/[^a-zA-Z\s]/g, ""))}
          />
          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNumber}
            keyboardType="numeric"
            onChangeText={validateMobileNumber}
            maxLength={10}
          />
          <Text style={styles.label}>Change Password</Text>
          <TextInput
            style={styles.input}
            placeholder="*********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="India"
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>Street/Area</Text>
          <TextInput
            style={styles.input}
            placeholder="Area"
            value={streetArea}
            onChangeText={setStreetArea}
          />
          <Text style={styles.label}>Aadhar Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Aadhar Number"
            value={aadharNumber}
            keyboardType="numeric"
            onChangeText={validateAadharNumber}
            maxLength={12}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Navigate to camera")}
          >
            <Text style={styles.buttonText}>Become an Employee</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backArrow: {
    width: 24,
    height: 24,
    marginBottom: 20,
  },
  editIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    right: 20,
    top: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageUploadText: {
    fontSize: 40,
    color: "#ccc",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Profile;
