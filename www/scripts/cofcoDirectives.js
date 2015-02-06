//验证用户确认密码是否正确
app.directive("repass", [function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            if (ctrl) {
                var otherInput = element.inheritedData("$formController")[attrs.repass];
                var repeatValidator = function (value) {
                    var validity = value === otherInput.$viewValue;
                    ctrl.$setValidity("repass", validity);
                    return validity ? value : undefined;
                };
                ctrl.$parsers.push(repeatValidator);
                ctrl.$formatters.push(repeatValidator);
                otherInput.$parsers.push(function (value) {
                    ctrl.$setValidity("repass", value === ctrl.$viewValue);
                    return value;
                });
            }
        }
    }
}]);

//tabs切换
app.directive("tabs", [function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click", function (event) {
                $(".tab-item").removeClass("active");
                $(this).addClass("active");
                $(".ngTab").hide();
                $("#" + attrs.id).show();
            });
        }
    }
}]);

//文字向上滚动
app.directive("texttop", [function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            //setTimeout(function () {
            //    (function (id, w, n) {
            //        var box = document.getElementById(id),
            //            can = true,
            //            w = w || 1500,
            //            fq = fq || 10,
            //            n = n == -1 ? -1 : 1;
            //        box.innerHTML += box.innerHTML;
            //        box.onmousedown = function () { can = false };
            //        box.onmouseup = function () { can = true };
            //        var max = parseInt(box.scrollHeight / 2);
            //        setTimeout(function(){
            //            var stop = box.scrollTop % 72 == 0 && !can;
            //            if (!stop) {
            //                var set = n > 0 ? [max, 0] : [0, max];
            //                box.scrollTop == set[0] ? box.scrollTop = set[1] : box.scrollTop += n;
            //            }
            //        },2000);
            //    })('listA', 2000);
            //}, 5000);
        }
    }
}]);

//验证码

app.directive("vcode", ['$interval', 'AJAX', '_User', '$ionicPopup', '$rootScope', function ($interval, AJAX, _User, $ionicPopup, $rootScope) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            var User = _User();
            element.on("click", function (event) {

                var _ = this;
                if (attrs.disabled == "disabled") return false;
                //var AppID = typeof User === 'undefined' ? '' : User.AppID;
                var AppID = User.AppID;
                var resultData = AJAX.data("SendVerificationCode", { Type: attrs.vcodeType, AppID: AppID, MobilePhone: attrs.phone }, "GET-OPTIONS");
                resultData.then(function (result) {
                    attrs.disabled = "disabled";
                    if (result.data.status == 1) {
                        var second = 60;
                        stop = $interval(function () {
                            second--;
                            $(_).text(second + "秒后重新获取验证码");
                            if (second == 0) {
                                $interval.cancel(stop);
                                $(_).text("发送验证码");
                                attrs.disabled = "";
                            }
                        }, 1000);
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
            });
        }
    }
}]);


app.directive("vuser", ['$interval', 'AJAX', '$ionicPopup', '$rootScope', function ($interval, AJAX, $ionicPopup) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click", function (event) {
                var _ = this;
                if (attrs.disabled == "disabled") return false;
                if (attrs.phone == "") {
                    $ionicPopup.alert({
                        title: '操作提示!',
                        template: "请输入手机号码",
                        okText: "确  定",
                        okType: "button-energized"
                    }); return false;
                }
                var resultData = AJAX.data("SendVerificationCode", { Type: attrs.vcodeType, MobilePhone: attrs.phone }, "GET-OPTIONS");
                resultData.then(function (result) {
                    attrs.disabled = "disabled";
                    if (result.data.status == 1) {
                        var second = 60;
                        stop = $interval(function () {
                            second--;
                            $(_).text(second + "秒后重新获取验证码");
                            if (second == 0) {
                                $interval.cancel(stop);
                                $(_).text("发送验证码");
                                attrs.disabled = "";
                            }
                        }, 1000);

                    }
                    else {
                        attrs.disabled = "";
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
}]);
//左侧菜单
app.directive("leftmenu", ['$ionicSideMenuDelegate', function ($ionicSideMenuDelegate) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click", function (event) {
                $ionicSideMenuDelegate.toggleLeft();
            });
        }
    }
}]);

