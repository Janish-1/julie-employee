import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ProgressPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../assets/images/back arrow.png')} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.heading}>Progress</Text>
        </View>
        <View style={styles.progressText}>
          <Text style={styles.progressInfo}>
            This section contains only last 7 days Progress. Filter dates to review previous history
          </Text>
        </View>
        <View style={styles.date}>
          <View style={styles.dateInput}>
            <Text style={styles.label}>To:</Text>
            <TextInput style={styles.input} type="date" />
          </View>
          <View>
            <Image source={require('../assets/images/progress.png')} style={styles.progressArrow} />
          </View>
          <View style={styles.dateInput}>
            <Text style={styles.label}>From:</Text>
            <TextInput style={styles.input} type="date" />
          </View>
        </View>
        <View style={styles.progressContent}>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Travel Hours</Text>
            <Text style={styles.value}>52h 15m</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Work Hours</Text>
            <Text style={styles.value}>56h 10m</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Task Completed</Text>
            <Text style={styles.value}>45</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Image source={require('../assets/images/share.png')} style={styles.shareIcon} />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
        <View style={styles.bottomBar}>
          {/* Your bottom bar items here */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notification: {
    padding: 20,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
  },
  progressText: {
    marginBottom: 20,
  },
  progressInfo: {
    fontWeight: 'normal',
    color: '#888',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
  },
  label: {
    color: '#888',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  progressArrow: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  progressContent: {
    marginBottom: 20,
  },
  progressItem: {
    marginBottom: 10,
  },
  label: {
    color: '#888',
    marginBottom: 5,
  },
  value: {
    fontWeight: 'bold',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 20,
  },
  shareIcon: {
    width: 30,
    height: 25,
    marginRight: 5,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ProgressPage;
