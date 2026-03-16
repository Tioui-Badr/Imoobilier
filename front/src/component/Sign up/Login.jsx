import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); //empeche chargement de la page
    if (email === 'admin@gmail.com' && password === 'badrtiwi') {
      console.log("athentification succes");
      navigate("/");
    }
    else {
      setError("");
      alert("password or email incoreect");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Connexion</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Mot de passe</label>
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Cacher" : "Afficher"}
            </button>
          </div>
          <button type="submit" className="submit-btn">
            Sign in
          </button>
        </form>
        <p className="login-footer">
          Pas de compte? <a href="/register">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Login;