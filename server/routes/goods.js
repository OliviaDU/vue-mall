let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Goods = require('../models/goods');

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

router.get('/', (req, res, next) => {
    let page = Number(req.query.page),//当前所在页数
        pageSize = Number(req.query.pageSize),//每页的条数
        priceLevel = req.query.priceLevel,//价格区间的index
        sort = Number(req.query.sort),//排序方式
        skip = Number((page - 1) * pageSize);//查询数据时，跳过前面页数的数据
        
    let params = {};//条件查询传递的参数

    //判断所选的价格区间
    let priceGt = '',
        priceLw = '';
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLw = 100;
                break;
            case '1':
                priceGt = 100;
                priceLw = 500;
                break;
            case '2':
                priceGt = 500;
                priceLw = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLw = 5000;
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

module.exports = router;
