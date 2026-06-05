import { BrowserRouter, Routes, Route } from "react-router";
import Signin from "./pages/SignIn";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Account from "./pages/Account";
import Content from "./pages/Content";
import { AuthProvider } from "./hooks/Auth";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route
              path="/content"
              element={
                <PrivateRoutes>
                  <Content />
                </PrivateRoutes>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoutes>
                  <Account />
                </PrivateRoutes>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
