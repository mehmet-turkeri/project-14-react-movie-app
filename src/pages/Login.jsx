import React, { useState } from "react";
import { forgotPassword, signIn, signUpProvider } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = info;

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password, navigate);
    console.log(email, password);
  };
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="form-image d-none d-md-block">
        <img src={"https://picsum.photos/800/800"} alt="sample-movie" />
      </div>
      <div className="register-form">
        <h1 className="form-title display-3 ">Giriş</h1>
        <form id="register" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input              
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control"
              placeholder="Emailinizi Giriniz.."
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
            Password
            </label>
            <input             
              onChange={handleChange}
              type="password"
              name="password"
              className="form-control"
              placeholder="Şifrenizi Giriniz.."
              required
            />
          </div>
          <div className="link" onClick={() => forgotPassword(email)}>
            Şifremi Unuttum
          </div>
          <button type="submit" className="btn btn-primary form-control">
            Giriş Yap
          </button>
        </form>
        <button
          onClick={() => signUpProvider(navigate)}
          className="btn btn-primary form-control"
        >
          Google ile devam
        </button>
      </div>
    </div>
  );
};

export default Login;