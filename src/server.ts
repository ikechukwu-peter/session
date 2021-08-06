import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

//Handle uncaughtExceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Server shutting down...");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

 dotenv.config({ path: './.env' });

//initializing app
import app from './app';

//Connecting to mongoose
mongoose
  .connect(process.env.DATABASE!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

//Setting port
const port = process.env.PORT || 5000;

//Listening for request
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  //console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

