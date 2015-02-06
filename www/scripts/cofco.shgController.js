"user strict"

//生活馆中心首页
app.controller('BASE.SHG.indexController', ['$scope', 'AJAX', '$rootScope', '_User', '$ionicPopup', function ($scope, AJAX, $rootScope, _User, $ionicPopup) {
    var User = _User();
    //var resultData = AJAX.data("GetADList", { AdpID: "1" }, 'GET', true);//推荐分类
    //resultData.then(function (result) {
    //    if (result.data.status) {
    //        $scope.GetADList = result.data.data;
    //    } else
    //        $ionicPopup.alert({
    //            title: '操作提示!',
    //            template: result.data.info,
    //            okText: "确　定",
    //            okType: "button-energized"
    //        });
    //});

    var resultData = AJAX.data("GetHS_CluList", { AppID: User.AppID }, 'GET', true);//推荐分类
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.ClubList = result.data.data;
        }
    });


    var resultData = AJAX.data("GetActivityList", { "AppID": User.AppID, "pageSize": 4, "Modules": "P0134" }, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status && result.data.data.length > 0) {
            $scope.GetActivityListSuccess = true;
            $scope.GetActivityList = result.data.data;
        } else {
            $scope.GetActivityListError = true;
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
}]);

//生活馆活动详情
app.controller('BASE.SHG.activityDetailsController', ['$scope', function ($scope) {

}]);

//生活馆资讯
app.controller('BASE.SHG.informationController', ['$scope', function ($scope) {

}]);

//我要预订
app.controller('BASE.SHG.chamberController', ['$scope', 'AJAX', '_User', '$ionicPopup', 'Storage', '$stateParams', function ($scope, AJAX, _User, $ionicPopup, Storage, $stateParams) {
    var User = _User();
    var resultData = AJAX.data("GetClubBookingType", { "AppID": User.AppID, 'ClubID': 1 });
    resultData.then(function (result) {
        if (result.data.status && result.data.data.length > 0) {
            $scope.GetClubBookingType = result.data.data;
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

    var resultData = AJAX.data("HSClubInfo", { "AppID": User.AppID, 'ClubID': 1 });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.HSClubInfo = result.data.data;
            var storage = new Storage();
            storage.setValue("HSClubInfo", result.data.data);
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '获取预订项目详情失败',
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
}]);

//预订列表
app.controller('BASE.SHG.reserveController', ['$scope', '$stateParams', 'AJAX', '_User', '$ionicPopup', 'Storage', function ($scope, $stateParams, AJAX, _User, $ionicPopup, Storage) {
    var User = _User();

    $scope.HSClubInfo = new Storage().getValue("HSClubInfo");

    var BookingTypeID = $stateParams.BookingTypeID;
    var resultData = AJAX.data("GetClubBookingList", { "AppID": User.AppID, 'BookingTypeID': BookingTypeID });
    resultData.then(function (result) {
        if (result.data.status && result.data.data.length > 0) {
            $scope.GetClubBookingList = result.data.data;
        } else {
            $scope.GetClubBookingListError = true;
        }
    });
}]);

//预订列表详情
app.controller('BASE.SHG.orderController', ['$scope', '$stateParams', 'AJAX', '_User', '$ionicPopup', '$state', '$filter', function ($scope, $stateParams, AJAX, _User, $ionicPopup, $state, $filter) {
    var User = _User();
    var BookingID = $stateParams.BookingID;
    var resultData = AJAX.data("GetClubBookingInfo", { "AppID": User.AppID, 'BookingID': BookingID });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.Booking = result.data.data;
            window.sessionStorage.setItem("Booking", JSON.stringify(result.data.data));
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '获取预订项目详情失败',
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

    var user = $scope.user = {
        phone: User.Phone,
        name: User.Name,
        number: "",
        dateTime: ""
    };

    $scope.submitRes = function () {
        var _time = $("input[type=date]").val() +" "+ $("input[type=time]").val()+":00";
        var resultData = AJAX.data("SubmitClubBookingOrder", { "AppID": User.AppID, 'BookingID': BookingID, 'MobilePhone': user.phone, "Num": user.number, "Name": user.name, "Time": _time});
        resultData.then(function (result) {
            if (result.data.status) {
                $state.go('base.tabs.shg_Hs_Order_Affirm', { id: result.data.data });
            } else {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template:result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
            }
        });
    }
}]);

//我的订单
app.controller('BASE.SHG.reserveOrderController', ['$scope', 'AJAX', '_User', '$ionicPopup', function ($scope, AJAX, _User, $ionicPopup) {
    var User = _User();
    var resultData = AJAX.data("GetClubBookingOrderList", { "AppID": User.AppID });
    resultData.then(function (result) {
        if (result.data.status && result.data.data.length > 0) {
            $scope.GetClubBookingOrderList = result.data.data;
        } else {
            $scope.GetClubBookingOrderListError = true;
        }
    });
}]);

//我的身份
app.controller('BASE.SHG.hsCardController', ['$scope', 'AJAX', '_User', '$ionicPopup', function ($scope, AJAX, _User, $ionicPopup) {
    var User = _User();
    var resultData = AJAX.data("GetHSMemberInfo", { "AppID": User.AppID });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.GetHSMemberInfo = result.data.data;
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '获取预订项目详情失败',
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
}]);

//预订订单详情
app.controller('BASE.SHG.reserverDetailController', ['$scope', 'AJAX', '_User', '$ionicPopup', '$stateParams', 'Storage', '$state', function ($scope, AJAX, _User, $ionicPopup, $stateParams, Storage, $state) {
    var User = _User();
    var resultData = AJAX.data("GetClubBookingOrderInfo", { "AppID": User.AppID, "BookingStateID": $stateParams.id });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.GetClubBookingOrderInfo = result.data.data;
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '获取预订项目详情失败',
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
}]);

//预订订单确认
app.controller('BASE.SHG.orderAffirmController', ['$scope', 'AJAX', '_User', '$ionicPopup', '$stateParams', 'Storage', '$state', function ($scope, AJAX, _User, $ionicPopup, $stateParams, Storage, $state) {
    var User = _User();
    $scope.Booking = JSON.parse(window.sessionStorage.getItem("Booking"));
    var resultData = AJAX.data("GetClubBookingOrderInfo", { "AppID": User.AppID, "BookingStateID": $stateParams.id });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.GetClubBookingOrderInfo = result.data.data;
            $scope.State = ($scope.GetClubBookingOrderInfo.Money > 0) ? true : false;
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '获取预订项目详情失败',
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

    var resultData = AJAX.data("GetOnLinePayList", { "AppID": User.AppID, 'Modules': "P0134" });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.GetOnLinePayList = result.data.data;
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '获取支付列表失败',
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

    $scope.zfType = 0;

    $scope.GetPayType = function (ConfID) {
        $scope.zfType = ConfID;
    }

    $scope.submitZf = function () {
        $state.go("base.tabs.base_play", { AppID: User.AppID, Modules: "P0134", BankCode: $scope.zfType, PayType: 'HSYD', PayID: $stateParams.id });
    }

    $scope.success = function () {
        var res = $ionicPopup.alert({
            title: '操作提示!',
            template: '预订项目成功',
            okText: "确　定",
            okType: "button-energized"
        });
        res.then(function (result) {
            $state.go("base.tabs.shg");
        });
    }
}]);