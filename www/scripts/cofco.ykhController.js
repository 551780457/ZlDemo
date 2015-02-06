
//悦客会首页
app.controller('BASE.YKH.indexController', ['$scope', '$location', 'AJAX', '_User', '$stateParams', '$ionicPopup', function ($scope, $location, AJAX, _User, $stateParams, $ionicPopup) {
    //用户信息
    var User = _User();
    if (User.Pic == '') {
        User.Pic = "./images/morentouxiang.jpg";
    }
    $scope.MembnerInfo = User;

    //活动
    var resultData = AJAX.data("GetActivityList", { AppID: User.AppID, pageIndex: 1, pageSize: 2 }, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.ActivityList = result.data.data;
        } else {
            $scope.GetActivityListError = true;
        }
    });
}]);
//悦客会之我的权证
app.controller('BASE.YKH.myWarrantController', ['$scope', '$location', 'AJAX', '_User', '$stateParams', '$ionicPopup', function ($scope, $location, AJAX, _User, $stateParams, $ionicPopup) {
    //用户信息
    var User = _User();
    var resultData = AJAX.data("MyWarrants", { AppID: User.AppID });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            if (result.data.data.length > 1) {
                $scope.MyWarrants = result.data.data;
                scope.MyWarrantsError = false;
            } else {
                $scope.MyWarrantsError = true;
            }
        } else {
            $scope.MyWarrantsError = true;
        }
    });
}]);

