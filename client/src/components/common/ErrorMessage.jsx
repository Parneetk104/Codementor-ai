function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="state-card error-state" role="alert">
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;