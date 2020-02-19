import express from'express';
import bodyParser from 'body-parser';

const app = express();


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(3656, () => {
  console.log("Server is running on port 3656");
});


export default app;