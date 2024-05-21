import { Router } from "express"

export const userRouter = Router()

// Static calls should be on top
userRouter.get('/', (req, res) => {
    res.send("Users API")
})

userRouter.get('/newuser', (req, res) => {
    res.send("New user")
})

// Dynamic Loading
userRouter.get('/:id', (req, res) => {
    const id = req.params.id
    res.send(`User is ${id}`)
})

