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
        <circle cx="36" cy="36" r="30" stroke="#F7F7F7" strokeWidth="6" />
        <circle
          cx="36"
          cy="36"
          r="30"
          stroke="#00AAD4"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="45 150"
        />
      </svg>
    </div>
  );
}
