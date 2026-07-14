import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <svg
        className={css.spinner}
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Фонове світле кільце */}
        <circle
          cx="36"
          cy="36"
          r="30"
          stroke="#F3F4F6" /* Світло-сірий колір фону */
          strokeWidth="6"
        />
        {/* Темна активна лінія */}
        <circle
          cx="36"
          cy="36"
          r="30"
          stroke="#4B5563" /* Темно-сірий колір (можете замінити на свій, наприклад #829b91) */
          strokeWidth="6"
          strokeLinecap="round" /* Закруглені кінчики */
          strokeDasharray="45 150" /* Довжина зафарбованої частини та пробілу */
        />
      </svg>
    </div>
  );
}
