import { useState } from "react";
import ModeSelector from "./ModeSelector";
import {
  DEFAULT_EXPLANATION_MODE,
  MAX_QUESTION_LENGTH,
} from "../../utils/constants";

function QuestionForm({ onSubmit, loading = false }) {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState(DEFAULT_EXPLANATION_MODE);
  const [validationError, setValidationError] = useState("");

  const handleQuestionChange = (event) => {
    const newQuestion = event.target.value;

    setQuestion(newQuestion);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanedQuestion = question.trim();

    if (!cleanedQuestion) {
      setValidationError("Please enter a DSA question.");
      return;
    }

    if (cleanedQuestion.length > MAX_QUESTION_LENGTH) {
      setValidationError(
        `Question cannot exceed ${MAX_QUESTION_LENGTH} characters.`,
      );
      return;
    }

    setValidationError("");

    await onSubmit(cleanedQuestion, mode);
  };

  return (
    <form className="question-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <div className="label-row">
          <label htmlFor="question">DSA question or code</label>

          <span className="character-count">
            {question.length}/{MAX_QUESTION_LENGTH}
          </span>
        </div>

        <textarea
          id="question"
          name="question"
          rows="10"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Example: Explain binary search with Java code and a dry run."
          disabled={loading}
          maxLength={MAX_QUESTION_LENGTH}
          aria-describedby={
            validationError ? "question-validation-error" : undefined
          }
        />

        {validationError && (
          <p
            id="question-validation-error"
            className="field-error"
            role="alert"
          >
            {validationError}
          </p>
        )}
      </div>

      <ModeSelector
        value={mode}
        onChange={setMode}
        disabled={loading}
      />

      <button
        className="primary-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Generating..." : "Explain Question"}
      </button>
    </form>
  );
}

export default QuestionForm;