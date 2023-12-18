const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = 5000;

app.use(express.static('../frontend/public'));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", authMiddleware,  userRouter);

const start = async () => {
    try{
        await mongoose.connect(`mongodb+srv://PetruLunic:Stels_5@cluster0.4iqbhaf.mongodb.net/auth_roles?retryWrites=true&w=majority`);
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`);
        });
    } catch(e){
        console.log(`Error while starting the server: ${e}`);
    }
}

start();
