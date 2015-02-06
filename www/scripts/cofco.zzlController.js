"user strict"

//天问首页
app.controller('BASE.ZZL.indexController', ['$scope', '$location', 'AJAX', '$rootScope', '_User', '$ionicPopup', '$ionicActionSheet', 'Storage', '$state', function ($scope, $location, AJAX, $rootScope, _User, $ionicPopup, $ionicActionSheet, Storage, $state) {
    $scope.hideSheetListText = [];
    $scope.userInfo = {};
    var User = _User();
    var _Storage = new Storage();

    var WyMemberInfo = _Storage.getValue("GetWYMemberInfo");
    if (WyMemberInfo == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        var resultData = AJAX.data("GetWYMemberInfo", { "AppID": User.AppID });
        resultData.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                var data = $scope.GetWYMemberInfo = result.data.data;
                angular.forEach(data, function (v, k) {
                    $scope.hideSheetListText.push({ text: data[k].HouseNum });
                });

                var WyMemberInfo = _Storage.getValue("GetWYUser");
                if (WyMemberInfo != null) {
                    $scope.userInfo.Pic = User.Pic;
                    $scope.userInfo.Name = WyMemberInfo.Name;
                    $scope.userInfo.HouseNum = WyMemberInfo.HouseNum;
                    $scope.userInfo.PropertyName = WyMemberInfo.PropertyName;
                }
                else {
                    $scope.userInfo.Pic = User.Pic;
                    $scope.userInfo.Name = result.data.data[0].Name;
                    $scope.userInfo.HouseNum = result.data.data[0].HouseNum;
                    $scope.userInfo.PropertyName = result.data.data[0].PropertyName;

                    WyMemberInfo = result.data.data[0];
                    new Storage().setValue("GetWYUser", WyMemberInfo);
                }

            }
            return WyMemberInfo;
        }).then(function (result) {
            var _result = result || {};
            var resultData = AJAX.data("GetWyInformation", {
                "AppID": User.AppID,
                "Type": "Commqqts",
                "CustID": _result.OutSystemID
            }, 'GET', true);
            resultData.then(function (result) {
                if (result.data.status && result.data.data.length > 0)
                    $scope.AnnData = result.data.data;
                else
                    $scope.AnnDataError = true;
            });

            var resultData = AJAX.data("featuredProducts", {}, 'GET', true);
            resultData.then(function (result) {
                if (result.data.status && result.data.data.length > 0)
                    $scope.featuredProducts = result.data.data;
                else
                    $scope.featuredProductsError = true;
            });

            var resultData = AJAX.data("GetWYPropertyInfo", { AppID: User.AppID, PropertyID: _result.PropertyID });
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    $scope.PropertyInfo = result.data.data;
                }
            });


            $scope.GetWYUser = new Storage().getValue("GetWYUser");

        });
    }

    $scope.CommunityList = function () {
        if ($scope.hideSheetListText.length) {
            var hideSheet = $ionicActionSheet.show({
                buttons: $scope.hideSheetListText,
                titleText: '选择您的小区',
                cancelText: '取消',
                cancel: function () {
                    console.log("取消");
                },
                buttonClicked: function (index) {
                    var obj = $scope.GetWYMemberInfo[index];
                    new Storage().setValue("GetWYUser", obj);
                    $scope.userInfo.HouseNum = obj.HouseNum;
                    $scope.userInfo.PropertyID = obj.PropertyID;
                    $state.reload();
                    return true;
                }
            });
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "没有您更多的小区信息",
                okText: "确　定",
                okType: "button-energized"
            });
        }
    };
}]);

