function Loader({ message = "Generating explanation..." }) {
  return (
    <div className="state-card loading-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;