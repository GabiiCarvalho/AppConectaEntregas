import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext({
  user: null,
  userType: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await firestore().collection('users').doc(firebaseUser.uid).get();
        setUserType(userDoc.data()?.type || 'customer');
        setUser(firebaseUser);
      } else {
        setUser(null);
        setUserType(null);
      }
      setLoading(false);
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, userType, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// App.js
function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

// AppNavigator.js
function AppNavigator() {
  const { userType } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userType === 'customer' && <CustomerStack />}
      {userType === 'store' && <StoreStack />}
      {userType === 'rider' && <RiderStack />}
      {!userType && <AuthStack />}
    </NavigationContainer>
  );
}

export const useAuth = () => React.useContext(AuthContext);