//悦客会之品质调研
app.controller('BASE.YKH.qualitySurveyController', ['$scope', '$location', 'AJAX', '_User', '$stateParams', '$ionicPopup', 'statusSocketServices', '$rootScope', function ($scope, $location, AJAX, _User, $stateParams, $ionicPopup, statusSocketServices, $rootScope) {
    //用户信息
    var User = _User();
    $rootScope.pageIndex = 2;
    $scope.noData = true;
    if ($stateParams.TID) {

        $scope.HouseInfo = { Name: "", ProjectID: "", HouseNumber: "" };

        //项目列表
        var resultProjectData = AJAX.data("GetAllProjectList", { AppID: User.AppID });
        resultProjectData.then(function (result) {
            if (result.data.status == 1) {
                $scope.ProjectList = result.data.data;
            } else {
                $scope.GetAllProjectListError = true;
            }
        });



        //问卷调查
        var resultData = AJAX.data("GetCustomTableColumn", { AppID: User.AppID, TID: $stateParams.TID });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $scope.CustomTableColumn = result.data.data;
            } else {
                $scope.GetCustomTableColumnError = true;
            }
        });

        //问卷提交
        $scope.SubmitQuality = function () {
            var v = $scope.CustomTableColumn;

            //数据验证
            if ($scope.HouseInfo.Name == "") {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "姓名不能为空",
                    okText: "确　定",
                    okType: "button-energized"
                });
                return;
            }
            if ($scope.HouseInfo.ProjectID == "") {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "项目不能为空",
                    okText: "确　定",
                    okType: "button-energized"
                });
                return;
            }
            if ($scope.HouseInfo.HouseNumber == "") {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "房号不能为空",
                    okText: "确　定",
                    okType: "button-energized"
                });
                return;
            }

            var b_validata = true;
            //angular.forEach($scope.CustomTableColumn, function (value, index) {
            //    if (!$scope.Validate(value)) {
            //        b_validata = false;
            //        return;
            //    }
            //});

            for (var i = 0; i < $scope.CustomTableColumn.length; i++) {
                value = $scope.CustomTableColumn[i];
                if (!$scope.Validate(value)) {
                    b_validata = false;
                    //return;
                    break;
                }
            }



            if (!b_validata) { return; }

            var resultData = AJAX.data("SendCustomTable", { AppID: User.AppID, TID: $stateParams.TID, InputData: JSON.stringify($scope.CustomTableColumn) }, "POST");
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    statusSocketServices.statusClassName = "ion-happy-outline";
                    statusSocketServices.contentText = result.data.info;
                    statusSocketServices.buttonClassName = "button-energized";
                    statusSocketServices.buttonText = "前往填写其他调研";
                    statusSocketServices.buttonLink = "#/tabs/ykh_QualitySurvey";
                    $location.path("/status");
                }
                else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }

        //数据验证
        $scope.Validate = function (value) {
            var controlvalue = value.InputValue;

            var REGMobileTelephone = /^(\(\d{3,4}\)|\d{3,4}-)?(13\d|15\d|18\d)\d{8}$/;
            var REGNoNull = /\S/;
            var REGTelephone = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
            var REGEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            var REGUrl = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
            var REGZip = /^\d{6}$/;
            var REGPhone = /^((0(\d{2,3}|(\d{2,3}-)))?(13\d|15\d|18\d)\d{8})|(0(\d{2,3}|(\d{2,3}-))\d{7,8})$/;
            //var REGPhone = /^(0(\d{2,3}|(\d{2,3}-)){1})$/;
            var REGInteger = /^[0-9]+$/;
            var REGDouble = /^\d+?(\.\d*)?$/;

            var REGDate = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01])$/;
            //var REGDateTime = /^(\d{4})-(0\d{1}|1[0-2])-(0\d{1}|[12]\d{1}|3[01]) $/; 

            switch (value.ShowType) {
                case 1:
                case 3:
                    if (value.IsNotNull == 1 && controlvalue == "") {

                        $ionicPopup.alert({
                            title: '操作提示!',
                            template: value.ShowName + "不能为空",
                            okText: "确　定",
                            okType: "button-energized"
                        }); return false;
                    }
                    switch (value.Ctype) {
                        case "int":
                            if (!REGInteger.test(controlvalue)) {
                                $ionicPopup.alert({
                                    title: '操作提示!',
                                    template: value.ShowName + "格式有问题",
                                    okText: "确　定",
                                    okType: "button-energized"
                                }); return false;
                            }
                            break;
                        case "stirng":
                            break;
                        case "date":
                            if (!REGDate.test(controlvalue)) {
                                $ionicPopup.alert({
                                    title: '操作提示!',
                                    template: value.ShowName + "格式有问题",
                                    okText: "确　定",
                                    okType: "button-energized"
                                }); return false;
                            }
                            break;
                        case "datetime":
                            break;

                    }
                    if (value.VerifyRule != "") {
                        if (!value.VerifyRule.test(controlvalue)) {
                            $ionicPopup.alert({
                                title: '操作提示!',
                                template: value.ShowName + "格式有问题",
                                okText: "确　定",
                                okType: "button-energized"
                            });
                        }
                    }
                    break;
            }

            return true;
        }
    }
    else {

        var resultData = AJAX.data("GetCustomTable", { AppID: User.AppID, pageIndex: 1, pageSize: 10, Modules: "", Authority: "" });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $scope.CustomTable = result.data.data;
            }
            else {
                $scope.CustomTableError = true;
            }
        });

        $scope.loadMoreData = function () {
            var resultData1 = AJAX.data("GetCustomTable", { AppID: User.AppID, pageIndex: $rootScope.pageIndex, pageSize: 5, Modules: "", Authority: "" });
            resultData1.then(function (result1) {
                if (result1.data.status && result1.data.data.length > 0) {
                    var arry = $scope.CustomTable || [];
                    $scope.CustomTable = arry.concat(result1.data.data);
                    $rootScope.pageIndex++;
                    $scope.CustomTableError = false;
                } else {
                    $scope.CustomTableError = true;
                    $scope.noData = false;
                }
            });
        }
    }

}]);

