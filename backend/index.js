import express from 'express'
import cors from "cors"
import router from './routes/routes.js';
import { connection } from './dbconnection.js';
import { fetchDataFromThirdPartyAPI } from './utiles/getDataFromThirdPartApi.js';
const app=express();

//middleware
app.use(express.json())
app.use(cors())
app.use("/",router);
const PORT=8000
const db_url="mongodb+srv://rraj58361:12345@cluster0.5qwwjc1.mongodb.net/?retryWrites=true&w=majority";
connection(db_url);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
});