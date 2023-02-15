const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

async function main() {
    const sql = "select distinct sido from zipcode2013 order by sido";
    let params = {};   //insert, update, delete, where절 쓸 때 사용함
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };    //oracledb를 위한 옵션 정의
    let conn = null;    //db 연결 객체

    try{
        //오라클 인스턴스 클라이언트 초기화
        oracledb.initOracleClient({libdir:'C:/Java/instantclient_19_17'});

        //오라클 접속정보를 이용해서 오라클 연결객체 생성
        conn = await oracledb.getConnection(dbconfig);

        console.log('오라클 데이터베이스 접속 성공');

        //sql문을 실행하고 결과를 받아옴
        let result = await conn.execute(sql, params, options);

        //실행 결과를 결과집합 객체로 변환
        let rs = result.resultSet;

        //결과집합 객체의 각 요소를 순회하며 내용 출력
        let row = null;
        while ((row = await rs.getRow())){  //outFormat 설정되어 있지 않으면 작동 안함
            console.log(row.SIDO);
        }

        //작업이 끝나면 결과집합 객체를 닫음
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