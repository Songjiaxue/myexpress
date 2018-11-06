/**
 * Created by songjx 2017/3/22.
 */
var id = new Date().getTime().toString()+(100000*Math.random()+1);
console.log(id);
//登录
var login = {
	query: 'select * from admin where username = "',
	update: 'update admin set username = "'
};
//会员
var user = {
    find: 'select * from user where admin_id = "',//查询会员列表
    find_con:'select * from user where user_type = ',//根据会员类型进行查询
    delete:'delete from user where id = '//
};
//商品
var goods = {
	find:'select * from goods where admin_id = "',
	add:'insert into goods(goods_id,goods_name,goods_img,goods_type,goods_size,goods_material,goods_color,service,create_time,admin_id,is_status) values(',
	delete:'delete from goods where id=',
	update:'update goods set goods_name = "',
	query:'select * from goods where id = '
};
//商品分类
var goods_type = {
	add: 'insert into goods_type(type,f_type_id,admin_id) values(',
	find:'select * from goods_type where f_type_id = 0 and admin_id = "',
	find_z:'select * from goods_type where f_type_id = ',
	find_z_list:'select * from goods_type where f_type_id != 0 and admin_id =',
	delete:'delete from goods_type where id = ',
	update:'update goods_type set type='
};

var goods_size = {
	size_query:'select * from size where admin_id = "',
	color_query:'select * from color where admin_id = "',
	material_query:'select * from material where admin_id = "',
	add_size:'insert into size(size,admin_id) values("',
	add_material:'insert into material(material,admin_id) values("',
	add_color:'insert into color(color,admin_id) values("',
	update_size:'update size set size = "',
	update_material:'update material set material = "',
	update_color:'update color set color = "',
	delete_material:'delete from material where id=',
	delete_size:'delete from size where id=',
	delete_color:'delete from color where id=',
};
var goods_up = {
	find_0:'select * from goods where is_status = 0 and admin_id = "',
	find_1:'select * from goods where is_status = 1 and admin_id = "',
	find_2:'select * from goods where is_status = 2 and admin_id = "',
	update_0:'update goods set is_status = 0 where id = ',
	update_1:'update goods set is_status = 1 where id = ',
	setGoods:'update goods set coupon_name = "',
};
var coupon = {
	delete:'delete from coupon where id = '//删除优惠券
};
var book = {
	find:'select * from book where book_status = ',
	query:'select * from book where id = ',
	query_all:'select * from book where admin_id = "'
};
var assess = {
	find:'select * from assess where assess_status =',//查询评价列表
	set:'update assess set assess_back = "'//评价回复
};
//商品评价回复
module.exports.assess_back = function (req,res) {
    var id = req.body.id;
    var assess_back = req.body.assess_back;
    var assess_back_details = req.body.assess_back_details;
    console.log(sql.assess.set+assess_back+'",assess_back_details="'+assess_back_details+'",assess_status = 1 where id = "'+id+'"');
    task.query(sql.assess.set+assess_back+'",assess_back_details="'+assess_back_details+'",assess_status = 1 where id = "'+id+'"', function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
}
module.exports.login = login;
module.exports.user = user;
module.exports.goods_type = goods_type;
module.exports.goods = goods;
module.exports.goods_size = goods_size;
module.exports.goods_up = goods_up;
module.exports.coupon = coupon;
module.exports.book = book;
module.exports.assess = assess;
