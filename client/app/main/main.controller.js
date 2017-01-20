'use strict';

var academyList = [
  {'time': '2017.01.05', 'num': 'NO.26期', 'coverImg': 'diershiliuqi.jpg', 'vcodeImg': 'new-years.png', 'type': 'payLesson', 'share': '银川万达嘉华酒店市场传讯部掌门人', 'shareName': '张巍弋', 'title': '0广告费卖出1000张高客单价自助餐券?', 'logoImg': 'logo2.png'},
  {'time': '2016.12.29', 'num': 'NO.25期', 'coverImg': 'diershiwuqi.jpg', 'oneHref': '302965815/86867918.shtml', 'share': '91资深营销讲师', 'shareName': '李庆旭', 'title': '年底微信送礼怎么玩?可口可乐这招你也可以用'},
  {'time': '2016.12.22', 'num': 'NO.24期', 'coverImg': 'diershisiqi.jpg', 'vcodeImg': 'vcode-ershisi.jpg', 'type': 'payLesson', 'share': '昆山鲜果乐园运营经理', 'shareName': '莫汉生', 'title': '不用微信群，我照样可以3天流水84万！', 'logoImg': 'logo2.png'},
  {'time': '2016.12.13', 'num': 'NO.23期', 'coverImg': 'diershisan.jpg', 'oneHref': '302965815/86868344.shtml','share': '洋果子部落创始人', 'shareName': '方科寅','title': '阶梯团+社群，3天4000人！宁波洋果子怎么玩？', 'logoImg': 'logo2.png' },
  {'time': '2016.12.06', 'num': 'NO.22期', 'coverImg': 'diershierqi.jpg', 'vcodeImg': 'vcode-1206.png', 'type': 'payLesson', 'share': '91资深客服顾问', 'shareName': '陆婷婷','title': '手把手教你玩转91送礼营销新武器' },
  {'time': '2016.11.22', 'num': 'NO.21期', 'coverImg': 'ershiyi.jpg', 'vcodeImg': 'ershiyi-code.png', 'type': 'payLesson', 'share': '江西宜春的创业者', 'shareName': '李哲','title': '联合网红将流量变现，生鲜行业小白逆袭社交电商' },
  {'time': '2016.11.15', 'num': 'NO.20期', 'coverImg': 'ershiqi.jpg', 'vcodeImg': 'ershiqi-code.png', 'type': 'payLesson', 'share': '91资深服务商牵手哥', 'shareName': '卢国栋','title': '县城小店如何利用微信拼团3次活动盈利20万' },
  {'time': '2016.11.03', 'num': 'NO.18期', 'coverImg': 'dishijiuqi.png', 'oneHref': '302965815/85896098.shtml', 'share': '91明星商家丹东水果先生', 'shareName': '创始人','title': '连续3个月单日流水100元后如何扭亏为盈', 'logoImg': 'logo2.png' },
  {'time': '2016.10.25', 'num': 'NO.17期', 'coverImg': 'halloween_4.png', 'vcodeImg': 'lqx_lessoncode.png', 'type': 'payLesson', 'share': '91拼团资深营销讲师', 'shareName': '李庆旭','title': '零广告费3天做出千人团，手把手教你微信群营销' },
  {'time': '2016.10.19', 'num': 'NO.16期', 'coverImg': 'halloween_2.png', 'vcodeImg': 'xdx_lessoncode.png', 'type': 'payLesson', 'share': '91资深社交电商讲师', 'shareName': '小东邪','title': '零粉丝到8000单，手把手教你拼团分销三步法' },
  {'time': '2016.10.11', 'num': 'NO.15期', 'coverImg': 'halloween_3.png', 'otherHref': '26784467.html', 'share': '91明星商家婆婆家水果工厂创始人', 'shareName': '张磊','title': '如何24小时打败同城拥有6家门店的竞争对手？', 'logoImg': 'logo2.png' },
  {'time': '2016.09.27', 'num': 'NO.14期', 'coverImg': 'halloween_1.png', 'otherHref': '26732280.html', 'share': '91明星商家天善智能', 'shareName': '高阔', 'title': '2000人小社群如何做到流水13万？', 'logoImg': 'logo2.png' },
  {'time': '2016.09.22', 'num': 'NO.13期', 'coverImg': 'dishisanqi.png', 'href': 'id_XMTczNDk2ODMyOA==.html', 'share': '91明星商家檬果生活', 'shareName': '姜伟','title': '以上的生鲜电商怎么玩？', 'logoImg': 'logo2.png' },
  {'time': '2016.09.08', 'num': 'NO.12期', 'coverImg': 'dishierqi.png', 'href': 'id_XMTczMDE5MTM2OA==.html', 'share': '小黄人科技的创始人', 'shareName': '唐三藏老师','title': '想一年增粉200万？14个涨粉方式今天一次教给你' },
  {'time': '2016.09.01', 'num': 'NO.11期', 'coverImg': 'dishiyiqi.png', 'href': 'id_XMTcwOTg4MzA0NA==.html?beta&', 'share': '鲜牛记联合创始人', 'shareName': '韩永坤','title': '这家餐厅如何靠病毒营销种子轮估值3000万？' },
  {'time': '2016.08.25', 'num': 'NO.10期', 'coverImg': 'dishiqi.png', 'href': 'id_XMTcwMDQ4MzEzMg==.html', 'share': '91创始人', 'shareName': '周磊','title': '91送礼营销新武器' },
  {'time': '2016.08.18', 'num': 'NO.9期', 'coverImg': 'dijiuqi.png', 'href': 'id_XMTY5MDg0MzgyMA==.html', 'share': '91明星商家星美高端版永久定妆中心创始人', 'shareName': 'Gina','title': '从40平扩张到240平的美容机构如何做到加单由极致的口碑营销', 'logoImg': 'logo2.png' },
  {'time': '2016.08.11', 'num': 'NO.8期', 'coverImg': 'dibaqi.png', 'href': 'id_XMTY4MTMyMzI0NA==.html', 'share': '91明星商家元宝妈妈', 'shareName': '蒋君','title': '召集6000妈妈粉丝助力幼教机构两天报名近千人', 'logoImg': 'logo2.png'},
  {'time': '2016.08.04', 'num': 'NO.7期', 'coverImg': 'diqiqi.png', 'href': 'id_XMTY3MjA3MTI2NA==.html', 'share': '91优秀江苏服务商', 'shareName': '王怀乾','title': '用拼团玩转会员卡 门店引流 / 会员卡二合一' },
  {'time': '2016.07.28', 'num': 'NO.6期', 'coverImg': 'diliuqi.png', 'href': 'id_XMTY2Nzg0MjM4NA==.html', 'share': '91优秀服务商', 'shareName': '周维中','title': '线下门店如何高效引流？' },
  {'time': '2016.07.21', 'num': 'NO.5期', 'coverImg': 'juzihui.png', 'href': 'id_XMTY1OTg4NjgxNg==.html', 'share': '桔子会创始人', 'shareName': '廖江涛','title': '社群+教育如何成为大杀器？' },
  {'time': '2016.07.14', 'num': 'NO.4期', 'coverImg': 'disiqi.png', 'href': 'id_XMTY1OTg4NDc4MA==.html', 'share': '91资深服务商', 'shareName': '樊莉昌','title': '一次活动为门店引流千人｜山鲜生水果案例分享' },
  {'time': '2016.07.07', 'num': 'NO.3期', 'coverImg': 'disanqi.png', 'href': 'id_XMTY1OTg4MzQ0NA==.html', 'share': '91资深客服顾问', 'shareName': '小东邪','title': '拼海鲜零粉丝三个月做出6000单' },
  {'time': '2016.06.30', 'num': 'NO.2期', 'coverImg': 'dierqi.png', 'href': 'id_XMTY1OTg4MjU4NA==.html', 'share': '91资深客服顾问', 'shareName': '陆婷婷','title': '30平米水果店，拼团单日盈利5000元?' },
  {'time': '2016.06.23', 'num': 'NO.1期', 'coverImg': 'diyiqi.png', 'href': 'id_XMTY1OTg4MDk2MA==.html', 'share': '91资深客服顾问', 'shareName': 'Coco','title': '0粉丝到日均1000订单，社群电商4步法首次公开' },
  {'time': '2016.05.25', 'num': '大咖课', 'coverImg': 'yuxiansheng.png', 'href': 'id_XMTY1OTg3NjYwOA==.html', 'share': '91创始人周磊' ,'title': '91拼团创始人周磊对话鱼先生水果创始人！', 'logoImg': 'logo2.png'},
  {'time': '2016.05.18', 'num': '大咖课', 'coverImg': 'guoranfeng.png', 'href': 'id_XMTY1OTg3MTA0OA==.html', 'share': '91明星商家果然丰' ,'title': '一个人就能玩转的千人水果拼团', 'logoImg': 'logo2.png'},
  {'time': '2016.05.11', 'num': '大咖课', 'coverImg': 'caomojia.png', 'href': 'id_XMTY1OTg1ODE2MA==.html', 'share': '91明星商家草摩家的水果' ,'title': '传统水果商向新实体水果跨越的那些坑和风口','logoImg': 'logo2.png'}
];
// 注： type: payLesson 表示收费课程；vcodeImg： 付费课程参团二维码； logoImg: logo2.png 表示有91明星商家logo

