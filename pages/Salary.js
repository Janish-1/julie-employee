import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '@env';

const SalaryPage = () => {
  const [salaryDetails, setSalaryDetails] = useState(null);

  useEffect(() => {
    fetchSalaryDetails();
  }, []);

  const fetchSalaryDetails = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/salary/`);
      setSalaryDetails(response.data);
    } catch (error) {
      console.error('Error fetching salary details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.leaveBalances}>
          <Text style={styles.heading}>Salary</Text>
          <View style={styles.balance}>
            <View style={styles.balanceItem}>
              <Text style={styles.label}>Total Working Days</Text>
              <Text style={styles.value}>
                {salaryDetails ? salaryDetails.total_working_days : '-'}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.label}>Total Leave</Text>
              <Text style={styles.value}>
                {salaryDetails ? salaryDetails.total_leave : '-'}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.label}>Total Half Day</Text>
              <Text style={styles.value}>
                {salaryDetails ? salaryDetails.total_half_day : '-'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.pdfButton}>
          <Text style={styles.pdfButtonText}>Get a Salary Pdf</Text>
        </TouchableOpacity>
        <View style={styles.salaryDetails}>
          <Text style={styles.detail}>
            Salary: {salaryDetails ? `${salaryDetails.actual_salary}/- Rs.` : '-'}
          </Text>
          <Text style={styles.detail}>
            Working Days: {salaryDetails ? salaryDetails.total_working_days : '-'}
          </Text>
          <Text style={styles.detail}>
            Total Leave: {salaryDetails ? salaryDetails.total_leave : '-'}
          </Text>
          <Text style={styles.detail}>Approved By: Martin Deo</Text>
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
  section: {
    padding: 20,
  },
  leaveBalances: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pdfButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  salaryDetails: {
    marginTop: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SalaryPage;