//右侧菜单
app.directive("rightmenu", ['$ionicSideMenuDelegate', function ($ionicSideMenuDelegate) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click", function (event) {
                $ionicSideMenuDelegate.toggleRight();
            });
        }
    }
}]);

//返回按钮
app.directive("return", ["$window", function ($window) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click", function (event) {
                $window.history.back();
            });
        }
    }
}]);

//轮播banner
app.directive("banner", ['$timeout', function ($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            $timeout(function () {
                $('#slide3').swipeSlide({
                    speed: 3000
                }, function (i) {
                    $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                });
            }, 2000);
        }
    }
}]);

//阻止默认行为
app.directive("defaultEvent", [function(){
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click",function (event) {
                event.stopPropagation();
                event.preventDefault();
            });
        }
    }
}]);

app.directive("cordovadate", ['$q', function ($q) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            element.on("click", function (event) {

                var platform = "";
                try {
                    platform = device.platform;
                }
                catch (error) {
                }

                if (platform == "Android") {

                }
                else if (platform == "iOS") {
                    return;
                } else {
                    return;
                }

                var _ = this;
                var defer = $q.defer();

                //var platform = device.platform;
                //$(_).val("哈哈");

                var options = {
                    date: new Date(),
                    mode: attrs.options
                };
                var SelectDateTime = function () {
                    datePicker.show(options, function (date) {
                        //console.log(date);
                        //FormatDate = date;
                        //var strDate = FormatDate.getFullYear() + "-" + (FormatDate.getMonth() + 1) + "-" + FormatDate.getDate();
                        ////defer.resolve(SelectDateTime);
                        //$(_).val(strDate);
                        defer.resolve(date);
                    });
                    return defer.promise;
                }

                SelectDateTime().then(function () {
                    //alert(arguments[0]);
                    var FormatDate = arguments[0]; //new Date(Date.parse(arguments[0].replace(/-/g, "/")));

                    var strDate;
                    switch (attrs.options) {
                        case "date":
                            strDate = FormatDate.getFullYear() + "-" + (FormatDate.getMonth() + 1) + "-" + FormatDate.getDate();
                            break;
                        case "time":
                            strDate = FormatDate.getHours() + ":" + (FormatDate.getMinutes());
                            break;
                        case "datetime":
                            strDate = FormatDate.getFullYear() + "-" + (FormatDate.getMonth() + 1) + "-" + FormatDate.getDate() + " " + FormatDate.getHours() + ":" + FormatDate.getMinutes();
                            break;
                    }
                    $(_).val(strDate);
                    //scope.$apply();
                });
            });
        }
    }
}]);


//
////监听左右侧滑改变
//app.directive("sideMenu",[function(){
//    return {
//        restrict:"A",
//        require:"ngModel",
//        link:function(scope, element, attrs, ctrl){
//            console.log(scope,element,attrs,ctrl);
//            alert(1);
////            if (ctrl) {
//////                var otherInput = element.inheritedData("$formController")[attrs.repass];
//////                var repeatValidator = function (value) {
//////                    var validity = value === otherInput.$viewValue;
//////                    ctrl.$setValidity("repass", validity);
//////                    return validity ? value : undefined;
//////                };
//////                ctrl.$parsers.push(repeatValidator);
//////                ctrl.$formatters.push(repeatValidator);
//////                otherInput.$parsers.push(function (value) {
//////                    ctrl.$setValidity("repass", value === ctrl.$viewValue);
//////                    return value;
//////                });
////
////
////            }
//        }
//    }
//}]);