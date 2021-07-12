import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGO_URL as string;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

export { mongoConnect };
