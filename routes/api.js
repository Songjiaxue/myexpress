/**
 * Created by songjx 2017/3/21.
 */
var express = require('express');
var router = express.Router();
var task = require('./../models/apiTask.js');/*调用公用方法，返回具体的结果*/
var sql = require('./../models/sqlMapping.js');/*sql语句*/
router.post('/login', function(req, res) {
    task.login(req,res);
});
router.post('/login_update', function(req, res) {
    task.login_update(req,res);
});
/* GET users listing. */
router.post('/user', function(req, res) {
    task.user(req,res);
});
router.post('/user_con', function(req, res) {
    task.user_con(req,res);
});
router.post('/delete_user', function(req, res) {
    task.delete_user(req,res);
});
//增加商品类型
router.post('/add_goods_type', function(req, res) {
    task.add_goods_type(req,res);
});
//商品类型列表
router.post('/goods_type_query', function(req, res) {
    task.goods_type_query(req,res);
});
router.post('/goods_z_type_query', function(req, res) {
    task.goods_z_type_query(req,res);
});
router.post('/goods_z_type', function(req, res) {
    task.goods_z_type(req,res);
});
//商品类型列表分页
router.post('/goods_type', function(req, res) {
    task.goods_type(req,res);
});
//删除商品类型
router.post('/delete_goods_type', function(req, res) {
    task.delete_goods_type(req,res);
});
//修改商品类型
router.post('/update_goods_type', function(req, res) {
    task.update_goods_type(req,res);
});
//商品列表
router.post('/goods', function(req, res) {
    task.goods(req,res);
});
router.post('/add_goods', function(req, res) {
    task.add_goods(req,res);
});
router.post('/update_goods', function(req, res) {
    task.update_goods(req,res);
});
router.post('/delete_goods', function(req, res) {
    task.delete_goods(req,res);
});
router.post('/size_query', function(req, res) {
    task.size_query(req,res);
});
router.post('/add_size', function(req, res) {
    task.add_size(req,res);
});
router.post('/delete_size', function(req, res) {
    task.delete_size(req,res);
});
router.post('/update_size', function(req, res) {
    task.update_size(req,res);
});
router.post('/material_query', function(req, res) {
    task.material_query(req,res);
});
router.post('/add_material', function(req, res) {
    task.add_material(req,res);
});
router.post('/delete_material', function(req, res) {
    task.delete_material(req,res);
});
router.post('/update_material', function(req, res) {
    task.update_material(req,res);
});
router.post('/color_query', function(req, res) {
    task.color_query(req,res);
});
router.post('/add_color', function(req, res) {
    task.add_color(req,res);
});
router.post('/delete_color', function(req, res) {
    task.delete_color(req,res);
});
router.post('/update_color', function(req, res) {
    task.update_color(req,res);
});
//商品上下架
router.post('/goods_waiting', function(req, res) {
    task.goods_waiting(req,res);
});
router.post('/goods_up', function(req, res) {
    task.goods_up(req,res);
});
router.post('/goods_up_update', function(req, res) {
    task.goods_up_update(req,res);
});
router.post('/goods_down', function(req, res) {
    task.goods_down(req,res);
});
router.post('/goods_down_update', function(req, res) {
    task.goods_down_update(req,res);
});
//优惠券
router.post('/coupon', function(req, res) {
    task.coupon(req,res);
});
router.post('/add_coupon', function(req, res) {
    task.add_coupon(req,res);
});
router.post('/delete_coupon', function(req, res) {
    task.delete_coupon(req,res);
});
router.post('/update_coupon', function(req, res) {
    task.update_coupon(req,res);
});
//交易管理
router.post('/book', function(req, res) {
    task.book(req,res);
});
router.post('/book_query', function(req, res) {
    task.book_query(req,res);
});
//商品评价
router.post('/assess', function(req, res) {
    task.assess(req,res);
});
router.post('/assess_back', function(req, res) {
    task.assess_back(req,res);
});
router.post('/book_query_all', function(req, res) {
    task.book_query_all(req,res);
});
module.exports = router;