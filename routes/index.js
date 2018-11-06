var express = require('express');
var router = express.Router();
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
    res.render('user', { title: 'Express' });
});
router.get('/shop', function(req, res, next) {
    res.render('shop', { title: 'Express' });
});
router.get('/goods_type', function(req, res, next) {
    res.render('goods_type', { title: 'Express' });
});
router.get('/modal_goods_type', function(req, res, next) {
    res.render('modal_goods_type', { title: 'Express' });
});
router.get('/goods', function(req, res, next) {
    res.render('goods', { title: 'Express' });
});
router.get('/goods_size', function(req, res, next) {
    res.render('goods_size', { title: 'Express' });
});
router.get('/goods_up', function(req, res, next) {
    res.render('goods_up', { title: 'Express' });
});
//优惠券
router.get('/coupon', function(req, res, next) {
    res.render('coupon', { title: 'Express' });
});
//订单管理
router.get('/book', function(req, res, next) {
    res.render('book', { title: 'Express' });
});
router.get('/book_query', function(req, res, next) {
    res.render('book_query', { title: 'Express' });
});
//商品评价
router.get('/assess', function(req, res, next) {
    res.render('assess', { title: 'Express' });
});
module.exports = router;