//悦客会之联盟商家
app.controller('BASE.YKH.merchantController', ['$scope', '$location', 'AJAX', '_User', '$stateParams', '$ionicPopup', 'OpenUrl', '$rootScope', function ($scope, $location, AJAX, _User, $stateParams, $ionicPopup, OpenUrl, $rootScope) {
    //用户信息
    var User = _User();
    $rootScope.pageIndex = 2;
    $scope.noData = true;
    if ($stateParams.AllianceBusinessID) {

        //商家详情
        var resultData = AJAX.data("GetAllianceMerchantInfo", { AppID: User.AppID, AllianceBusinessID: $stateParams.AllianceBusinessID });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $scope.AllianceMerchantInfo = result.data.data;
                $scope.listAddress = result.data.listAddress;
            } else {
                $scope.GetAllianceMerchantInfoError = true;
            }
        });

        $scope.GetBd = function (X, Y, Name) {
            OpenUrl.SystemChorme("http://api.map.baidu.com/marker?location=" + X + "," + Y + "&title=" + Name + "&content=" + Name + "&output=html");
        }



        //商家优惠券
        $scope.unCounponList = function () {
            var resultCouponList = AJAX.data("GetCouponList", {
                AppID: User.AppID,
                Issue: $stateParams.AllianceBusinessID,
                pageIndex: 1,
                pageSize: 10,
                Modules: "P0132"
            });
            resultCouponList.then(function (result) {
                if (result.data.status == 1) {
                    $scope.unCounpon = new Array();
                    $scope.CounponList = result.data.data;
                    var resultResult = AJAX.data("GetCouponResultList", { AppID: User.AppID, pageIndex: 1, pageSize: 100 });
                    resultResult.then(function (result1) {
                        if (result1.data.status == 1 && result1.data.data.length > 0) {
                            $scope.Counpon = result1.data.data;
                            var CounponCount = $scope.CounponList.length;
                            var CounponListCount = $scope.Counpon.length;
                            var m = 0;
                            var n = 0;
                            for (var m = 0; m < CounponCount; m++) {
                                var IsE = false;
                                for (var n = 0; n < CounponListCount; n++) {

                                    if ($scope.CounponList[m].InteractId == $scope.Counpon[n].InteractId) {
                                        IsE = true;
                                        //$scope.unCounpon.push($scope.CounponList[m]);
                                        //a = a
                                        //continue;
                                        break;
                                    }
                                }
                                if (!IsE) $scope.unCounpon.push($scope.CounponList[m]);
                            }
                            if ($scope.unCounpon.length > 0) {
                                $scope.GetCouponListError = false;
                            }
                            else {
                                $scope.GetCouponListError = true;
                            }
                        } else {
                            $scope.GetCouponResultListError = true;
                        }
                    });
                }
                else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }
        $scope.unCounponList();
        //领取优惠券
        $scope.GetCoupon = function (InteractID) {
            //领取优惠券
            var resultGetCoupon = AJAX.data("TakeCoupon", { AppID: User.AppID, InteractID: InteractID, SN: "" });
            resultGetCoupon.then(function (result) {
                if (result.data.status == 1) {
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: "领取成功",
                        okText: "确　定",
                        okType: "button-energized"
                    });
                    $scope.unCounponList();
                }
                else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }

    }
    else if ($stateParams.Type) {
        switch ($stateParams.Type) {
            case "1":
                $scope.title = "中粮品牌";
                break;
            case "2":
                $scope.title = "联盟商家";
                break;
        }
        var resultData = AJAX.data("GetAllianceMerchantList", { AppID: User.AppID, pageIndex: 1, pageSize: 12, TypeID: $stateParams.Type });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $scope.Merchant = result.data.data;
            }
            else
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
        });
        $scope.loadMoreData = function () {
            var resultData = AJAX.data("GetAllianceMerchantList", { AppID: User.AppID, pageIndex: $rootScope.pageIndex, pageSize: 12, TypeID: $stateParams.Type });
            resultData.then(function (result) {
                if (result.data.status == 1 && result.data.data.length > 0) {
                    var arry = $scope.Merchant || [];
                    $scope.Merchant = arry.concat(result.data.data);
                    $rootScope.pageIndex++;
                }
                else {
                    $scope.noData = false;
                }
            });
        }
    }
}]);

