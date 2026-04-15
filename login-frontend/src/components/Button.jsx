import styles from "./Button.module.css"

export default function Button({ children, ...buttonProps }) {
  return <button className={styles.button} {...buttonProps}>{children}</button>
}