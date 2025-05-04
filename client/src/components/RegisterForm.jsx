import { useState } from "react";

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

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
          type="text"
          placeholder="Username"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