//天问费用
app.controller('BASE.ZZL.feeController', ['$scope', '$location', 'AJAX', '$rootScope', '$ionicPopup', 'optionDate', '_User', 'Storage', '$state', function ($scope, $location, AJAX, $rootScope, $ionicPopup, optionDate, _User, Storage, $state) {
    var User = _User();
    var _value = new Storage().getValue("GetWYMemberInfo");

    if (_value == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        //欠费查询
        var resultData = AJAX.data("GetDebtsFeeSearch", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID });
        resultData.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                $scope.GetDebtsFeeSearchSuccess = true;
                $scope.GetDebtsFeeSearch = result.data.data;
            } else {
                $scope.GetDebtsFeeSearchError = true;
            }
        });
    }

    //缴费计算
    $scope.checkArry = [],
    $scope.AllDeb = 0;
    $scope.Clearing = function (arg, ev) {
        var id = $(ev.currentTarget).attr("data-id");
        var tf = $(ev.currentTarget).find("input[type=checkbox]").is(":checked");
        if (!tf) {
            var val = parseFloat($scope.AllDeb) + parseFloat(arg);
            $scope.AllDeb = val.toFixed(2);
            $scope.checkArry.push(id);
        } else {
            var val = parseFloat($scope.AllDeb) - parseFloat(arg);
            $scope.AllDeb = val.toFixed(2);
            $scope.checkArry.splice($scope.checkArry.indexOf(id), 1);
        }
    }

    var dates = $scope.dates = { value: "" };
    $scope.GetPaidFeeSearch = function () {
        //实缴查询
        var resultData = AJAX.data("GetPaidFeeSearch", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID, "YearMonth": dates.value });
        resultData.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                $scope.GetPaidFeeSearchSuccess = true;
                $scope.GetPaidFeeSearch2 = result.data.data;
                $scope.GetPaidFeeSearchError = false;
            } else {
                $scope.GetPaidFeeSearchSuccess = false;
                $scope.GetPaidFeeSearchError = true;
            }
        });
    }

    //时间列表
    $scope.dateList = optionDate.dateList();

    $scope.GetDueFeeSearch = function () {
        //应缴查询
        var resultData = AJAX.data("GetDueFeeSearch", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID, "YearMonth": dates.value });
        resultData.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                $scope.GetDueFeeSearchSuccess = true;
                $scope.GetDueFeeSearch2 = result.data.data;
                $scope.GetDueFeeSearchError = false;
            } else {
                $scope.GetDueFeeSearchSuccess = false;
                $scope.GetDueFeeSearchError = true;
            }
        });
    }

    $scope.GetOffsetPreSearch = function () {
        //预存冲抵
        var resultData = AJAX.data("GetOffsetPreSearch", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID, "YearMonth": dates.value });
        resultData.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                $scope.GetOffsetPreSearchSuccess = true;
                $scope.GetOffsetPreSearch2 = result.data.data;
                $scope.GetOffsetPreSearchError = false;
                $scope.GetOffsetPreSearchBalance = true;
            } else {
                $scope.GetOffsetPreSearchSuccess = false;
                $scope.GetOffsetPreSearchError = true;
                $scope.GetOffsetPreSearchBalance = false;
            }
        });
    }

    //物业缴费
    $scope.submitFee = function () {
        var FeesID = "";
        $("#tabs1").find(":checked").each(function (i) {
            FeesID += this.id + ","
        });

        var resultData = AJAX.data("GetOnLinePayList", { "AppID": User.AppID, 'Modules': "P0134" });
        resultData.then(function (result) {
            return result;
        }).then(function (result) {
            var resultData = AJAX.data("WXPay", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID, "MemberID": new Storage().getValue("GetWYUser").MemberID, "FeesID": FeesID });
            resultData.then(function (data) {
                if (data.data.status) {
                    $state.go("base.tabs.base_play", { AppID: User.AppID, Modules: "P0136", BankCode: result.data.data[0]["BankCode"], PayType: 'WYF', PayID: data.data.date });
                } else {
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: "",
                        okText: "确　定",
                        okType: "button-energized"
                    });
                }
            });
        });
    }
}]);

//天问报事报修历史查询
app.controller('BASE.ZZL.warrantyAndInquiryController', ['$scope', 'AJAX', '_User', '$ionicPopup', '$state', 'Storage', '$ionicActionSheet', 'PhotoUpload', function ($scope, AJAX, _User, $ionicPopup, $state, Storage, $ionicActionSheet, PhotoUpload) {
    var User = _User(),
        _value = new Storage().getValue("GetWYMemberInfo");
    if (_value == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        //历史查询列表
        var resultData = AJAX.data("GetRepairList", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID });
        resultData.then(function (result) {
            if (result.data.status && result.data.data.length > 1) {
                $scope.GetRepairListSuccess = true;
                $scope.GetRepairList = result.data.data;
            } else {
                $scope.GetRepairListError = true;
            }
        });

        $scope.content = {
            val: "",
            file: "",
            date: ""
        };

        var resultData = AJAX.data("GetWYPropertyInfo", { AppID: User.AppID, PropertyID: new Storage().getValue("GetWYUser").PropertyID });
        resultData.then(function (result) {
            if (result.data.status == 1) {
                $scope.PropertyInfo = result.data.data;
            }
        });
    }

    $scope.submitWarranty = function () {
        var resultData = AJAX.data("Submit_WY_Repair", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID, "IncidentContent": $scope.content.val, "ReserveDate": $scope.content.date, "Pic": PhotoUpload.PICURL });
        resultData.then(function (result) {
            if (result.data.status) {
                var show = $ionicPopup.show({
                    template: '提交成功!',
                    title: '返回首页!',
                    scope: $scope,
                    buttons: [
                        {
                            text: '确定',
                            type: 'button-energized',
                            onTap: function (e) {
                                e.preventDefault();
                                document.querySelector(".tab-item[data-id=tabs2]").click();
                                show.close();
                            }
                        }
                    ]
                });

            }
        });
    };

    $scope.UploadType = function () {
        $scope.type = [{ text: "相册", code: "PHOTOLIBRARY" }, { text: "拍照", code: "CAMERA" }];

        if ($scope.type.length) {
            var hideSheet = $ionicActionSheet.show({
                buttons: $scope.type,
                titleText: '选择图片',
                cancelText: '取消',
                cancel: function () {
                    console.log("取消");
                },
                buttonClicked: function (index) {
                    var SelectType = $scope.type[index].code;
                    switch (SelectType) {
                        case "PHOTOLIBRARY":
                            PhotoUpload.PHOTOLIBRARY();
                            break;
                        case "CAMERA":
                            PhotoUpload.CAMERA();
                            break;
                    }
                    return true;
                }
            });

        };
    }

}]);

