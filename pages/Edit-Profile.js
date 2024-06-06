import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { Ionicons } from '@expo/vector-icons';

const EditProfile = () => {
  const navigation = useNavigation();
  const [aadharNumber, setAadharNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAadharInputChange = (text) => {
    const formattedText = text.replace(/\D/g, "");
    if (formattedText.length <= 12) {
      setAadharNumber(formattedText);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const source = { uri: response.assets[0].uri };
        setSelectedImage(source.uri);
      }
    });
  };

  const saveContent = () => {
    console.log("Content to be saved:", aadharNumber);
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
          onPress={() => navigation.navigate("Become")}
          style={styles.iconButton}
        >
          <Icon name="edit" size={30} color="#007bff" />
        </TouchableOpacity>

        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Set Up your Profile</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.imageUploadContainer}>
            <TouchableOpacity
              onPress={handleImageUpload}
              style={styles.imageUploadLabel}
            >
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
              ) : (
                <Icon name="camera" size={50} color="#aaa" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Enter Your Name" />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="*********"
              secureTextEntry={true}
              maxLength={30}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} placeholder="India" />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Street/Area</Text>
            <TextInput style={styles.input} placeholder="Area" />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Aadhar Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Aadhar Number"
              keyboardType="numeric"
              value={aadharNumber}
              onChangeText={handleAadharInputChange}
              maxLength={12}
            />
          </View>
        </View>

        <TouchableOpacity onPress={saveContent} style={styles.customButton}>
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
    padding: 20,
  },
  iconButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
  },
  imageUploadContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageUploadLabel: {
    width: 100,
    height: 100,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    alignItems: "center",
  },
  customButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EditProfile;
