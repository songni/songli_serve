'use strict';

// 每页显示条数 limit
angular.module('serveApp')
.directive('nosyPagi', function(){
  return {
    restrict: 'E',
    transclude: true,
    scope: { pagi:'=pagi',dropup:'@' },
    controller:function($scope){
      $scope.pages = [10,20,50,100,200,500,1000];
      //var pagi = {totalItems: 0,currentPage : 1,maxSize : 5,itemsPerPage : 20};
      //$scope.pagi = angular.merge(pagi,$scope.pagi);
      $scope.chgPage = function(){
        $scope.pagi.itemsPerPage = this.page;
        $scope.pagi.currentPage = 1;
      };
    },
    template: '<uib-pagination boundary-links="true" total-items="pagi.totalItems" ng-model="pagi.currentPage" items-per-page="pagi.itemsPerPage" max-size="pagi.maxSize" class="pagination-sm" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></uib-pagination><div class="btn-group btn-group-sm pull-left pagi-per-page" ng-class="{\'dropup\':dropup}" uib-dropdown><button type="button" class="btn btn-metis-5 btn-line btn-sm" uib-dropdown-toggle>{{pagi.itemsPerPage}}条/页 <span class="caret"></span></button><ul class="dropdown-menu"><li ng-repeat="page in pages"><a href="#" ng-click="chgPage()">{{page}}条/页</a></li></ul></div>'
  };
});
