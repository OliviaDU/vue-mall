const express = require('express');
const router = express.Router();
const User = require('./../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

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
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
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

module.exports = router;
