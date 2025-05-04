import { useState } from "react";

const LoginForm = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
