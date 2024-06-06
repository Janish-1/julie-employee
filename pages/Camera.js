import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { BACKEND_URL } from '@env';

const Camera = () => {
  const navigation = useNavigation();
  const [videoUri, setVideoUri] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setVideoUri(result.uri);
    }
  };

  const uploadVideo = async () => {
    try {
      const formData = new FormData();
      formData.append('video', {
        uri: videoUri,
        type: 'video/mp4',
        name: 'interview.mp4',
      });

      await axios.post(`${BACKEND_URL}/api/interviews/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name="checkmark-circle-outline" size={24} color="red" />
        <Text style={{ marginLeft: 10, color: 'red' }}>Complete</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name="videocam-outline" size={24} color="black" />
        <Text style={{ marginLeft: 10, color: 'black' }}>Your Video Interview</Text>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {videoUri ? (
          <Button title="Upload Video" onPress={uploadVideo} />
        ) : (
          <Button title="Pick Video" onPress={pickVideo} />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name="clipboard-outline" size={24} color="red" />
        <Text style={{ marginLeft: 10, color: 'red' }}>Interview Instruction</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'black' }}>Brief about yourself</Text>
        <Text style={{ color: 'black' }}>Tell about yourself</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'blue' }}>Next</Text>
          <Ionicons name="arrow-forward-outline" size={24} color="blue" style={{ marginLeft: 5 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
