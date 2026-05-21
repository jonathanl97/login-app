import { BrowserRouter, Routes, Route, Link } from "react-router";
import Signin from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Account from "./pages/Account";
import Content from "./pages/Content";

//set login status when user logs in or logs out
//sign in button instead of sign out on account page

function App() {
  //fix protected routes, signin/register etc. should be open
  // and the rest protected.

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
