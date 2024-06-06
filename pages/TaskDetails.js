import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const TaskDetails = () => {
  const handleCallPress = () => {
    // Implement call functionality
  };

  const handleNavigatePress = () => {
    // Implement navigate functionality
  };

  const handleSharePress = () => {
    // Implement share functionality
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text>Initiated</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Start Date and Time</Text>
          <Text>03/10/2023 3:10AM</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Site Address</Text>
          <Text>14155 Sullyfield Circle, Suite H, Chantilly, VA 20151</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Project Name</Text>
          <Text>14155 Sullyfield Circle, Suite H, Chantilly, VA 20151</Text>
        </View>
        <View style={[styles.detailItem, styles.contactItem]}>
          <View style={styles.contactContainer}>
            <Text style={styles.detailLabel}>Site Contact</Text>
            <Text>+92306367225</Text>
          </View>
          <TouchableOpacity onPress={handleCallPress}>
            <Image source={require('../assets/images/call.png')} style={styles.callIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleNavigatePress}>
          <Text style={styles.navigationText}>Navigate to map</Text>
        </TouchableOpacity>
      </View>

      {/* Share button */}
      <TouchableOpacity onPress={handleSharePress} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Left for Work</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 20,
  },
  content: {
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    color: 'gray',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactContainer: {
    flex: 1,
  },
  callIcon: {
    width: 20,
    height: 20,
  },
  navigationText: {
    color: 'blue',
  },
  shareButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
  },
};

export default TaskDetails;
