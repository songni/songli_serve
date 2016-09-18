'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

// Get list of things
exports.index = function (req, res) {
  var url = 'http://' + req.host + '.songni.cc/gift/listen/' + req.params.id;
  var QRCode = require('qrcode');
  /*
  QRCode.toDataURL(url,function(err,src){
    res.render('qrcode',{src:src});
  });
  QRCode.draw('mama', function(error,canvas){
    res.render('qrcode',{src:canvas.toDataURL()});
  });*/
  var Canvas = require('canvas'),
      Image = Canvas.Image,
      canvas = new Canvas(600, 600),
      ctx = canvas.getContext('2d');

  QRCode.draw(url, function (err, qrcode) {
    canvas = new Canvas(600, 600);
    ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = qrcode.toBuffer();
    ctx.drawImage(img, 100, 70, 400, 400);
    //头像
    //var avator = new Image();
    //avator.src = config.root+'/data/avator/maitian.jpg';
    //ctx.drawImage(avator,260,250,50,50);

    ctx.font = "bold 24px 'WenQuanYi Micro Hei'";
    ctx.fillText('亲爱的大鼻子', 100, 30);

    ctx.font = "16px 'WenQuanYi Micro Hei'";
    ctx.fillText('微信扫一扫,听Ta对你说', 130, 80);

    ctx.fillText('大鼻子 2015年7月7日', 310, 470);

    var w = canvas.width;
    var h = canvas.height;
    var data = ctx.getImageData(0, 0, w, h);
    var compositeOperation = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);

    var stream = canvas.pngStream();
    var out = require('fs').createWriteStream(config.root + '/data/qrcode/a.png');
    stream.on('data', function (chunk) {
      out.write(chunk);
    });
    stream.on('end', function () {
      console.log('saved png');
    });

    res.render('qrcode', { src: canvas.toDataURL() });
  });
};
exports.gift_get = function (req, res, next) {
  var request = require('request');
  require('request').debug = true;
  var hostname = req.host.split('.').shift();
  var options = {
    url: config.api.uri + '/gift/order/' + req.params.id,
    headers: {
      'X-API-From': 'merchant',
      'X-Component': config.api.component
    },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.send('系统错误！');
      return;
    }
    if (response.statusCode !== 200) {
      var message = body.errmsg ? body.errmsg : '系统错误！';
      res.send(message);
      return;
    }
    if (!error && response.statusCode == 200) {
      req.order = body;
      next();
    }
  });
};
exports.gift_qrcode = function (req, res) {
  var url = 'http://' + req.host + '/gift/listen/' + req.order.id;
  var QRCode = require('qrcode');
  QRCode.toDataURL(url, function (err, src) {
    res.render('qrcode_gift', { src: src, order: req.order });
  });
};
exports.download = function (req, res) {
  var Archiver = require('archiver');
  var zip = Archiver('zip');
  var fs = require('fs');
  this.body = zip;
  zip.on('error', function (err) {
    console.log(err);
  });
  zip.on('close', function () {
    console.log('压缩程式写入 %d 字节', zip.pointer());
  });
  for (var i in giftorders) {
    var order = giftorders[i];
    var dir = '/mnt/photo/images/gift/qrcode/' + moment(order.time.add).format('YYYY-M') + '/';
    var file = dir + order.serial + '.png';
    if (fs.existsSync(file)) {
      zip.append(fs.createReadStream(file), { name: order.serial + '.png' });
    }
  }
  zip.finalize();
};
//# sourceMappingURL=qrcode.controller.js.map
