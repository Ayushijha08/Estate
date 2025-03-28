import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {connectDb} from './config/db.js';
import propertyRouter from "./routes/PropertyRoutes.js";
import buyerRouter from "./routes/BuyersRoutes.js";
import leaseRouter from "./routes/LeaseRoutes.js";
import agentRouter from "./routes/AgentRoute.js";
import bookingRouter from "./routes/BookingRoute.js";
import financeRouter from "./routes/FinanceRoute.js";
import SellersRouter from "./routes/SellersRoute.js";


dotenv.config();
const app =express();
const PORT = process.env.PORT || 3001
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use("/property",propertyRouter) //localhost:3001/property/createProduct
app.use("/buyer",buyerRouter)
app.use("/lease",leaseRouter)
app.use("/agent",agentRouter)
app.use("/finance",financeRouter)
app.use("/booking",bookingRouter)
app.use("/sellers",SellersRouter)


connectDb();
app.get('/',(req, res)=>{
    res.send("hello")
})
app.listen(PORT,() =>{
console.log(`Server is running on port ${PORT}`)
});//name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus} = req.body;
//if (!name ||  !Email || !mobileNo || !address || !check_in_date || !check_out_date || !TotalAmountUnit  ||    !paymentStatus || !Bookingstatus ) 