//悦客会之我的优惠券
app.controller('BASE.YKH.myCouponController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', function ($scope, $location, AJAX, _User, $ionicPopup) {

    //用户信息
    var User = _User();
    var CounponResultList;
    $scope.GetCouponResultList = function () {
        //我的优惠券
        var resultData = AJAX.data("GetCouponResultList", { AppID: User.AppID, pageIndex: 1, pageSize: 10 });
        resultData.then(function (result) {
            if (result.data.status == 1 && result.data.data.length > 0) {
                $scope.CounponResultList = result.data.data;
                CounponResultList = result.data.data;
            } else {
                $scope.GetCouponResultListError = true;
            }
        });
    }
    $scope.GetCouponResultList();


    //全部优惠券
    $scope.unCounponList = function () {
        var resultData = AJAX.data("GetCouponList", {
            AppID: User.AppID,
            Issue: "",
            pageIndex: 1,
            pageSize: 10,
            Modules: "P0132"
        });
        resultData.then(function (result) {
            if (result.data.status == 1 && result.data.data.length > 0) {
                $scope.unCounpon = new Array();
                $scope.CounponList = result.data.data;
                var resultResult = AJAX.data("GetCouponResultList", { AppID: User.AppID, pageIndex: 1, pageSize: 100 });
                resultResult.then(function (result1) {
                    if (result1.data.status == 1) {
                        $scope.Counpon = result1.data.data;
                        var CounponCount = $scope.CounponList.length;
                        var CounponListCount = $scope.Counpon.length;


                        for (var m = 0; m < CounponCount; m++) {
                            var IsE = false;
                            for (var n = 0; n < CounponListCount; n++) {

                                if ($scope.CounponList[m].InteractId == $scope.Counpon[n].InteractId) {
                                    IsE = true;
                                    //$scope.unCounpon.push($scope.CounponList[m]);
                                    //a = a
                                    //continue;
                                    break;
                                }
                            }
                            if (!IsE) $scope.unCounpon.push($scope.CounponList[m]);
                        }
                        if ($scope.unCounpon.length > 0) {
                            $scope.GetCouponListError = false;
                        }
                        else {
                            $scope.GetCouponListError = true;
                        }
                    } else {


                        $scope.GetCouponResultListError = true;
                    }
                });

            } else {
                $scope.GetCouponListError = true;
            }
        });
    }
    $scope.unCounponList();
    //领取优惠券
    $scope.GetCoupon = function (InteractID) {
        //领取优惠券
        var resultGetCoupon = AJAX.data("TakeCoupon", { AppID: User.AppID, InteractID: InteractID, SN: "" });
        resultGetCoupon.then(function (result) {
            if (result.data.status == 1) {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "领取成功",
                    okText: "确　定",
                    okType: "button-energized"
                });

                $scope.unCounponList();
                $scope.GetCouponResultList();
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

//悦客会之领取优惠券
app.controller('BASE.YKH.myCouponGetCouponController', ['$scope', '$location', '_User', '$stateParams', 'AJAX', function ($scope, $location, _User, $stateParams, AJAX) {

    //用户信息
    var User = _User();

    $scope.dh = { pwd: "" };
    var resultData = AJAX.data("GetCouponResult", { "AppID": User.AppID, "ResultID": $stateParams.ID });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.CouponInfo = result.data.data;
            var ResultID = result.data.data.ResultId;
            var htm = "http://119.4.99.166/AppCofco/ykh_Coupon_Confirm.html?OriginalNum=gh_99abddf4b396&OpenID=&ResultID=" + ResultID;
            new QRCode(document.getElementById("divShow"), htm);
        }
        else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });


}]);

//悦客会之商家扫码
app.controller('BASE.YKH.myCouponScanningController', ['$scope', '$location', function ($scope, $location) {

}]);

//悦客会之积分商城
app.controller('BASE.YKH.productController', ['$scope', '$location', 'AJAX', '$rootScope', '$stateParams', "IntegralShopCart", '_User', '$ionicPopup', function ($scope, $location, AJAX, $rootScope, $stateParams, IntegralShopCart, _User, $ionicPopup) {

    //用户信息
    var User = _User();

    $scope.MembnerInfo = User;


    if (!$stateParams.ProductID) {
        var resultData = AJAX.data("GetIntegralProductList", { "AppID": User.AppID, "pageIndex": 1, "pageSize": 100 });
        resultData.then(function (result) {
            if (result.data.status == 1 && result.data.data.length > 0) {
                $rootScope.ProductList = $scope.ProductList = result.data.data;
            } else {
                $scope.GetIntegralProductListError = true;
            }
        });
    }
    else {
        //获取详情
        var resultData = AJAX.data("GetIntegralProductInfo", { "AppID": User.AppID, "ProductID": $stateParams.ProductID });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $rootScope.ProductInfo = $scope.ProductInfo = result.data.data;
            }
            else
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
        });

        //修改商品数量
        $scope.ProductNum = 1;
        $scope.ProductNumJia = function () {
            $scope.ProductNum = $scope.ProductNum + 1;
        }
        $scope.ProductNumJian = function () {
            if ($scope.ProductNum > 1) {
                $scope.ProductNum = $scope.ProductNum - 1;
            }
        }

        //添加到购物车

        $scope.ShopCart = function () {
            IntegralShopCart.Add($stateParams.ProductID, $scope.ProductNum, $scope.ProductInfo.ProductName, $scope.ProductInfo.Integral, $scope.ProductInfo.CoverPic);
            $ionicPopup.alert({
                title: '操作提示!',
                template: "添加成功",
                okText: "确　定",
                okType: "button-energized"
            });
        }

        $scope.DelCart = function () {
            IntegralShopCart.Del($stateParams.ProductID);
        }
    }
}]);

