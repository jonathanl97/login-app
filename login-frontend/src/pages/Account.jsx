import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Account.module.css";
import DeleteAccountModal from "../features/DeleteAccount";
import ChangeEmailForm from "../features/ChangeEmail";
import ChangePasswordForm from "../features/ChangePassword";

async function signOutUser() {
  await fetch("http://localhost:8080/signout", {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export default function Account() {
  const [showModal, setShowModal] = useState(false);

  /*
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  */

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      throw error;
    }
    console.log("Signed out.");
  };

  return (
    <div className={styles.accountSettings}>
      <div className={styles.headerContainer}>
        <h1>Account</h1>
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
