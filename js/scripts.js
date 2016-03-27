(function(angular) {
	'use strict';

	var politinder = angular.module('politinderModule', ['gajus.swing']);

	politinder.controller('politinderController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

		$scope.swingOptions = {
		    throwOutConfidence: function (offset, element) {
		        console.log('throwOutConfidence', offset, element.offsetWidth);
		        return Math.min(Math.abs(offset) / element.offsetWidth, 1);
		    },
		    isThrowOut: function (offset, element, throwOutConfidence) {
		        console.log('isThrowOut', offset, element.offsetWidth, throwOutConfidence);
		        return throwOutConfidence === .5;
		    }
		};

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

			$timeout(function () {
				$scope.$apply();
			}, 10);

		});

		$scope.iTrustIn = function(politician, i) {
			$scope.nextPolitician(politician, i);
		}

		$scope.iDontTrustIn = function(politician, i) {
			$scope.nextPolitician(politician, i);
		}

		$scope.nextPolitician = function(politician, i) {
			// remove
			$scope.currentPoliticians.splice(i, 1);

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
