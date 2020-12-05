import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js"
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes)
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`app started on port ${port}`));