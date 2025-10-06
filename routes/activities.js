import express from "express";
import {db} from  "../db/db-activities.js";
import {isValidID} from "../helper.js";
//Code made in ase of success, we do not treat here the error case (id not existing for example)

const activitiesRouter = express.Router();
activitiesRouter.get("/",async(req,res) =>{
    try {
        const name  = req.query.name;
        let limit;
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        } else {
            limit = null;
        }

        let activities;
        if (name) {
            if (name.length <= 2) {
                return res.status(400).json({ error: "Le paramètre de recherche doit contenir au moins 3 caractères." });
            } else {
                activities = await db.getActivitiesByName(name, limit);
            }
        } else {
            activities = await db.getAllActivities(limit);
        }
        res.json(activities);
    }catch (error){
        console.error("Erreur lors de la récupération des activités :", error);
        res.status(500).json({error:error});
    }



});

activitiesRouter.get("/:id",async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        if (!isValidID(id)){
            return res.status(400).json({error:"ID invalide"});
        }
        const activity = await db.getActivityById(id);
        if (activity === undefined){
            res.status(404).json({error:"Activité introuvable"});
        } else{
            res.json({activity})
        }
    } catch (error){
        res.status(500).json({error:error});
    }

});

activitiesRouter.delete("/:id",async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        let deletedActivity = await db.deleteActivity(id)
        if (deletedActivity.success){
            res.json({message: "Contact deleted"})
        } else{
            res.status(404).json({error:"Activité non trouvé"})
        }

    }catch (error){
        res.status(500).json({error:error})
    }


});

activitiesRouter.post("/",async(req,res)=>{
    try{
        const {name,start_date,time} = req.body;
        if (!name || !start_date || !time){
            return res.status(400).json({error:"Nom, date et durée sont obligatoires"});
        }
        const newActivity= await db.createActivity({name,start_date,time});
        const message = `l'activité ${newActivity.name} a bien été crée !`;
        res.json({message : message, activity : newActivity});

    } catch (error){
        res.status(500).json({error: error});
    }

})

activitiesRouter.put("/:id",async(req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const {name,start_date,time} = req.body;
        if (!name || !start_date || !time) {
            return res.status(400).json({ error: "Nom, date et durée sont obligatoires." });
        }
        const resUpdateactivityNb = await db.updateActivity(id,{name,start_date,time});
        if (resUpdateactivityNb === 0){
           res.status(404).json({error: "Activité non trouvé"});
        }else {
           const activityUpdated = await db.getActivityById(id);
           res.json({message : "Contact updated", activity : activityUpdated });
        }
    }catch (error){
        res.status(500).json({error : error});
    }


})

export default activitiesRouter;