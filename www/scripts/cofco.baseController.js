"user strict"
var app = angular.module("app", ['ionic', 'ui.router', 'ngTouch', 'ngResource', 'ngQuickDate']);

//初始化操作

app.run(["DB", '$rootScope', '$state', '$stateParams', '$location', 'Storage', 'cordovaReady', function (DB, $rootScope, $state, $stateParams, $location, Storage, cordovaReady) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    var _Storage = new Storage();
    var userStatus = _Storage.getValue("userStatus");

    if (userStatus == 1) {
        $location.path('login');
    }
    else if (userStatus == 2) {

        if (!_Storage.getValue("AppID")) {
            $location.path('login');
        }
        else if (!_Storage.getValue("User")) {
            $location.path('login');
        }
        else {
            //cordovaReady.checkVersion();
            console.log("1");
            cordovaReady.onDeviceReady(new Storage().getValue("AppID"));

            $location.path('tabs/index');
        }
    } else {
        $location.path('guidePage');
    }

    $rootScope.$on('$locationChangeStart', function (event, toState, toParams, fromState, fromParams) {
        userStatus = _Storage.getValue("userStatus");
        if (userStatus == 2) {
            if (!_Storage.getValue("AppID")) {
                $location.path('login');
            }
            else if (!_Storage.getValue("User")) {
                $location.path('login');
            }
        }
        else if (userStatus == 1) {
            if ($location.path().toString().lastIndexOf("forgetPwd") < 0 && $location.path().toString().lastIndexOf("register") < 0 && $location.path().toString().lastIndexOf("modifyPwd") < 0 && $location.path().toString().lastIndexOf("bindingZZLList") < 0 && $location.path().toString().lastIndexOf("status") < 0 && $location.path().toString().lastIndexOf("bindingZZLRegister") < 0) {
                $location.path('login');
            }
        }
        else {
            $location.path('guidePage');
        }
    });

    window.AppKey = (function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    })();
}]);

//核心首页
app.controller('BASE.mainController', ['$scope', '_User', "Storage", '$location', '$ionicPopup', 'cordovaReady', 'OpenUrl', function ($scope, _User, Storage, $location, $ionicPopup, cordovaReady, OpenUrl) {
    var User = _User();
    if (User.Pic == '') {
        User.Pic = "./images/morentouxiang.jpg";
    }
    if (User) {
        $scope.leftMenuData = {
            "title": "功能导航",
            "menu": [{
                "name": "悦客会",
                "list": [
                    { "title": "我的活动", "href": "base.tabs.hd_MyActivity" },
                    { "title": "积分商城", "href": "base.tabs.ykh_product" },
                    { "title": "我的权证", "href": "base.tabs.ykh_MyWarrant" },
                    { "title": "我的满意度", "href": "base.tabs.ykh_QualitySurvey" },
                    { "title": "在线客服", "href": "base.tabs.ykh_ask" },
                    { "title": "联盟商家", "href": "base.tabs.ykh_Merchant({Type:2})" },
                    { "title": "我的优惠券", "href": "base.tabs.ykh_MyCoupon" },
                    { "title": "我的账户", "href": "base.tabs.base_settingInfo" }
                ]
            }, {
                "name": "置业",
                "list": [
                    { "title": "优惠信息", "href": "base.tabs.zx({typeid:'7'})" },
                    { "title": "购房进度", "href": "base.tabs.zy_Gf_Progress" }
                ]
            }, {
                "name": "住这里",
                "list": [
                    { "title": "物业费", "href": "base.tabs.zzl_fee" },
                    { "title": "报事报修", "href": "base.tabs.zzl_WarrantyAndInquiry" },
                    { "title": "物业活动", "href": "base.tabs.hd_ActivityList({Modules:'P0136',Authority:''})" },
                    { "title": "小区资讯", "href": "base.tabs.zzl_information" },
                    { "title": "中粮产品", "href": "base.tabs.zzl_ps_shop" }
                ]
            }, {
                "name": "生活馆",
                "list": [
                    { "title": "我的资讯", "href": "base.tabs.zx({typeid:11})" },
                    { "title": "我要预订", "href": "base.tabs.shg_Hs_Chamber" },
                    { "title": "我的身份", "href": "base.tabs.shg_Hs_Card" },
                    { "title": "我的订单", "href": "base.tabs.shg_Hs_ReserveOrder" }
                ]
            }
            ]
        };

        $scope.rightMenuData = {
            "user": {
                "name": User.Name,
                "img": User.Pic
            },
            "menu": [{
                "name": "账号修改",
                "list": [
                    { "icon": "rightMenu_icons_1", "title": "修改账户信息", "href": "base.tabs.base_settingInfo" },
                    { "icon": "rightMenu_icons_1", "title": "修改密码", "href": "base.tabs.base_updatePwd" }//,
                    //{ "icon": "rightMenu_icons_1", "title": "修改配送地址", "href": "base.tabs.base_settingAddress" }
                ]
            }, {
                "name": "悦客会",
                "list": [
//                    { "icon": "rightMenu_icons_2", "title": "会员卡", "href": "base.tabs.ykh_Card" },
                    { "icon": "rightMenu_icons_3", "title": "我的积分", "href": "base.tabs.ykh_Integral" },
                    { "icon": "rightMenu_icons_4", "title": "我的优惠券", "href": "base.tabs.ykh_MyCoupon" },
                    { "icon": "rightMenu_icons_5", "title": "我的兑换订单", "href": "base.tabs.ykh_myOrder" }
                ]
            },
//            {
//                "name": "全民经纪人",
//                "list": [
//                    { "icon": "rightMenu_icons_1", "title": "修改绑定提现账号", "href": "base.tabs.ykh_Integral" },
//                    { "icon": "rightMenu_icons_6", "title": "申请提现", "href": "base.tabs.ykh_Integral" }
//                ]
//            }, 
            {
                "name": "物业信息",
                "list": [
                    { "icon": "rightMenu_icons_1", "title": "修改绑定账号", "href": "base.tabs.zzl_Binding" },
//                  { "icon": "rightMenu_icons_5", "title": "配送订单", "href": "base.tabs.ykh_Integral" },
//                    { "icon": "rightMenu_icons_7", "title": "投诉建议", "href": "tel:112" }
                ]
            }, {
                "name": "生活馆账号",
                "list": [
//                    { "icon": "rightMenu_icons_1", "title": "修改绑定账号", "href": "base.tabs.ykh_Integral" },
                    { "icon": "rightMenu_icons_5", "title": "预定订单", "href": "base.tabs.shg_Hs_ReserveOrder" }
                ]
            }
            ]
        };
    }

    //版本更新
    var platform = "";
    try {
        platform = device.platform;
    }
    catch (ex) { }

    if (platform == "Android") {
        cordovaReady.GetServerVer().then(function (data) {
            $scope.Ver = data;
        });

        $scope.UpdateApp = function () {
            OpenUrl.SystemChorme($scope.Ver.NewVer.url);
        }
        $scope.IsUpdateApp = true;
    }

    $scope.Exit = function () {
        var prompt = $ionicPopup.confirm({
            title: '中粮.悦生活',
            template: '确定退出当前账号吗？',
            okText: "确定",
            cancelText: "取消",
            okType: "button-energized"

        });
        prompt.then(function (res) {
            if (res) {

                var _Storage = new Storage();
                _Storage.clear("User");
                _Storage.clear("AppID");
                _Storage.setValue("userStatus", 1);
                _Storage.clear("GetWYMemberInfo");
                _Storage.clear("GetWYUser");
                window.sessionStorage.clear();
                $location.path('/login');
            }
        });
    }
}]);

