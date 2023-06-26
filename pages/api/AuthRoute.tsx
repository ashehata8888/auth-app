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
      router.push('/'); 
    }
  }, []);

  return <>{children}</>;
};

export default AuthRoute;
