'use strict';

angular.module('serveApp')
.directive('ngPrint', function() {
	var printSection = document.getElementById('printSection');
	if (!printSection) {
		  printSection = document.createElement('div');
		  printSection.id = 'printSection';
		  document.body.appendChild(printSection);
	}
	function link(scope, element, attrs) {
		  element.on('click', function () {
		      var elemToPrint = document.getElementById(attrs.printElementId);
		      if (elemToPrint) {
		          printElement(elemToPrint);
		      }
		  });
		  window.onafterprint = function () {
		      printSection.innerHTML = '';
		  }
	}
	function printElement(elem) {
		  var domClone = elem.cloneNode(true);
			printSection.innerHTML = '';
		  printSection.appendChild(domClone);
		  window.print();
	}
	return {
		  link: link,
		  restrict: 'A'
	};
});
