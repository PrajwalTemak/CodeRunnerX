import exprss from "express"

const app = exprss();

app.use(exprss.json());

//import routes
import userRouter from  './routes/user.route.js';

//declare routes 
app.use("/api/v1/users",userRouter);

//example route : https://localhost:4000/api/v1/users/register

export default app;