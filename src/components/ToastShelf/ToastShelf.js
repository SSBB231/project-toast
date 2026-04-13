import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts = [] }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, children, ...delegated }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast {...delegated}>{children}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
