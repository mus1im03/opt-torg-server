require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require("cors")
const morgan = require("morgan")

app.use('/static', express.static(__dirname + '/public'));

app.use(cors())
app.use(express.json());
app.use(morgan("dev"))
app.use(require("./routes/products.route"));
app.use(require("./routes/categories.route"));
app.use(require("./routes/carts.route"))


const { PORT, MONGO_SERVER } = process.env

connectAndStartServer = async () => {
    try {
        await mongoose.connect(MONGO_SERVER)
        app.listen(PORT, () => {
            console.log(`Сервер запущен: ${PORT}`);
        })
    } catch (error) {
        console.log(`Ошибка при подключении: ${error.toString()}`);
    }
}

connectAndStartServer()