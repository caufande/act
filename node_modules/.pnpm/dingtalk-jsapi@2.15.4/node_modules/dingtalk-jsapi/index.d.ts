import * as plugin from './plugin';
/** for ts declaration */
import * as otherApi from './lib/otherApi';
import { IUNCore } from './lib/ddSdk';
declare const dd: typeof otherApi & IUNCore & {
    biz: {
        ATMBle: {
            beaconPicker: typeof import("./api/biz/ATMBle/beaconPicker").beaconPicker$;
            detectFace: typeof import("./api/biz/ATMBle/detectFace").detectFace$;
            detectFaceFullScreen: typeof import("./api/biz/ATMBle/detectFaceFullScreen").detectFaceFullScreen$;
            faceManager: typeof import("./api/biz/ATMBle/faceManager").faceManager$;
            punchModePicker: typeof import("./api/biz/ATMBle/punchModePicker").punchModePicker$;
        };
        alipay: {
            bindAlipay: typeof import("./api/biz/alipay/bindAlipay").bindAlipay$;
            openAuth: typeof import("./api/biz/alipay/openAuth").openAuth$;
            pay: typeof import("./api/biz/alipay/pay").pay$;
        };
        auth: {
            openAccountPwdLoginPage: typeof import("./api/biz/auth/openAccountPwdLoginPage").openAccountPwdLoginPage$;
            requestAuthInfo: typeof import("./api/biz/auth/requestAuthInfo").requestAuthInfo$;
        };
        calendar: {
            chooseDateTime: typeof import("./api/biz/calendar/chooseDateTime").chooseDateTime$;
            chooseHalfDay: typeof import("./api/biz/calendar/chooseHalfDay").chooseHalfDay$;
            chooseInterval: typeof import("./api/biz/calendar/chooseInterval").chooseInterval$;
            chooseOneDay: typeof import("./api/biz/calendar/chooseOneDay").chooseOneDay$;
        };
        chat: {
            chooseConversationByCorpId: typeof import("./api/biz/chat/chooseConversationByCorpId").chooseConversationByCorpId$;
            collectSticker: typeof import("./api/biz/chat/collectSticker").collectSticker$;
            createSceneGroup: typeof import("./api/biz/chat/createSceneGroup").createSceneGroup$;
            getRealmCid: typeof import("./api/biz/chat/getRealmCid").getRealmCid$;
            locationChatMessage: typeof import("./api/biz/chat/locationChatMessage").locationChatMessage$;
            openSingleChat: typeof import("./api/biz/chat/openSingleChat").openSingleChat$;
            pickConversation: typeof import("./api/biz/chat/pickConversation").pickConversation$;
            sendEmotion: typeof import("./api/biz/chat/sendEmotion").sendEmotion$;
            toConversation: typeof import("./api/biz/chat/toConversation").toConversation$;
            toConversationByOpenConversationId: typeof import("./api/biz/chat/toConversationByOpenConversationId").toConversationByOpenConversationId$;
        };
        clipboardData: {
            setData: typeof import("./api/biz/clipboardData/setData").setData$;
        };
        conference: {
            createCloudCall: typeof import("./api/biz/conference/createCloudCall").createCloudCall$;
            getCloudCallInfo: typeof import("./api/biz/conference/getCloudCallInfo").getCloudCallInfo$;
            getCloudCallList: typeof import("./api/biz/conference/getCloudCallList").getCloudCallList$;
            videoConfCall: typeof import("./api/biz/conference/videoConfCall").videoConfCall$;
        };
        contact: {
            choose: typeof import("./api/biz/contact/choose").choose$;
            chooseMobileContacts: typeof import("./api/biz/contact/chooseMobileContacts").chooseMobileContacts$;
            complexPicker: typeof import("./api/biz/contact/complexPicker").complexPicker$;
            createGroup: typeof import("./api/biz/contact/createGroup").createGroup$;
            departmentsPicker: typeof import("./api/biz/contact/departmentsPicker").departmentsPicker$;
            externalComplexPicker: typeof import("./api/biz/contact/externalComplexPicker").externalComplexPicker$;
            externalEditForm: typeof import("./api/biz/contact/externalEditForm").externalEditForm$;
            rolesPicker: typeof import("./api/biz/contact/rolesPicker").rolesPicker$;
            setRule: typeof import("./api/biz/contact/setRule").setRule$;
        };
        cspace: {
            chooseSpaceDir: typeof import("./api/biz/cspace/chooseSpaceDir").chooseSpaceDir$;
            delete: typeof import("./api/biz/cspace/delete").delete$;
            preview: typeof import("./api/biz/cspace/preview").preview$;
            saveFile: typeof import("./api/biz/cspace/saveFile").saveFile$;
        };
        customContact: {
            choose: typeof import("./api/biz/customContact/choose").choose$;
            multipleChoose: typeof import("./api/biz/customContact/multipleChoose").multipleChoose$;
        };
        ding: {
            create: typeof import("./api/biz/ding/create").create$;
            post: typeof import("./api/biz/ding/post").post$;
        };
        edu: {
            finishMiniCourseByRecordId: typeof import("./api/biz/edu/finishMiniCourseByRecordId").finishMiniCourseByRecordId$;
            getMiniCourseDraftList: typeof import("./api/biz/edu/getMiniCourseDraftList").getMiniCourseDraftList$;
            joinClassroom: typeof import("./api/biz/edu/joinClassroom").joinClassroom$;
            makeMiniCourse: typeof import("./api/biz/edu/makeMiniCourse").makeMiniCourse$;
            newMsgNotificationStatus: typeof import("./api/biz/edu/newMsgNotificationStatus").newMsgNotificationStatus$;
            startAuth: typeof import("./api/biz/edu/startAuth").startAuth$;
            tokenFaceImg: typeof import("./api/biz/edu/tokenFaceImg").tokenFaceImg$;
        };
        event: {
            notifyWeex: typeof import("./api/biz/event/notifyWeex").notifyWeex$;
        };
        intent: {
            fetchData: typeof import("./api/biz/intent/fetchData").fetchData$;
        };
        iot: {
            bind: typeof import("./api/biz/iot/bind").bind$;
            bindMeetingRoom: typeof import("./api/biz/iot/bindMeetingRoom").bindMeetingRoom$;
            getDeviceProperties: typeof import("./api/biz/iot/getDeviceProperties").getDeviceProperties$;
            invokeThingService: typeof import("./api/biz/iot/invokeThingService").invokeThingService$;
            queryMeetingRoomList: typeof import("./api/biz/iot/queryMeetingRoomList").queryMeetingRoomList$;
            setDeviceProperties: typeof import("./api/biz/iot/setDeviceProperties").setDeviceProperties$;
            unbind: typeof import("./api/biz/iot/unbind").unbind$;
        };
        live: {
            startClassRoom: typeof import("./api/biz/live/startClassRoom").startClassRoom$;
            startUnifiedLive: typeof import("./api/biz/live/startUnifiedLive").startUnifiedLive$;
        };
        map: {
            locate: typeof import("./api/biz/map/locate").locate$;
            search: typeof import("./api/biz/map/search").search$;
            view: typeof import("./api/biz/map/view").view$;
        };
        media: {
            compressVideo: typeof import("./api/biz/media/compressVideo").compressVideo$;
        };
        microApp: {
            openApp: typeof import("./api/biz/microApp/openApp").openApp$;
        };
        navigation: {
            close: typeof import("./api/biz/navigation/close").close$;
            goBack: typeof import("./api/biz/navigation/goBack").goBack$;
            hideBar: typeof import("./api/biz/navigation/hideBar").hideBar$;
            navigateToMiniProgram: typeof import("./api/biz/navigation/navigateToMiniProgram").navigateToMiniProgram$;
            quit: typeof import("./api/biz/navigation/quit").quit$;
            replace: typeof import("./api/biz/navigation/replace").replace$;
            setIcon: typeof import("./api/biz/navigation/setIcon").setIcon$;
            setLeft: typeof import("./api/biz/navigation/setLeft").setLeft$;
            setMenu: typeof import("./api/biz/navigation/setMenu").setMenu$;
            setRight: typeof import("./api/biz/navigation/setRight").setRight$;
            setTitle: typeof import("./api/biz/navigation/setTitle").setTitle$;
        };
        pbp: {
            componentPunchFromPartner: typeof import("./api/biz/pbp/componentPunchFromPartner").componentPunchFromPartner$;
            startMatchRuleFromPartner: typeof import("./api/biz/pbp/startMatchRuleFromPartner").startMatchRuleFromPartner$;
            stopMatchRuleFromPartner: typeof import("./api/biz/pbp/stopMatchRuleFromPartner").stopMatchRuleFromPartner$;
        };
        realm: {
            getRealtimeTracingStatus: typeof import("./api/biz/realm/getRealtimeTracingStatus").getRealtimeTracingStatus$;
            getUserExclusiveInfo: typeof import("./api/biz/realm/getUserExclusiveInfo").getUserExclusiveInfo$;
            startRealtimeTracing: typeof import("./api/biz/realm/startRealtimeTracing").startRealtimeTracing$;
            stopRealtimeTracing: typeof import("./api/biz/realm/stopRealtimeTracing").stopRealtimeTracing$;
            subscribe: typeof import("./api/biz/realm/subscribe").subscribe$;
            unsubscribe: typeof import("./api/biz/realm/unsubscribe").unsubscribe$;
        };
        resource: {
            getInfo: typeof import("./api/biz/resource/getInfo").getInfo$;
            reportDebugMessage: typeof import("./api/biz/resource/reportDebugMessage").reportDebugMessage$;
        };
        shortCut: {
            addShortCut: typeof import("./api/biz/shortCut/addShortCut").addShortCut$;
        };
        store: {
            closeUnpayOrder: typeof import("./api/biz/store/closeUnpayOrder").closeUnpayOrder$;
            createOrder: typeof import("./api/biz/store/createOrder").createOrder$;
            getPayUrl: typeof import("./api/biz/store/getPayUrl").getPayUrl$;
            inquiry: typeof import("./api/biz/store/inquiry").inquiry$;
        };
        tabwindow: {
            isTab: typeof import("./api/biz/tabwindow/isTab").isTab$;
        };
        telephone: {
            call: typeof import("./api/biz/telephone/call").call$;
            checkBizCall: typeof import("./api/biz/telephone/checkBizCall").checkBizCall$;
            quickCallList: typeof import("./api/biz/telephone/quickCallList").quickCallList$;
            showCallMenu: typeof import("./api/biz/telephone/showCallMenu").showCallMenu$;
        };
        user: {
            checkPassword: typeof import("./api/biz/user/checkPassword").checkPassword$;
            get: typeof import("./api/biz/user/get").get$;
        };
        util: {
            callComponent: typeof import("./api/biz/util/callComponent").callComponent$;
            chooseImage: typeof import("./api/biz/util/chooseImage").chooseImage$;
            chosen: typeof import("./api/biz/util/chosen").chosen$;
            clearWebStoreCache: typeof import("./api/biz/util/clearWebStoreCache").clearWebStoreCache$;
            closePreviewImage: typeof import("./api/biz/util/closePreviewImage").closePreviewImage$;
            compressImage: typeof import("./api/biz/util/compressImage").compressImage$;
            datepicker: typeof import("./api/biz/util/datepicker").datepicker$;
            datetimepicker: typeof import("./api/biz/util/datetimepicker").datetimepicker$;
            decrypt: typeof import("./api/biz/util/decrypt").decrypt$;
            downloadFile: typeof import("./api/biz/util/downloadFile").downloadFile$;
            encrypt: typeof import("./api/biz/util/encrypt").encrypt$;
            getPerfInfo: typeof import("./api/biz/util/getPerfInfo").getPerfInfo$;
            invokeWorkbench: typeof import("./api/biz/util/invokeWorkbench").invokeWorkbench$;
            isEnableGPUAcceleration: typeof import("./api/biz/util/isEnableGPUAcceleration").isEnableGPUAcceleration$;
            isLocalFileExist: typeof import("./api/biz/util/isLocalFileExist").isLocalFileExist$;
            multiSelect: typeof import("./api/biz/util/multiSelect").multiSelect$;
            open: typeof import("./api/biz/util/open").open$;
            openLink: typeof import("./api/biz/util/openLink").openLink$;
            openLocalFile: typeof import("./api/biz/util/openLocalFile").openLocalFile$;
            openModal: typeof import("./api/biz/util/openModal").openModal$;
            openSlidePanel: typeof import("./api/biz/util/openSlidePanel").openSlidePanel$;
            presentWindow: typeof import("./api/biz/util/presentWindow").presentWindow$;
            previewImage: typeof import("./api/biz/util/previewImage").previewImage$;
            previewVideo: typeof import("./api/biz/util/previewVideo").previewVideo$;
            saveImage: typeof import("./api/biz/util/saveImage").saveImage$;
            scan: typeof import("./api/biz/util/scan").scan$;
            scanCard: typeof import("./api/biz/util/scanCard").scanCard$;
            setGPUAcceleration: typeof import("./api/biz/util/setGPUAcceleration").setGPUAcceleration$;
            setScreenBrightnessAndKeepOn: typeof import("./api/biz/util/setScreenBrightnessAndKeepOn").setScreenBrightnessAndKeepOn$;
            setScreenKeepOn: typeof import("./api/biz/util/setScreenKeepOn").setScreenKeepOn$;
            share: typeof import("./api/biz/util/share").share$;
            shareImage: typeof import("./api/biz/util/shareImage").shareImage$;
            startDocSign: typeof import("./api/biz/util/startDocSign").startDocSign$;
            systemShare: typeof import("./api/biz/util/systemShare").systemShare$;
            timepicker: typeof import("./api/biz/util/timepicker").timepicker$;
            uploadAttachment: typeof import("./api/biz/util/uploadAttachment").uploadAttachment$;
            uploadFile: typeof import("./api/biz/util/uploadFile").uploadFile$;
            uploadImage: typeof import("./api/biz/util/uploadImage").uploadImage$;
            uploadImageFromCamera: typeof import("./api/biz/util/uploadImageFromCamera").uploadImageFromCamera$;
            ut: typeof import("./api/biz/util/ut").ut$;
        };
        verify: {
            openBindIDCard: typeof import("./api/biz/verify/openBindIDCard").openBindIDCard$;
            startAuth: typeof import("./api/biz/verify/startAuth").startAuth$;
        };
        watermarkCamera: {
            getWatermarkInfo: typeof import("./api/biz/watermarkCamera/getWatermarkInfo").getWatermarkInfo$;
            setWatermarkInfo: typeof import("./api/biz/watermarkCamera/setWatermarkInfo").setWatermarkInfo$;
        };
    };
    channel: {
        permission: {
            requestAuthCode: typeof import("./api/channel/permission/requestAuthCode").requestAuthCode$;
        };
    };
    device: {
        accelerometer: {
            clearShake: typeof import("./api/device/accelerometer/clearShake").clearShake$;
            watchShake: typeof import("./api/device/accelerometer/watchShake").watchShake$;
        };
        audio: {
            download: typeof import("./api/device/audio/download").download$;
            onPlayEnd: typeof import("./api/device/audio/onPlayEnd").onPlayEnd$;
            onRecordEnd: typeof import("./api/device/audio/onRecordEnd").onRecordEnd$;
            pause: typeof import("./api/device/audio/pause").pause$;
            play: typeof import("./api/device/audio/play").play$;
            resume: typeof import("./api/device/audio/resume").resume$;
            startRecord: typeof import("./api/device/audio/startRecord").startRecord$;
            stop: typeof import("./api/device/audio/stop").stop$;
            stopRecord: typeof import("./api/device/audio/stopRecord").stopRecord$;
            translateVoice: typeof import("./api/device/audio/translateVoice").translateVoice$;
        };
        base: {
            getInterface: typeof import("./api/device/base/getInterface").getInterface$;
            getPhoneInfo: typeof import("./api/device/base/getPhoneInfo").getPhoneInfo$;
            getUUID: typeof import("./api/device/base/getUUID").getUUID$;
            getWifiStatus: typeof import("./api/device/base/getWifiStatus").getWifiStatus$;
            openSystemSetting: typeof import("./api/device/base/openSystemSetting").openSystemSetting$;
        };
        connection: {
            getNetworkType: typeof import("./api/device/connection/getNetworkType").getNetworkType$;
        };
        geolocation: {
            checkPermission: typeof import("./api/device/geolocation/checkPermission").checkPermission$;
            get: typeof import("./api/device/geolocation/get").get$;
            start: typeof import("./api/device/geolocation/start").start$;
            status: typeof import("./api/device/geolocation/status").status$;
            stop: typeof import("./api/device/geolocation/stop").stop$;
        };
        launcher: {
            checkInstalledApps: typeof import("./api/device/launcher/checkInstalledApps").checkInstalledApps$;
            launchApp: typeof import("./api/device/launcher/launchApp").launchApp$;
        };
        nfc: {
            nfcRead: typeof import("./api/device/nfc/nfcRead").nfcRead$;
            nfcStop: typeof import("./api/device/nfc/nfcStop").nfcStop$;
            nfcWrite: typeof import("./api/device/nfc/nfcWrite").nfcWrite$;
        };
        notification: {
            actionSheet: typeof import("./api/device/notification/actionSheet").actionSheet$;
            alert: typeof import("./api/device/notification/alert").alert$;
            confirm: typeof import("./api/device/notification/confirm").confirm$;
            extendModal: typeof import("./api/device/notification/extendModal").extendModal$;
            hidePreloader: typeof import("./api/device/notification/hidePreloader").hidePreloader$;
            modal: typeof import("./api/device/notification/modal").modal$;
            prompt: typeof import("./api/device/notification/prompt").prompt$;
            showPreloader: typeof import("./api/device/notification/showPreloader").showPreloader$;
            toast: typeof import("./api/device/notification/toast").toast$;
            vibrate: typeof import("./api/device/notification/vibrate").vibrate$;
        };
        screen: {
            insetAdjust: typeof import("./api/device/screen/insetAdjust").insetAdjust$;
            resetView: typeof import("./api/device/screen/resetView").resetView$;
            rotateView: typeof import("./api/device/screen/rotateView").rotateView$;
        };
    };
    media: {
        voiceRecorder: {
            keepAlive: typeof import("./api/media/voiceRecorder/keepAlive").keepAlive$;
            pause: typeof import("./api/media/voiceRecorder/pause").pause$;
            resume: typeof import("./api/media/voiceRecorder/resume").resume$;
            start: typeof import("./api/media/voiceRecorder/start").start$;
            stop: typeof import("./api/media/voiceRecorder/stop").stop$;
        };
    };
    net: {
        bjGovApn: {
            loginGovNet: typeof import("./api/net/bjGovApn/loginGovNet").loginGovNet$;
        };
    };
    runtime: {
        message: {
            fetch: typeof import("./api/runtime/message/fetch").fetch$;
            post: typeof import("./api/runtime/message/post").post$;
        };
        monitor: {
            getLoadTime: typeof import("./api/runtime/monitor/getLoadTime").getLoadTime$;
        };
        permission: {
            requestAuthCode: typeof import("./api/runtime/permission/requestAuthCode").requestAuthCode$;
            requestOperateAuthCode: typeof import("./api/runtime/permission/requestOperateAuthCode").requestOperateAuthCode$;
        };
    };
    ui: {
        input: {
            plain: typeof import("./api/ui/input/plain").plain$;
        };
        multitask: {
            addToFloat: typeof import("./api/ui/multitask/addToFloat").addToFloat$;
            removeFromFloat: typeof import("./api/ui/multitask/removeFromFloat").removeFromFloat$;
        };
        nav: {
            close: typeof import("./api/ui/nav/close").close$;
            getCurrentId: typeof import("./api/ui/nav/getCurrentId").getCurrentId$;
            go: typeof import("./api/ui/nav/go").go$;
            preload: typeof import("./api/ui/nav/preload").preload$;
            recycle: typeof import("./api/ui/nav/recycle").recycle$;
        };
        progressBar: {
            setColors: typeof import("./api/ui/progressBar/setColors").setColors$;
        };
        pullToRefresh: {
            disable: typeof import("./api/ui/pullToRefresh/disable").disable$;
            enable: typeof import("./api/ui/pullToRefresh/enable").enable$;
            stop: typeof import("./api/ui/pullToRefresh/stop").stop$;
        };
        webViewBounce: {
            disable: typeof import("./api/ui/webViewBounce/disable").disable$;
            enable: typeof import("./api/ui/webViewBounce/enable").enable$;
        };
    };
    util: {
        domainStorage: {
            getItem: typeof import("./api/util/domainStorage/getItem").getItem$;
            removeItem: typeof import("./api/util/domainStorage/removeItem").removeItem$;
            setItem: typeof import("./api/util/domainStorage/setItem").setItem$;
        };
        openTemporary: {
            getData: typeof import("./api/util/openTemporary/getData").getData$;
        };
    };
} & {
    plugin: typeof plugin;
};
export = dd;
