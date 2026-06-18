import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

function AnswerBox({ answer, loading, error }) {
  if (loading) {
    return <Loader message="Generating explanation..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!answer) {
    return (
      <div className="state-card empty-state">
        <h2>Your explanation will appear here</h2>
        <p>
          Enter a DSA question, choose an explanation mode, and submit
          the form.
        </p>
      </div>
    );
  }

  return (
    <section className="answer-box" aria-live="polite">
      <div className="answer-header">
        <h2>Explanation</h2>
      </div>

      <div className="answer-content">
        <p>{answer}</p>
      </div>
    </section>
  );
}

export default AnswerBox;