//天问历史查询详情
app.controller('BASE.ZZL.historyDetailsController', ['$scope', '$stateParams', 'AJAX', '_User', 'Storage', '$state', function ($scope, $stateParams, AJAX, _User, Storage, $state) {
    //历史查询
    var User = _User(),
        _value = new Storage().getValue("GetWYMemberInfo");
    if (_value == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        var resultData = AJAX.data("GetRepairInfo", {
            "AppID": User.AppID,
            "CustID": new Storage().getValue("GetWYUser").OutSystemID,
            IncidentID: $stateParams.IncidentID
        });
        resultData.then(function (result) {
            if (result.data.status) {
                $scope.RepairInfo = result.data.data;
            }
        });
    }
}]);

//天问在线预存
app.controller('BASE.ZZL.storedDetailsController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$state', 'Storage', function ($scope, $location, AJAX, _User, $ionicPopup, $state, Storage) {
    //在线预存
    var User = _User(),
        _value = new Storage().getValue("GetWYMemberInfo");
    if (_value == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        var resultData = AJAX.data("GetRepairInfo", { "AppID": User.AppID, "CustID": new Storage().getValue("GetWYUser").OutSystemID });
        resultData.then(function (result) {
            if (result.data.status) {
                $scope.RepairInfo = result.data.data;
            }
        });
    }
}]);

//预存充值
app.controller('BASE.ZZL.storedDetailsInfoController', ['$scope', '$location', function ($scope, $location) {

}]);

//天问配送服务
app.controller('BASE.ZZL.psShopController', ['$scope', '$location', '$rootScope', 'AJAX', '$ionicPopup', '$state', 'Storage', function ($scope, $location, $rootScope, AJAX, $ionicPopup, $state, Storage) {
    _value = new Storage().getValue("GetWYMemberInfo");
    var resultData = resultData1 = resultData2 = resultData3 = "";
    if (_value == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        resultData = AJAX.data("GetADList", { AdpID: "1" }, "GET", true);//广告
        resultData.then(function (result) {
            if (result.data.status) {
                $scope.GetADList = result.data.data;
            }
        });

        resultData1 = AJAX.data("GetADList", { AdpID: "1" }, "GET", true);//3个广告
        resultData1.then(function (result) {
            if (result.data.status) {
                $scope.GetADList2 = result.data.data;
            }
        });

        resultData2 = AJAX.data("getRecommendClassly", {}, "GET", true);//推荐分类
        resultData2.then(function (result) {
            if (result.data.status) {
                $scope.getRecommendClassly = result.data.data;
            } else {
                $scope.getRecommendClasslyError = true;
            }
        });

        resultData3 = AJAX.data("featuredProducts", {}, "GET", true);//推荐商品
        resultData3.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                $scope.featuredProducts = result.data.data;
            } else {
                $scope.featuredProductsError = true;
            }
        });
    }
}]);
//配送服务联系商家
app.controller('BASE.ZZL.psPhoneController', ['$scope', '$location', 'AJAX', '$stateParams', '$ionicPopup', function ($scope, $location, AJAX, $stateParams, $ionicPopup) {
    var resultData = AJAX.data("GetWYProperty", {}, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.GetWYProperty = result.data.data;
        } else {
            $scope.GetWYPropertyError = true;
        }
    });
}]);
//天问配送服务之商品详情
app.controller('BASE.ZZL.psProductDetailsController', ['$scope', '$location', '$rootScope', 'AJAX', '$stateParams', '$ionicPopup', function ($scope, $location, $rootScope, AJAX, $stateParams, $ionicPopup) {
    var resultData = AJAX.data("getProductInfo", { id: $stateParams.id });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.getProductInfo = result.data.data;
        } else {
            $scope.getProductInfoError = true;
        }
    });
    $scope.detailsContent = function () {
        var type = $stateParams.type;
        if (type) {
            $scope.content = type;
        } else {
            $scope.getProductInfoTypeError = true;
        }

    }
}]);

