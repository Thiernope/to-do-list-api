import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/home", (req, res) =>res.json({message: "Welcome to Thierry's pesonal brand"}));
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`app started on port ${port}`));