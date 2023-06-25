import { useState } from 'react';
import { Auth } from 'aws-amplify';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);

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
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          phone_number: phone,
          given_name: givenName,
          family_name: familyName,
        },
      });

     
      setShowVerificationForm(true);
    } catch (error) {

      console.log('Registration error:', error);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
  
      await Auth.confirmSignUp(email, verificationCode);
      

    } catch (error) {

      console.log('Verification error:', error);
    }
  };

  return (
    <div>
      {!showVerificationForm && (
        <form onSubmit={handleRegistration}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Given Name"
            value={givenName}
            onChange={(e) => setGivenName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Family Name"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={generateRandomPassword}>
            Generate Password
          </button>
          <button type="submit">Register</button>
        </form>
      )}

      {showVerificationForm && (
        <form onSubmit={handleVerification}>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationPage;
