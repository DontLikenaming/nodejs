const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');  //DB 연결정보 파일

async function main() {
    /*let sql1 = " create table sungjuk " +
                 " (name varchar(100), kor number(3), eng number(3), mat number(3)) ";
    let sql2 = "insert into sungjuk values (:1, :2, :3, :4)";
    let sql3 = "update sungjuk set KOR = :1, ENG = :2, MAT = :3  where NAME = :4";*/
    let sql4 = 'delete from sungjuk where name = :1';
    //let sql5 = "select * from sungjuk";
    let params = [];
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };
    let conn = null;

    try{
        oracledb.initOracleClient({libdir:'C:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);

        params = ['ㅇㅇ'];
        let result = await conn.execute(sql4,params);
        await conn.commit();    //반드시 넣어야 함
        console.log(result);

    }
    catch (e){console.error(e);}
    finally {
        if(conn){
            try{
                await conn.close();
                console.log('오라클 데이터베이스 접속 해제 성공')
            }
            catch (e){console.error(e);}
        }
    }
}
main();