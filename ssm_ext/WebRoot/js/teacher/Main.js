
Ext.onReady(function () {
  
    new Ext.Viewport({
        enableTabScroll: true,
        layout: 'border',
        items: [north, west, center,east, south]//主框架分为5个面板［顶部，左侧（菜单），中部（主面板），底部］
      
    });
    //注册退出事件
    //Ext.get('logout').on('click', logout);
    setusername();  //设置用户名字
    setLastTime();  //设置最后登录时间
    show();        //查询未读信息数量
});
Ext.Ajax.on('requestcomplete',checkUserSessionStatus, this);   //所有的异步请求都会走的事件,拦截登录超时的请求
function checkUserSessionStatus(conn,response,options){
	var str = response.responseText;
	if(str == '9999'){
		alert('连接已超时,请重新登录!');
		window.location.href = 'login.jsp';
	}
}
//设置用户
function setusername() {
    document.getElementById("username").innerHTML = name;
}
//最后登录时间
function setLastTime(){
	document.getElementById("lastTime").innerHTML = lastTime;
}
//判断留言窗口是否处于打开状态
function isOpen(){
	var tab = center.queryById("10");
	if(tab){
		return true;
	}
	else{
		return false;
	}
}
function show(){
	Ext.Ajax.request( {
		url : "searchNotLookMessageAction.action", //登录处理页面	
		success : function(response, option) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				if(obj.size>0){
					document.getElementById("d2").innerHTML = "<span style='color:red'>你有"+obj.size+"条新留言</span>";
				}
			} else {
				
			}
		},
		failure : function(response, option) {
			
		}
		});
	
}

