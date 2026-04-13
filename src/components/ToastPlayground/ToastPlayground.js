import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function RadioButtonWithLabel({ value, selectedValue, onChange }) {
  const buttonId = `variant-${value}`;
  const checked = selectedValue === value;

  return (
    <label htmlFor={`variant-${value}`}>
      <input
        id={buttonId}
        type="radio"
        name="variant"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {value}
    </label>
  );
}

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  const [toasts, setToasts] = React.useState([]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} />

      <form
        className={styles.controlsWrapper}
        onSubmit={(event) => {
          event.preventDefault();
          setToasts((toasts) => {
            const toastId = crypto.randomUUID();
            return [
              ...toasts,
              {
                id: toastId,
                children: message,
                variant,
                shown: true,
                onClose: () => {
                  setToasts((toasts) => {
                    const newToasts = toasts.filter(({ id }) => {
                      const doesNotMatch = id !== toastId;
                      return doesNotMatch;
                    });
                    return newToasts;
                  });
                },
              },
            ];
          });
        }}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((value) => (
              <RadioButtonWithLabel
                key={`variant-${value}`}
                value={value}
                selectedValue={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                }}
              />
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
