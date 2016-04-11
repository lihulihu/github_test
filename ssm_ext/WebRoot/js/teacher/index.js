
/*
*
* 创建人：李林峰
*
* 时  间：2012-07-01
*
* 描  述：管理系统主页面 ExtJs
*
*/

Ext.onReady(function () {
    new Extjs.cookie.check();
    new Ext.Viewport({
        enableTabScroll: true,
        layout: 'border',
        items: [north, west, center, south]//主框架分为四个面板［顶部，左侧（菜单），中部（主面板），底部］
    });
    //注册退出事件
    Ext.get('logout').on('click', logout);
    setusername();
});
//设置用户
function setusername() {
   // document.getElementById("username").innerHTML = '<% user.getName();%>';
}

//顶部面板
var north = new Ext.Panel({
    frame: true,
    plain: true,
    height: 80,
    region: 'north',
    items: [{
        baseCls: 'x-plain',
        border: false,
        height: 60,
        html: "<div class='logo'><img src='/Image/logo.gif'></div><div class='logout'>管理员：<span id='username'></span> 　<span id='logout'>退出系统</span></div>"
    }]
});

//员工管理节点数据源
var employeenode = {
    expanded: true,
    leaf: false,
    children: usercontrol//数组来自于Control.js
};

//员工管理节点数据源
var systemnode = {
    expanded: true,
    leaf: false,
    children: systemcontrol//数组来自于Control.js
};

//左侧（菜单）面板
var west = new Ext.Panel({
    iconCls: 'allmenu',
    collapsible: true,
    width: 150,
    margins: '2 2 2 2',
    layout: 'accordion',
    layoutConfig: {
        animate: true
    },
    region: 'west',
    title: '系统功能菜单',
    items: [{ title: '员工管理', iconCls: 'nodeicon', items: [{ xtype: 'treepanel', root: employeenode, rootVisible: false, border: false}]
    }, { title: '系统管理', iconCls: 'system-icon', items: [{ xtype: 'treepanel', root: systemnode, rootVisible: false, border: false}]}]
});

//中部（主面板）面板
var center = new Ext.TabPanel({
    id: 'center',
    activeTab: 0,
    animScroll: true,
    enableTabScroll: true,
    region: 'center',
    minTabWidth: 120,
    tabWidth: 120,
    margins: '2 2 2 2',
    cmargins: '2 2 2 2',
    layoutOnTabChange: true,
    plugins: new Ext.ux.TabCloseMenu(), //加入右键菜单，在 Main.htm 中引用了 Menu.js，这个引用要在 Main.js 的上面
    items: [{
        id: 0,
        title: '主　页',
        iconCls: 'index',
        frame: true,
        html: "<div class='welcome'>欢迎进入[无废话ExtJs入门教程]教学示例系统！</div>"
    }]
});

//底部面板
var south = new Ext.Panel({
    frame: true,
    height: 30,
    html: "<div class='footer'>Copyright © 2012 http://www.cnblogs.com/iamlilinfeng/ All rights reserved </div>",
    region: 'south'
});

//安全退出
function logout() {
    Ext.Msg.confirm('提示', '确定退出吗？', function (btn) {
        if (btn == 'yes') {
            new Extjs.cookie.clear();
            window.location.href = "/Login.htm";
        }
    })
}

var usercontrol = [
                   { id: 'tab.user.save', text: '员工添加<span style=display:none>new extjs.user.save({"IntUserID":0})</span>', leaf: true, iconCls: 'nodeicon', listeners: { click: nodeClick} },
                   { id: 'tab.user.list', text: '员工管理<span style=display:none>new extjs.user.list()</span>', leaf: true, iconCls: 'nodeicon', listeners: { click: nodeClick} }
               ];
           var systemcontrol = [
                   { id: 'tab.sources.list', text: '招聘来源<span style=display:none>new extjs.sources.list()</span>', leaf: true, iconCls: 'system-icon', listeners: { click: nodeClick} }
               ];


         //树型的点击事件
         function nodeClick(node, e) {
             if (node.isLeaf()) {                    // 叶子节点点击不进入链接
                 var tab = center.getItem(node.id);
                 if (tab) {
                     if (e !== undefined) {
                         e.stopEvent();
                     }
                     center.setActiveTab(tab);
                 } else {
                     if (e !== undefined) {                     // 显示叶子节点菜单
                         e.stopEvent();
                     }
                     centersetActiveTab(node);
                 }
             }
             else {
                 // 不是叶子节点不触发事件
                 e.stopEvent();
                 node.toggle();                      // 点击时展开
             }
         }
         //树型的点击事件
         function centersetActiveTab(node) {
             var funActive = eval(node.text.substring(node.text.indexOf('>') + 1, node.text.indexOf('</')));
             var tab = center.add({
                 id: node.id.toString(),
                 iconCls: "tabicon",
                 xtype: "panel",
                 title: node.text,
                 closable: true,
                 frame: true,
                 items: funActive
             });
             center.setActiveTab(tab);
         }
         
         