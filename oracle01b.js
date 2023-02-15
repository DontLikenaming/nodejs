//zipcode2013에서 서울시에 있는 모든 구를 조회하세요
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

async function main() {
    /*const sql = "select distinct GUGUN from zipcode2013 where SIDO = '서울' order by GUGUN";*/
    //placeholder를 이용해서 동적으로 sql 질의문을 작성할 수 있음
    //:'index' => 배열로 정의
    /*const sql = "select distinct GUGUN from zipcode2013 where SIDO = :1 order by GUGUN";
    let params = ['경기'];*/
    //:'key'=> 객체로 정의
    const sql = "select distinct GUGUN from zipcode2013 where SIDO = :sido order by GUGUN";
    let params = {sido: '서울'};
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };

    let conn = null;

    try{
        oracledb.initOracleClient({libdir:'C:/Java/instantclient_19_17'});

        conn = await oracledb.getConnection(dbconfig);

        console.log('오라클 데이터베이스 접속 성공');

        let result = await conn.execute(sql, params, options);

        let rs = result.resultSet;

        let row = null;
        while ((row = await rs.getRow())){
            console.log(row.GUGUN);
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