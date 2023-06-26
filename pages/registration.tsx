
import { useState } from 'react';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const userPoolId = 'us-east-1_HStj7aHOo';
  const clientId = '6osm3nuddqcie89nv0uc1b8t09';

  const poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId,
  };

  const userPool = new CognitoUserPool(poolData);

  const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const length = 10;
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(generatedPassword);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userAttributes = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
        new CognitoUserAttribute({
          Name: 'phone_number',
          Value: phone,
        }),
        new CognitoUserAttribute({
          Name: 'given_name',
          Value: givenName,
        }),
        new CognitoUserAttribute({
          Name: 'family_name',
          Value: familyName,
        }),
      ];

      await new Promise<void>((resolve, reject) => {
        userPool.signUp(email, password, userAttributes, [], (error, result) => {
          if (error) {
            console.log('Registration error:', error);
            reject();
          } else {
            console.log('Registration successful:', result);
            setShowVerificationForm(true);
            resolve();
          }
        });
      });
    } catch (error) {
      console.log('Registration error:', error);
    }
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(verificationCode, true, (error, result) => {
      if (error) {
        console.log('Verification error:', error);
      } else {
        console.log('Verification successful');
      }
    });
  };

  return(



  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f5f5f5' }} >
       {!showVerificationForm && (
          <form onSubmit={handleRegistration}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', background: 'white' }}
          >
  
  <h1>Registration Form</h1>
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
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
              required
            />
            <input
              type="text"
              placeholder="Given Name"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
              required
            />
            <input
              type="text"
              placeholder="Family Name"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
              required
            />
            <button type="button" onClick={generateRandomPassword} style={{ marginBottom:"15px",padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', marginRight: '20px', marginLeft: '20px' }}>
              Generate Password
            </button>
            <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Register
            </button>
          </form>
        )}
  
        {showVerificationForm && (
          <form onSubmit={handleVerification}>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth: '200px', marginRight: '20px', marginLeft: '20px' }}
              required
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Verify
            </button>
          </form>
        )}
      </div>
  )

    
};

export default RegistrationPage;
