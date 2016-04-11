function LoginForm() {

var leftPanel = new Ext.Panel(
{
	id : "leftPanel",
	height : 98,
	html:'<p style="text-align:center;font-size:30px"><img src="Image/loginLog.jpg"></img></p>'
});
var radiogroup = new Ext.form.RadioGroup({
	                 fieldLabel: '身份',
	                 width: 100,
	                 id:'identity',
	                 items: [{
	                     name: 'identity',
	                     inputValue: '0',
	                     boxLabel: '导师',
	                     checked: true
	                 }, {
	                    name: 'identity',
	                    inputValue: '1',
	                    boxLabel: '学生'
	                 },{
		                name: 'identity',
		                inputValue: '2',
		                boxLabel: '管理员'
		               }]
	             });
var rightPanel = new Ext.Panel( {
	id : "rightPanel",
	labelPad : 0,
	labelWidth : 80,
	bodyStyle : "padding-left:100px;padding-top:25px;padding-right:80px",
	layout : "form",
	items:[  
       {  
           xtype:'textfield',  
           fieldLabel:'用户名', 
           
           id:'userName',
           name:'name',  
           allowBlank:false,  
           blankText:'用户名不能为空'  
       },  
       {  
           xtype:'textfield',  
           fieldLabel:'密    码', 

           id:'password',
           name:'password',  
           inputType:'password',  
           allowBlank:false,  
           blankText:'密码不能为空'  
       },radiogroup
         
], 
buttons : [ {
		xtype : "button",
		text : "确定",
		pressed : false,
		handler : validatorData
	},
	{
		xtype : "button",
		text : "取消",
		handler : function() {
		loginWindow.close();
	}
	}],
buttonAlign : "center"

});

var loginPanel = new Ext.form.FormPanel( {
	id : "loginPanel",
	height : 150,
	frame : true,
	layout : "card",
	items :  [rightPanel]
});
var loginWindow;
if (!loginWindow) {
	loginWindow = new Ext.Window( {
		id : "loginWindow",
		title : "导师制系统---登陆窗口",
		width : 500,//230, //Window宽度
		height : 300,//137, //Window高度
		resizable : false,
		closable : false, //关闭按钮，默认为true
		items :  [leftPanel,loginPanel],
//bodyStyle : "padding:20px;background-color:#000000;background-image: url(images/loginbg.gif);",
	});
}

loginWindow.show();
//按回车时调用确定事件
	var map = new Ext.KeyMap(loginWindow.getEl(), {
		key : 13, //回车的键盘key值
		fn : validatorData
//确定事件    
});
//确定事件
function validatorData() {
	var userName = Ext.getCmp("userName").getValue();
	var Password = Ext.getCmp("password").getValue();
	if (Ext.util.Format.trim(userName) == "" || Ext.util.Format.trim(Password) == "") {
			Ext.Msg.alert("警告", "请正确输入数据，用户名和密码都不能够为空！");
			return;
		}
	formSubmit();

//数据库连接及处理
/*Ext.Ajax.request( {
	url : "loginAction.action", //登录处理页面
	params : {
		userName : userName,
		userPassword : Password,
		idenTity:Ext.getCmp('identity').getValue(),
	}, //参数
	success : function(response, option) {
		var obj = Ext.decode(response.responseText);
		if (obj.success == true) {
			//window.location = 'indexAction.action';
		} else {
			Ext.Msg.alert("登录失败", obj.meg);
		}
	},
	failure : function(response, option) {
		Ext.Msg.alert("登录失败", "系统错误");
	}
	});
	}*/
}
function formSubmit(){
		var idenTity = Ext.getCmp('identity').getChecked()[0].inputValue;
		var userName = Ext.getCmp("userName").getValue();
		var Password = Ext.getCmp("password").getValue();
		if("0" == idenTity.toString()){
	    	if (loginPanel.getForm().isValid()) {
	    		loginPanel.getForm().submit({
	    				waitTitle : '提示',//标题
	    				waitMsg : '正在提交数据请稍后...',//提示信息
	    				url : 'teacherLoginAction.action',
	    				method : 'post',
	    				params : {
	    					userName : userName,
	    					userPassword : Password,
	    					idenTity:idenTity,
	    				}, //参数
	    				success : function(form, action) {
	    					var flag=action.result;
	    					if (flag.success == true) {
	    						window.location = 'indexAction.action';
	    					} else {
	    						Ext.Msg.alert("登录失败", flag.meg);
	    					}
	    				},
	    				failure : function(form,action) {
	    					var flag=action.result;	    				
	    						Ext.Msg.alert("登录失败", flag.meg);
	    				}
	    			});
	    	}
		}
		else if("1" == idenTity.toString()){
			if (loginPanel.getForm().isValid()) {
	    		loginPanel.getForm().submit({
	    				waitTitle : '提示',//标题
	    				waitMsg : '正在提交数据请稍后...',//提示信息
	    				url : 'studentLoginAction.action',
	    				method : 'post',
	    				params : {
	    					userName : userName,
	    					userPassword : Password,
	    					idenTity:idenTity,
	    				}, //参数
	    				success : function(form, action) {
	    					var flag=action.result;
	    					if (flag.success == true) {
	    						//window.location = 'indexAction.action';
	    					} else {
	    						Ext.Msg.alert("登录失败", flag.meg);
	    					}
	    				},
	    				failure : function(form,action) {
	    					var flag=action.result;	    				
	    						Ext.Msg.alert("登录失败", flag.meg);
	    				}
	    			});
	    	}
		}
		
		else if("2" == idenTity.toString()){
			if (loginPanel.getForm().isValid()) {
	    		loginPanel.getForm().submit({
	    				waitTitle : '提示',//标题
	    				waitMsg : '正在提交数据请稍后...',//提示信息
	    				url : 'managerLoginAction.action',
	    				method : 'post',
	    				params : {
	    					userName : userName,
	    					userPassword : Password,
	    					idenTity:idenTity,
	    				}, //参数
	    				success : function(form, action) {
	    					var flag=action.result;
	    					if (flag.success == true) {
	    						window.location = 'managerIndexAction.action';
	    					} else {
	    						Ext.Msg.alert("登录失败", flag.meg);
	    					}
	    				},
	    				failure : function(form,action) {
	    					var flag=action.result;	    				
	    						Ext.Msg.alert("登录失败", flag.meg);
	    				}
	    			});
	    	}
		}
}
}
Ext.onReady(LoginForm);