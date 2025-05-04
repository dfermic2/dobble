import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div>
      <Navbar />
      <h1>Login</h1>
      <div className="login">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
