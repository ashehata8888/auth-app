import { useRouter } from 'next/router';
import { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const LoginPage = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userPoolId = 'us-east-1_HStj7aHOo';
  const clientId = '6osm3nuddqcie89nv0uc1b8t09';

  const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId,
  };

  const userPool = new CognitoUserPool(poolData);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          handleRedirect('/home');
        },
        onFailure: (error) => {
          console.log('signin error:', error);
        },
      });
    } catch (error) {
      console.log('signin error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f5f5f5', flexDirection: 'column' }}>
      <form
        onSubmit={handleSignIn}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', background: 'white' }}
      >
        <h1>Log In</h1>
        <br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', marginBottom: '10px', width: '300px', marginRight: '20px', marginLeft: '20px' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>

      <button onClick={() => handleRedirect('/registration')}>Register</button>
    </div>
  );
};

export default LoginPage;
