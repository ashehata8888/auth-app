import { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';

// Configure Amplify with your AWS Cognito settings
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_HStj7aHOo',
    userPoolWebClientId: '6osm3nuddqcie89nv0uc1b8t09',
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
