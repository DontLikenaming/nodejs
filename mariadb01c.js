const mariadb = require('mariadb');
const dbconfig2 = require('./dbconfig2.js');

async function main(){
    /*const sql = "select distinct DONG from zipcode2013 where SIDO = ? and GUGUN = ? order by DONG";
    let params = ['서울','강남구'];*/
    const sql = "select distinct DONG from zipcode2013 where SIDO = :sido and GUGUN = :gugun order by DONG";
    let params = {sido:'서울', gugun:'강남구'};
    let conn = null;
    try{
        conn = await mariadb.createConnection(dbconfig2);
        //console.log(conn);

        //let result = await conn.execute(sql,params);
        let result = await conn.execute({namedPlaceholders:true,sql:sql},params);
        //console.log(result);


        for(row of result){
            console.log(row.DONG);
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