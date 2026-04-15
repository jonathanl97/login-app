import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Signin from './pages/SignIn'
import Login from './pages/Loginold'
import useToken from './hooks/useToken'
import ProtectedRoute from './ProtectedRoute'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Account from './pages/Account'


function App() {
  const { token, setToken, removeToken } = useToken();

  /*
  if (!token) {
    return <Login setToken={setToken} />
  }
  */
 
  //fix protected routes, signin/register etc. should be open 
  // and the rest protected.

  //add server with login function and jwt token verification

  //
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account removeToken={removeToken} />} />

          {/*<Route path="/login" element={<Login setToken={setToken} />} />*/}
          <Route path="/signin" element={<Signin />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;