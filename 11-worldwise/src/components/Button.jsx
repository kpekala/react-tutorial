import styles from './Button.module.css';

function Button({ children, onCLick, type }) {
  return (
    <button onClick={onCLick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
