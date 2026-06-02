import { BrowserRouter, Routes, Route, Link } from "react-router";
import Signin from "./pages/SignIn";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Account from "./pages/Account";
import Content from "./pages/Content";
//import { useContext } from "react";
//import { UserContext } from "./features/UserContext";
import { AuthProvider } from "./hooks/useAuth";
import PrivateRoutes from "./features/PrivateRoutes";

//set login status when user logs in or logs out
//sign in button instead of sign out on account page

function App() {
  //const user = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AuthProvider>
          <Routes>
            {/*
          {user?.loggedIn === true ? (
            <Route path="/test" />
          ) : (
            <Route path="/signin" element={<Signin />} />
          )}
            */}

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
