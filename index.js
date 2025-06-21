import 'dotenv/config'
import app from "./src/app.js"
import connectDB from "./src/config/db.config.js"
const port = process.env.PORT || 3001

connectDB().then(() => {
  app.listen(port, () => { `Listening to port ${port}` })
})