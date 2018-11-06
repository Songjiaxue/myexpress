/**
 * Created by songjx 2017/3/22.
 */
var express = require('express');
var router = express.Router();
var task = require('./tasks.js');/*公用方法（增删改查）*/
var sql = require('./sqlMapping.js');
//登录判断
module.exports.login = function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(sql.login.query+username+'" and password = "'+password+'"');
    task.query(sql.login.query+username+'" and password = "'+password+'"',function (err,rows) {
        if(err){
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        }
        else{
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    });
};
//个人中心资料修改
module.exports.login_update = function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var id = req.body.id;
    var sex = req.body.sex;
    var age = req.body.age;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    console.log(req);
    task.query(sql.login.update+username+'",password="'+password+'",sex="'+sex+'",age="'+age+'",address="'+address+'",phone="'+phone+'",email="'+email+'" where id='+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//会员列表
module.exports.user = function (req,res) {
    console.log(req.body);
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.id;
    var obj = {};
    console.log(sql.user.find+admin_id+'" limit  '+start+','+pageSize);
    task.query(sql.user.find+admin_id+'" limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            console.log(rows);
            obj.list = rows;
            task.query(sql.user.find+admin_id+'"', function (err, rows) {
                if (err) {
                    console.log(err);
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
//会员条件查询
module.exports.user_con = function (req,res) {
    console.log(req.body);
    var pageSize = req.body.pageSize;
    var user_type = req.body.user_type;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.id;
    var obj = {};
    console.log(sql.user.find_con+' limit  '+start+','+pageSize);
    task.query(sql.user.find_con+user_type+' and admin_id = "'+admin_id+'" limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            console.log(rows);
            obj.list = rows;
            task.query(sql.user.find+admin_id+'"', function (err, rows) {
                if (err) {
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
//删除商品
module.exports.delete_user= function (req,res) {
    var par = req.body.id;
    task.query(sql.user.delete+'"'+par+'"',function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
/**
 *
 * 商品管理
 */
//商品列表
module.exports.goods = function (req,res) {
    console.log(req.body);
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.admin_id;
    var obj = {};
    console.log(sql.goods.find+admin_id+'"order by create_time desc limit  '+start+','+pageSize);
    task.query(sql.goods.find+admin_id+'"order by create_time desc limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            console.log(rows);
            obj.list = rows;
            task.query(sql.goods.find+admin_id+'"', function (err, rows) {
                if (err) {
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
//新增商品
module.exports.add_goods = function (req,res) {
    var goods_id = new Date().getTime().toString();
    var goods_name = req.body.goods_name;
    var goods_img = req.body.goods_img;
    var goods_type = req.body.goods_type;
    var goods_size = req.body.goods_size;
    var goods_material = req.body.goods_material;
    var goods_color = req.body.goods_color;
    var service = req.body.service;
    var admin_id = req.body.admin_id;
    var create_time = new Date().getTime();
    console.log(sql.goods.add+'"'+ goods_id + '","'+ goods_name +'","'+ goods_img + '","'+ goods_img + '","'+ goods_size + '","'+ goods_material + '","'+ goods_color + '","'+ service + '")');
    task.query(sql.goods.add+'"'+ goods_id + '","'+ goods_name +'","'+ goods_img + '","'+ goods_type + '","'+ goods_size + '","'+ goods_material + '","'+ goods_color + '","'+ service + '","'+create_time+'","'+admin_id+'",2)', function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//删除商品
module.exports.delete_goods= function (req,res) {
    var par = req.body.id;
    task.query(sql.goods.delete+'"'+par+'"',function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//修改商品
module.exports.update_goods = function (req,res) {
    var goods_name = req.body.goods_name;
    var goods_img = req.body.goods_img;
    var goods_type = req.body.goods_type;
    var goods_size = req.body.goods_size;
    var goods_material = req.body.goods_material;
    var goods_color = req.body.goods_color;
    var service = req.body.service;
    var create_time = new Date().getTime();
    var id = req.body.id;
    console.log(sql.goods.update+'"'+goods_name+'",goods_img="'+goods_img+'",goods_type="'+goods_type+'",goods_size="'+goods_size+'",goods_material="'+goods_material+'",goods_color="'+goods_color+'",service="'+service+'" where id='+id);
    task.query(sql.goods.update+goods_name+'",goods_img="'+goods_img+'",goods_type="'+goods_type+'",goods_size="'+goods_size+'",goods_material="'+goods_material+'",goods_color="'+goods_color+'",service="'+service+'",create_time="'+create_time+'" where id='+id, function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
/**
 *
 * 商品分类
 */
module.exports.goods_type = function (req,res) {
    console.log(req.body);
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.admin_id;
    var obj = {};
    console.log(sql.goods_type.find+admin_id+' limit  '+start+','+pageSize);
    task.query(sql.goods_type.find+admin_id+'" limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            console.log(rows);
            obj.list = rows;
            task.query(sql.goods_type.find+admin_id+'"', function (err, rows) {
                if (err) {
                    console.log(err);
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
 //新增商品分类
module.exports.add_goods_type = function (req,res) {
    var type = req.body.type;
    var f_type_id = req.body.f_type_id;
    var admin_id = req.body.admin_id;
    console.log(sql.goods_type.add+'"'+ type + '",'+'"'+ f_type_id +'","'+admin_id +'")');
    task.query(sql.goods_type.add+'"'+ type + '",'+'"'+ f_type_id +'","'+admin_id +'")', function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//新增商品类型父级option
module.exports.goods_type_query = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.goods_type.find+admin_id+'"',function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.goods_z_type = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.goods_type.find_z_list+admin_id,function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//商品类型展开子级
module.exports.goods_z_type_query = function (req,res) {
    var par = req.body.id;
    var admin_id = req.body.admin_id;
    console.log(sql.goods_type.find_z+par);
    task.query(sql.goods_type.find_z+par+' and admin_id = "'+admin_id+'"',function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//删除商品类型
module.exports.delete_goods_type = function (req,res) {
    var par = req.body.type_id;
    task.query(sql.goods_type.delete+'"'+par+'"',function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
//修改商品类型
module.exports.update_goods_type = function (req,res) {
    var type = req.body.type;
    var f_type_id = req.body.f_type_id;
    var id = req.body.id;
    console.log(req);
    task.query(sql.goods_type.update+'"'+type+'"'+',f_type_id="'+f_type_id+'" where id='+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows, function (result) {
                res.json(result);
            });
        }
    })
};
/**
 * 商品规格
 */
//尺寸
module.exports.size_query = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.goods_size.size_query+admin_id+'" order by id desc', function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.add_size = function (req,res) {
    var size = req.body.size;
    var admin_id = req.body.admin_id;
    console.log(sql.goods_size.add_size+size+'")');
    task.query(sql.goods_size.add_size+size+'","'+admin_id+'")', function (err, rows) {
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
};
module.exports.delete_size = function (req,res) {
    var id = req.body.id;
    task.query(sql.goods_size.delete_size+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.update_size = function (req,res) {
    var id = req.body.id;
    var size = req.body.size;
    console.log(sql.goods_size.update_size+size+'" where id = '+id)
    task.query(sql.goods_size.update_size+size+'" where id = '+id, function (err, rows) {
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
};
//材质
module.exports.material_query = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.goods_size.material_query+admin_id+'" order by id desc', function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.add_material= function (req,res) {
    var material = req.body.material;
    var admin_id = req.body.admin_id;
    console.log(sql.goods_size.add_material+material+'")');
    task.query(sql.goods_size.add_material+material+'","'+admin_id+'")', function (err, rows) {
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
};
module.exports.delete_material = function (req,res) {
    var id = req.body.id;
    task.query(sql.goods_size.delete_material+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.update_material = function (req,res) {
    var id = req.body.id;
    var material = req.body.material;
    console.log(sql.goods_size.update_material+material+'" where id = '+id)
    task.query(sql.goods_size.update_material+material+'" where id = '+id, function (err, rows) {
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
};
//颜色
module.exports.color_query = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.goods_size.color_query+admin_id+'" order by id desc', function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.add_color = function (req,res) {
    var color = req.body.color;
    var admin_id = req.body.admin_id;
    console.log(sql.goods_size.add_color+color+'","'+admin_id+'")');
    task.query(sql.goods_size.add_color+color+'","'+admin_id+'")', function (err, rows) {
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
};
module.exports.delete_color = function (req,res) {
    var id = req.body.id;
    task.query(sql.goods_size.delete_color+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.update_color = function (req,res) {
    var id = req.body.id;
    var color = req.body.color;
    console.log(sql.goods_size.update_color+color+'" where id = '+id)
    task.query(sql.goods_size.update_color+color+'" where id = '+id, function (err, rows) {
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
};
//上架商品
module.exports.goods_up = function (req,res) {
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.admin_id;
    var obj = {};
    task.query(sql.goods_up.find_1+ admin_id +'"  order by create_time desc limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            obj.list = rows;
            task.query(sql.goods_up.find_1+admin_id+'"', function (err, rows) {
                if (err) {
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
//上架操作
module.exports.goods_up_update = function (req,res) {
    var id = req.body.id;
    var coupon_name = req.body.coupon_name;
    var number = req.body.number;
    task.query(sql.goods_up.update_1+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                console.log(sql.goods_up.setGoods+coupon_name+'",volume="'+number+'" where id = '+id);
                task.query(sql.goods_up.setGoods+coupon_name+'",volume="'+number+'" where id = '+id, function (err, rows) {
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
            });
        }
    })
};
//待处理
module.exports.goods_waiting = function (req,res) {
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.admin_id;
    var obj = {};
    console.log(sql.goods_up.find_2 + admin_id+'" order by create_time desc limit '+start+','+pageSize);
    task.query(sql.goods_up.find_2 + admin_id +'" order by create_time desc limit '+start+','+pageSize, function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            obj.list = rows;
            task.query(sql.goods_up.find_2 + admin_id+'"', function (err, rows) {
                if (err) {
                    console.log(err);
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.number = rows.length;
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
//下架商品
module.exports.goods_down = function (req,res) {
    console.log(req.body);
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var admin_id = req.body.admin_id;
    var obj = {};
    console.log(sql.goods_up.find_0+admin_id+'"  order by create_time desc limit  '+start+','+pageSize);
    task.query(sql.goods_up.find_0+admin_id+'"  order by create_time desc limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            console.log(rows);
            obj.list = rows;
            task.query(sql.goods_up.find_0 +admin_id+'"', function (err, rows) {
                if (err) {
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
//下架操作
module.exports.goods_down_update = function (req,res) {
    var id = req.body.id;
    console.log(sql.goods_up.update_1+id)
    task.query(sql.goods_up.update_0+id, function (err, rows) {
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
};
//优惠券
module.exports.coupon = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.coupon.find +admin_id +'" order by id desc', function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.add_coupon = function (req,res) {
    var coupon_name = req.body.coupon_name;
    var coupon_total = req.body.coupon_total;
    var coupon_money = req.body.coupon_money;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var number = req.body.number;
    var admin_id = req.body.admin_id;
    console.log(sql.coupon.add+coupon_name+'","'+coupon_total+'","'+coupon_money+'","'+start_time+'","'+end_time+'","'+number+'")');
    task.query(sql.coupon.add+coupon_name+'","'+coupon_total+'","'+coupon_money+'","'+start_time+'","'+end_time+'","'+number+'","'+admin_id+'")', function (err, rows) {
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
};
module.exports.delete_coupon = function (req,res) {
    var id = req.body.id;
    task.query(sql.coupon.delete+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.update_coupon = function (req,res) {
    var id = req.body.id;
    var coupon_name = req.body.coupon_name;
    var coupon_total = req.body.coupon_total;
    var coupon_money = req.body.coupon_money;
    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var number = req.body.number;
    console.log(sql.coupon.update+coupon_name+'",coupon_total="'+coupon_total+'",coupon_money="'+coupon_money+'",start_time="'+start_time+'",end_time="'+end_time+'",number="'+number+'" where id = "'+id+'"');
    task.query(sql.coupon.update+coupon_name+'",coupon_total="'+coupon_total+'",coupon_money="'+coupon_money+'",start_time="'+start_time+'",end_time="'+end_time+'",number="'+number+'" where id = "'+id+'"', function (err, rows) {
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
};
//交易管理
module.exports.book = function (req,res) {
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var book_status = req.body.book_status;
    var admin_id = req.body.admin_id;
    var obj = {};
    console.log(sql.book.find+book_status+' limit  '+start+','+pageSize+' order by create_time desc');
    task.query(sql.book.find+book_status+' and admin_id = "'+admin_id+'" order by create_time desc limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                console.log(err);
                res.json(result.code);
            });
        } else {
            console.log(rows);
            obj.list = rows;
            task.query(sql.book.find+book_status, function (err, rows) {
                if (err) {
                     console.log(err);
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.number = rows.length;
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
module.exports.book_query = function (req,res) {
    var id = req.body.id;
    task.query(sql.book.query+id, function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
module.exports.book_query_all = function (req,res) {
    var admin_id = req.body.admin_id;
    task.query(sql.book.query_all+admin_id+'" order by create_time desc limit 0,5', function (err, rows) {
        if (err) {
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            task.success(rows,function (result) {
                res.json(result);
            });
        }
    })
};
//商品评价
module.exports.assess = function (req,res) {
    var pageSize = req.body.pageSize;
    var start = pageSize*parseInt(req.body.currentPage-1);
    var assess_status = req.body.assess_status;
    var admin_id = req.body.admin_id;
    var obj = {};
    console.log(sql.assess.find+assess_status+' and admin_id = "'+admin_id+'" order by id desc limit  '+start+','+pageSize);
    task.query(sql.assess.find+assess_status+' and admin_id = "'+admin_id+'" order by id desc limit  '+start+','+pageSize, function (err, rows) {
        if (err) {
            console.log(err);
            task.failure(err,function (result) {
                res.json(result.code);
            });
        } else {
            obj.list = rows;
            task.query(sql.assess.find+assess_status + ' and admin_id = "' +admin_id +'"', function (err, rows) {
                if (err) {
                     console.log(err);
                    task.failure(err,function (result) {
                        res.json(result.code);
                    });
                } else {
                    obj.total = Math.ceil(rows.length/pageSize);
                    task.success(obj, function (result) {
                        res.json(result);
                    });

                }
            })
        }
    })
};
module.exports.assess_back = function (req,res) {
    var id = req.body.id;
    var assess_back = req.body.assess_back;
    var assess_back_details = req.body.assess_back_details;
    console.log(1111);
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

