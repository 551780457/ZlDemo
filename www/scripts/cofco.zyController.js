"user strict"

//置业中心首页
app.controller('BASE.ZY.indexController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup',function ($scope, $location,AJAX, _User, $ionicPopup) {
    var User = _User(); 
    var resultData = AJAX.data('GetAllProjectList', { AppID: User.AppID },'GET',true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.Project = result.data.data;
        }else {
            $scope.GetAllProjectListError = true;
        }

    });
    var resultAd = AJAX.data('GetADList', { AdpID: "5" },'GET',true);
    resultAd.then(function (result) {
        if (result.data.status == 1) {
            $scope.Ad = result.data.data;
        }
    });
} ]);

//置业项目首页
app.controller('BASE.ZY.projectController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams', 'OpenUrl', function ($scope, $location, AJAX, _User, $ionicPopup, $stateParams, OpenUrl) {
    var User = _User();    
    var resultData = AJAX.data('GetProjectInfo', { AppID: User.AppID, ID: $stateParams.id });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.infomation = result.data.data;
            var FeeArr = result.data.data.BuildingCategory.split("|");
            $scope.Arr = FeeArr;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
    $scope.Navigation = function () {
        var url = "http://api.map.baidu.com/marker?location=" + $scope.infomation.Location_X + "," + $scope.infomation.Location_Y + "&title=" + $scope.infomation.Name + "&content=" + $scope.infomation.Name + "&output=html";
        OpenUrl.SystemChorme(url);
    }
} ]);

//购房进度
app.controller('BASE.ZY.gfProgressController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams',function ($scope, $location,AJAX, _User, $ionicPopup, $stateParams) {
    var User = _User();   
    var resultData = AJAX.data('GetTradeList', { AppID: User.AppID });
    resultData.then(function (result) {
        if (result.data.status > 1) {
            $scope.GetTradeList = result.data.data;
        }else {
            $scope.GetTradeListError = true;
        }
    });
    //购房进度详情
    if ($stateParams.tradeid != null) {
        var resultInfo = AJAX.data('GetTradeInfo', { AppID: User.AppID, TradeGUID: $stateParams.tradeid });
        resultInfo.then(function (result) {
            if (result.data.status == 1) {
                $scope.TradeInfo = result.data.data;
            }
            else {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
            }
        });
        //
        var resultPro = AJAX.data('GetTradeGetin', { AppID: User.AppID, TradeGUID: $stateParams.tradeid });
        resultPro.then(function (result) {
            if (result.data.status == 1) {
                $scope.Getin = result.data.data;
            }
            else {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
            }
        });
        //gongkuan
        var resultjy = AJAX.data('GetTradeFee', { AppID: User.AppID, TradeGUID: $stateParams.tradeid });
        resultjy.then(function (result) {
            if (result.data.status == 1) {
                $scope.Fee = result.data.data;
            }
            else {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
            }
        });
    }
}]);


//项目周边
app.controller('BASE.ZY.aroundController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup','$stateParams', function ($scope, $location,AJAX, _User, $ionicPopup,$stateParams) {
    var User = _User();
    var resultData = AJAX.data('GetProjectInfo', { AppID: User.AppID, ID: $stateParams.id });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.infomation = result.data.data;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

}]);