//悦客会之购物车
app.controller('BASE.YKH.exchangeCartController', ['$scope', '$location', '$state', '$ionicPopup', 'IntegralShopCart', '_User', function ($scope, $location, $state, $ionicPopup, IntegralShopCart, _User) {
    //用户信息
    var User = _User();
    $scope.MembnerInfo = User;
    $scope.shopCart = IntegralShopCart.Get();

    $scope.GetCountIntegtal = function () {
        $scope.CountIntegtal = 0;
        angular.forEach($scope.shopCart, function (value, index) {
            $scope.CountIntegtal += value.Integral * value.Num;
        });
    }

    $scope.GetCountIntegtal();

    $scope.GotoOrder = function () {
        if ($scope.shopCart == null || $scope.shopCart.length == 0) {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "购物车为空",
                okText: "确　定",
                okType: "button-energized"
            });

            return false;
        }

        $state.go('base.tabs.ykh_integralOrder');
    }



    $scope.ProductNumJia = function (ProductID) {
        angular.forEach($scope.shopCart, function (value, index) {
            if (value.ProductID == ProductID) {
                value.Num = value.Num + 1;
                return;
            }
        });
        $scope.GetCountIntegtal();
        IntegralShopCart.Set($scope.shopCart);
    }
    $scope.ProductNumJian = function (ProductID) {
        angular.forEach($scope.shopCart, function (value, index) {
            if (value.ProductID == ProductID & value.Num > 1) {
                value.Num = value.Num - 1;
                return;
            }
        });
        $scope.GetCountIntegtal();
        IntegralShopCart.Set($scope.shopCart);
    }

    $scope.DelProduct = function (ProductID) {

        angular.forEach($scope.shopCart, function (value, index) {
            //if (IsDel) return;
            if (value.ProductID == ProductID) {
                //delete $scope.shopCart[index];
                $scope.shopCart.splice(index, 1);
                $scope.GetCountIntegtal();
            }
        });

        IntegralShopCart.Set($scope.shopCart);
    }
}]);
//悦客会之我的订单
app.controller('BASE.YKH.myOrderController', ['$scope', '$location', '$stateParams', '_User', 'AJAX', '$ionicPopup', function ($scope, $location, $stateParams, _User, AJAX, $ionicPopup) {

    //用户信息
    var User = _User();

    if ($stateParams.ID) {
        var resultData = AJAX.data("GetIntegralProductOrderInfo", { AppID: User.AppID, ID: $stateParams.ID });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $scope.OrderInfo = result.data.data;
            } else {
                $scope.GetIntegralProductOrderInfoError = true;
            }
        });
        $scope.DelOrder1 = function () {

            var resultData = AJAX.data("DelIntegralOrder", { AppID: User.AppID, ID: $stateParams.ID });
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
                    //$scope.Init();
                    $location.path('tabs/ykh_myOrder');
                }
                else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }


    }
        //订单列表
    else {
        $scope.Init = function () {
            var resultData = AJAX.data("GetIntegralProductOrderList", { AppID: User.AppID });
            resultData.then(function (result) {
                if (result.data.status == 1 && result.data.data.length > 0) {
                    $scope.OrderList = result.data.data;
                } else {
                    $scope.OrderListError = true;
                }
            });

            var resultData = AJAX.data("GetIntegralProductOrderList", { AppID: User.AppID, Type: "Q" });
            resultData.then(function (result) {
                if (result.data.status == 1 && result.data.data.length > 0) {
                    $scope.OrderListQ = result.data.data;
                } else {
                    $scope.OrderListQError = true;
                }
            });

            var resultData = AJAX.data("GetIntegralProductOrderList", { AppID: User.AppID, Type: "B" });
            resultData.then(function (result) {
                if (result.data.status == 1 && result.data.data.length > 0) {
                    $scope.OrderListB = result.data.data;
                } else {
                    $scope.OrderListBError = true;
                }
            });
        }
        $scope.Init();

        $scope.DelOrder = function (ID) {
            var resultData = AJAX.data("DelIntegralOrder", { AppID: User.AppID, ID: ID });
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
                    $scope.Init();
                }
                else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }
    }
}]);

