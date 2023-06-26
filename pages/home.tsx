import AuthRoute from './api/AuthRoute';

const HomePage = () => {
    return (
      <AuthRoute>
    <>
    
    <h1>Welcome to the Home Page </h1>
    <h1>you've successful loged in </h1>
    </>
      </AuthRoute>
    )
  };
  
  export default HomePage;