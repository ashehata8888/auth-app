import { useRouter } from 'next/router';
import { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import LoginPage from './LoginPage';

const IndexPage = () => {
  
  return (
<LoginPage/>
  );
};

export default IndexPage;
