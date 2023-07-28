const cookieParser = require('cookie-parser');
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/logger');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/conn');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();
const PORT = 3500 || env.process.PORT;

//connect to database
connectDB();

//middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

//routes & custom middleware
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/notes', require('./routes/notesRoutes'));

//mongoDB connection
mongoose.connection.once('open', () => {
  console.log(`Connected to mongoDB`);
  app.listen(PORT, () => {
    console.log(`server is working on port ${PORT}`);
  });
});