angular.module('serveApp')
  .controller('MainCtrl', function ($scope,$stateParams,$cookieStore,$window,$location,RestWecom,RestWechat) {
    $scope.wechat = function(){
      RestWecom.get()
      .then(function(link) {
        location.href = link.link;
      })
    }
    if($stateParams.auth_code){
      RestWecom.one('auth').get({auth_code:$stateParams.auth_code}).then(function(data){
        $cookieStore.put('token', data.token);
        $window.location.href = $location.path();
      });
    }
    if($scope.wxUser){
      // RestWechat.one('qrcode').get({scene_id:1}).then(function(ticket){
      //   $scope.qrcode_ticket = ticket;
      // });
    }
    var load_qrcode = false;
    $scope.$watch('wxUser', function(newVal, oldVal) {
      if(!newVal) return false;
      if(load_qrcode) return false;
      load_qrcode = true;
      // RestWechat.one('qrcode').get({scene_id:1}).then(function(ticket){
      //   $scope.qrcode_ticket = ticket;
      //   load_qrcode = false;
      // });
    }, true);
  })
  .controller('NullModalCtrl', function($scope,$state,$uibModalInstance){
    $scope.cancel = function () {
      $state.go('plans.center');
      $uibModalInstance.dismiss('cancel');
    };
  })
  .controller('academyController',function($scope){
    $scope.academy = academyList;
    $scope.videoUrl = "http://v.youku.com/v_show/";
    $scope.otherUrl = "http://www.le.com/ptv/vplay/";
    $scope.oneUrl = "http://my.tv.sohu.com/us/";
    $scope.ptSrc  = "https://img.91pintuan.com/home/academy/";
    
    var listLength = $scope.academy.length;
    var line;

    if( listLength%3 == 0){
      line = parseInt(listLength/3);
    }else{
      line = parseInt(listLength/3) + 1;
    } 
    $scope.line = line;
  });