import { useRouter } from 'next/router';
import { useState } from 'react';
import { Auth } from 'aws-amplify';

const IndexPage = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      // Redirect to home page or show a success message
    } catch (error) {
      console.log('signin error:', error);
    }
  };

  return (

    <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f5f5f5',flexDirection: 'column' }}>

    
    <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', background: 'white' }}>
     

    <h1>Log In</h1>
    <br></br>
     
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', width: '300px', minWidth:"200px",marginRight:"20px",marginLeft:"20px"}}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', width: '300px',marginRight:"20px",marginLeft:"20px" }}
        required
      />
      <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Sign In</button>
  
   
    </form>

    <button onClick={() => handleRedirect('/registration')}>Register</button>

    </div>
  );






};

export default IndexPage;