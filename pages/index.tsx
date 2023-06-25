import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={() => handleRedirect('/registration')}>Register</button>
      <button onClick={() => handleRedirect('/signin')}>Sign In</button>
    </div>
  );
};

export default IndexPage;