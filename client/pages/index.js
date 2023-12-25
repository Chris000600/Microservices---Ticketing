import buildClient from '../api/build-client';

// client side
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// server side
LandingPage.getInitialProps = async (context) => {
  console.log('This is on the landing page!!!');

  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
