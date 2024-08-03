import express from 'express';
import cors from 'cors';
import healthcheckRoute from './routes/health-check.route';

import { PORT,CORS_CREDENTIALS,CORS_ORIGIN  } from './config';

try {
  const app: express.Application = express();

  /** Initialize middlewares except for Auth and Error handling */
  app.use(express.json());
  app.use(cors({ origin: CORS_ORIGIN, credentials: CORS_CREDENTIALS }));
  app.use(express.urlencoded({ extended: true }));
  /**
   * API Routes
   */
  app.use('/health-check', healthcheckRoute);

  const port = PORT || 3000;
  
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
} catch (error) {
  console.log(error);
}
