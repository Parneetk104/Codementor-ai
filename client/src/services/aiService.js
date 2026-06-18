const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function explainQuestion(question, mode) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai/explain`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          mode,
        }),
      },
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error("The server returned an invalid response.");
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed with status ${response.status}.`,
      );
    }

    if (!data.success) {
      throw new Error(
        data.message || "Unable to generate an explanation.",
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the server. Make sure the backend is running.",
      );
    }

    throw error;
  }
}