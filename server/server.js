import env from "./src/config/env.js";
import app from "./src/app.js";

const server = app.listen(env.port, () => {
  console.log(
    `CodeMentor API running on http://localhost:${env.port}`,
  );

  console.log(`Environment: ${env.nodeEnv}`);
  console.log(`Allowed client: ${env.clientUrl}`);
  console.log(`Gemini model: ${env.geminiModel}`);
});

export default server;