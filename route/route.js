const express = require('express');
const router = express.Router();
const db = require('../db/db');
const moment = require('moment');
// 中间件
const checkContent = (req,res,next)=>{
	let content = req.body.content;
	// console.log(content);
	if(content == '' || typeof(content) !== 'string'){
		return res.json({err: '无效content'});
	}
	next();
}


router.get('/',(req,res)=>{
	// console.log(req.query);
	db.getList({offset:req.query.offset,limit:req.query.limit},(err,result)=>{
		result.rows.forEach((item)=>{
			item.update_time = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
		});
		res.json({err: '', rows: result.rows, total: result.length});
		
	});
});

router.post('/',checkContent,(req,res)=>{
	// console.log(req.body);
	db.create({content: req.body.content},(err,result)=>{
		res.json({err: '', id: result.id});
	});
});

router.delete('/:id',(req,res)=>{
	// console.log(req.params.id);
	db.del(req.params.id,(err)=>{
		res.json({err:err || ''});
	});
})

router.put('/:id',checkContent,(req,res)=>{
	// console.log(req.body);
	db.update(req.params.id,{status: req.body.status, content: req.body.content},(err)=>{
		res.json({err:err || ''});
	})
})
module.exports = router;