import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Title,
  Text,
  Button,
  Divider,
  ActivityIndicator,
  Menu,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const AttendanceScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [selectedUserType, setSelectedUserType] = useState('student');
  const [selectedGrade, setSelectedGrade] = useState('9');
  const [showUserTypeMenu, setShowUserTypeMenu] = useState(false);
  const [showGradeMenu, setShowGradeMenu] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  // Grade options for each user type
  const gradesByUserType = {
    student: ['9', '10', '11', '12'],
    teacher: ['9', '10', '11', '12'],
    admin: ['All Grades'],
  };

  useEffect(() => {
    // Get user data and attendance data from navigation params
    console.log('useEffect: Route params received:', route.params);
    if (route.params?.userData) {
      console.log('useEffect: Setting user data:', route.params.userData);
      setUser(route.params.userData);
      
      // Set initial user type based on logged-in user's type
      if (route.params.userData.userType === 'student') {
        setSelectedUserType('student');
        setSelectedGrade('9');
      } else if (route.params.userData.userType === 'teacher') {
        setSelectedUserType('teacher');
        setSelectedGrade('9');
      } else if (route.params.userData.userType === 'admin') {
        setSelectedUserType('admin');
        setSelectedGrade('All Grades');
      }

      // Use attendance data if available
      if (route.params?.attendanceData) {
        console.log('useEffect: Setting attendance data:', route.params.attendanceData);
        console.log('useEffect: Attendance data type:', typeof route.params.attendanceData);
        console.log('useEffect: Attendance data is array:', Array.isArray(route.params.attendanceData));
        
        // Validate that attendanceData is an array
        if (Array.isArray(route.params.attendanceData)) {
          console.log('useEffect: Attendance data is valid array, length:', route.params.attendanceData.length);
          setAttendanceData(route.params.attendanceData);
          setUsers(route.params.attendanceData);
        } else {
          console.warn('useEffect: Attendance data is not an array, received type:', typeof route.params.attendanceData);
          console.warn('useEffect: Attendance data value:', route.params.attendanceData);
          // If it's an object, try wrapping it in an array
          if (typeof route.params.attendanceData === 'object' && route.params.attendanceData !== null) {
            const dataArray = Array.isArray(route.params.attendanceData) ? route.params.attendanceData : [route.params.attendanceData];
            setAttendanceData(dataArray);
            setUsers(dataArray);
          }
        }
      } else {
        console.log('useEffect: No attendance data found in route params');
        console.log('useEffect: route.params:', route.params);
      }
    }
  }, [route.params]);

  // Check if user is authorized to view filters (teacher or admin)
  const canViewFilters = user && (user.userType === 'teacher' || user.userType === 'admin');
  
  // For students, they can only view their own record
  const isStudent = user && user.userType === 'student';

  const handleUserTypeSelect = (userType) => {
    console.log('handleUserTypeSelect called with:', userType);
    setSelectedUserType(userType);
    setShowUserTypeMenu(false);
    // Reset grade when user type changes
    const grades = gradesByUserType[userType];
    console.log('handleUserTypeSelect: Resetting grade to:', grades[0]);
    setSelectedGrade(grades[0]);
  };

  const fetchUsers = async () => {
    console.log('fetchUsers called with userType:', selectedUserType, 'grade:', selectedGrade);
    setLoading(true);
    try {
      console.log('fetchUsers: Making API request to localhost:5000/api/attendance');
      const response = await axios.get('http://localhost:5000/api/attendance', {
        userType: selectedUserType
      });

      if (response.status === 200) {
        console.log('fetchUsers: API response received:', response.data);
        // Extract the data array from the response object
        const attendanceArray = response.data.data || [];
        console.log('fetchUsers: Extracted attendance array:', attendanceArray);
        console.log('fetchUsers: Array length:', attendanceArray.length);
        setUsers(attendanceArray);
      } else {
        console.error('fetchUsers: Failed with status:', response.status);
        Alert.alert('Error', 'Failed to fetch users');
      }
    } catch (error) {
      console.error('fetchUsers: Error fetching users:', error);
      // Mock data for demonstration
      console.log('fetchUsers: Using mock data');
      setUsers([
        {
          userid: '1001',
          username: 'john_doe',
          email: 'john@example.com',
          phonenum: '9876543210',
        },
        {
          userid: '1002',
          username: 'jane_smith',
          email: 'jane@example.com',
          phonenum: '9876543211',
        },
        {
          userid: '1003',
          username: 'alex_johnson',
          email: 'alex@example.com',
          phonenum: '9876543212',
        },
        {
          userid: '1004',
          username: 'sarah_williams',
          email: 'sarah@example.com',
          phonenum: '9876543213',
        },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('useEffect (fetchUsers trigger): canViewFilters:', canViewFilters, 'attendanceData.length:', attendanceData?.length);
    if (canViewFilters && attendanceData.length === 0) {
      console.log('useEffect: Calling fetchUsers');
      fetchUsers();
    }
  }, [selectedUserType, selectedGrade, canViewFilters, attendanceData]);

  const handleViewUser = (userItem) => {
    console.log('handleViewUser called with:', userItem);
    const username = userItem?.username || 'Unknown User';
    const userid = userItem?.userid || 'N/A';
    Alert.alert('User Details', `Viewing user: ${username}\nID: ${userid}`);
  };

  const renderUserRow = ({ item }) => {
    console.log('renderUserRow: Rendering item:', item);
    return (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.username || 'N/A'}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.cellText}>{item.userType || 'N/A'}</Text>
      </View>
      <View style={styles.tableCellAction}>
        <TouchableOpacity
          onPress={() => handleViewUser(item)}
          style={styles.viewButton}
        >
          <Icon name="eye" size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {isStudent ? (
            <Title>My Attendance</Title>
          ) : (
            <Title>User Management</Title>
          )}
          
          {/* Show filters only for teachers and admins */}
          {canViewFilters && (
            <View style={styles.filtersContainer}>
              {/* User Type Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>User Type</Text>
                <Menu
                  visible={showUserTypeMenu}
                  onDismiss={() => setShowUserTypeMenu(false)}
                  anchor={
                    <TouchableOpacity
                      onPress={() => setShowUserTypeMenu(true)}
                      style={styles.dropdownButton}
                    >
                      <Text style={styles.dropdownText}>{selectedUserType}</Text>
                      <Icon name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => handleUserTypeSelect('student')}
                    title="Student"
                    leadingIcon="school"
                  />
                  <Menu.Item
                    onPress={() => handleUserTypeSelect('teacher')}
                    title="Teacher"
                    leadingIcon="briefcase"
                  />
                  <Menu.Item
                    onPress={() => handleUserTypeSelect('admin')}
                    title="Admin"
                    leadingIcon="shield-account"
                  />
                </Menu>
              </View>

              {/* Grade Dropdown (Dependent on User Type) */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Grade</Text>
                <Menu
                  visible={showGradeMenu}
                  onDismiss={() => setShowGradeMenu(false)}
                  anchor={
                    <TouchableOpacity
                      onPress={() => setShowGradeMenu(true)}
                      style={styles.dropdownButton}
                    >
                      <Text style={styles.dropdownText}>{selectedGrade}</Text>
                      <Icon name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>
                  }
                >
                  {gradesByUserType[selectedUserType].map((grade) => (
                    <Menu.Item
                      key={grade}
                      onPress={() => {
                        setSelectedGrade(grade);
                        setShowGradeMenu(false);
                      }}
                      title={grade}
                  />
                ))}
              </Menu>
            </View>
          </View>
          )}

          <Divider style={styles.divider} />

          {/* Users Table */}
          <Title style={styles.tableTitle}>
            {isStudent ? 'Your Attendance' : 'Users List'}
          </Title>
          
          {loading ? (
            <ActivityIndicator
              animating={true}
              size="large"
              style={styles.loader}
            />
          ) : (
            <>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <View style={styles.tableCell}>
                  <Text style={styles.headerText}>Username</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.headerText}>UserType</Text>
                </View>
                <View style={styles.tableCellAction}>
                  <Text style={styles.headerText}>Action</Text>
                </View>
              </View>

              {/* Table Rows */}
              {users.length > 0 ? (
                <FlatList
                  data={users}
                  renderItem={renderUserRow}
                  keyExtractor={(item, index) => {
                    const key = item.userType || item.username|| index.toString();
                    console.log('keyExtractor: item:', item, 'generated key:', key);
                    return key.toString();
                  }}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.noDataContainer}>
                  <Icon name="inbox" size={48} color="#ccc" />
                  <Text style={styles.noDataText}>No users found</Text>
                </View>
              )}
            </>
          )}

          {/* Refresh Button */}
          <Button
            mode="contained"
            onPress={fetchUsers}
            style={styles.refreshButton}
            loading={loading}
          >
            Refresh
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  unauthorizedCard: {
    marginTop: 50,
    alignItems: 'center',
    padding: 20,
  },
  unauthorizedTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  unauthorizedText: {
    textAlign: 'center',
    marginVertical: 4,
    color: '#666',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 12,
  },
  dropdownContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    color: '#666',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    marginVertical: 16,
  },
  tableTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
  },
  tableCellAction: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#1976D2',
  },
  cellText: {
    fontSize: 12,
    color: '#333',
  },
  viewButton: {
    padding: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
  },
  loader: {
    marginVertical: 20,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  refreshButton: {
    marginTop: 16,
    backgroundColor: '#2196F3',
  },
});

export default AttendanceScreen;
