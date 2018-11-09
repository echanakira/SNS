var oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.getConnection({
      user          : "ORDS_PUBLIC_USER",
      password      : "oracle",
      connectString : "LOCALHOST:1521/XE"
    },
    function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute( //writes to database successfully
      "Insert into PLAIN(string) values (:string)",
      {string: "hello"},
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      });
  });

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}
