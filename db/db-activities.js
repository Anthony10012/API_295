import mysql from "mysql2/promise"

const db ={
    connectToDatabase:async ()=>{
        const con = await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"root",
            port:3306,
            database:"app_activities",

        });
        return con;

    },


    getAllActivities:async (limit) =>{
        let con;
        try {
            con =  await db.connectToDatabase()
            let request = 'SELECT * FROM activities';
            if (limit != null){
                request = `${request} limit ${limit}`;
            }
            const [rows] = await con.query(request)
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }
    },
    getActivitiesByName: async (name, limit) => {
        let con;
        try {
            con = await db.connectToDB();
            //the getAllActivities function waits until the query is finished to execute
            //if there is some code after the call of this function, it will be executed without waiting the execution of this function
            //const [rows] = await con.query('SELECT * FROM activities where name like ?', ['%' + name + '%']);
            let request = 'SELECT * FROM activities where name like ?';
            let values = [`%${name}%`];
            if (limit != null) {
                request = `${request} limit ${limit}`;
                values.push(limit)
            }
            const [rows] = await con.query(request, values);
            return rows;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            if (con) {await db.disconnectFromDatabase(con); }
        }

    },
    getActivityById: async (id) =>{
        let con;
        try {
            con =  await db.connectToDatabase()
            const [rows] = await con.query('SELECT * FROM activities WHERE id = ?',[id]);
            return rows[0];
        } catch (err){
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }

    },

    createActivity: async ({name,start_date,time}) =>{
        let con;
        try{
            con =  await db.connectToDatabase()
            const[result] = await con.query('INSERT INTO activities (name,start_date,time) VALUES (?,?,?)',
                [name,start_date,time]
            );
            return {id:result.insertId,name,start_date,time};
        } catch (err){
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }


    },

    updateActivity: async (id,{name,start_date,time})=>{
        let con;
        try{
            con =  await db.connectToDatabase()
             const [result] = await con.query('UPDATE activities SET name = ? ,start_date = ?, time = ? WHERE id = ?',
                [name,start_date,time,id]
            );
            return result.affectedRows;
        } catch (err){
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }

    },

    deleteActivity: async (id)=>{
        let con;
        try{
            con =  await db.connectToDatabase()
            const [result] = await con.query('DELETE FROM activities WHERE id = ?',[id]);
            if (result.affectedRows > 0){
                return {success:true};
            } else {
                return {success: false};
            }
        } catch (err){
            console.log(err);
            throw err;
        } finally {
            if (con) await db.disconnectFromDatabase(con);
        }



    },

    disconnectFromDatabase:async (connection)=>{
        try{
            await connection.end();
            console.log("Déconnexion de la base de données réussie");

        }catch (error){
            console.error("Erreur lors de la déconnexion de la base de données :",error);
            throw error;
        }

    }

}

export { db }


