const VALID_MODES = [
  "beginner",
  "interview",
  "dry-run",
  "optimize",
  "debug",
];

const MAX_QUESTION_LENGTH = 5000;

export const validateExplainRequest = (req, res, next) => {
  const { question, mode = "beginner" } = req.body;

  if (question === undefined || question === null) {
    return res.status(400).json({
      success: false,
      message: "Question is required",
    });
  }

  if (typeof question !== "string") {
    return res.status(400).json({
      success: false,
      message: "Question must be a string",
    });
  }

  if (question.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Question cannot be empty",
    });
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Question cannot exceed ${MAX_QUESTION_LENGTH} characters`,
    });
  }

  if (typeof mode !== "string") {
    return res.status(400).json({
      success: false,
      message: "Mode must be a string",
    });
  }

  if (!VALID_MODES.includes(mode)) {
    return res.status(400).json({
      success: false,
      message: `Mode must be one of: ${VALID_MODES.join(", ")}`,
    });
  }

  req.body.question = question.trim();
  req.body.mode = mode;

  next();
};