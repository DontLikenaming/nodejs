const mariadb = require('mariadb');
const dbconfig2 = require('./dbconfig2.js');

async function main(){
    const sql = "select distinct SIDO from zipcode2013";
    let params = ['서울'];
    let conn = null;
    try{
        conn = await mariadb.createConnection(dbconfig2);
        //console.log(conn);

        let result = await conn.execute(sql);
        //console.log(result);


        for(row of result){
            console.log(row.SIDO);
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