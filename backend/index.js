import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import ProductRoute from "./routes/ProductRoute.js"
dotenv.config();

const app = express()

app.use(cors());
app.use(express.json())
app.use(ProductRoute)

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
  });

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running... ')
})