'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('album', {
        url: '/album',
        templateUrl: 'app/album/album.html',
        controller: 'AlbumCtrl'
      });
  });