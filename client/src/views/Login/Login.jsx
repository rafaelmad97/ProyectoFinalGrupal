import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Login = () => {
  const Nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación, como enviar los datos al servidor o verificar en una base de datos local.

    setEmail("");
    setPassword("");
  };

  const handleNavRegistro = () => {
    Nav("/nuevousuario");
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        <Button variant="text" onClick={handleNavRegistro}>
          Nuevo usuario
        </Button>
      </form>
    </div>
  );
};

export default Login;
