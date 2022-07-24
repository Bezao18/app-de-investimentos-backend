import express from 'express';
import 'express-async-errors';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes)
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json('ACHO QUE DEU BOM?');
});

export default app;