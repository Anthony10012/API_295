import express from "express";
import {db} from  "../db/db-activities.js";

//Code made in ase of success, we do not treat here the error case (id not existing for example)

const activitiesRouter = express.Router();
activitiesRouter.get("/",async(req,res) =>{
    const activities = await db.getAllActivities();
    res.json({activities});

});

activitiesRouter.get("/:id",async(req,res) => {
    const id = parseInt(req.params.id);
    const activity = await db.getActivityById(id);
    res.json({activity})
});

activitiesRouter.delete("/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    let deletedActivity = await db.deleteActivity(id)
    res.json({message: "Contact deleted"})
});

activitiesRouter.post("/",async(req,res)=>{
    const {name,start_date,time} = req.body;
    const newActivity= await db.createActivity({name,start_date,time});
    const message = `l'activité ${newActivity.name} a bien été crée !`;
    res.json({message : message, activity : newActivity});

})

activitiesRouter.put("/:id",async(req,res)=>{
    const id = parseInt(req.params.id);
    const {name,start_date,time} = req.body;
    const activityUpdated = await db.updateActivity(id,{name,start_date,time});
    res.json({message : "Contact updated", activity : activityUpdated });

})

export default activitiesRouter;