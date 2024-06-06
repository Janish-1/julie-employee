import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

const LeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveData, setLeaveData] = useState({
    month: new Date().toISOString().slice(0, 7), // Default to current month in format YYYY-MM
    start_date: new Date(),
    end_date: new Date(),
    reason: "",
  });
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchLeaveData();
    fetchUserProfile();
  }, []);

  const fetchLeaveData = async () => {
    setLoading(true);
    try {
      const mobileNumber = await AsyncStorage.getItem("mobile");
      const response = await axios.get(
        `${BACKEND_URL}/api/leave/?phone_number=${mobileNumber}`
      );
      if (response.data && Array.isArray(response.data.leaves)) {
        setLeaves(response.data.leaves);
      } else {
        console.error("Unexpected response format:", response.data);
        setLeaves([]); // Fallback to empty array if the response is not as expected
      }
    } catch (error) {
      console.error("Error fetching leave data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const mobileNumber = await AsyncStorage.getItem("mobile");
      const response = await axios.get(
        `${BACKEND_URL}/api/user-profile/?phone_number=${mobileNumber}`
      );
      if (response.data) {
        setUserProfile(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setLeaveData({ ...leaveData, [name]: value });
  };

  const submitLeaveRequest = async () => {
    setLoading(true);
    try {
      const mobileNumber = await AsyncStorage.getItem("mobile");
      const updatedLeavesTaken = userProfile.leaves_taken + 1;
  
      // Format start_date and end_date as "YYYY-MM-DD"
      const formattedStartDate = leaveData.start_date.toISOString().split('T')[0];
      const formattedEndDate = leaveData.end_date.toISOString().split('T')[0];
  
      const postData = {
        ...leaveData,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        phone_number: mobileNumber,
        base_salary: userProfile.base_salary,
        leaves_taken: updatedLeavesTaken,
        actual_salary: userProfile.actual_salary,
        user: userProfile.id,
      };
      console.log(postData);
      await axios.post(`${BACKEND_URL}/api/leave/`, postData);
      // After submitting, refresh leaves
      fetchLeaveData();
      // Clear form fields
      setLeaveData({
        month: new Date().toISOString().slice(0, 7),
        start_date: new Date(),
        end_date: new Date(),
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting leave request:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {/* Leave request form */}
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>Month:</Text>
          <TextInput
            style={styles.input}
            placeholder="Month"
            value={leaveData.month}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>Start Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Date"
            value={leaveData.start_date.toDateString()}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>End Date:</Text>
          <TextInput
            style={styles.input}
            placeholder="End Date"
            value={leaveData.end_date.toDateString()}
            editable={false}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Reason:</Text>
        {showDatePicker && (
          <DateTimePicker
            value={leaveData.start_date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleInputChange("start_date", selectedDate);
              }
            }}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={leaveData.reason}
          onChangeText={(value) => handleInputChange("reason", value)}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitLeaveRequest}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Button to show leaves in popup */}
      <TouchableOpacity
        style={styles.showLeavesButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.showLeavesButtonText}>Show Leaves</Text>
      </TouchableOpacity>

      {/* Modal to display leaves */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Render leaves */}
            {leaves.length === 0 ? (
              <Text>No leaves available</Text>
            ) : (
              leaves.map((leave, index) => (
                <View key={index} style={styles.leaveItem}>
                  <Text style={styles.leaveDate}>{new Date(leave.start_date).toDateString()}</Text>
                  <Text style={styles.leaveStatus}>{leave.status}</Text>
                </View>
              ))
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.bottomItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() => navigation.navigate("Notification")}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.bottomItemText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomItem}
          onPress={() => navigation.navigate("Profile")}
        >
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
    width: 200,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  showLeavesButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  showLeavesButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
    overflow: "scroll",
  },
  leaveItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  leaveDate: {
    fontSize: 16,
  },
  leaveStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  bottomItemText: {
    fontSize: 12,
    marginTop: 5,
    color: "#333333",
  },
  label: {
    marginBottom: 5,
    color: "#333",
  },
});

export default LeavePage;
