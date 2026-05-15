import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile } from '../utils/apiClient';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile once on app mount — runs regardless of which route
  // is loaded first, so Navbar and HeroSection always have user data.
  useEffect(() => {
    fetchUserProfile()
      .then((data) => { if (data) setUser(data); })
      .catch((err) => console.error('Failed to load user profile:', err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
