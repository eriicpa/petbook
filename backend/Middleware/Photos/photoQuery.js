import database from '../../Database/connection.js';

async function listPhoto(total, user, page) {
  const conn = await database.connect();
  let sql;

  if(user !== 0 && total !== 0 && page !== 0) {
    sql = `select * from tbl_postagem where status_post = "A" and FK_id_usuario = ${user} limit ${(page - 1) * total}, ${total}`;
  } else if(user !== 0 && total !== 0){
    sql = `select * from tbl_postagem where status_post = "A" and FK_id_usuario = ${user} limit ${total}`;
  } else if(total !== 0 && page !== 0) {
    sql = `select * from tbl_postagem where status_post = "A" limit ${(page - 1) * total}, ${total}`;
  } else if(total !== 0){
    sql = `select * from tbl_postagem where status_post = "A" limit ${total}`;
  } else if(user !== 0){
    sql = `select * from tbl_postagem where status_post = "A" and FK_id_usuario = ${user}`;
  } else {
    sql = `select * from tbl_postagem where status_post = "A"`;
  }

  const [rows] = await conn.query(sql);
  return rows;
}

export default {listPhoto};