import express from "express"
import activities  from "./db/mock-activities.js";
const app = express() //cree une application de type express
const port = 3001
import activitiesRouter from "./routes/activities.js";

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World !')
})//on envoye une reponse Hello World


//Demarrer le serveur web et qu il recoit sur le port 3000.

/*app.get('/api/activities', (req, res) => {
    res.json({activities});
})
*/
app.get("/api/vers/",(req,res) => {

});
/*app.get("/api/activities",(req,res)=>{
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ message: "Veuillez fournir un paramètre ?name=" });
    }

})
*/
app.use("/api/activities",activitiesRouter);

app.use(({res})=> {
    const message = "Impossible de trouver la ressource ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})