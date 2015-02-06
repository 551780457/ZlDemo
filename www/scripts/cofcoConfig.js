//路由控制
app.config(["$stateProvider", "$urlRouterProvider",function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.
        state('base', {//框架页
            url: "/",
            controller: "BASE.mainController",
            templateUrl: "templates/base_Main.html"
        }).
        state('base.tabs', {//tabs切换页
            url: "tabs",
            controller: "BASE.tabsController",
            templateUrl: "templates/base_Tabs.html"
        }).
        state('base.tabs.index', {//首页
            url: "/index",
            views: {
                'index_tab': {
                    controller: "BASE.indexController",
                    templateUrl: "templates/base_Index.html"
                }
            }
        }).
        state('base.tabs.ykh', {//悦客会
            url: "/ykh",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.indexController",
                    templateUrl: "templates/ykh_Index.html"
                }
            }
        }).
        state('base.tabs.zy',{//置业
            url: "/zy",
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.indexController",
                    templateUrl: "templates/zy_Index.html"
                }
            }
        }).
        state('base.tabs.zzl', {//住这里
            url: "/zzl",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.indexController",
                    templateUrl: "templates/zzl_Index.html"
                }
            }
        }).
        state('base.tabs.shg', {//生活馆
            url: "/shg",
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.indexController",
                    templateUrl: "templates/shg_Index.html"
                }
            }
        }).
        state('base.tabs.zx', {//动态资讯
            url: "/zx/:typeid/:Authority",
            views: {
                'index_tab': {
                    controller: "BASE.zxController",
                    templateUrl: "templates/zx_information.html"
                }
            }
        }).

        state('base.tabs.zx_information_Details', {//资讯详情
            url: "/zx_information_Details/:id/:modules/:typeid",
            views: {
                'index_tab': {
                    controller: "BASE.zxController",
                    templateUrl: "templates/zx_information_Details.html"
                }
            }
        }).
        state('base.tabs.hd_MyActivity', {//我的活动
            url: "/hd_MyActivity/:Modules/:Authority",
            views: {
                'index_tab': {
                    controller: "BASE.myActivityController",
                    templateUrl: "templates/hd_MyActivity.html"
                }
            }
        }).
        state('base.tabs.hd_ActivityList', {//活动列表
            url: "/hd_ActivityList/:Modules/:Authority",
            views: {
                'index_tab': {
                    controller: "BASE.myActivityController",
                    templateUrl: "templates/hd_ActivityList.html"
                }
            }
        }).
        state('base.tabs.hd_activityDetails', {//活动详情
            url: "/hd_activityDetails/:id/:modules",
            views: {
                'ykh_tab': {
                    controller: "BASE.activityDetails",
                    templateUrl: "templates/hd_activityDetails.html"
                }
            }
        }).
        state('base.tabs.hd_hasSigned', {//活动之已报名
            url: "/hd_hasSigned",
            views: {
                'ykh_tab': {
                    controller: "BASE.activityDetails",
                    templateUrl: "templates/hd_hasSigned.html"
                }
            }
        }).
        state('base.tabs.hd_signConfirm', {//活动之确认签到
            url: "/hd_signConfirm",
            views: {
                'ykh_tab': {
                    controller: "BASE.activityDetails",
                    templateUrl: "templates/hd_signConfirm.html"
                }
            }
        }).
        state('base.tabs.base_callCenter', {//客服中心
            url: "/base_callCenter/:PID",
            views: {
                'index_tab': {
                    controller: "BASE.callCenterController",
                    templateUrl: "templates/base_callCenter.html"
                }
            }
        }).
        state('guidePage', {//引导页
            url: "/guidePage",
            controller: "BASE.guidePageController",
            templateUrl: "templates/base_GuidePage.html"
        }).
        state('login', {//登录页
            url: "/login",
            controller: "BASE.loginController",
            templateUrl: "templates/base_Login.html"
        }).
        state('forgetPwd', {//找回密码
            url: "/forgetPwd",
            controller: "BASE.forgetPwdController",
            templateUrl: "templates/base_forgetPwd.html"
        }).
        state('modifyPwd', {//修改密码
             url: "/modifyPwd/:AppID",
             controller: "BASE.modifyPwdController",
             templateUrl: "templates/base_modifyPwd.html"
        }).
        state('register', {//注册页
            url: "/register",
            controller: "BASE.registerController",
            templateUrl: "templates/base_Register.html"
        }).
        state("registerBindingYKH", {//悦客会绑定
            url: "/registerBindingYKH",
            controller: "BASE.registerController",
            templateUrl: "templates/base_Register_bindingYKH.html"
        }).
        state("bindingZZLRegister", {//住这里绑定
            url: "/bindingZZLRegister",
            controller: "BASE.registerController",
            templateUrl: "templates/base_Binding_ZZL.html"
        }).
        state("bindingZZLList", {//住这里绑定存在用户的情况
            url: "/bindingZZLList",
            controller: "BASE.bindingZZLController",
            templateUrl: "templates/base_Binding_ZZL_List.html"
        }).
        state("status", {//住这里绑定存在用户的情况
            url: "/status",
            controller: "BASE.statusController",
            templateUrl: "templates/base_Status.html"
        }).
        state("addAddress", {//用户地址之添加
            url: "/addAddress",
            views: {
                'index_tab': {
                    controller: "BASE.addAddressController",
                    templateUrl: "templates/base_addAddress.html"
                }
            }
        }).
        state("base.tabs.base_settingAddress", {//用户地址之设置
            url: "/settingAddress",
            views: {
                'index_tab': {
                    controller: "BASE.settingAddressController",
                    templateUrl: "templates/base_settingAddress.html"
                }
            }
        }).
        state("base.tabs.base_play", {//支付框架页面
            url: "base_play/:AppID/:Modules/:BankCode/:PayType/:PayID",
            views: {
                'index_tab': {
                    controller: "BASE.playController",
                    templateUrl: "templates/base_Play.html"
                }
            }
        }).
        state("base.tabs.base_settingInfo", {//用户信息
            url: "/settingInfo",
            views: {
                'index_tab': {
                    controller: "BASE.settingInfoController",
                    templateUrl: "templates/base_settingInfo.html"
                }
            }
        }).
        state("base.tabs.base_updatePwd", {//用户信息
            url: "/updatePwd",
            views: {
                'index_tab': {
                    controller: "BASE.updatePwdController",
                    templateUrl: "templates/base_updatePwd.html"
                }
            }
        });

    //悦客会路由控制
    $stateProvider.
        state('base.tabs.ykh_info', {//悦客会
            url: "/ykh_info",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.indexController",
                    templateUrl: "templates/ykh_Index_Info.html"
                }
            }
        }).
        state('base.tabs.ykh_MyWarrant', {//我的权证
            url: "/ykh_MyWarrant",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myWarrantController",
                    templateUrl: "templates/ykh_MyWarrant.html"
                }
            }
        }).
        state('base.tabs.ykh_QualitySurvey', {//品质调研
            url: "/ykh_QualitySurvey",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.qualitySurveyController",
                    templateUrl: "templates/ykh_QualitySurvey.html"
                }
            }
        }).
        state('base.tabs.ykh_QualitySurvey_Detailed', {//品质调研详情
            url: "/ykh_QualitySurvey_Detailed/:TID",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.qualitySurveyController",
                    templateUrl: "templates/ykh_QualitySurvey_Detailed.html"
                }
            }
        }).
        state('base.tabs.ykh_Merchant', {//联盟商家
            url: "/ykh_Merchant/:Type",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.merchantController",
                    templateUrl: "templates/ykh_Merchant.html"
                }
            }
        }).
        state('base.tabs.ykh_Merchant_Details', {//联盟商家详细
            url: "/ykh_Merchant_Details/:AllianceBusinessID",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.merchantController",
                    templateUrl: "templates/ykh_Merchant_Details.html"
                }
            }
        }).
        state('base.tabs.ykh_MyCoupon', {//悦客会之我的优惠卷
            url: "/ykh_MyCoupon",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myCouponController",
                    templateUrl: "templates/ykh_MyCoupon.html"
                }
            }
        }).
        state('base.tabs.ykh_MyCoupon_getCoupon', {//悦客会之领取优惠券
            url: "/ykh_MyCoupon_getCoupon",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myCouponGetCouponController",
                    templateUrl: "templates/ykh_MyCoupon_getCoupon.html"
                }
            }
        }).
        state('base.tabs.ykh_MyCoupon_Detailed', {//悦客会之优惠券详情
            url: "/ykh_MyCoupon_Detailed/:ID",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myCouponGetCouponController",
                    templateUrl: "templates/ykh_MyCoupon_Detailed.html"
                }
            }
        }).
        state('base.tabs.ykh_MyCoupon_scanning', {//悦客会之商家扫码
            url: "/ykh_MyCoupon_scanning",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myCouponScanningController",
                    templateUrl: "templates/ykh_MyCoupon_scanning.html"
                }
            }
        }).
        state('base.tabs.ykh_product', {//悦客会之积分商城
            url: "/ykh_product",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.productController",
                    templateUrl: "templates/ykh_product.html"
                }
            }
        }).
        state('base.tabs.ykh_Integral_Details', {//悦客会之积分详细
            url: "/ykh_Integral_Details/:ProductID",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.productController",
                    templateUrl: "templates/ykh_Integral_Details.html"
                }
            }
        }).
        state('base.tabs.ykh_exchangeCart', {//悦客会之购物车
            url: "/ykh_exchangeCart",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.exchangeCartController",
                    templateUrl: "templates/ykh_exchangeCart.html"
                }
            }
        }).
        state('base.tabs.ykh_integralOrder', {//悦客会之订单确认
            url: "/ykh_integralOrder",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.integralOrderController",
                    templateUrl: "templates/ykh_integralOrder.html"
                }
            }
        }).
        state('base.tabs.ykh_Integral', {//悦客会之我的积分
            url: "/ykh_Integral",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.integralController",
                    templateUrl: "templates/ykh_Integral.html"
                }
            }
        }).
        state('base.tabs.ykh_Card', {//悦客会之我的身份
            url: "/ykh_Card",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.integralController",
                    templateUrl: "templates/ykh_Card.html"
                }
            }
        }).
        state('base.tabs.ykh_myOrder', {//悦客会之我的订单
            url: "/ykh_myOrder",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myOrderController",
                    templateUrl: "templates/ykh_myOrder.html"
                }
            }
        }).
        state('base.tabs.ykh_orderDetails', {//悦客会之我的订单详细
            url: "/ykh_orderDetails/:ID",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.myOrderController",
                    templateUrl: "templates/ykh_orderDetails.html"
                }
            }
        }).
        state('base.tabs.ykh_tacking', {//悦客会之物流详情
            url: "/ykh_tacking",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.tackingController",
                    templateUrl: "templates/ykh_tacking.html"
                }
            }
        }).
        state('base.tabs.ykh_ask', {//悦客会之在线客服
            url: "/ykh_ask/:Modules",
            views: {
                'ykh_tab': {
                    controller: "BASE.YKH.askController",
                    templateUrl: "templates/ykh_ask.html"
                }
            }
        });

    //天问路由控制
    $stateProvider.
        state('base.tabs.zzl_fee', {//天问首页
            url: "/zzl_fee",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.feeController",
                    templateUrl: "templates/zzl_Fee_Tabs.html"
                }
            }
        }).
        state('base.tabs.zzl_WarrantyAndInquiry', {//报事报修查询
            url: "/zzl_WarrantyAndInquiry",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.warrantyAndInquiryController",
                    templateUrl: "templates/zzl_WarrantyAndInquiry.html"
                }
            }
        }).
        state('base.tabs.zzl_information', {//物业通知
            url: "/zzl_information",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.informationController",
                    templateUrl: "templates/zzl_information.html"
                }
            }
        }).
       state('base.tabs.zzl_information_Details', {//物业通知详情
            url: "/zzl_information_Details/:id",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.informationController",
                    templateUrl: "templates/zzl_information_Details.html"
                }
            }
        }).
        state('base.tabs.zzl_HistoryDetails', {//历史详情
            url: "/zzl_HistoryDetails/:IncidentID",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.historyDetailsController",
                    templateUrl: "templates/zzl_HistoryDetails.html"
                }
            }
        }).
        state('base.tabs.zzl_StoredDetails_Tabs', {//预存冲抵
            url: "/zzl_StoredDetails_Tabs",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.storedDetailsController",
                    templateUrl: "templates/zzl_StoredDetails_Tabs.html"
                }
            }
        }).
        state('base.tabs.zzl_StoredDetails_Info', {//预存充值
            url: "/zzl_StoredDetails_Info",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.storedDetailsInfoController",
                    templateUrl: "templates/zzl_StoredDetails_Info.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_shop', {//配送服务
            url: "/zzl_ps_shop",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psShopController",
                    templateUrl: "templates/zzl_ps_shop.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_Phone', {//配送商城联系商家
            url: "/zzl_ps_Phone",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psPhoneController",
                    templateUrl: "templates/zzl_ps_Phone.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_productDetails', {//商品详情
            url: "/zzl_ps_productDetails/:id",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psProductDetailsController",
                    templateUrl: "templates/zzl_ps_productDetails.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_detailsParameter', {//商品参数
            url: "/zzl_ps_detailsParameter/:type",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psProductDetailsController",
                    templateUrl: "templates/zzl_ps_detailsParameter.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_productClassList', {//产品分类
            url: "/zzl_ps_productClassList",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psProductClassListController",
                    templateUrl: "templates/zzl_ps_productClassList.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_productList', {//产品列表
            url: "/zzl_ps_productList/:id",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psProductListController",
                    templateUrl: "templates/zzl_ps_productList.html"
                }
            }
        }).
        state('base.tabs.zzl_ps_propertyAddress', {//物业地址切换
            url: "/zzl_ps_propertyAddress",
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.psPropertyAddressController",
                    templateUrl: "templates/zzl_ps_propertyAddress.html"
                }
            }
        }).state('base.tabs.zzl_Binding', {//项目首页
            url: "/zzl_Binding",
            catch: false,
            views: {
                'zzl_tab': {
                    controller: "BASE.ZZL.BindingController",
                    templateUrl: "templates/zzl_Binding.html"
                }
            }
        });

    //置业路由控制
    $stateProvider.
        state('base.tabs.zy_Project', {//项目首页
            url: "/zy_Project/:id",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.projectController",
                    templateUrl: "templates/zy_Project.html"
                }
            }
        }).
        state('base.tabs.zy_Coupon', {//优惠政策
            url: "/zy_Coupon",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.couponController",
                    templateUrl: "templates/zy_Coupon.html"
                }
            }
        }).
        state('base.tabs.zy_zx_information_Details', {//优惠政策详情
            url: "/zy_zx_information_Details/:typeid",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.couponController",
                    templateUrl: "templates/zx_information_Details.html"
                }
            }
        }).
        state('base.tabs.zy_Navigation', {//位置导航
            url: "/zy_Navigation",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.navigationController",
                    templateUrl: "templates/zy_Navigation.html"
                }
            }
        }).
        state('base.tabs.zy_Progress', {//工程进度
            url: "/zy_Progress",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.progressController",
                    templateUrl: "templates/zy_Progress.html"
                }
            }
        }).
        state('base.tabs.zy_ProgressInformation_Details', {//工程进度详情
            url: "/zy_ProgressInformation_Details",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.progressController",
                    templateUrl: "templates/zx_information_Details.html"
                }
            }
        }).
        state('base.tabs.zy_Appreciate', {//户型评鉴
            url: "/zy_Appreciate",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.appreciateController",
                    templateUrl: "templates/zy_Appreciate.html"
                }
            }
        }).
        state('base.tabs.zy_Appreciate_Detailed', {//户型评鉴详情
            url: "/zy_Appreciate_Detailed",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.appreciateController",
                    templateUrl: "templates/zy_Appreciate_Detailed.html"
                }
            }
        }).
        state('base.tabs.zy_Around', {//项目周边
            url: "/zy_Around/:id",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.aroundController",
                    templateUrl: "templates/zy_Around.html"
                }
            }
        }).
        state('base.tabs.zy_aroundInformationDetails', {//项目周边详情
            url: "/zy_aroundInformationDetails",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.aroundController",
                    templateUrl: "templates/zx_information_Details.html"
                }
            }
        }).
        state('base.tabs.zy_Purchase', {//购房预约
            url: "/zy_Purchase/:projectid/:name",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.purchaseController",
                    templateUrl: "templates/zy_Purchase.html"
                }
            }
        }).
        state('base.tabs.zy_Gf_Progress', {//购房进度
            url: "/zy_Gf_Progress",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.gfProgressController",
                    templateUrl: "templates/zy_Gf_Progress.html"
                }
            }
        }).
        state('base.tabs.zy_Gf_Subscribe', {//购房进度之认购
            url: "/zy_Gf_Subscribe",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.gfProgressController",
                    templateUrl: "templates/zy_Gf_Subscribe.html"
                }
            }
        }).
        state('base.tabs.zy_Gf_Status', {//购房进度之签约
            url: "/zy_Gf_Status/:tradeid ",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.gfProgressController",
                    templateUrl: "templates/zy_Gf_Status.html"
                }
            }
        }).
        state('base.tabs.zy_Gf_Room', {//购房进度之已收房
            url: "/zy_Gf_Room",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.gfProgressController",
                    templateUrl: "templates/zy_Gf_Room.html"
                }
            }
        }).
        state('base.tabs.zy_Binding', {//项目首页
            url: "/zy_Binding",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.bindingController",
                    templateUrl: "templates/zy_Binding.html"
                }
            }
        }).
        state('base.tabs.zy_universalAgent', {//全民经纪人
            url: "/zy_universalAgent",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.universalAgentController",
                    templateUrl: "templates/zy_universalAgent.html"
                }
            }
        }).
        state('base.tabs.zy_iRecommend_Tabs', {//全民经纪人之我要推荐
            url: "/zy_iRecommend_Tabs",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.iRecommendController",
                    templateUrl: "templates/zy_iRecommend_Tabs.html"
                }
            }
        }).
        state('base.tabs.zy_myClient_Tabs', {//全民经纪人之我的客户
            url: "/zy_myClient_Tabs",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.myClientController",
                    templateUrl: "templates/zy_myClient_Tabs.html"
                }
            }
        }).
        state('base.tabs.zy_myCommission', {//全民经纪人之我的佣金
            url: "/zy_myCommission",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.myCommissionController",
                    templateUrl: "templates/zy_myCommission.html"
                }
            }
        }).
        state('base.tabs.zy_activityRules', {//全民经纪人之活动详情
            url: "/zy_activityRules",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.activityRulesController",
                    templateUrl: "templates/zy_activityRules.html"
                }
            }
        }).
        state('base.tabs.zy_CustomeCenter', {//置业中心-项目电话列表
            url: "/zy_CustomeCenter",
            catch:false,
            views: {
                'zy_tab': {
                    controller: "BASE.ZY.CustomeCenter",
                    templateUrl: "templates/zy_CustomeCenter.html"
                }
            }
        });

    //生活馆路由控制
    $stateProvider.
        state('base.tabs.shg_hd_activityDetails', {//生活馆活动详情
            url: "/shg_hd_activityDetails",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.activityDetailsController",
                    templateUrl: "templates/hd_activityDetails.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_Chamber', {//预订项目
            url: "/shg_Hs_Chamber/:ClubID",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.chamberController",
                    templateUrl: "templates/shg_Hs_Chamber.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_Reserve', {//项目列表
            url: "/shg_Hs_Reserve/:BookingTypeID",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.reserveController",
                    templateUrl: "templates/shg_Hs_Reserve.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_Order', {//项目列表详情
            url: "/shg_Hs_Order/:BookingID",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.orderController",
                    templateUrl: "templates/shg_Hs_Order.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_ReserveOrder', {//我的订单
            url: "/shg_Hs_ReserveOrder",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.reserveOrderController",
                    templateUrl: "templates/shg_Hs_ReserveOrder.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_Card', {//我的身份
            url: "/shg_Hs_Card",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.hsCardController",
                    templateUrl: "templates/shg_Hs_Card.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_ReserverDetail', {//预订订单详情
            url: "/shg_Hs_ReserverDetail/:id",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.reserverDetailController",
                    templateUrl: "templates/shg_Hs_ReserverDetail.html"
                }
            }
        }).
        state('base.tabs.shg_Hs_Order_Affirm', {//预订订单确认
            url: "/shg_Hs_Order_Affirm/:id",
            catch:false,
            views: {
                'shg_tab': {
                    controller: "BASE.SHG.orderAffirmController",
                    templateUrl: "templates/shg_Hs_Order_Affirm.html"
                }
            }
        });
} ]);

//app效果配置
app.config(['$ionicConfigProvider',function($ionicConfigProvider){
    //tabs
    $ionicConfigProvider.platform.android.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");

    //返回按钮
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');

    //禁用缓存
    $ionicConfigProvider.views.maxCache(0);

    //切换效果
    $ionicConfigProvider.views.transition("ios");

    $ionicConfigProvider.navBar.alignTitle("ios");
}]);