//天问配送服务之产品分类
app.controller('BASE.ZZL.psProductClassListController', ['$scope', '$location', '$rootScope', '$ionicPopup', 'AJAX', function ($scope, $location, $rootScope, $ionicPopup, AJAX) {
    var getProductClassly = $rootScope.getProductClassly;
    if (getProductClassly) {
        $scope.getProductClassly = getProductClassly;
    } else {
        var resultData = AJAX.data("getProductClassly", {});
        resultData.then(function (result) {
            if (result.data.status) {
                $rootScope.getProductClassly = $scope.getProductClassly = result.data.data;
            } else
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: result.data.info,
                    okText: "确　定",
                    okType: "button-energized"
                });
        });
    }
}]);

//天问配送服务之产品列表
app.controller('BASE.ZZL.psProductListController', ['$scope', '$location', '$rootScope', 'AJAX', '$stateParams', '$ionicPopup', function ($scope, $location, $rootScope, AJAX, $stateParams, $ionicPopup) {
    var resultData = AJAX.data("getClasslyProduct", { id: $stateParams.id });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.getClasslyProduct = result.data.data;
        } else {
            $scope.getClasslyProductError = true;
        }
    });
}]);

//天问配送地址
app.controller('BASE.ZZL.psPropertyAddressController', ['$scope', '$location', function ($scope, $location) {

}]);

//小区资讯
app.controller('BASE.ZZL.informationController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams', 'Storage', '$state', function ($scope, $location, AJAX, _User, $ionicPopup, $stateParams, Storage, $state) {
    var User = _User(),
        _value = new Storage().getValue("GetWYMemberInfo");
    if (_value == null) {
        $state.go("base.tabs.zzl_Binding"); return false;
    } else {
        var resultData = AJAX.data('GetWyInformation', {
            "AppID": User.AppID,
            "Type": "Commqqts",
            "CustID": new Storage().getValue("GetWYUser").OutSystemID
        });
        resultData.then(function (result) {
            if (result.data.status == 1 && result.data.data.length > 0) {
                $scope.infomationList = result.data.data;
                $scope.GetInformationManageListError = false;
            } else {
                $scope.GetInformationManageListError = true;
            }
        });
        if (typeof ($stateParams.id) != undefined) {
            var resultInfo = AJAX.data('GetWyInformation', {
                "AppID": User.AppID,
                "Type": "Commqqts",
                "CustID": new Storage().getValue("GetWYUser").OutSystemID,
                "InfoID": $stateParams.id
            });
            resultInfo.then(function (result) {
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
        }
    }
}]);


app.controller('BASE.ZZL.BindingController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams', 'Storage',
    function ($scope, $location, AJAX, _User, $ionicPopup, $stateParams, Storage) {

        var User = _User();
        $scope.Account = { MobilePhone: "", Pwd: "" };

        $scope.Init = function () {
            var resultData = AJAX.data('GetWYMemberInfo', { "AppID": User.AppID });
            resultData.then(function (result) {
                if (result.data.status == 1 && result.data.data.length > 0) {
                    $scope.MyWYMemberInfo = result.data.data;
                    new Storage().setValue("GetWYMemberInfo", JSON.stringify(result.data.data));
                    $scope.MyWYMemberInfoError = false;
                } else {
                    $scope.MyWYMemberInfoError = true;
                }
            });
        }
        $scope.Init();

        $scope.GetAccountWy = function () {

            var resultData = AJAX.data('SubmitAccountBindingWy', { "AppID": User.AppID, Type: "Tw", MobilePhone: $scope.Account.MobilePhone, Pwd: $scope.Account.Pwd });
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    if (result.data.data.length > 0) {
                        $scope.AccountWyMemberInfo = result.data.data;
                        $scope.Init();
                    }
                    else {
                        $ionicPopup.alert({
                            title: '操作提示!',
                            template: "没有获取到数据",
                            okText: "确　定",
                            okType: "button-energized"
                        });
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

        }

        $scope.DelWy = function (WYMemberID) {
            var resultData = AJAX.data('DelWYMemberInfo', { "AppID": User.AppID, "WYMemberID": WYMemberID });
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    $scope.Init();
                } else {
                }
            });
        }
    }]);