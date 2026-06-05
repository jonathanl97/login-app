import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Account.module.css";
import DeleteAccountModal from "../components/DeleteAccount";
import ChangeEmailForm from "../components/ChangeEmail";
import ChangePasswordForm from "../components/ChangePassword";
import { useAuth } from "../hooks/useAuth";

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
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log("test");
    } catch (error) {
      throw error;
    } finally {
      logout();
      navigate("/");
    }
    console.log("Signed out.");
  };

  return (
    <div className={styles.accountSettings}>
      <div className={styles.headerContainer}>
        <h1>Account</h1>
        {/*<h1>Hello {name}</h1>*/}
        <h1>{user.signedIn ? "Hello " + user.name : ""}</h1>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      <div className={styles.changeEmailContainer}>
        <ChangeEmailForm />
      </div>

      <div className={styles.changePasswordContainer}>
        <ChangePasswordForm />
      </div>

      <div className={styles.deleteAccountContainer}>
        <h2>Account Deletion</h2>
        <div className={styles.deleteAccount}>
          <p>Delete account?</p>
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
