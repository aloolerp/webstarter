import { useEffect } from 'react';
import { useContext } from 'react';
import { FrappeContext } from 'frappe-react-sdk';

interface LoginProps {
  usernameOrEmail: string;
  password: string;
}

const AutoLogin: React.FC<LoginProps> = ({ usernameOrEmail, password }) => {
  const { call } = useContext(FrappeContext);

  useEffect(() => {
    const loginUser = async () => {
      try {
        // Call the correct endpoint for login
        const response = await call.post('frappe.auth.login', {
          usr: usernameOrEmail,
          pwd: password,
        });

        if (response.message) {
          // Handle successful login
          console.log("Login successful:", response.message);
          // Optionally prompt user to set a new password
        } else {
          // Handle login failure
          console.error('Login failed:', response);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    // Only attempt login if both username and password are provided
    if (usernameOrEmail && password) {
      loginUser();
    }
  }, [usernameOrEmail, password, call]);

  return null; // You can customize this component further if needed
};

export default AutoLogin;
