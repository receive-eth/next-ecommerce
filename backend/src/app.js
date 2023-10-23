require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require("./router/user-router")
const errorMiddleware = require('./middlewares/error-middleware')
const productRouter = require('./router/product-router')
const cartRouter = require('./router/cart-router')
const discountRouter = require("./router/discount-router")
const PORT = process.env.PORT || 5000


const app = express()

app.use(express.json({limit: "100mb"}))
app.use(cookieParser())
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
        // methods: ['GET', 'POST',]
	})
)

app.use("/api/user", userRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/discount", discountRouter)


// Middleware для ошибок должен идти последним в цепочке всех middleware-ов 
app.use(errorMiddleware)


const start = async () => {
    
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()