//悦客会之订单确认
app.controller('BASE.YKH.integralOrderController', ['$scope', '$location', 'IntegralShopCart', 'AJAX', '_User', '$ionicPopup', 'statusSocketServices', function ($scope, $location, IntegralShopCart, AJAX, _User, $ionicPopup, statusSocketServices) {
    //用户信息
    var User = _User();

    $scope.MemberInfo = User;

    $scope.shopCart = IntegralShopCart.Get();

    $scope.CountIntegtal = 0;
    angular.forEach($scope.shopCart, function (value, index) {
        $scope.CountIntegtal += value.Integral * value.Num;
    });

    //提交订单
    $scope.SubmitOrder = function () {

        if ($scope.shopCart == null) {

            $ionicPopup.alert({
                title: '操作提示!',
                template: "购物车商品为空！",
                okText: "确　定",
                okType: "button-energized"
            });

            return false;
        }

        var resultData = AJAX.data("SubmitIntegralOrder", { AppID: User.AppID, Phone: $scope.MemberInfo.Phone, Name: $scope.MemberInfo.Name, Address: $scope.MemberInfo.Address, CartList: JSON.stringify($scope.shopCart) });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                //$rootScope.ProductInfo = $scope.ProductInfo = result.data.data;
                //$ionicPopup.alert({
                //    title: '操作提示!',
                //    template: result.data.info,
                //    okText: "确　定",
                //    okType: "button-energized"
                //});
                IntegralShopCart.Clear();
                $scope.shopCart = IntegralShopCart.Get();

                statusSocketServices.statusClassName = "ion-happy-outline";
                statusSocketServices.contentText = "兑换商品成功";
                statusSocketServices.buttonClassName = "button-energized";
                statusSocketServices.buttonText = "查看兑换列表";
                statusSocketServices.buttonLink = "#/tabs/ykh_myOrder";
                $location.path("/status");
            }
            else
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
        });

        return false;
    }
}]);

//悦客会之物流详情
app.controller('BASE.YKH.tackingController', ['$scope', '$location', function ($scope, $location) {

}]);

