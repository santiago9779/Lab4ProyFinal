import { Route, Routes } from "react-router-dom";
import { Layout } from "./paginas/Layout";
import { LoginPage } from "./paginas/LoginPage";
import { RequiredAuth } from "./paginas/RequireAuth";

function App() {
  return (
    <>
      <h1>
        <center>Restaurante</center>
      </h1>
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
          <Route
            path="/" 
            element={
              <RequiredAuth>
                <Layout/>
              </RequiredAuth>}>
          
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;