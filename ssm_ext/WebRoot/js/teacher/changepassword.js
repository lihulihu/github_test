changepassword = function(){
	var passwordPanel = new Ext.form.FormPanel( {
		id : "passwordPanel",
		width:500,
		height:150,
		labelPad : 0,
		labelWidth : 80,
		margin:200,
		bodyStyle : "padding-left:120px;padding-top:25px;padding-right:100px;",
		layout : "form",
		items:[  
	       {  
	           xtype:'textfield',  
	           fieldLabel:'原始密码', 
	           inputType:'password',
	           id:'historyPassword',
	           name:'historyPassword',  
	           allowBlank:false, 
	           regex: /^([a-zA-Z0-9]{6,20})$/i,
	           regexText: '密码必须是字母或数字,且长度是6~20',
	           blankText:'原始密码不能为空'  
	       },  
	       {  
	           xtype:'textfield',  
	           fieldLabel:'新密码', 

	           id:'newPassword',
	           name:'newPassword',  
	           inputType:'password',  
	           allowBlank:false,
	           regex: /^([a-zA-Z0-9]{6,20})$/i,
	           regexText: '密码必须是字母或数字,且长度是6~20',
	           blankText:'新密码不能为空'  
	       },  
	       {  
	           xtype:'textfield',  
	           fieldLabel:'确认新密码', 

	           id:'newPassword1',
	           name:'newPassword1',  
	           inputType:'password',  
	           allowBlank:false,  
	           regex: /^([a-zA-Z0-9]{6,20})$/i,
	           regexText: '密码必须是字母或数字,且长度是6~20',
	           blankText:'新密码不能为空'  
	       }
	         
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
	function validatorData() {
		var historyPassword = Ext.getCmp("historyPassword").getValue();
		var newPassword = Ext.getCmp("newPassword").getValue();
		var newPassword1 = Ext.getCmp("newPassword1").getValue();
		//Ext.Msg.alert("警告", historyPassword);
		if (historyPassword == null || historyPassword=="") {
			Ext.Msg.alert("警告", "原始密码不能够为空！");
			return;
			}
		if(newPassword == null || newPassword == ""){
			Ext.Msg.alert("警告", "新不能够为空！");
			return;
		}
		if(newPassword1 == null || newPassword1==""){
			Ext.Msg.alert("警告", "新不能够为空！");
			return;
		}
		if(newPassword!=newPassword1){
			Ext.Msg.alert("警告", "两次新密码输入不一致！");
			return;
		}
		passwordPanel.getForm().submit({
			waitTitle : '提示',//标题
			waitMsg : '正在提交数据请稍后...',//提示信息
			url : 'changePasswordAction.action',
			method : 'post',
			params : {
				historyPassword : historyPassword,
				newPassword : newPassword,
				newPassword1 : newPassword1,
			}, //参数
			success : function(form, action) {
				var flag=action.result;
				if (flag.success == true) {
					Ext.Msg.alert("提示", "密码修改成功，你的密码为："+newPassword+",下次登录请使用新密码");
				} else {
					Ext.Msg.alert("提示", flag.msg);
				}
			},
			failure : function(form,action) {
				var flag=action.result;	    				
					Ext.Msg.alert("提示", flag.msg);
			}
		});
	}
	return passwordPanel;
}