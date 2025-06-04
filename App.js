// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Linking, Platform, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Tab = createBottomTabNavigator();

// Blue theme colors
const colors = {
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#BBDEFB',
  accent: '#03DAC6',
  background: '#B0C1CE',
  surface: '#424A61',
  text: '#1565C0',
  textSecondary: '#64B5F6',
  textLight: '#90CAF9',
  border: '#E3F2FD',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#2f3640'
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  profileSection: {
    backgroundColor: colors.surface,
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  profileValue: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    backgroundColor: colors.surface,
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  dataCard: {
    backgroundColor: colors.surface,
    margin: 10,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

function WelcomeScreen() {
  return (
    <ImageBackground 
      source={require('./assets/background.jpg')} // Replace with your image name
      style={styles.centerContainer}
      resizeMode="cover" // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    >
      {/* Optional: Add a semi-transparent overlay for better text readability */}
      <View style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(74, 103, 73, 0.3)', // Adjust opacity as needed
      }} />
      
      <Text style={[styles.title, { color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }]}>
        Welcome to My App
      </Text>
      <View style={{ 
        width: 220, 
        height: 220, 
        borderRadius: 110, 
        backgroundColor: colors.primaryLight, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30,
        overflow: 'hidden',
      }}>
        <Image 
          source={require('./assets/profile.jpg')} 
          style={{
            width: 220,
            height: 220,
            borderRadius: 110,
          }}
          defaultSource={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' }}
        />
      </View>
      <Text style={{ 
        fontSize: 16, 
        color: 'white', // Changed to white for better visibility
        textAlign: 'center', 
        marginTop: 40,
        paddingHorizontal: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
      }}>
        Welcome to my beautiful mobile application!
      </Text>
    </ImageBackground>
  );
}

function ProfileScreen() {
  // Profile data state
  const [profile, setProfile] = useState({
    name: 'Akachukwu',
    email: 'akachukwuagbodike.@gmail.com',
    bio: 'Software developer passionate about mobile apps and user experience.',
  });

  // Edit mode states
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const startEdit = (field) => {
    setEditingField(field);
    setTempValue(profile[field]);
  };

  const saveEdit = () => {
    setProfile(prev => ({
      ...prev,
      [editingField]: tempValue
    }));
    setEditingField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 60, paddingBottom: 20 }}>
        <Image 
          source={require('./assets/profile.jpg')} 
          style={styles.profileImage}
          defaultSource={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' }}
        />
        <Text style={[styles.title, { fontSize: 24 }]}>My Profile</Text>
      </View>

      {/* Name Section */}
      <View style={styles.profileSection}>
        <Text style={styles.profileLabel}>Name</Text>
        <View style={styles.profileRow}>
          {editingField === 'name' ? (
            <>
              <TextInput
                style={styles.input}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder="Enter your name"
                autoFocus
              />
              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={cancelEdit}>
                <Text style={styles.editButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.profileValue}>{profile.name}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => startEdit('name')}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Email Section */}
      <View style={styles.profileSection}>
        <Text style={styles.profileLabel}>Email</Text>
        <View style={styles.profileRow}>
          {editingField === 'email' ? (
            <>
              <TextInput
                style={styles.input}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoFocus
              />
              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={cancelEdit}>
                <Text style={styles.editButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.profileValue}>{profile.email}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => startEdit('email')}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.profileSection}>
        <Text style={styles.profileLabel}>Bio</Text>
        <View style={styles.profileRow}>
          {editingField === 'bio' ? (
            <View style={{ flex: 1 }}>
              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder="Enter your bio"
                multiline
                numberOfLines={4}
                autoFocus
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                  <Text style={styles.editButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={cancelEdit}>
                  <Text style={styles.editButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={[styles.profileValue, { flex: 1 }]}>{profile.bio}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => startEdit('bio')}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}


function FetchDataScreen({ route }) {
  const { setData } = route.params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fake-json-api.mock.beeceptor.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setData(json);
      
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.centerContainer}>
      <Text style={[styles.title, { fontSize: 20, textAlign: 'center' }]}>
        {loading ? 'Fetching Data...' : 'Data Fetch Complete'}
      </Text>
      
      {error && (
        <Text style={{ color: '#F44336', marginBottom: 20, textAlign: 'center', fontSize: 16 }}>
          Error: {error}
        </Text>
      )}
      
      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.6 }]} 
        onPress={fetchData}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Refresh Data</Text>
      </TouchableOpacity>
    </View>
  );
}

function DisplayDataScreen({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10, fontSize: 20 }]}>
        User Data ({data.length} users)
      </Text>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
        {data.map((item, index) => (
          <View key={index} style={styles.dataCard}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 5 }}>
              Company: {item.company || 'N/A'}
            </Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary }}>
              Email: {item.email || 'N/A'}
            </Text>
            {item.name && (
              <Text style={{ fontSize: 14, color: colors.textSecondary, marginTop: 5 }}>
                Name: {item.name}
              </Text>
            )}
          </View>
        ))}
        {data.length === 0 && (
          <Text style={{ textAlign: 'center', color: colors.textSecondary, marginTop: 50, fontSize: 16 }}>
            No data available. Try fetching data first.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

function MapScreen() {
  const [location, setLocation] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
  });

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location error:', error);
          // Keep default San Francisco location
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    }
  }, []);

  // Create HTML content for full Google Maps
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { margin: 0; padding: 0; height: 100vh; }
            #map { height: 100%; width: 100%; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            function initMap() {
                const location = { lat: ${location.latitude}, lng: ${location.longitude} };
                
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 15,
                    center: location,
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: false,
                    zoomControl: true,
                    gestureHandling: 'greedy'
                });
                
                const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: "Your Location",
                    animation: google.maps.Animation.DROP,
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: "<div style='padding: 10px; font-family: Arial;'><h3 style='margin: 0 0 10px 0; color: #1976D2;'>You are here!</h3><p style='margin: 0; color: #666;'>Lat: ${location.latitude.toFixed(6)}<br>Lng: ${location.longitude.toFixed(6)}</p></div>"
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });

                // Auto-open info window
                infoWindow.open(map, marker);
            }
        </script>
        <script async defer 
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWJ86_UHLt9mppIHZuvlt6ROpQ8qnMX3I&callback=initMap">
        </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: mapHTML }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        bounces={false}
        scrollEnabled={true}
        renderLoading={() => (
          <View style={styles.centerContainer}>
            <Text style={styles.title}>Loading Google Maps...</Text>
          </View>
        )}
      />
    </View>
  );
}
export default function App() {
  const [data, setData] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{ 
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textLight,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        }}
      >
        <Tab.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{
            tabBarLabel: 'Welcome',
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
        <Tab.Screen 
          name="FetchData"
          options={{
            tabBarLabel: 'Fetch',
          }}
        >
          {() => <FetchDataScreen route={{ params: { setData } }} />}
        </Tab.Screen>
        <Tab.Screen 
          name="DisplayData"
          options={{
            tabBarLabel: 'Data',
          }}
        >
          {() => <DisplayDataScreen route={{ params: { data } }} />}
        </Tab.Screen>
        <Tab.Screen 
          name="Map" 
          component={MapScreen}
          options={{
            tabBarLabel: 'Map',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}