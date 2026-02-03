import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || '5001';
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MONGODB CONNECTED SUCCESSFULLY');
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  })
  .catch(error => console.log('ERROR CONNECTING TO MONGODB', error));
