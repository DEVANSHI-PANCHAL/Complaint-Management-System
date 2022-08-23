import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "./routes/user.js";
import complaintRouter from "./routes/complaint.js";
import 'dotenv/config';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use("/users", userRouter);
app.use('/complaint', complaintRouter);



const PORT = process.env.PORT|| 8080;
const uri = "mongodb+srv://root:root@cluster0.y731t.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri)
  .then(() =>{
    console.log('MongoDB Connected.')
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))})
  .catch((error) => console.log(`${error} did not connect`));