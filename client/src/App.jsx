
import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Detail, Landing, Form, Carrito } from "./views";
import { NavBar } from "./components/NavBar/NavBar";
import FormUsers from "./components/FormUsers/FormUsers";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Filtros from "./components/Filtros/Filtros";
import Novedades from "./components/Filtros/Novedades";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  const location = useLocation();

  return (
    <div className="app">
     {location.pathname !== "/" && location.pathname !== "/dashboard" && <NavBar />}



      <div className="content app">
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/nuevousuario" element={<FormUsers />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/filtros" element={<Filtros />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <footer>
      {location.pathname !== "/" && location.pathname !== "/dashboard" && <Footer />}
      </footer>
    </div>
  );
}

export default App;
