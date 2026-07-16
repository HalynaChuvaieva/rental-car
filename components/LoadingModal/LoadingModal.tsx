import css from "./LoadingModal.module.css";

export default function LoadingModal() {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <div className={css.spinner}></div>
        <h3 className={css.title}>Loading cars...</h3>
        <p className={css.text}>
          Please wait while we fetch the best cars for you
        </p>
      </div>
    </div>
  );
}
