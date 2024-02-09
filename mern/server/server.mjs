import express from 'express';
import mongoose from 'mongoose';
import { userRoutes } from './routes/index';

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT;

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log('MongoDB Atlas connected');    

    const app = express();
    app.disable('x-powered-by');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());   

    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/users', userRoutes);    

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err)
  }
})();