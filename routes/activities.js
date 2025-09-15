import express from "express";
import activities  from "../db/mock-activities.js";


const activitiesRouter = express.Router();
activitiesRouter.get("/",(req,res) =>{
    res.json({activities});
});

activitiesRouter.get("/:id",(req,res) => {
    const id = parseInt(req.params.id);
    const activity = activities.find(activity => activity.id === id);
    res.json({activity})
});

activitiesRouter.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const index = activities.findIndex(activity => activity.id === id);
    activities.splice(index,1);
    res.json({message: "Contact deleted"})
});

activitiesRouter.post("/",(req,res)=>{
    const {name,start_date,time} = req.body;
    //recupère le max des id existants
    const maxId = activities.length > 0
        ? Math.max(...activities.map(a => a.id))//fonction qui permet de prendre le plus grand id
        :0; //si activities est vide le premier id sera 1.
    const id = maxId + 1;
    const newActivity={id,name,start_date,time};
    activities.push(newActivity);
    const message = `l'activité ${newActivity.name} a bien été crée !`;
    res.json({message : message, activity : newActivity});

})

activitiesRouter.put("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const {name,start_date,time} = req.body;
    const index = activities.findIndex(activity => activity.id === id);
    activities[index] = {id,name,start_date,time};
    res.json({message : "Contact updated", activity : activities[index] });

})

export default activitiesRouter;