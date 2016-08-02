'use strict';

angular.module('serveApp')
  .controller('DocumentCtrl', function ($scope) {
    $scope.title = '文档管理';
  })
  .controller('DocumentModalCtrl', function ($scope, $uibModalInstance, $sce, RestDoc, type) {
    type = type || 'doc';
    RestDoc.one(type).get().then(function(document){
      document.document = $sce.trustAsHtml(document.document);
      $scope.document = document;
    });
    $scope.cancel = function(){$uibModalInstance.dismiss('cancel');};
  })
  ;
