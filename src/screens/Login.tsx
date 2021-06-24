const Login = ({ setIsLoggedIn }: any) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setIsLoggedIn(true)}> Log In Now!</button>
    </div>
  );
};

export default Login;
