import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { inngest, functions } from './inngest/index'
import { serve } from 'inngest/express'
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(
   '/api/inngest',
   serve({
      client: inngest,
      functions,
   })
)

app.get('/', (req, res) => {
   res.json({
      msg: 'Hello',
   })
})
app.listen(3000, () => {
   console.log('Server is running on port: ', process.env.PORT)
})