//悦客会之我的积分
app.controller('BASE.YKH.integralController', ['$scope', '$location', '$ionicPopup', '_User', 'AJAX', function ($scope, $location, $ionicPopup, _User, AJAX) {

    //用户信息
    var User = _User();

    $scope.MemberInfo = User;

    //积分累计
    var resultData = AJAX.data("GetIntegralPointList", { AppID: User.AppID });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.IntegralPointList = result.data.data;
        }
        else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });

    //积分消费
    var resultData = AJAX.data("GetIntegralPrizeList", { AppID: User.AppID });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.IntegralPrizeList = result.data.data;
        }
        else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });

    var resultCard = AJAX.data("GetCard", { AppID: User.AppID });
    resultCard.then(function (result) {
        if (result.data.status == 1) {
            $scope.Card = result.data.data;
        }
        else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });

}]);

//悦客会之在线客服
app.controller('BASE.YKH.askController', ['$scope', '$ionicPopup', '$ionicLoading', '_User', 'AJAX', '$stateParams', '$timeout', '$location', function ($scope, $ionicPopup, $ionicLoading, _User, AJAX, $stateParams, $timeout, $location) {
    //用户信息
    var User = _User();

    $scope.MemberInfo = User;
    $scope.content = { val: "" };
    $scope.MsgList = new Array();
    console.log($stateParams.Modules);

    switch ($stateParams.Modules) {
        case "P0132":
            $scope.title = "小悦儿";
            $scope.titleInfo = "您好！成都中粮客服专员小悦很高兴为您服务！";

            break;
        case "P0133":
            $scope.tel = "";
            $scope.title = "置业顾问";
            //$scope.titleInfo = "您好！" + $scope.title + "置业顾问很高兴为您服务！"
            $scope.titleInfo = "您好！成都中粮置业顾问很高兴为您服务！"

            break;
    }

    var TimeSpacer = 1000;
    $scope.load = function () {

        if ($location.path().toString().indexOf("ykh_ask") < 0) return;

        $("ion-scroll.ionic-scroll").height($(window).height() - 44 - 60 - 50 - 53 - 10);

        var db = window.sqlitePlugin.openDatabase({ name: "my.db" });
        db.transaction(function (tx) {
            tx.executeSql("select * from Chat_Msg where IsRead=0", [], function (tx, res) {

                for (var i = 0; i < res.rows.length; i++) {
                    var value = res.rows.item(i);
                    console.log(value.id);
                    tx.executeSql("UPDATE Chat_Msg set IsRead=1 where id=?", [value.id], function (tx, res) {
                        console.log(res);
                    }, function (e) {
                        console.log("ERROR: " + e.message);
                    });

                    if ($scope.MsgList == undefined) {
                        $scope.MsgList = new Array();
                    }
                    $scope.MsgList.push({
                        id: value.id,
                        AppID: value.AppID,
                        ChatID: value.ChatID,
                        Modules: value.Modules,
                        Authority: value.Authority,
                        Content: value.Content,
                        MessageType: value.MessageType,
                        IsRead: value.IsRead,
                        CreateTime: value.CreateTime
                    });
                }
                $scope.$apply();
                $timeout($scope.load, TimeSpacer);
            });
        });
    }

    $scope.$watch("content.val", function () {
        //console.log($scope.content.val);
    }, true);

    $scope.send = function () {
        User.AppID;
        var resultData = AJAX.data("ChatSendMessage", { AppID: User.AppID, Modules: $stateParams.Modules, Content: $scope.content.val });
        resultData.then(function (result) {
            console.log(JSON.stringify(result.data));

            if (result.data.status == 1) {
                var ChatID = result.data.data.ChatID;
                var SendTime = result.data.data.SendTime;

                var db = window.sqlitePlugin.openDatabase({ name: "my.db" });
                //存储本地数据库
                db.executeSql("INSERT INTO Chat_Msg (AppID, ChatID,Modules,Authority,Content,MessageType,IsRead,CreateTime) VALUES (?,?,?,?,?,?,?,?)",
                    [User.AppID, ChatID, $stateParams.Modules, $stateParams.Authority, $scope.content.val, 1, 0, SendTime],
                    function (tx, res) {
                        console.log("insertId: " + res.insertId + " -- probably 1");
                    }, function (e) {
                        console.log("ERROR: " + e.message);
                    });

                $scope.content.val = "";
            }
            else {
                //消息发送失败
            }
        });
    }
}]);