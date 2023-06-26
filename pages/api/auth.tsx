import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_HStj7aHOo',
  ClientId: '6osm3nuddqcie89nv0uc1b8t09',
};

export const userPool = new CognitoUserPool(poolData);