//引导页面
app.controller('BASE.guidePageController', ['$scope', '$location', "Storage", function ($scope, $location, Storage) {

    //登录
    $scope.login = function () {
        new Storage().setValue("userStatus", 1);
        $location.path('/login');
    }

    //计算高度
    $scope.load = function () {
        $(".slider").css("height", $(window).height());
    }
}]);

//登录页面
app.controller('BASE.loginController', ["$scope", "$state", "DB", 'AJAX', '$ionicPopup', 'Storage', 'cordovaReady', function ($scope, $state, DB, AJAX, $ionicPopup, Storage, cordovaReady) {
    var user = $scope.user = {};
    var db = new DB();
    $scope.login = function (loginForm) {
        loginForm.$setDirty();
        if (loginForm.$valid) {
            if (parseInt(user.phone) < 13000000000 || typeof parseInt(user.phone) != "number") {
                $ionicPopup.alert({
                    title: '手机号码不正确！',
                    okType: "button-energized"
                });
            } else {
                var result = AJAX.data("login", { MobilePhone: user.phone, Password: user.pass }, "POST");
                result.then(function (res) {
                    if (res.data.status) {
                        //db.findUserID(res.data.data.APPID, function (result) {
                        //    if (!result.rows.length) {
                        //        db.insertUser({ userID: res.data.data.APPID, name: res.data.data.Name, imgUrl: res.data.data.MemberPic, status: 1 }, function (result) {
                        //            (result) ? console.log("插入成功") : console.log("插入失败");
                        //        });
                        //    }
                        //});

                        var _Storage = new Storage();

                        _Storage.setValue("userStatus", 2);
                        _Storage.setValue("AppID", res.data.data.APPID);

                        var resultData = AJAX.data("GetAccountInfo", { "AppID": res.data.data.APPID });
                        resultData.then(function (result) {
                            if (result.data.status == 1) {
                                _Storage.setValue("User", result.data.data);

                                //cordovaReady.checkVersion();
                                cordovaReady.InitjPush(_Storage.getValue("AppID"));

                                $state.go("base.tabs.index");
                            }
                            return result.data.data;
                        }).then(function (result) {
                            var _result = result || {};
                            var resultData = AJAX.data("GetWYMemberInfo", {
                                "AppID": _result.AppID
                            });
                            resultData.then(function (result) {

                                if (result.data.status == 1) {
                                    if (result.data.data.length > 0) {
                                        new Storage().setValue("GetWYMemberInfo", JSON.stringify(result.data.data));
                                    }
                                }
                            });
                        });
                    } else
                        $ionicPopup.alert({
                            title: '操作提示!',
                            template: res.data.info,
                            okText: "确　定",
                            okType: "button-energized"
                        });
                });
            }
        }
    }
}]);

