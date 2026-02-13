import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const userTypes = ['student', 'teacher', 'admin'];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username) {
      Alert.alert('Validation Error', 'Please enter username');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      Alert.alert('Validation Error', 'Please enter a valid phone number');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType,
      });

      setLoading(false);

      if (response.status == 200 || response.status == 201 || response.statusText == 'Created') {
        Alert.alert('Success', 'Registration successful! Please login.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      }
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);

      navigation.navigate('Failure', {
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      });
    }
  };

  const handleClear = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userType: 'student',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Register for MySchool App</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={formData.username}
            onChangeText={(value) => updateFormData('username', value)}
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            keyboardType="phone-pad"
            editable={!loading}
          />
        </View>

        {/* User Type Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Type</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
            disabled={loading}
          >
            <Text style={styles.dropdownText}>{formData.userType}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {userTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.dropdownItem,
                    formData.userType === type && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    updateFormData('userType', type);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      formData.userType === type && styles.dropdownItemTextActive,
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password (min 6 characters)"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.registerButton, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#007AFF',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff',
    marginTop: -8,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemActive: {
    backgroundColor: '#e8f4ff',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  dropdownItemTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF9500',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});
