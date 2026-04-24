import { useState } from "react";
import styles from "./SignIn.module.css"
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { validateEmail, validatePassword } from "../features/ValidateCredentials";

async function signinUser(credentials) {
  console.log(JSON.stringify(credentials));
  const response = await fetch('http://localhost:8080/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });

  console.log(response);

  /*
  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
  */
 
  // handle response
};

async function registerUser(credentials) {
  const response = await fetch('http://localhost:8080/users/register', {
    method: 'POST',
    headers: { 
      Accept: 'application/json', 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });
  
  /*
  if (!response.ok) {
    return ('Failed to register user')
  } else {
    return ('User registered successfully')
  }
  */

  //add response on successful/failed register
};

export default function Signin() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState();
  const [touched, setTouched] = useState();
  const [newUser, setNewUser] = useState(false);

  const handleSubmitSignin = async e => {
    e.preventDefault();

    const eError = validateEmail(email)
    const pError = validatePassword(password);
    setEmailError(eError)
    setPasswordError(pError)

    if (!emailError && !passwordError) {
      setLoading(true);
      console.log("Signing in");
      try {
        await signinUser({
          email,
          password
        })
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      };
    }
  };

  const handleSubmitRegister = async e => {
    e.preventDefault();
    
    const eError = validateEmail(email)
    const pError = validatePassword(password);
    setEmailError(eError)
    setPasswordError(pError)

    if (!emailError && !passwordError) {
      setLoading(true);
      console.log("Registering");
      try {
        await registerUser({
          email,
          password
        });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      };
    }
  };

  const handleEmailBlur = () => {
    setTouched(true)
    const error = validateEmail(email)
    setEmailError(error)
  }

  const handlePasswordBlur = () => {
    setTouched(true)
    const error = validatePassword(password);
    setPasswordError(error)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    if (touched) {
      const error = validateEmail(value)
      setEmailError(error)
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)

    if (touched) {
      const error = validatePassword(value)
      setPasswordError(error)
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.formContainer}>
        <h1 className={styles.header}>{newUser ? "Register" : "Sign in"}</h1>
        <form className={styles.form} onSubmit={newUser ? handleSubmitRegister : handleSubmitSignin}>
          <label className={styles.label}>
            <p className={styles.text}>Email:</p>
            <input
              required
              className={styles.inputAreaEmail}
              type="text"
              placeholder="example@email.com"
              maxLength={50}
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              disabled={loading}
            />
            {touched && emailError && (<div className={styles.errorText}>{emailError}</div>)}
          </label>
          
          <label className={styles.label}>
            <p className={styles.text}>Password:</p>
            <div className={styles.passwordContainer}>
            <input
              required
              className={styles.inputAreaPassword}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              maxLength={51}
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              disabled={loading}
            />
            <button 
              className={styles.showPasswordButton} 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
            >
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
            </div>
            {touched && passwordError && (<div className={styles.errorText}>{passwordError}</div>)}
          </label>
          <div className={styles.formButtons}>
            <button 
              className={styles.button} 
              type="submit" 
              disabled={loading}
            >
              {/*{loading ? "Loading..." : "Sign in" }*/}
              {newUser ? "Register" : "Sign in"}
            </button>
            <button 
              className={styles.linkButton} 
              type="button" 
              onClick={() => setNewUser(!newUser)}
            >
              {newUser ? "Already have an account?" : "Create an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}