//修改密码
app.controller('BASE.modifyPwdController', ["$scope", "$location", "$ionicPopup", "$rootScope", "statusSocketServices", 'AJAX', '$stateParams', function ($scope, $location, $ionicPopup, $rootScope, statusSocketServices, AJAX, $stateParams) {
    var find = $scope.find = {
        pass: "",
        repass: ""
    };
    $scope.sub = function () {
        if (find.pass == "") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "请输入新密码",
                okText: "确　定",
                okType: "button-energized"
            });
        }
        var resultCheck = AJAX.data("ModifyPwd", { AppID: $stateParams.AppID, PassWord: find.pass });
        resultCheck.then(function (result) {
            if (result.data.status) {
                statusSocketServices.statusClassName = "ion-happy-outline";
                statusSocketServices.contentText = "密码修改成功";
                statusSocketServices.buttonClassName = "button-energized";
                statusSocketServices.buttonText = "点击跳转登录";
                statusSocketServices.buttonLink = "#/login";
                $location.path("/status");
            } else {
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
//找回密码
app.controller('BASE.forgetPwdController', ["$scope", "$location", "$ionicPopup", "$rootScope", "statusSocketServices", 'AJAX', 'Storage', "$state", function ($scope, $location, $ionicPopup, $rootScope, statusSocketServices, AJAX, Storage, $state) {
    var find = $scope.find = {
        phone: "",
        keyCode: ""
    };

    $scope.keyCode = function () {
        if (parseInt(find.phone) < 13000000000 || typeof parseInt(find.phone) != "number") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "手机号码不正确！",
                okType: "button-energized"
            });
        } else if (find.phone == "") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "手机号码不能为空！",
                okType: "button-energized"
            });
        } else {
            var resultData = AJAX.data("SendVerificationCode", { Type: "FINDPWD", MobilePhone: find.phone }, "GET-OPTIONS");
            resultData.then(function (result) {
                if (result.data.status) {

                } else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }
    }
    $scope.sub = function () {
        var ph = key = false;
        if (parseInt(find.phone) < 13000000000 || typeof parseInt(find.phone) != "number") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "手机号码不正确！",
                okType: "button-energized"
            });
            return false;
        } else ph = true;

        var resultCheck = AJAX.data("checkUserInfo", { Type: "FINDPWD", MobilePhone: find.phone, Key: find.keyCode }, "GET-OPTIONS");
        resultCheck.then(function (result) {
            if (result.data.status) {
                key = true;
                if (ph && key) {
                    $state.go("modifyPwd", { AppID: result.data.data.APPID });
                }
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
//注册页面
app.controller('BASE.registerController', ["$scope", "$location", "$ionicPopup", "$rootScope", "statusSocketServices", 'AJAX', 'Storage', 'cordovaReady', '$ionicActionSheet', function ($scope, $location, $ionicPopup, $rootScope, statusSocketServices, AJAX, Storage, cordovaReady, $ionicActionSheet) {
    var user = $scope.user = {};
    $scope.VCodeInfo = { VerificationCode: "", VCodeTitle: "发送验证码" };
    $scope.hideSheetListText = [];
    $scope.register = function (registerForm) {
        registerForm.$setDirty();
        if (registerForm.$valid) {
            var ph = key = false;
            if (parseInt(user.phone) < 13000000000 || typeof parseInt(user.phone) != "number") {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "手机号码不正确！",
                    okType: "button-energized"
                });
                return false;
            } else ph = true;
            if (ph) {
                window.sessionStorage.setItem("phone", user.phone);
                window.sessionStorage.setItem("pass", user.pass);

                var resultData = AJAX.data("CheckBinding", { MobilePhone: user.phone, Password: user.pass, VerificationCode: user.keyCode }, "GET-OPTIONS");
                resultData.then(function (result) {
                    if (result.data.status) {
                        switch (result.data.status) {
                            case 1:
                                new Storage().setValue("AppID", result.data.data.AppID);
                                new Storage().setValue("userStatus", 1);
                                new Storage().setValue("User", result.data.data);
                                cordovaReady.checkVersion();
                                cordovaReady.InitjPush(new Storage().getValue("AppID"));

                                statusSocketServices.statusClassName = "ion-happy-outline";
                                statusSocketServices.contentText = "您的账号已在微信绑定成功,登录即可!";
                                statusSocketServices.buttonClassName = "button-energized";
                                statusSocketServices.buttonText = "现在去登录";
                                statusSocketServices.buttonLink = "#/login";
                                $location.path("/status");
                                break;
                            case 2:
                                $ionicPopup.alert({
                                    title: '操作提示!',
                                    template: "您已经绑定，请登录!",
                                    okText: "确　定",
                                    okType: "button-energized"
                                }).then(function (res) {
                                    $location.path("/login");
                                });
                                break;
                            case 3:
                                $location.path("/registerBindingYKH");
                                break;
                            case 4:
                                if (result.data.data.length > 1) {
                                    var data = result.data.data;
                                    angular.forEach(data, function (v, k) {
                                        $scope.hideSheetListText.push({ text: "姓名：" + data[k].Name + " 等级：" + data[k].MaxMemlevel + " 卡号：" + data[k].MemCode });
                                    });
                                    var hideSheet = $ionicActionSheet.show({
                                        buttons: $scope.hideSheetListText,
                                        titleText: '选择您的身份信息',
                                        cancelText: '取消',
                                        cancel: function () {
                                        },
                                        buttonClicked: function (index) {
                                            var obj = data[index];

                                            var resultData = AJAX.data("BindByMyInfo", { MemGuid: obj.MemGUID, MobilePhone: user.phone, Password: user.pass }, "POST");
                                            resultData.then(function (result) {
                                                if (result.data.status) {
                                                    $scope.hideSheetListText = [];
                                                    window.sessionStorage.setItem("BindByMyInfo", JSON.stringify(result.data.data));
                                                    $location.path("/bindingZZLList");
                                                } else
                                                    $ionicPopup.alert({
                                                        title: '操作提示!',
                                                        template: result.data.info,
                                                        okText: "确　定",
                                                        okType: "button-energized"
                                                    });
                                            });
                                            return true;
                                        }
                                    });
                                } else {
                                    var resultData = AJAX.data("BindByMyInfo", { MemGuid: result.data.data[0].MemGUID, MobilePhone: user.phone, Password: user.pass }, "POST");
                                    resultData.then(function (result) {
                                        if (result.data.status) {
                                            $scope.hideSheetListText = [];
                                            window.sessionStorage.setItem("BindByMyInfo", JSON.stringify(result.data.data));
                                            $location.path("/bindingZZLList");
                                        } else
                                            $ionicPopup.alert({
                                                title: '操作提示!',
                                                template: result.data.info,
                                                okText: "确　定",
                                                okType: "button-energized"
                                            });
                                    });
                                }
                                break;
                        }
                    } else
                        $ionicPopup.alert({
                            title: '操作提示!',
                            template: result.data.info,
                            okText: "确　定",
                            okType: "button-energized"
                        });
                });
            }
        }
    }

    //注册绑定悦客会
    $scope.registerBindingYKH = function (registerBindingYKHForm) {
        registerBindingYKHForm.$setDirty();
        if (registerBindingYKHForm.$valid) {
            if (user.name.length >= 2) {
                var resultData = AJAX.data("RegisterByMyInfo", {
                    MobilePhone: window.sessionStorage.getItem("phone"),
                    Password: window.sessionStorage.getItem("pass"),
                    Name: (function (s) {
                        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"),
                            rs = "";
                        for (var i = 0; i < s.length; i++)
                            rs = rs + s.substr(i, 1).replace(pattern, '');
                        return rs;
                    })(user.name)
                }, "POST");
                resultData.then(function (result) {
                    if (result.data.status) {
                        window.sessionStorage.setItem("BindByMyInfo", JSON.stringify(result.data.data));
                        statusSocketServices.statusClassName = "ion-happy-outline";
                        statusSocketServices.contentText = "注册悦客会成功,选择您的物业小区!";
                        statusSocketServices.buttonClassName = "button-energized";
                        statusSocketServices.buttonText = "去选择小区";
                        statusSocketServices.buttonLink = "#/bindingZZLList";
                        $location.path("/status");
                    } else {
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
    }

    //物业注册
    $scope.bindingZZLRegister = function (bindingZZLForm) {
        bindingZZLForm.$setDirty();
        if (bindingZZLForm.$valid) {
            var ph = false;
            if (parseInt(user.phone) < 13000000000 || typeof parseInt(user.phone) != "number") {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "手机号码不正确！",
                    okType: "button-energized"
                });
                return false;
            } else ph = true;

            if (ph) {
                var resultCheck = AJAX.data("CommCheckKey", { Type: "ACTIVITY", MobilePhone: user.phone, Key: user.keyCode }, "GET-OPTIONS");
                resultCheck.then(function () {
                }).then(function () {
                    var resultData = AJAX.data("SubmitAccountBindingWy", { MobilePhone: user.phone, Pwd: user.pass, AppID: JSON.parse(window.sessionStorage.getItem("BindByMyInfo")).APPID });
                    resultData.then(function (result) {
                        if (result.data.status) {
                            //天问注册成功
                            if (!result.data.data.length) {
                                $ionicPopup.alert({
                                    title: '操作提示!',
                                    template: "您输入的业主的手机号未能查找到业主信息，请核对信息是否正确!",
                                    okType: "button-energized"
                                });
                            } else {
                                statusSocketServices.statusClassName = "ion-happy-outline";
                                statusSocketServices.contentText = "绑定成功,登录即可!";
                                statusSocketServices.buttonClassName = "button-energized";
                                statusSocketServices.buttonText = "现在去登录";
                                statusSocketServices.buttonLink = "#/login";
                                $location.path("/status");
                            }
                        } else {
                            $ionicPopup.alert({
                                title: '操作提示!',
                                template: result.data.info,
                                okText: "确　定",
                                okType: "button-energized"
                            });
                        }
                    });
                });
            }
        }
    }
}]);

//APP首页
app.controller('BASE.indexController', ['$scope', '$location', 'AJAX', '_User', '$stateParams', '$ionicPopup', function ($scope, $location, AJAX, _User, $stateParams, $ionicPopup) {
    //用户信息
    var User = _User();

    if (!User) {
        $location.path("/login");
        return false;
    }
    //banner
    var resultData = AJAX.data("GetADList", { AdpID: 9 }, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.ADList = result.data.data;
        }
    });
    //活动
    var resultData = AJAX.data("GetActivityList", { AppID: User.AppID, pageIndex: 1, pageSize: 2 }, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.ActivityList = result.data.data;
        } else {
            $scope.GetActivityListError = true;
        }
    });
    //资讯列表
    //活动
    var resultData = AJAX.data("GetInformationManageList", { pageIndex: 1, pageSize: 2 }, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.ManageList = result.data.data;
        }
        else {
            $scope.GetInformationManageListError = true;
        }
    });
    //联盟商家
    var resultData = AJAX.data("GetAllianceMerchantList", { AppID: User.AppID, TypeID: 1, pageIndex: 1, pageSize: 4 }, 'GET', true);
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.MerchantList = result.data.data;
        } else {
            $scope.GetAllianceMerchantListError = true;
        }
    });
}]);

