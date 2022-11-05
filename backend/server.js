const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URL;

//database connection
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
});

//Middlewares
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/users');
const quizRouter = require('./routes/quiz');

app.use('/users', userRouter); 
app.use('/quizes', quizRouter); 


app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
});