(function(angular) {
	'use strict';

	var politinder = angular.module('politinderModule', ['gajus.swing']);

	politinder.controller('politinderController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

		$scope.politicians = [];
    $scope.currentPoliticians = [];

    $http.get('data/politicians.json').then(function(response) {
			$scope.politicians = response.data;

			var randomPoliticianI;

			for (var i = 0; i < 2; i++) {
				randomPoliticianI = Math.floor(Math.random() * $scope.politicians.length);

				$scope.currentPoliticians.push($scope.politicians[randomPoliticianI]);
				$scope.politicians.splice(randomPoliticianI, 1);
			}
		});

		$scope.clickTrustIn = function() {
			$scope.currentPoliticians[0].trusted = true;
			$timeout(function() {
				$scope.iTrustIn();
			}, 300);
		}

		$scope.clickDontTrustIn = function() {
			$scope.currentPoliticians[0].trusted = false;
			$timeout(function() {
				$scope.iDontTrustIn();
			}, 300);
		}

		$scope.iTrustIn = function() {
			$scope.nextPolitician();
		}

		$scope.iDontTrustIn = function() {
			$scope.nextPolitician();
		}

		$scope.nextPolitician = function() {
			// remove
			$scope.currentPoliticians.splice(0, 1);

			// adds one more
			if ($scope.politicians.length > 0) {
				$scope.currentPoliticians.push($scope.politicians[0]);
			}
			$scope.politicians.splice(0, 1);

			// angular apply
			$timeout(function () {
				$scope.$apply();
			}, 10);
		}
	}]);

})(window.angular);
