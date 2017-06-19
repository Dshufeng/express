var mysql = require('mysql');
var conn  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'todo_app'
});
const TABLE = 'todo';

const getList = ({offset,limit},cb)=>{
	// console.log(offset,limit);
	let sql = `SELECT * FROM ${TABLE} LIMIT ${offset} , ${limit}`;

	let count = `SELECT * FROM ${TABLE}`;

	conn.query(count,(err,res)=>{
		length = res.length;
	});
	conn.query(sql,(err,rows)=>{
		return cb(null,{rows:rows,length:length});
	});
}

const create = ({content},cb) => {
	// console.log({content});
	let sql = `INSERT INTO ${TABLE} SET content = ?`;
	conn.query(sql,[content],(err,res)=>{
		if(err){
			return cb(err);
		}

		return cb(null,{id: res.insertId})
	});
}


const del = (id,cb)=>{
	let sql = `DELETE FROM ${TABLE} WHERE id = ?`;
	conn.query(sql,[id],cb);
}

const update = (id, {status, content}, cb)=>{
	let sql = `UPDATE ${TABLE} SET content = ?,status = ? WHERE id = ?`;
	conn.query(sql,[content,status,id],cb);
}


module.exports = {
	getList,
	create,
	del,
	update
}