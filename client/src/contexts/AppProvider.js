import { AuthProvider } from './AuthContext';
import { BlogProvider } from './BlogContext';
import { SearchProvider } from './SearchContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <BlogProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </BlogProvider>
    </AuthProvider>
  );
};

export default AppProviders;
