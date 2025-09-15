import mysql from "mysql2/promise"

const con = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:3306,
    database:"app_activities",

});
const db = {
    getAllActivities:async () =>{
        const [rows] = await con.query('SELECT * FROM activities');
        return rows;

    },
    getActivityById: async (id) =>{
        const [rows] = await con.query('SELECT * FROM activities WHERE id = ?',[id]);
        return rows[0];
    },

    createActivity: async ({name,start_date,time}) =>{
        const[result] = await con.query(
            'INSERT INTO activities (name,start_date,time) VALUES (?,?,?)',
            [name,start_date,time]
        );
        return {id:result.insertId,name,start_date,time};

    },

    updateActivity: async (id,{name,start_date,time})=>{
        await con.query(
            'UPDATE activities SET name = ? ,start_date = ?, time = ? WHERE id = ?',
            [name,start_date,time,id]
        );
        return {id,name,start_date,time};
    },

    deleteActivity: async (id)=>{
        await con.query('DELETE FROM activities WHERE id = ?',[id]);
        return {success:true};
    },

}
export { db }
