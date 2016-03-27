
// init mocker data.
var globalConf = {
	validate: {
		userId: function(str) {
			return new RegExp('^[a-zA-Z0-9_\\-]+$').test(str);
		},
		password: function(str) {
			return new RegExp('^.*[a-zA-Z0-9_\\-]+.*$').test(str);
		},
		notEmpty: function(str) {
			return new RegExp('^\\S+$').test(str);
		}
	},
	user: {
		userId: "Phoenix",
		password: "phoenix",
		login: false
	},
	products: [
		{id: 10, name: "prod1", desc: "about product - 1."},
		{id: 11, name: "prod2", desc: "about product - 2."},
		{id: 12, name: "prod3", desc: "about product - 3."},
		{id: 13, name: "prod4", desc: "about product - 4."}
	]
};

var sessionStorage = window.sessionStorage,
	localStorage = window.localStorage;
if(!localStorage) {
	alert('Please open in Chrome with latest version.');
}


// angularjs
var myTest = angular.module('myTest', []);
myTest.factory('rootData', function() {
	return {
		showLoginBox: true,
		showTopBar: false,
		showList: false,
		userId: '',
	}
});

myTest.controller('myTestCtrl', ['$scope', 'rootData', function($scope, rootData) {
	$scope.rootData = rootData;
}]);

myTest.controller('loginForm', ['$scope', 'rootData', function($scope, rootData) {
	$scope.rootData = rootData;
	rootData.userId = $scope.sessionUserId = sessionStorage.getItem('userId');
	$scope.sessionPassword = sessionStorage.getItem('password');

	// check login status
	if(sessionStorage.length
	   && $scope.sessionUserId === 'Phoenix'
	   && $scope.sessionPassword === 'phoenix') {
		rootData.showLoginBox = false;
		rootData.showTopBar = true;
		rootData.showList = true;
		// alert('Wellcome.');
	}
}]);

myTest.controller('topBar', ['$scope', 'rootData', function($scope, rootData) {
	// $scope.userId = sessionStorage.userId;
}]);

myTest.controller('productList', ['$scope', function($scope) {
	$scope.products = globalConf.products;
}]);

myTest.directive('topbar', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/topBar.html',
		link: function(scope, element, attrs) {
			scope.logout = function() {
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('password');
				scope.rootData.showLoginBox = true;
				scope.rootData.showTopBar = false;
				scope.rootData.showList = false;
			}
		}
	}
});

myTest.directive('loginbox', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/loginBox.html',
		link: function(scope, element, attrs) {
			// login action
			scope.login = function() {
				var $userId = $('#userId'),
					$password = $('#password'),
					userId = $.trim($('#userId').val()),
					password = $.trim($('#password').val());
				if(!globalConf.validate.userId(userId) || !globalConf.validate.notEmpty(userId)) {
					alert('USERID is invalid.');
					$userId.focus();
					return false;
				}
				if(!globalConf.validate.password(password) || !globalConf.validate.notEmpty(password)) {
					alert('PASSWORD is invalid.');
					$password.focus();
					return false;
				}
				// simulate login
				if(userId === globalConf.user.userId && password === globalConf.user.password) {
					alert('Login success.');
					if(!!sessionStorage) {
						sessionStorage.setItem('userId', userId);
						sessionStorage.setItem('password', password);
						console.log('ID: ', sessionStorage.getItem('userId'), ', PW: ', sessionStorage.getItem('password'));
					}
					scope.rootData.showLoginBox = false;
					scope.rootData.showTopBar = true;
					scope.rootData.showList = true;
				} else {
					alert('login failed.');
				}
			}
		}
	}
});

myTest.directive('list', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/list.html',
		link: function(scope, element, attrs) {
			var cartList = [];
			scope.buy = function() {
				var curIndex = this.$index;
				var curProInfo = '{' +
					'id:' + scope.products[curIndex].id +
					',name:' + scope.products[curIndex].name +
					',desc:' + scope.products[curIndex].desc +
				'}';
				cartList.push(curProInfo);
				localStorage.setItem('cart', cartList);
				console.log(localStorage.getItem('cart'))
			}
		}
	}
});