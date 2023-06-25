import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Detail, Landing, Form } from "./views";
import { NavBar } from "./components/NavBar/NavBar";
import FormUsers from "./components/FormUsers/FormUsers";

function App() {
  const location = useLocation();

  return (
    <>
      <div>
        {location.pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/nuevousuario" element={<FormUsers />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
