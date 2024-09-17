const express = require('express')
const mongoose = require('mongoose')
const serviceRouter = require('./Api/api'); 
const app=express()
const PORT = process.env.PORT ||3000

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/healthcare')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use('/api', serviceRouter); 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});