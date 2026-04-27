import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Account.module.css";
import DeleteAccountModal from "../features/DeleteAccount";
import ChangeEmailForm from "../features/ChangeEmail";
import ChangePasswordForm from "../features/ChangePassword";

export default function Account({ removeToken }) {
  const [showModal, setShowModal] = useState(false);

  /*
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };
  */

  return (
    <div className={styles.accountSettings}>
      <div className={styles.headerContainer}>
        <h1>Account</h1>
        <button className={styles.signOutButton} onClick={handleLogout}>
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
