import express from 'express'
import userController from '../controller/UserController'

export const userRouter = express.Router()

userRouter.post("/singup", userController.singup)
userRouter.post('/', userController.login)