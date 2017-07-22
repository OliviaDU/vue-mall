const express = require('express');
const router = express.Router();
const User = require('./../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * 登录
 */
router.post('/login', (req, res, next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  User.findOne(param)
    //如果存在该用户
    .then((doc) => {
      if (doc) {
        //cookie可能会伪造
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24
        });
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 24
        });
        // req.session.user = doc;

        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      }
      //如果不存在该用户
      else {
        res.json({
          status: '1',
          msg: '不存在该用户'
        });
      }
    })
    .catch((err) => {
      res.json({
        status: '1',
        msg: err.message
      });
    });
});

/**
 * 退出
 */
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: {}
  });
});

/**
 * 用户校验
 */
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: {
        userName: req.cookies.userName
      }
    });
  } else {
    res.json({
      status: '1',
      msg: '当前未登录',
      result: ''
    });
  }
});

/**
 * 查询用户购物车数据
 */
router.get('/cartList', (req, res, next) => {
  let userId = req.cookies.userId;
  User.findOne({ userId: userId })
    .then((doc) => {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        });
      }
    })
    .catch((err) => {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    });
});

/**
 * 删除用户购物车数据
 */
router.post('/carDel', (req, res, next) => {
  let productId = req.body.productId,
    userId = req.cookies.userId;

  User.update({
    userId: userId
  }, {
      $pull: {
        'cartList': { 'productId': productId }
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
        status: '1',
        msg: err.message,
        result: ''
      });
    });
});

/**
 * 修改购物车单个商品数量和选择状态
 */
router.post('/cartEdit', (req, res, next) => {
  let productId = req.body.productId,
    userId = req.cookies.userId,
    productNum = req.body.productNum,
    checked = req.body.checked;

  User.update({ userId: userId, "cartList.productId": productId }, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }).then(() => {
    res.json({
      status: '0',
      msg: '',
      result: 'success'
    });
  }).catch((err) => {
    res.json({
      status: '1',
      msg: err.message,
      result: ''
    });
  });

});

/**
 * 全选
 */
router.post('/editCheckAll', (req, res, next) => {
  let userId = req.cookies.userId,
    checkAll = req.body.checkAll;

  User.findOne({ userId: userId })
    .then((user) => {
      if (user) {
        for (let item of user.cartList) {
          item.checked = checkAll;
        }
        user.save();
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
        status: '1',
        msg: err.message,
        result: ''
      });
    });
});

/**
 * 查询用户地址接口
 */
router.get('/addressList', (req, res, next) => {
  let userId = req.cookies.userId;

  User.findOne({ userId: userId })
    .then((user) => {
      if (user) {
        res.json({
          status: '0',
          msg: '',
          result: user.addressList
        });
      }
    })
    .catch((err) => {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    });
});

/**
 * 设置默认地址接口
 */
router.post('/setDefaultAddr', (req, res, next) => {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;

  let addressList,//用户地址列表
    defaultIndex;//默认地址索引

  User.findOne({ userId: userId })
    .then((user) => {
      addressList = user.addressList;
      //如果没有地址信息
      if (!addressList) {
        res.json({
          status: '1003',
          msg: 'addressId is null',
          result: ''
        });
      }
      //如果有地址信息
      else {
        addressList.forEach((item, index) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
            defaultIndex = index;
          } else {
            item.isDefault = false;
          }
        });

        //将修改结果保存到数据库
        return user.save();
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
        status: '1',
        msg: err.message,
        result: 'set default address failed'
      });
    });
});

/**
 * 删除地址接口
 */
router.post('/deleteAddress', (req, res, err) => {
  let userId = req.cookies.userId,
    addressId = req.body.addressId;

  User.update({
    userId: userId
  }, {
      $pull: {
        'addressList': { 'addressId': addressId }
      }
    })
    .then(() => {
      res.json({
        status: '0',
        msg: '删除成功',
        result: ''
      });
    })
    .catch((err) => {
      res.json({
        status: '0',
        msg: err.message,
        result: ''
      });
    });
});

module.exports = router;