//置业中心首页之优惠信息
app.controller('BASE.ZY.couponController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams', function ($scope, $location, AJAX, _User, $ionicPopup, $stateParams) {
    var User = _User();   
    var resultData = AJAX.data('GetInformationManageList', { TypeID: "8", pageIndex: "1", pageSize: "", Authority: "" });
    resultData.then(function (result) {
        if (result.data.status == 1) {

            $scope.infomationList = result.data.data;
            console.log($scope.infomationList);
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
    var resultData2 = AJAX.data('GetInformationManageInfo', { ID: $stateParams.id });
    resultData2.then(function (result2) {
        if (result2.data.status == 1) {

            $scope.infomation = result2.data.data;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result2.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });


}]);

//位置导航
app.controller('BASE.ZY.navigationController', ['$scope', '$location', function ($scope, $location) {

}]);

//工程进度
app.controller('BASE.ZY.progressController', ['$scope', '$location','AJAX', '_User', '$ionicPopup', '$stateParams', function ($scope, $location,AJAX, _User, $ionicPopup, $stateParams) {
    var User = _User();
    var resultData = AJAX.data('GetInformationManageList', { TypeID: "8", pageIndex: "", pageSize: "", Authority: "" });
    resultData.then(function (result) {
        if (result.data.status == 1) {

            $scope.infomationList = result.data.data;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

    var resultData2 = AJAX.data('GetInformationManageInfo', { ID: $stateParams.id });
    resultData2.then(function (result2) {
        if (result2.data.status == 1) {

            $scope.infomation = result2.data.data;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result2.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
}]);

//购房预约
app.controller('BASE.ZY.purchaseController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams', "statusSocketServices", '$filter', function ($scope, $location, AJAX, _User, $ionicPopup, $stateParams, statusSocketServices, $filter) {
    var User = _User();
    var purchase = $scope.purchase = {
        phone: User.Phone,
        truename: User.Name,
        time: "",
        content: ""
    }

    var resultVisit = AJAX.data('GetVisitInfo', { AppID: User.AppID, ProjectID: $stateParams.projectid });
    resultVisit.then(function (result) {
        if (result.data.status == 1) {
            $scope.Visit = result.data.data;
            if ($scope.Visit != null) {
                purchase.time = $scope.Visit.VisitTime;
            }
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
    $scope.sub = function () {
        var _time = $filter('date')($scope.purchase.time, "yyyy-MM-dd hh:mm:ss");
        var resultData = AJAX.data('SubmitVisitAppoint', { AppID: User.AppID, ProjectID: $stateParams.projectid, ProjectName: $stateParams.name, MobilePhone: $scope.purchase.phone, Name: $scope.purchase.truename, VisitTime: _time, Remark: $scope.purchase.content });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                statusSocketServices.statusClassName = "ion-happy-outline";
                statusSocketServices.contentText = "预约成功";
                statusSocketServices.buttonClassName = "button-energized";
                statusSocketServices.buttonText = "查看项目";
                statusSocketServices.buttonLink = "#/tabs/zy_Project/" + $stateParams.projectid;
                $location.path("/status");
            }
            else {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
            }
        });
    }

    var resultinfomation = AJAX.data('GetProjectInfo', { AppID: User.AppID, ID: $stateParams.projectid });
    resultinfomation.then(function (result) {
        if (result.data.status == 1) {
            $scope.infomation = result.data.data;
            var FeeArr = result.data.data.BuildingCategory.split("|");
            $scope.Arr = FeeArr;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });
} ]);
//物业绑定
app.controller('BASE.ZY.bindingController', ['$scope', '$location',function ($scope, $location) {

}]);
//全民经纪人
app.controller('BASE.ZY.universalAgentController', ['$scope', '$location', 'AJAX', 'User', '$ionicPopup', '$stateParams',function ($scope, $location,AJAX, User, $ionicPopup, $stateParams) {

}]);

//全民经纪人之我要推荐
app.controller('BASE.ZY.iRecommendController', ['$scope', '$location',function ($scope, $location) {

}]);

//全民经纪人之我的客户
app.controller('BASE.ZY.myClientController', ['$scope', '$location',function ($scope, $location) {

}]);

//全民经纪人之我的佣金
app.controller('BASE.ZY.myCommissionController', ['$scope', '$location',function ($scope, $location) {

}]);

//全民经纪人之活动详情
app.controller('BASE.ZY.activityRulesController', ['$scope', '$location',function ($scope, $location) {

}]);

//全民经纪人之活动详情
app.controller('BASE.ZY.CustomeCenter', ['$scope', '$location', 'AJAX', '_User',function ($scope, $location, AJAX, _User) {
    var User = _User();
    var resultData = AJAX.data('GetProjectList', { AppID: User.AppID, pageIndex: 1, pageSize: 100 });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.ProjectList = result.data.data;
        }
        else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

}]);
