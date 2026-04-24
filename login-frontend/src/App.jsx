import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Signin from './pages/SignIn'
import useToken from './hooks/useToken'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Account from './pages/Account'


function App() {
  /*
  const { token, setToken, removeToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
  */
 
  //fix protected routes, signin/register etc. should be open 
  // and the rest protected.

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;