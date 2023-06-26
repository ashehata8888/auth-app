import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { userPool } from './auth';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = userPool.getCurrentUser() !== null;

    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login page if not logged in
    }
  }, []);

  return <>{children}</>;
};

export default AuthRoute;
