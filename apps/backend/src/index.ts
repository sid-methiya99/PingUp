import express from 'express'
import { PrismaClient } from '@repo/db'
const prisma = new PrismaClient()
const app = express()

app.get('/', (req, res) => {
   res.json({
      msg: 'Hello World',
   })
})

app.listen(3000)
