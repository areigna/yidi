/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
function host(){return 'http://ec2-174-129-160-38.compute-1.amazonaws.com:1230/'; }
function imageHost(){return 'https://s3-ap-northeast-1.amazonaws.com/yidi-image/'; }

Ext.application({
    name: 'Yidi',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        'Main', 'Post',
    ],
    stores: ['Dates'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        //config the status bar
        if(Ext.os.is('iOS') && Ext.browser.is.WebView){
            //StatusBar.styleDefault();
            StatusBar.styleLightContent();
            //StatusBar.backgroundColorByHexString("#FEFEF9");
            StatusBar.backgroundColorByHexString("#FF6347");
            StatusBar.overlaysWebView(false);
        }

        document.addEventListener("resume", function(){
            Yidi.app.refreshAll();
        }, false);


        // Initialize the main view
        Ext.Viewport.add(Ext.create('Yidi.view.Post'));
        //Ext.create('Yidi.view.Post')

        document.addEventListener("backbutton", function(){
            if(!Ext.getCmp('post').isHidden()){
                Yidi.app.fadeCmp(Ext.getCmp('main'));
            }
        }, false);
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        //hide splash screen
        if(Ext.os.is('iOS') && Ext.browser.is.WebView){
            setTimeout(function(){
                navigator.splashscreen.hide();
            },500);
        }
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    /////////////////
    mask: function(msg){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: null ,
        });
    },
    unmask: function(){
        Ext.Viewport.unmask();
    },
    slideCmp: function(cmp, direction){
        Ext.Viewport.animateActiveItem(cmp,{
            type: 'slide', 
            direction: direction, 
            easing: 'ease-in-out', 
            duration: 200 
        });
    },
    fadeCmp: function(cmp){
        Ext.Viewport.animateActiveItem(cmp,{
            type: 'fade', 
            easing: 'ease-in-out', 
            duration: 500 
        });
    },
    refreshAll: function(){
        Ext.getStore('datesStore').refresh();
        Ext.getCmp('main').refreshTimer();
        Yidi.app.fadeCmp(Ext.getCmp('main'));
    },
});
