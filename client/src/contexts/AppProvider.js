import { AuthProvider } from './AuthContext';
import { BlogProvider } from './BlogContext';
import { UserProvider } from './UserContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <BlogProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </BlogProvider>
    </AuthProvider>
  );
};

export default AppProviders;
