const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Goods = require('../models/goods');
const User = require('../models/user');
mongoose.Promise = Promise;

//连接mongodb数据库,imall是数据库名称
mongoose.connect('mongodb://127.0.0.1:27017/imall');

let db = mongoose.connection;
db.on('connected', () => {
    console.log("数据库连接成功");
});
db.on('error', () => {
    console.log("数据库连接失败");
});
db.on('disconnected', () => {
    console.log("数据库已断开连接");
});

//为商品展示添加路由
router.get('/list', (req, res, next) => {
    let page = Number(req.query.page), //当前所在页数
        pageSize = Number(req.query.pageSize), //每页的条数
        priceLevel = req.query.priceLevel, //价格区间的index
        sort = Number(req.query.sort), //排序方式
        skip = Number((page - 1) * pageSize); //查询数据时，跳过前面页数的数据

    let params = {}; //条件查询传递的参数

    //判断所选的价格区间
    let priceGt = '',
        priceLw = '';
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLw = 60;
                break;
            case '1':
                priceGt = 60;
                priceLw = 100;
                break;
            case '2':
                priceGt = 100;
                priceLw = 300;
                break;
            case '3':
                priceGt = 300;
                priceLw = 800;
                break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLw
            }
        };

    }

    //find返回一个模型
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);

    //sort 1为升序，-1为降序
    goodsModel.sort({ 'salePrice': sort });

    goodsModel.exec((err, doc) => {

        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }

    });
});

//为购物车添加路由，直接写二级路由，不要加/goods
router.post('/addCart', (req, res, next) => {
    let userId = '100000077',
        productId = req.body.productId; //通过productId去数据库中查询数据，而不用直接全部从前端获取，不安全

    let user; //用户信息
    User.findOne({ userId: userId })
        .then((userDoc) => {
            user = userDoc;

            let goodsItem = '';
            user.cartList.forEach((item) => {
                //如果用户的购物车中已经存在这件商品
                if (item.productId === productId) {
                    goodsItem = item;
                    item.productNum++;
                    return;
                }
            });
            return goodsItem;
        })
        .then((goodsItem) => {
            if (goodsItem) {
                return user.save();
            } else {
                Goods.findOne({ productId: productId })
                    .then((goodsDoc) => {
                        goodsDoc.productNum = 1;
                        goodsDoc.checked = true;
                        user.cartList.push(goodsDoc);
                        return user.save();
                    });
            }
        })
        .then(() => {
            res.json({
                status: '0',
                msg: '',
                result: 'success'
            });
        })
        .catch((err) => {
            res.json({
                status: '1', //1为发生错误
                msg: err.message
            });
        });
});



module.exports = router;