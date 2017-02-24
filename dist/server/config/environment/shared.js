'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uriImg = 'https://img.91pintuan.com'; //媒体文件
var uriPht = 'https://photo.91pintuan.com'; //用户上传文件
var phtStl320160 = '@1e_1c_0o_0l_399sh_160h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=8&t=63&s=58&color=I2U2ZGVkZQ&p=9&y=5&x=5';
var phtStl320 = '@1e_1c_0o_0l_399sh_320h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=12&t=52&s=57&color=I2ZmZmZmZg&p=9&y=5&x=5';
var phtStl120 = '@1e_1c_0o_0l_100sh_120h_120w_90q.src';
var allPoiObj = {
  id: '574e8ee63027e17c4b56c0bc',
  name: '全部门店',
  num: 0
};
var commodity = {
  status: {
    paytype: 'fullpay',
    collection: 0,
    qrcode: false,
    address: false,
    shelf: true,
    type: 1, // 1实物，2虚拟@todo 开发默认虚拟
    // poi:true,
    virtual: 1 // 1微信码，2自定义码 @todo 开发默认自定义码
  },
  time: {
    start: (0, _moment2.default)().add(10, 'minutes').format('YYYY-MM-DD HH:mm'),
    end: (0, _moment2.default)().add(2, 'months').format('YYYY-MM-DD HH:mm')
  },
  money: {
    price: 0,
    discount: 0,
    days: 1,
    hours: 0,
    minutes: 0,
    partakers: 2,
    commission: 0,
    prepayment: 100,
    piece: 0,
    stock: 0
  },
  pois: [],
  sku: [],
  stocks: [],
  logistic: {
    headReceive: '0',
    type: '0',
    uniformFreight: 0
  },
  consumeType: '0',
  poitag: allPoiObj,
  virtualComm: {
    consumeCredentialType: 0
  }
};
var tinymceOptions = {
  'language': 'zh_CN',
  'baseURL': uriImg + '/bower_components/tinymce',
  'language_url': uriImg + '/serve/tinymce.zh_CN.js',
  // 'skin_url': uriImg+'/bower_components/tinymce-dist/skins/lightgray',
  'convert_urls': false,
  'menubar': false,
  'content_css': uriImg + '/serve/tinymce.css',
  'plugins': ['textcolor link image insertdatetime paste code emoticons preview autoresize'], //media
  'toolbar_items_size': 'small',
  'toolbar': ' bold italic underline | bullist numlist | alignleft aligncenter alignright alignjustify | forecolor backcolor' + ' fontsizeselect | link image emoticons insertdatetime | removeformat undo redo | code preview', //media
  'fontsize_formats': '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt',
  'statusbar': false,
  'resize': true,
  'width': '100%',
  'autoresize_min_height': 394,
  'autoresize_max_height': 1000,
  'insertdatetime_formats': ['%Y年%m月%d号', '%H点%M分'],
  'object_resizing': false,
  'image_description': false,
  'image_dimensions': false,
  'image_class_list': [{ title: '默认', value: 'img-responsive' }, { title: '圆角', value: 'img-rounded' }, { title: '圆形', value: 'img-circle' }, { title: '边框', value: 'img-thumbnail' }],
  'file_picker_types': 'image',
  'file_picker_callback': function file_picker_callback(callback, value, meta) {
    if (meta.filetype === 'image') {
      $('<input />').attr({ type: 'file', name: 'file' }).trigger('click').change(function () {
        var fd = new FormData();
        var file = $(this)[0].files[0];
        fd.append('file', file);
        callback('上传中，请稍后...', { alt: '上传中' });
        RestAlbum.one('up').withHttpConfig({ transformRequest: angular.identity }).customPOST(fd, undefined, undefined, { 'Content-Type': undefined }).then(function (data) {
          if (data.link) {
            callback(data.link, { alt: data.name });
          }
        });
      });
    }
  }
};

var app = {};

app['www.dev.songni.cc'] = {
  api: 'http://apidev.91songli.cc',
  name: '91送礼开发版',
  wechat: '91送礼',
  telephone: '010-84988362',
  icp: '京ICP证060911',
  suffix: '.def'
};
app['www.91songli.cc'] = {
  api: 'https://api.91songli.cc',
  name: '91送礼',
  wechat: '91送礼',
  telephone: '010-84988362',
  icp: '京ICP证060911',
  suffix: '.def'
};
app['www.91songli.com'] = {
  api: 'https://api.91songli.com',
  name: '91送礼',
  wechat: '91送礼',
  telephone: '010-84988362',
  icp: '京ICP证060911',
  suffix: '.def'
};
app['www.dalibao.com'] = {
  api: 'http://api.dalibao.com',
  name: '大礼包',
  wechat: '村村乐',
  telephone: '010-51692648',
  icp: '京公网安备11010102001340号',
  suffix: '.cuncunle'
};

exports = module.exports = {
  development: { //开发版
    uri: 'http://apidev.91songli.cc',
    uriImg: uriImg,
    uriPht: uriPht,
    style: {
      phtStl320160: phtStl320160,
      phtStl320: phtStl320,
      phtStl120: phtStl120
    },
    component: '5726bf8700bbe21526c4ccbe',
    debug: true,
    from: 'merchant',
    commodity: commodity,
    allPoiObj: allPoiObj,
    tinymceOptions: tinymceOptions,
    app: app
  },
  production: { //产品版本
    uri: 'http://api.91songli.cc',
    uriImg: uriImg,
    uriPht: uriPht,
    style: {
      phtStl320160: phtStl320160,
      phtStl320: phtStl320,
      phtStl120: phtStl120
    },
    component: '5581117b5f225e4c401c9259',
    debug: false,
    from: 'merchant',
    commodity: commodity,
    allPoiObj: allPoiObj,
    tinymceOptions: tinymceOptions,
    app: app
  }
};
//# sourceMappingURL=shared.js.map
