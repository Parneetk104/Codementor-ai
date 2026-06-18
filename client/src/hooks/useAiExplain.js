import { useState } from "react";
import { explainQuestion } from "../services/aiService";

function useAiExplain() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitQuestion = async (question, mode) => {
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

  const resetExplanation = () => {
    setAnswer("");
    setError("");
  };

  return {
    answer,
    loading,
    error,
    submitQuestion,
    resetExplanation,
  };
}

export default useAiExplain;