var aWeek=['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
//显示时间
function clockGo() {
	  Ext.TaskManager.start({
	    run: function() {
	      Ext.getCmp("clock").setText(Ext.Date.format(new Date(), 'g:i:s A')+'  '+aWeek[new Date().getDay()]);
	    },
	    interval: 1000
	  });
	};
//主题更换
 onMycomboboxChange11=function(field, newValue, oldValue, eOpts) {
    if(newValue!=oldValue){
        Ext.util.CSS.swapStyleSheet('theme','Ext/resources/css/'+newValue);
    }
};

//树型的点击事件
function centersetActiveTab(node) {
	//Ext.Msg.alert('msg',node.id);
	var tt = node.get('text');
    var funActive = eval(tt.substring(tt.indexOf('>') + 1, tt.indexOf('</')));
    //var funcAction = null;
    var tab = center.add({
        id: node.get('id'),
        iconCls: node.get('iconCls'),       
        xtype: "panel",
        title: node.get('text'),
        baseCls:'allBackImage',
        closable: true,
        maskDiabled: true,
        frame: true,
        autoScroll : true,
        items: funActive
    });
    center.setActiveTab(node.get('id'));
}
//主题列表
var themes = [['默认','ext-all.css'],['黑色','ext-all-access.css'],
              ['灰色','ext-all-gray.css'],['蓝色边框','ext-all-neptune.css'],
              ['蓝绿色','xtheme-olive.css'],['橘黄色','xtheme-orange.css'],
              ['红色','xtheme-red5.css']];
var themestore = new Ext.data.SimpleStore({
	fields:['theme','id'],
	data:themes
});
//顶部面板
var north = new Ext.Panel({
    frame: true,
    plain: true,
    height: 135,
    region: 'north',
    items: [{
        baseCls: 'x-plain',
        border: false,
        height: 95,
        html: "<img src='Image/logo.png' height:'60px'></img>"
    },{
    	xtype:'toolbar',
    	items:[{
    		xtype:'label',
    		id:'uesrName',
    		width:200,
    		html:"<img src='Image/fam/user_gray.png' width='15px' id='userGra'>欢迎你，导师：<span id='username'></span>",
    		listeners:{
    			 'render': function() {
    				 var a=Ext.get('username');
     		         a.on('click',function(){
     		        	//Ext.get('ssss').scale(500,300);
     		        });
     		      }
    		}
    	},'-',{
    		xtype:'label',
    		id:'lastime',
    		width:300,
    		html:"<img src='Image/taskbar/black/startbutton-icon.gif' width='15px'>上次登录时间：<span id='lastTime'></span>"
    	},'->',{  		
    		 xtype: 'combobox',
             itemId: 'mycombobox1',
             fieldLabel: '皮肤更换 ',
             iconCls:'Palette',
             labelAlign: 'right',
             labelPad: 1,
             labelWidth: 65,
             name: 'theme',
             value: 'ext-all.css',
             displayField : 'theme',  
             valueField : 'id', 
             forceSelection: true,
             queryMode: 'local',
             store:themestore,
             typeAhead: true,
             listeners: {
                 change: { //改变选择时触发事件
                     fn: this.onMycomboboxChange11,
                     scope: this
                 },
                 afterrender: {//初始化数据
                     //fn: this.onMycomboboxAfterRender11,
                     scope: this
                 }
             }
    	},'-',{
    		xtype:'button',
    		id:'prompt',
    		width:250,
    		iconCls:'Bell',
    		//text:'暂无消息',
    		html:'<div id="d1"><marquee id="d2">暂无消息</marquee></div>', 
    		handler:function(){
    			var ht = document.getElementById("d2").innerHTML;
    			if(ht != "暂无消息"){
    			var node=TreeStore.getNodeById("4");
    			node.expand();
    			//var node1=TreeStore.getNodeById("10");
    			//centersetActiveTab(rec);
    			var tab = center.queryById("10");
    			if(tab){
    				center.setActiveTab(tab);
    			}
    			else{
    			center.add({
    		        id: "10",
    		        iconCls: "",       
    		        xtype: "panel",
    		        title: "我的留言", 
    		        closable: true,
    		        maskDiabled: true,
    		        frame: true,
    		        baseCls:'allBackImage',
    		        autoScroll : true,
    		        items: new message,
    		    });
    		    center.setActiveTab("10");
    			}
    		    Ext.Ajax.request( {
    				url : "searchIdAction.action",	
    				success : function(response, option) {
    					var obj = Ext.decode(response.responseText);
    					Ext.getCmp("history_panel").body.update(obj.result);
    					var d = Ext.getCmp('history_panel').body.dom;
    					d.scrollTop = d.scrollHeight - d.offsetHeight;
    
    					var store = Ext.getCmp("messageWest").getStore().findRecord("studentId",obj.studentId);
    					var model=Ext.getCmp("messageWest").getSelectionModel();
    					model.deselectAll();
    					model.select(store);
    				},
    				failure : function(response, option) {
    					
    				}
    				});  			
    			}
    		}
    	},'-',{
    		 xtype: 'label',
    		    width: 150,
    		    id: 'clock',
    		    //cls:'Bell',
    		    listeners: {
    		      'render': function() {
    		        clockGo();
    		      }
    		    }
    	},'-',{
    		xtype:'button',  
            text:'打开主页',  
            width:80,
            border:1,
            iconCls: 'index',
            handler: function(){  
            	center.setActiveTab(0);  
            }},'-',{
    		xtype:'button',  
            text:'注销',  
            width:60,
            iconCls: 'grid-add',
            handler: function(){  
            	Ext.Msg.confirm('提示', '确定退出吗？', function (btn) {
                    if (btn == 'yes') {
                        window.location.href = "logoutAction.action";
                    }
                });
            } 
    	}],
    }]
});


Ext.define('ctreemodel', {  
    extend: 'Ext.data.Model',  
    fields: ['id','text','leaf','iconCls','parent']  
});
var TreeStore = new Ext.data.TreeStore({
	// autoLoad:true,  
	 model: 'ctreemodel',
	 proxy:{    
	        type:'ajax',   
	        url:'treeNodeAction.action', //请求  
	        reader:{    
	            type:'json',    
	            root:'nodeList' //数据  
	        },  
	        extraParams:{    
	            tid:''  //节点参数  
	        }  
	           
	    },  
	      
	    root: {  
	        text:'系统根目录',  
	        expanded : true  
	    },
	    listeners : {  
            'beforeexpand' : function(node,eOpts){  
        //点击父亲节点的菜单会将节点的id通过ajax请求，将到后台  
                this.proxy.extraParams.tid = node.raw.id;  
            }  
        }
});
var west = new Ext.tree.Panel({
	title : '主菜单',
	region: 'west',
	collapsible: true,
	width : 200,
	autoScroll : true,
	//singleExpand : true,
	rootVisible : true,
	animate : true,
	//root:{ text: '根', expanded: true },
	store:TreeStore,
	listeners: { itemclick: function(view,rec,el,index,e){
		//Ext.Msg.alert('msg',rec.get('text'));
		 if (rec.isLeaf()) {                    // 叶子节点点击不进入链接
		        var tab = center.queryById(rec.get('id'));
		        if (tab) {
		            if (e !== undefined) {
		                e.stopEvent();
		            }
		            center.setActiveTab(tab);
		        } else {
		            if (e !== undefined) {                     // 显示叶子节点菜单
		                e.stopEvent();
		            }
		            centersetActiveTab(rec);
		        }
		    }
		    else {
		        // 不是叶子节点不触发事件
		        e.stopEvent();
		        //rec.toggle();                      // 点击时展开
		    }
	}}
});

//中部（主面板）面板
var center = new Ext.TabPanel({

    id: 'center',
    activeTab: 0,
    animScroll: true,
    enableTabScroll: true,
    region: 'center',
    layout:'anchor',
    layoutOnTabChange: true,
    closeAction:'destroy',
    //plugins:new TabCloseMenu(), //加入右键菜单，在 Main.htm 中引用了 Menu.js，这个引用要在 Main.js 的上面
    plugins: new Ext.create('Ext.ux.TabCloseMenu',{
        closeTabText: '关闭面板',
        closeOthersTabsText: '关闭其他',
        closeAllTabsText: '关闭所有'
    }),
    items: [{
        id: 0,
        title: '主　页<span style=display:none></span>',
        iconCls: 'index',
        xtype:'panel',
        frame: true,
        maskDiabled: true,
        autoScroll : true,
        html: "<div class='welcome'><img src='Image/indeximg.jpg' width='400px' id='ssss'/><img src='Image/indeximg2.jpg' width='400px' id='ssss'/><img src='Image/indeximg3.jpg' width='400px' id='ssss'/><img src='Image/indeximg4.jpg' width='400px' id='ssss'/>" +
        		"<br>成都信息工程大学是四川省和中国气象局共建、四川省重点发展的省属普通本科院校，是以信息学科和大气学科为重点，以学科交叉为特色，工学、理学、管理学为主要学科门类，工学、理学、管理学、经济学、文学、法学、艺术学等多学科协调融合发展的多科性大学，是四川信息产业、中国气象事业、国家统计事业、国防建设人才培养和科学研究的重要基地。+" +
        		"学校创建于1951年，前身为中国人民解放军西南空军气象干部训练大队，1956年改制为成都气象学校，1978年升格为成都气象学院；2000年由直属中国气象局划转为四川省人民政府管理，更名为成都信息工程学院；2001年整体合并原隶属于国家统计局的四川统计学校；2003年获硕士学位授予权；2004年成为第一所为第二炮兵部队培养国防生的一般普通本科院校；2007年获得教育部本科教学工作水平评估“优秀”；2010年成为四川省人民政府与中国气象局签约共建高校、国家首批61所“卓越工程师教育培养计划”试点院校；2011年成为全国CDIO工程教育模式试点工作组副组长单位和国际CDIO组织正式成员；2013年入选中西部基础能力建设工程高校；2015年4月，学校正式更名为成都信息工程大学。" +
        		"</div>",
        listeners:{
        	'render': function() {
        		var current ;
                var els = Ext.select("#ssss");
                //Ext.Msg.alert("111",els.length);
                els.on({
                      click:   function() { 
                    	 
                        current =  Ext.get(this);                       
                        current.frame("#ff0000",1,{ duration: 1000 });
                       // current.puff();
                        //current.ghost();
      
                      }
                      /*mouseout:    function() { 
                        current =  Ext.get(this);
                        current.frame();    
                      },*/
                });
        	}
        	
        }
        
    }]
});

//底部面板
var south = new Ext.Panel({
    frame: true,
    height: 80,
    html: "<div class='footer'><p>航空港校区 | 四川省成都市西南航空港经济开发区学府路一段24号 | 邮编：610225 | 电话：028-85966502</p> <p>龙 泉 校 区 |  成都市龙泉驿区阳光城幸福路10号 | 邮编：610103 | 电话：028-84833333</p><p>Copyright 2003-2014  成都信息工程大学　建议使用IE8.0,1024*860以上浏览 &nbsp;&nbsp;&nbsp;&nbsp</div>",
    region: 'south',
   /* bodyStyle:{
    	background:'url(../ssh_test/Image/south1.jpg)',
    }*/
});
//右部面板
var east = new Ext.Panel({
    frame: true,
    width: 200,
    title:'公告信息',
   // html: "<div class='footer'></div>",
    region: 'east',
    collapsible: true,
    autoScroll : true,
    layout:'anchor',
    items:new annoumcement(),
});

//安全退出
function logout() {
    Ext.Msg.confirm('提示', '确定退出吗？', function (btn) {
        if (btn == 'yes') {
           // new Extjs.cookie.clear();
            window.location.href = "/Login.jsp";
        }
    });
}
