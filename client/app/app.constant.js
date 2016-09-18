(function(angular, undefined) {
  angular.module("serveApp.constants", [])
.constant("appConfig", {
	"apiUri": {
		//dev
		"www.dev.songni.cc": "http://apidev.91songli.cc",
		//prd
		"www.songni.cc": "http://api.91songli.cc"
	},
	"uriImg": "https://img.91pintuan.com",
	"uriPht": "https://photo.91pintuan.com",
	"style": {
		"phtStl320160": "@1e_1c_0o_0l_399sh_160h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=8&t=63&s=58&color=I2U2ZGVkZQ&p=9&y=5&x=5",
		"phtStl320": "@1e_1c_0o_0l_399sh_320h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=12&t=52&s=57&color=I2ZmZmZmZg&p=9&y=5&x=5",
		"phtStl120": "@1e_1c_0o_0l_100sh_120h_120w_90q.src"
	},
	"component": "5726bf8700bbe21526c4ccbe",
	"debug": true,
	"from": "merchant",
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
		"toolbar": " bold italic underline | bullist numlist | forecolor backcolor | image emoticons insertdatetime | removeformat undo redo | code preview",
		"statusbar": false,
		"resize": true,
		"width": 541,
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
	}
})

;
})(angular);