//天问物业小区列表
app.controller('BASE.bindingZZLController', ["$scope", "$location", "$ionicPopup", "$rootScope", "statusSocketServices", "AJAX", function ($scope, $location, $ionicPopup, $rootScope, statusSocketServices, AJAX) {
    var user = $scope.user = {};

    var resultData = AJAX.data("bindingZZLList", { MobilePhone: window.sessionStorage.getItem("phone"), Type: "Tw", AppID: JSON.parse(window.sessionStorage.getItem("BindByMyInfo")).APPID, Pwd: window.sessionStorage.getItem("pass") });
    resultData.then(function (result) {
        if (result.data.status) {
            //物业信息列表
            if (result.data.data.length) {
                $scope.zzlList = result.data.data;
            } else {
                statusSocketServices.statusClassName = "ion-sad-outline";
                statusSocketServices.contentText = "在物业获取不到您的信息，请使用业主的手机号码和密码进行绑定";
                statusSocketServices.buttonClassName = "button-energized";
                statusSocketServices.buttonText = "现在就去绑定";
                statusSocketServices.buttonLink = "#/bindingZZLRegister";
                $location.path("/status");
            }
        } else {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "糟糕,获取信息失败了,刷新一下页面试试!",
                okText: "确　定",
                okType: "button-energized"
            });
        }
    });

    //物业注册
    $scope.bindingZZLList = function () {
        var resultData = AJAX.data("BindByTWInfo", { AppID: JSON.parse(window.sessionStorage.getItem("BindByMyInfo")).APPID, MobilePhone: window.sessionStorage.getItem("phone"), TwData: $scope.zzlList });
        resultData.then(function (result) {
            if (result.data.status) {
                //天问注册成功
                statusSocketServices.statusClassName = "ion-happy-outline";
                statusSocketServices.contentText = "欢迎你来到悦客会，我们将为您提供无微不至的在线服务";
                statusSocketServices.buttonClassName = "button-energized";
                statusSocketServices.buttonText = "进入悦生活";
                statusSocketServices.buttonLink = "#/login";
                $location.path("/status");
            } else {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "糟糕,绑定失败了,重新操作一下试试!",
                    okText: "确　定",
                    okType: "button-energized"
                });
            }
        });
    }

    //选中
    $scope.checked = function (i) {
        var list = $scope.zzlList;
        angular.forEach(list, function (v, k) {
            v.checked = false;
        });
        i.checked = true;
    }
}]);

