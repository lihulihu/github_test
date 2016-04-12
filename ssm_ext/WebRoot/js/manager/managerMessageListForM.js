
managerMessageListForM = function(){
Ext.define('managerMessageModel',{
	extend:'Ext.data.Model',
	fields:[
	        	{name:'managerId',type:'String'},
	        	{name:'managerAccount',type:'String'},
	        	{name:'managerPassword',type:'string'},
	        	{name:'managerLevel',mapping:'managerLevel.valueName',type:'string'},
		        {name:'createDate',type:'string'}
		       ],
});
var managerLevelStore  = Ext.create('Ext.data.Store',{
     /*data:[{valueId:"超级管理员",valueName:"超级管理员"},{valueId:"管理员",valueName:"管理员"}],*/
	proxy:{ 
    	type:'ajax',
    	url: 'publicDictAction.action' ,      
    	reader: { 
    		type: 'json', 
    		root: 'list' 
    	},
    	extraParams:{
    		publicCode:'managerLevel',
    	}
    },
    fields:['valueId','valueName'], 
    autoLoad: true, 
 });
var managerMessagestore = Ext.create('Ext.data.Store',{
	pageSize:5,
	model:managerMessageModel,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'managerPageInfoAction.action',
		reader:{
			type:'json',
			root:'items.list',
			totalProperty:'total'
		},
	},
});
var checkBox = Ext.create('Ext.selection.CheckboxModel');
var grid = Ext.create('Ext.grid.GridPanel',{
	store:managerMessagestore,	
	columnLines:true,
	selModel:checkBox,
	disableSelection:false,
	loadMask:true,
	columns:[
	         {text:'编号',width:150,dataIndex:'managerId',sortable:true},
	         {text:'登录账号',width:200,dataIndex:'managerAccount'},
	         {text:'登录密码',width:200,dataIndex:'managerPassword'},
	         {text:'权限',width:200,dataIndex:'managerLevel'},
	         {text:"创建时间",width:200,dataIndex:'createDate',sortable:true, renderer : function(_registerDate){
	             return _registerDate.replace("T"," ").substring(0,16);
	         }},
	         ],
	autoHeight:true,
	authWidth:true,

	title:"管理员信息",
	loadMask:true,
	pageSize:5,
	dockedItems:[{
		dock:'top',
		xtype:'toolbar',	
		items:['->',{
			text:'新增',
			iconCls:'Add',
			xtype:'button',
			handler:function(){
				newWindow(null);
			}
		},'-',{
			text:'删除',
			iconCls:'Decline',
			xtype:'button',
			handler:otherDelete
		}]		
	},{
		dock:'bottom',
		xtype:'pagingtoolbar',	
		store:managerMessagestore,
		displayInfo:true,
		displayMsg:'显示{0}-{1}条，共计{2}条',
		emptyMsg:"没有数据",
	},{
		dock:'bottom',
		xtype:'label',
		html:'<div style="font-size:12px;color:red">1.双击可进行单行编辑</div>'
	}],
	listeners:
    {
        'itemdblclick': function(dataview, record, item, index, e) {
        	newWindow(record);
        	}    //单击击事件
        }
});
function newWindow(record){
	var editManagerMessage = Ext.create('Ext.Window',{
		id:'editManagerMessageId',
		layout:'form',
		width:400,
		height:200,
		//closeAction:'hide',
		plain:true,
		resizable : false,
		title:'管理员信息',
		items:[{
			xtype:'textfield',
			fieldLabel:'编号',
			id:'managerId',
			hidden:true,
			listeners: {
	               'afterrender': function () {
	            	   //Ext.Msg.alert("ss",record);
	                   if (record!=null){
	                	   this.setValue(record.get('managerId'));
	                   }
	               }
	           }
		},{
				   xtype:'textfield',  
		           fieldLabel:'登录账号', 
		           id:'managerAccount',
		           name:'managerAccount',  
		           allowBlank:false,  
		           blankText:'账号不能为空',
		           listeners: {
		               'afterrender': function () {
		            	   //Ext.Msg.alert("ss",record);
		                   if (record!=null){
		                	   this.setValue(record.get('managerAccount'));
		                   }
		               }
		           }
			},{
				   xtype:'textfield',  
		           fieldLabel:'登录密码', 
		           id:'managerPassword',
		           name:'managerPassword',  
		           allowBlank:false,  
		           blankText:'密码不能为空',
		           listeners: {
		               'afterrender': function () {
		            	   //Ext.Msg.alert("ss",record);
		                   if (record!=null){
		                	   this.setValue(record.get('managerPassword'));
		                   }
		               }
		           }
			},{						        
		        xtype:'combobox',
		    	alias:'widget.lifechannelCombo',
		    	id:'managerLevel',
		        store: managerLevelStore,
		        displayField: 'valueName',
		        valueField: 'valueId',
		        triggerAction: 'all',
		        queryMode:'local', 
		        fieldLabel: '权限',
		        allowBlank : false,		        
        		listeners: {
		               'afterrender': function () {
		                   if (record!=null){
		                	  this.setValue(record.get('managerLevel'));
		                   }
		               }
		           }
		}],
		buttons : [ {
			xtype : "button",
			text : "确定",
			pressed : false,
			handler : validatorData
		},
		{
			xtype : "button",
			text : "重置",
			handler : function() {
				Ext.getCmp('managerAccount').value='';
				Ext.getCmp('managerPassword').value='';
				Ext.getCmp('managerLevel').value='';
		}
		}],
	buttonAlign : "center",
	plain:true,
		
	});
	editManagerMessage.show();
}
function validatorData(){ 
	var managerAccount = Ext.getCmp('managerAccount').value;
	if(managerAccount == "" || managerAccount == null){
		Ext.Msg.alert("提示","登录账号不能为空");
		return;
	}
	var managerPassword = Ext.getCmp('managerPassword').value;
	if(managerPassword == null || managerPassword == ""){
		Ext.Msg.alert("提示","登录密码不能为空");
		return;
	}
	var managerLevel = Ext.getCmp('managerLevel').value;
	if(managerLevel == null || managerLevel == ""){
		Ext.Msg.alert("提示","管理员权限不能为空");
		return;
	}
	var managerId = Ext.getCmp('managerId').value;
	var url="addManagerAction.action";
	if(managerId != null && managerId != ""){
		url = "updateManagerAction.action";
	}
	var jsonString="{'managerId':"+"'"+managerId+"'"
	+",'managerAccount':"+"'"+managerAccount+"'"
	+",'managerPassword':"+"'"+managerPassword+"'"
	+",'managerLevel':{'valueId':"+"'"+managerLevel+"'"
	+"}}";
	Ext.Ajax.request({  
        url : url,  
        params : {  
        	jsonString : jsonString,
        },  
        method : 'POST',  
        success : function(response, opts) {  
            var obj = Ext.decode(response.responseText);  
            // 当后台数据同步成功时  
            if (obj.success) {  
            	Ext.getCmp('editManagerMessageId').close();
            	managerMessagestore.load();
            	Ext.Msg.alert("提示","操作成功");
            } else {  
            	Ext.Msg.alert("提示",obj.msg);
            }  
        }  
    });  
}
function otherDelete() {  
    var data = grid.getSelectionModel().getSelection();  
    if (data.length == 0) {  
        Ext.Msg.alert("提示","请先选择要操作的行");  
        return;  
    } else {  
        Ext.Msg.confirm("请确认", "是否真的要删除数据？", function(button, text) {  
            if (button == "yes") {  
                var managerIds = [];  
                Ext.Array.each(data, function(record) {  
                            var managerId=record.get('id');  
                            managerIds.push(managerId);  
                        });
                Ext.Ajax.request({  
                    url : 'delManagerAction.action',  
                    params : {  
                    	dels : managerIds.join(','), 
                    },  
                    method : 'POST',  
                    success : function(response, opts) {  
                        var obj = Ext.decode(response.responseText);  
                        // 当后台数据同步成功时  
                        if (obj.success) {  
                        	managerMessagestore.load();
                        	Ext.Msg.alert("提示","删除成功");
                        } else {  
                        	Ext.Msg.alert("提示",obj.msg);
                        }  
                    }  
                });  
            }  
        });  
    }  
}  

function alter() {  
    
} 
return grid;
};
