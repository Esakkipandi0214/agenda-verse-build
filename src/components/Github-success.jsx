import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const GitHubSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract token from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('User Info:', decoded);

        // Store token and user info
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decoded));

        // Optional: Redirect to dashboard or home
        navigate('/auth'); // change this to your desired page
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [location, navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">GitHub Login Successful 🎉</h1>
      <p className="mt-2 text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
};

export default GitHubSuccess;
