const mariadb = require('mariadb');
const dbconfig2 = require('./dbconfig2.js');

async function main(){
    const sql = "select distinct GUGUN from zipcode2013 where SIDO = ? order by GUGUN";
    let params = ['서울'];
    let conn = null;
    try{
        conn = await mariadb.createConnection(dbconfig2);
        //console.log(conn);

        let result = await conn.execute(sql,params);
        //console.log(result);


        for(row of result){
            console.log(row.GUGUN);
        }

    }
    catch (e){
        console.error(e);
    }
    finally {
        if(conn){
            try{await conn.close();}
            catch (e){console.error(e);}
        }
    }


}
main();