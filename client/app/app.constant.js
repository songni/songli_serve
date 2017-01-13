(function(angular, undefined) {
  angular.module("serveApp.constants", [])

.constant("appConfig", {
	"uri": "http://api.91songli.cc",
	"uriImg": "https://img.91pintuan.com",
	"uriPht": "https://photo.91pintuan.com",
	"style": {
		"phtStl320160": "@1e_1c_0o_0l_399sh_160h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=8&t=63&s=58&color=I2U2ZGVkZQ&p=9&y=5&x=5",
		"phtStl320": "@1e_1c_0o_0l_399sh_320h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=12&t=52&s=57&color=I2ZmZmZmZg&p=9&y=5&x=5",
		"phtStl120": "@1e_1c_0o_0l_100sh_120h_120w_90q.src"
	},
	"component": "5581117b5f225e4c401c9259",
	"debug": false,
	"from": "merchant",
	"commodity": {
		"status": {
			"paytype": "fullpay",
			"collection": 0,
			"qrcode": false,
			"address": false,
			"shelf": true,
			"type": 1,
			"virtual": 1
		},
		"time": {
			"start": "2017-01-13 14:39",
			"end": "2017-03-13 14:29"
		},
		"money": {
			"price": 0,
			"discount": 0,
			"days": 1,
			"hours": 0,
			"minutes": 0,
			"partakers": 2,
			"commission": 0,
			"prepayment": 100,
			"piece": 0,
			"stock": 0
		},
		"pois": [],
		"sku": [],
		"stocks": [],
		"logistic": {
			"headReceive": "0",
			"type": "0",
			"uniformFreight": 0
		},
		"consumeType": "0",
		"poitag": {
			"id": "574e8ee63027e17c4b56c0bc",
			"name": "全部门店",
			"num": 0
		},
		"virtualComm": {
			"consumeCredentialType": 0
		}
	},
	"allPoiObj": {
		"id": "574e8ee63027e17c4b56c0bc",
		"name": "全部门店",
		"num": 0
	},
	"tinymceOptions": {
		"language": "zh_CN",
		"baseURL": "https://img.91pintuan.com/bower_components/tinymce",
		"language_url": "https://img.91pintuan.com/serve/tinymce.zh_CN.js",
		"convert_urls": false,
		"menubar": false,
		"content_css": "https://img.91pintuan.com/serve/tinymce.css",
		"plugins": [
			"textcolor link image insertdatetime paste code emoticons preview autoresize"
		],
		"toolbar_items_size": "small",
		"toolbar": " bold italic underline | bullist numlist | alignleft aligncenter alignright alignjustify | forecolor backcolor fontsizeselect | link image emoticons insertdatetime | removeformat undo redo | code preview",
		"fontsize_formats": "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
		"statusbar": false,
		"resize": true,
		"width": "100%",
		"autoresize_min_height": 394,
		"autoresize_max_height": 1000,
		"insertdatetime_formats": [
			"%Y年%m月%d号",
			"%H点%M分"
		],
		"object_resizing": false,
		"image_description": false,
		"image_dimensions": false,
		"image_class_list": [
			{
				"title": "默认",
				"value": "img-responsive"
			},
			{
				"title": "圆角",
				"value": "img-rounded"
			},
			{
				"title": "圆形",
				"value": "img-circle"
			},
			{
				"title": "边框",
				"value": "img-thumbnail"
			}
		],
		"file_picker_types": "image"
	},
	"app": {
		"www.dev.songni.cc": {
			"api": "http://apidev.91songli.cc",
			"name": "91送礼开发版",
			"wechat": "91送礼",
			"telephone": "010-84988362",
			"icp": "京ICP证060911",
			"suffix": ".def"
		},
		"www.91songli.cc": {
			"api": "http://api.91songli.cc",
			"name": "91送礼",
			"wechat": "91送礼",
			"telephone": "010-84988362",
			"icp": "京ICP证060911",
			"suffix": ".def"
		},
		"www.91songli.com": {
			"api": "http://api.91songli.com",
			"name": "91送礼",
			"wechat": "91送礼",
			"telephone": "010-84988362",
			"icp": "京ICP证060911",
			"suffix": ".def"
		},
		"www.dalibao.com": {
			"api": "http://api.dalibao.com",
			"name": "大礼包",
			"wechat": "村村乐",
			"telephone": "010-51692648",
			"icp": "京公网安备11010102001340号",
			"suffix": ".cuncunle"
		}
	}
})

;
})(angular);