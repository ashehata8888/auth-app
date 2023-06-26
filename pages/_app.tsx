import { AppProps } from 'next/app';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_HStj7aHOo',
  ClientId: '6osm3nuddqcie89nv0uc1b8t09',
});

const App = ({ Component, pageProps }: AppProps) => {
  return <Component userPool={userPool} {...pageProps} />;
};

export default App;