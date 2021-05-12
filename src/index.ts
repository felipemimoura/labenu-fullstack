import express, { Express } from 'express'
import { AddressInfo } from "net";
import cors from 'cors'
import { userRouter } from './router/UserRouter';
import { imageRouter } from './router/ImagesRouter';

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/users", userRouter)
app.use("/images", imageRouter)

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http:localhost: ${address.port}`)
  }else{
    console.error(`Failure upon starting server`)
  }
})