//zipcode2013에서 서울시 금천구에 있는 모든 동을 조회하세요
const oracledb = require('oracledb');

async function main() {
    /*const sql = "select distinct dong from zipcode2013 where sido = :1 and gugun = :2 order by dong";
    let params = ['서울','금천구'];*/
    const sql = "select distinct dong from zipcode2013 where sido = :sido and gugun = :gugun order by dong";
    let params = {sido:'서울', gugun:'금천구'};
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };
    let conn = null;

    try{
        oracledb.initOracleClient({libdir:'C:/Java/instantclient_19_17'});

        conn = await oracledb.getConnection({user: 'bigdata', password: 'bigdata', connectionString: '3.34.53.22:1521/XE'});

        console.log('오라클 데이터베이스 접속 성공');

        let result = await conn.execute(sql, params, options);

        let rs = result.resultSet;

        let row = null;
        while ((row = await rs.getRow())){
            console.log(row.DONG);
        }

        rs.close();

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