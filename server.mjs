import express from "express"
import dotenv from "dotenv"
import index from "./routes/index.mjs"
import jobs from "./routes/jobs.mjs"
import companies from "./routes/companies.mjs"
import error from "./utilities/error.mjs"
import cors from "cors"
import "./config/database.mjs"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.static("./assets"))
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  const time = new Date()
  console.log("-----")
  if(req.url !== "/favicon.ico") {
    console.log(`${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`)
  }
  if(req.body){
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:")
      console.log(req.body)
    }
  }
  next();
});

app.use("/", index)
app.use("/jobs", jobs)
app.use("/companies", companies)

app.use((req, res, next) => {
  next(error(404, "Not Found."));
});

app.use((err, req, res, next) => {
  if(req.url !== "/favicon.ico") {
    console.log(`${err.status} Not found.`)
  }
  res.status(err.status || 500);
  res.json({ error: `${err.status} ${err.message}` });
});

app.listen(PORT, () => {
  console.log(`Server is open at localhost:${PORT}.`)
})