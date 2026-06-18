import { useState } from "react";
import QuestionForm from "../components/dsa/QuestionForm";
import AnswerBox from "../components/dsa/AnswerBox";
import { explainQuestion } from "../services/aiService";

function DsaExplainer() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuestionSubmit = async (question, mode) => {
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const data = await explainQuestion(question, mode);
      setAnswer(data.answer);
    } catch (requestError) {
      setError(
        requestError.message || "Unable to process your request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <p className="eyebrow">CodeMentor AI</p>
        <h1>AI DSA Explainer</h1>
        <p>
          Understand DSA problems through structured explanations,
          reasoning, dry runs, and interview-focused guidance.
        </p>
      </header>

      <div className="explainer-layout">
        <section className="panel form-panel">
          <h2>Ask your question</h2>

          <QuestionForm
            onSubmit={handleQuestionSubmit}
            loading={loading}
          />
        </section>

        <section className="panel result-panel">
          <AnswerBox
            answer={answer}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </main>
  );
}

export default DsaExplainer;