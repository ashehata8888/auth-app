import { NextApiHandler } from 'next';
import { Amplify, Auth } from 'aws-amplify';

// AWS Cognito settings
Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_HStj7aHOo',
    userPoolWebClientId: '6osm3nuddqcie89nv0uc1b8t09',
  },
});

const authHandler: NextApiHandler = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Auth.signIn(email, password);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  };

export default authHandler;