//tabs切换页面
app.controller('BASE.tabsController', ['$scope', '$state', function ($scope, $state) {
    $scope.index = function () {
        $state.go('base.tabs.index');
    }
    $scope.ykh = function () {
        $state.go('base.tabs.ykh');
    }
    $scope.zy = function () {
        $state.go('base.tabs.zy');
    }
    $scope.zzl = function () {
        $state.go('base.tabs.zzl');
    }
    $scope.shg = function () {
        $state.go('base.tabs.shg');
    }
}]);

//资讯
app.controller('BASE.zxController', ['$scope', '$location', 'AJAX', '_User', '$ionicPopup', '$stateParams', '$rootScope', function ($scope, $location, AJAX, _User, $ionicPopup, $stateParams, $rootScope) {
    //用户信息
    var User = _User();
    var title = "";
    $rootScope.pageIndex = 2;
    switch ($stateParams.typeid) {
        case "7": title = "优惠政策";
            break;
        case "9": title = "工程进度";
            break;
        case "11": title = "生活资讯";
            break;
        case "12": title = "户型品鉴";
            break;
        case "13": title = "优惠政策";
            break;
        case "14": title = "积分商城";
            break;
        case "15": title = "悦客会通知";
            break;
        default: title = "资讯";
            break;
    }
    $scope.Title = title;
    var resultData = AJAX.data('GetInformationManageList', { TypeID: $stateParams.typeid, pageIndex: "1", pageSize: 5, Authority: $stateParams.Authority });
    resultData.then(function (result) {
        if (result.data.status == 1 && result.data.data.length > 0) {
            $scope.infomationList = result.data.data;
            $scope.GetInformationManageListError = false;
            $scope.noData = true;
        } else {
            $scope.GetInformationManageListError = true;
            $scope.noData = false;
        }
    });

    $scope.loadMoreData = function () {
        var resultData1 = AJAX.data('GetInformationManageList', { TypeID: $stateParams.typeid, pageIndex: $rootScope.pageIndex, pageSize: '5', Authority: $stateParams.Authority });
        resultData1.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                var arry = $scope.infomationList || [];
                $scope.infomationList = arry.concat(result.data.data);
                $rootScope.pageIndex++;
                $scope.GetInformationManageListError = false;
            } else {
                $scope.GetInformationManageListError = true;
                $scope.noData = false;
            }
        });
    }
    $scope.showinfo = false;
    var resultData2 = AJAX.data('GetInformationManageInfo', { ID: $stateParams.id });
    resultData2.then(function (result2) {
        if (result2.data.status == 1) {

            $scope.infomation = result2.data.data;
            $scope.showinfo = true;
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

//我的活动
app.controller('BASE.myActivityController', ['$scope', '$location', '_User', 'AJAX', '$ionicPopup', '$stateParams', '$rootScope', function ($scope, $location, _User, AJAX, $ionicPopup, $stateParams, $rootScope) {
    //用户信息
    var User = _User();
    var pageIndex = $rootScope.pageIndex = 2;
    var pageIndex = $rootScope.myActivitypageIndex = 2;
    $scope.noData = true;
    $scope.noData1 = true;
    var resultData = AJAX.data("GetMyActivityList", { "AppID": User.AppID, "pageIndex": "1", "pageSize": "5", "Modules": $stateParams.Modules, "Authority": $stateParams.Authority });
    resultData.then(function (result) {
        if (result.data.status && result.data.data.length > 0) {
            $scope.myactivityData = result.data.data;
            $scope.GetMyActivityListError = false;
        } else {
            $scope.GetMyActivityListError = true;
            $scope.noData1 = false;
        }
    });
    var resultData1 = AJAX.data("GetActivityList", { "AppID": User.AppID, "pageIndex": "1", "pageSize": "5", "Modules": $stateParams.Modules, "Authority": $stateParams.Authority });
    resultData1.then(function (result1) {
        if (result1.data.status && result1.data.data.length > 0) {
            $scope.allactivityData = result1.data.data;
            $scope.allactivityDataError = false;
        } else {
            $scope.allactivityDataError = true;
            $scope.noData = false;
        }
    });

    $scope.loadMoreData = function () {
        var resultData1 = AJAX.data("GetActivityList", { "AppID": User.AppID, "pageIndex": $rootScope.pageIndex, "pageSize": "5", "Modules": $stateParams.Modules, "Authority": $stateParams.Authority });
        resultData1.then(function (result1) {
            if (result1.data.status && result1.data.data.length > 0) {
                var arry = $scope.allactivityData || [];
                $scope.allactivityData = arry.concat(result1.data.data);
                $rootScope.pageIndex++;
                $scope.allactivityDataError = false;
            } else {
                $scope.allactivityDataError = true;
                $scope.noData = false;
            }
        });
    }

    $scope.myActivityloadMoreData = function () {
        var resultData1 = AJAX.data("GetMyActivityList", { "AppID": User.AppID, "pageIndex": $rootScope.myActivitypageIndex, "pageSize": "5", "Modules": $stateParams.Modules, "Authority": $stateParams.Authority });
        resultData1.then(function (result) {
            if (result.data.status && result.data.data.length > 0) {
                var arry = $scope.myactivityData || [];
                $scope.myactivityData = arry.concat(result.data.data);
                $rootScope.myActivitypageIndex++;
                $scope.GetMyActivityListError = false;
            } else {
                $scope.GetMyActivityListError = true;
                $scope.noData1 = false;
            }
        });
    }

}]);
//活动详情
app.controller('BASE.activityDetails', ['$scope', '$location', '_User', 'AJAX', '$stateParams', '$rootScope', '$ionicPopup', 'statusSocketServices', '$state', function ($scope, $location, _User, AJAX, $stateParams, $rootScope, $ionicPopup, statusSocketServices, $state) {

    //用户信息
    var User = _User();

    $scope.user = {
        phone: User.Phone,
        name: User.Name,
        num: 1,
        keycode: "",
        SelectThing: ""
    };
    var resultData = AJAX.data("GetActivityInfo", { ActivityID: $stateParams.id, AppID: User.AppID });
    resultData.then(function (result) {
        if (result.data.status) {
            $scope.activityDetails = result.data.data;
            if (result.data.data.BmNum != null && result.data.data.BmNum != '') {
                $scope.user.num = $scope.activityDetails.BmNum;
            }
        } else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });

    var resultData4 = AJAX.data("GetSelectThing", { ActivityID: $stateParams.id, AppID: User.AppID });
    resultData4.then(function (result4) {
        if (result4.data.status) {
            $scope.select = result4.data.data;
        } else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result4.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });

    var resultData3 = AJAX.data("GetBank", { Modules: $stateParams.modules, AppID: User.AppID });
    resultData3.then(function (result3) {
        if (result3.data.status) {
            $rootScope.Bank = $scope.Bank = result3.data.data;
        } else
            $ionicPopup.alert({
                title: '操作提示!',
                template: result3.data.info,
                okText: "确　定",
                okType: "button-energized"
            });
    });

    //获取验证码
    $scope.keyCode = function () {
        if (parseInt($scope.user.phone) < 13000000000 || typeof parseInt($scope.user.phone) != "number" || $scope.user.phone == "") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: "手机号码不正确！",
                okType: "button-energized"
            });
        } else {
            var resultData5 = AJAX.data("keyCode", { MobilePhone: $scope.user.phone });
            resultData5.then(function (result5) {
                if (result5.data.status) {
                    window.sessionStorage.setItem("keyCode", result5.data.data);
                } else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result5.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }
    }

    $scope.paysub = function (bank) {
        var key = false;
        if ($scope.user.num == "") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '报名人数不能为空',
                okText: "确　定",
                okType: "button-energized"
            }); return false;
        }
        if ($scope.activityDetails.IsValidate == 1) {
            var resultCheck = AJAX.data("CommCheckKey", { Type: "ACTIVITY", MobilePhone: $scope.user.phone, Key: $scope.user.keycode }, "GET-OPTIONS");
            resultCheck.then(function (result) {
                if (result.data.status == 1) {
                    key = true;
                    if (key) {
                        var resultData2 = AJAX.data("SubmitActivitySignUp", { ActivityID: $stateParams.id, AppID: User.AppID, Name: $scope.user.name, Phone: $scope.user.phone, IsPayment: "1", PayMent: $scope.activityDetails.PayMent, MaxNum: $scope.user.num, SelectThing: $scope.user.SelectThing });
                        resultData2.then(function (result2) {
                            if (result2.data.status == 1) {
                                $state.go("base.tabs.base_play", { AppID: User.AppID, Modules: $scope.activityDetails.Modules, BankCode: bank, PayType: 'HD', PayID: result2.data.data1.RegistID });
                            } else
                                $ionicPopup.alert({
                                    title: '操作提示!',
                                    template: result2.data.info,
                                    okText: "确　定",
                                    okType: "button-energized"
                                });
                        });
                    }
                }
            });
        } else {
            var resultData2 = AJAX.data("SubmitActivitySignUp", { ActivityID: $stateParams.id, AppID: User.AppID, Name: $scope.user.name, Phone: $scope.user.phone, IsPayment: "1", PayMent: $scope.activityDetails.PayMent, MaxNum: $scope.user.num, SelectThing: $scope.user.SelectThing });
            resultData2.then(function (result2) {
                if (result2.data.status == 1) {
                    $state.go("base.tabs.base_play", { AppID: User.AppID, Modules: $scope.activityDetails.Modules, BankCode: bank, PayType: 'HD', PayID: result2.data.data1.RegistID });
                } else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result2.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }
    }

    $scope.sub = function () {
        var key = false;
        if ($scope.user.num == "") {
            $ionicPopup.alert({
                title: '操作提示!',
                template: '报名人数不能为空',
                okText: "确　定",
                okType: "button-energized"
            }); return false;
        }
        if ($scope.activityDetails.IsValidate == 1) {
            var resultCheck = AJAX.data("CommCheckKey", { Type: "ACTIVITY", MobilePhone: $scope.user.phone, Key: $scope.user.keycode }, "GET-OPTIONS");
            resultCheck.then(function (result) {
                if (result.data.status == 1) {
                    key = true;
                    if (key) {
                        var resultData2 = AJAX.data("SubmitActivitySignUp", { ActivityID: $stateParams.id, AppID: User.AppID, Name: $scope.user.name, Phone: $scope.user.phone, IsPayment: "0", PayMent: $scope.activityDetails.PayMent, MaxNum: $scope.user.num, SelectThing: $scope.user.SelectThing });
                        resultData2.then(function (result2) {
                            if (result2.data.status == 1) {
                                statusSocketServices.statusClassName = "ion-happy-outline";
                                statusSocketServices.contentText = "报名成功";
                                statusSocketServices.buttonClassName = "button-energized";
                                statusSocketServices.buttonText = "查看活动";
                                statusSocketServices.buttonLink = "#/tabs/hd_MyActivity//";
                                $location.path("/status");
                            } else
                                $ionicPopup.alert({
                                    title: '操作提示!',
                                    template: result2.data.info,
                                    okText: "确　定",
                                    okType: "button-energized"
                                });
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
        else {
            var resultData2 = AJAX.data("SubmitActivitySignUp", { ActivityID: $stateParams.id, AppID: User.AppID, Name: $scope.user.name, Phone: $scope.user.phone, IsPayment: "0", PayMent: $scope.activityDetails.PayMent, MaxNum: $scope.user.num, SelectThing: $scope.user.SelectThing });
            resultData2.then(function (result2) {
                if (result2.data.status == 1) {
                    statusSocketServices.statusClassName = "ion-happy-outline";
                    statusSocketServices.contentText = "报名成功";
                    statusSocketServices.buttonClassName = "button-energized";
                    statusSocketServices.buttonText = "查看活动";
                    statusSocketServices.buttonLink = "#/tabs/hd_MyActivity//";
                    $location.path("/status");
                } else
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: result2.data.info,
                        okText: "确　定",
                        okType: "button-energized"
                    });
            });
        }
    };
}]);
//客服中心
app.controller('BASE.callCenterController', ['$scope', '$location', '_User', 'AJAX', '$stateParams', function ($scope, $location, _User, AJAX, $stateParams) {

    //用户信息
    var User = _User();

    var resultData = AJAX.data("GetCustomeCenterList", { AppID: User.AppID, PID: $stateParams.PID });
    resultData.then(function (result) {
        if (result.data.status == 1) {
            $scope.CustomeCenterList = result.data.data;
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

//配送地址
app.controller('BASE.addAddressController', ['$scope', '$location', function ($scope, $location) {

}]);

//配送地址之设置
app.controller('BASE.settingAddressController', ['$scope', '$location', function ($scope, $location) {

}]);

//状态提醒页面
app.controller('BASE.statusController', ["$scope", "$location", "statusSocketServices", function ($scope, $location, statusSocketServices) {
    $scope.statusClassName = statusSocketServices.statusClassName;
    $scope.contentText = statusSocketServices.contentText;
    $scope.buttonClassName = statusSocketServices.buttonClassName;
    $scope.buttonText = statusSocketServices.buttonText;
    $scope.buttonLink = statusSocketServices.buttonLink;
}]);

//支付
app.controller('BASE.playController', ['$scope', '$sce', '$stateParams', 'dataApi', 'OpenUrl', function ($scope, $sce, $stateParams, dataApi, OpenUrl) {
    var Url = dataApi.NET + "OnLinePay?AppID=" + $stateParams.AppID + "&Modules=" + $stateParams.Modules + "&BankCode=" + $stateParams.BankCode + "&PayType=" + $stateParams.PayType + "&PayID=" + $stateParams.PayID;
    $scope.PayUrl = $sce.trustAsResourceUrl(Url);
    //OpenUrl.SystemChorme(Url);
}]);

//修改账号信息
app.controller('BASE.settingInfoController', ['$scope', '$location', 'AJAX', '_User', '$ionicActionSheet', '$ionicPopup', 'PhotoUpload', 'Storage', function ($scope, $location, AJAX, _User, $ionicActionSheet, $ionicPopup, PhotoUpload, Storage) {
    //用户信息

    var _Storage = new Storage();
    var User = _User();
    if (User.Pic == '') {
        User.Pic = "./images/morentouxiang.jpg";
    }
    $scope.MemberInfo = User;
    PhotoUpload.PICURL = $scope.MemberInfo.Pic;
    $scope.AccountInfo = { Address: "", Pic: "" };
    $scope.VCodeInfo = { VerificationCode: "", VCodeTitle: "发送验证码" };

    $scope.UpdateAccount = function () {
        var resultData = AJAX.data("UpdateAccountInfo", { AppID: User.AppID, Address: $scope.MemberInfo.Address, Pic: PhotoUpload.PICURL, VerificationCode: $scope.VCodeInfo.VerificationCode }, "GET-OPTIONS");
        resultData.then(function (result) {
            $scope.MemberInfo.Pic = PhotoUpload.PICURL;
            var JsonUser = _Storage.getValue("User");
            JsonUser.Pic = PhotoUpload.PICURL;
            _Storage.setValue("User", JsonUser);
            $scope.VCodeInfo.VerificationCode = "";

            if (result.data.status == 1) {
                $ionicPopup.alert({
                    title: '操作提示!',
                    template: "操作成功",
                    okText: "确　定",
                    okType: "button-energized"
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

    $scope.UploadType = function () {
        $scope.type = [{ text: "相册", code: "PHOTOLIBRARY" }, { text: "拍照", code: "CAMERA" }];

        if ($scope.type.length) {
            var hideSheet = $ionicActionSheet.show({
                buttons: $scope.type,
                titleText: '选择图片',
                cancelText: '取消',
                cancel: function () {
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

//修改密码
app.controller('BASE.updatePwdController', ['$scope', '$state', '$ionicPopup', 'AJAX', '_User', function ($scope, $state, $ionicPopup, AJAX, _User) {

    //用户信息
    var User = _User();

    $scope.PwdInfo = { OldPwd: "", NewPwd: "", ConfirmPwd: "", VerificationCode: "" };

    $scope.UpdatePwd = function (obj) {
        obj.$setDirty();
        if (obj.$valid) {
            var resultData = AJAX.data("UpdatePwd", {
                AppID: User.AppID,
                OldPwd: $scope.PwdInfo.OldPwd,
                NewPwd: $scope.PwdInfo.NewPwd,
                VerificationCode: $scope.PwdInfo.VerificationCode
            }, "GET-OPTIONS");
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    var state = $ionicPopup.alert({
                        title: '操作提示!',
                        template: "操作成功",
                        okText: "确　定",
                        okType: "button-energized"
                    });
                    $scope.PwdInfo = { OldPwd: "", NewPwd: "", ConfirmPwd: "", VerificationCode: "" };
                    state.then(function (res) {
                        $state.go("base.tabs.index");
                    });
                } else
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