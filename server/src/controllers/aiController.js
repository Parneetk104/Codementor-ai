export const explainQuestion = async (req, res, next) => {
  try {
    const { question, mode } = req.body;

    const answer = `Temporary explanation for: ${question}`;

    return res.status(200).json({
      success: true,
      answer,
      mode,
    });
  } catch (error) {
    next(error);
  }
};