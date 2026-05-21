import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Account.module.css";
import DeleteAccountModal from "../features/DeleteAccount";
import ChangeEmailForm from "../features/ChangeEmail";
import ChangePasswordForm from "../features/ChangePassword";

async function signOutUser() {
  //redirect("/login");
  await fetch("http://localhost:8080/signout", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

async function checkAuthenticated() {
  const response = await fetch("http://localhost:8080/authenticated", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function getName() {
  const response = await fetch("http://localhost:8080/account", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function redirectUser() {
    const response = await checkAuthenticated();
    //if (!response.ok) navigate("/signin");
    if (!response.ok) {
      navigate("/signin");
    } else {
      getName().then((result) => setName(result));
    }
  }

  useEffect(() => {
    redirectUser();
  }, []);

  /*
  useEffect(() => {
    getName().then((result) => setName(result));
  }, []);
  */

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      throw error;
    }
    console.log("Signed out.");
    /*
    const navigate = useNavigate();
    const handleLogout = () => {
    navigate('/login');
    };
    */
  };

  return (
    <div className={styles.accountSettings}>
      <div className={styles.headerContainer}>
        <h1>Account</h1>
        <h1>Hello {name}</h1>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      <div className={styles.changeEmailContainer}>
        {/*Hide if logged out.*/}
        <ChangeEmailForm />
      </div>

      <div className={styles.changePasswordContainer}>
        {/*Hide if logged out.*/}
        <ChangePasswordForm />
      </div>

      <div className={styles.deleteAccountContainer}>
        <h2>Account Deletion</h2>
        <div className={styles.deleteAccount}>
          <p>Delete account?</p>

          {/*Hide if logged out.*/}
          <button
            className={styles.deleteButton}
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
          <DeleteAccountModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
