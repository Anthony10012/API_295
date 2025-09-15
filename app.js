import express from "express"
import activities  from "./db/mock-activities.js";
const app = express() //cree une application de type express
const port = 3000
import activitiesRouter from "./routes/activities.js";

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World !')
})//on envoye une reponse Hello World

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})//Demarrer le serveur web et qu il recoit sur le port 3000.

app.get('/api/activities', (req, res) => {
    res.json({activities});
})

app.get("/api/vers/",(req,res) => {

});

app.use("/api/activities",activitiesRouter);