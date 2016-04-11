
Ext.require(  
        [  
            'Ext/ux/XHtmlEditor'  
         ]          
);
announcementListForM = function(){
Ext.define('announcementModel',{
	extend:'Ext.data.Model',
	fields:[
	        	{name:'title',type:'String'},
	        	{name:'abstracts',type:'String'},
	        	{name:'text',type:'string'},
	        	{name:'inputDate',type:'string'},
		        {name:'id',type:'string'},
		       ],
	idProperty : 'id'
});
var announcementstore = Ext.create('Ext.data.Store',{
	pageSize:5,
	model:announcementModel,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'announcementAction.action',
		reader:{
			type:'json',
			root:'items.list',
			totalProperty:'total'
		},
	},
});
var checkBox = Ext.create('Ext.selection.CheckboxModel');
var grid = Ext.create('Ext.grid.GridPanel',{
	store:announcementstore,	
	columnLines:true,
	selModel:checkBox,
	disableSelection:false,
	loadMask:true,
	columns:[
	         {text:'编号',width:150,dataIndex:'id',sortable:true},
	         {text:'标题',width:200,dataIndex:'title'},
	         {text:'摘要',width:350,dataIndex:'abstracts',},
	         {text:'内容',width:350,dataIndex:'text',hidden:true},
	         {text:"发布时间",width:150,dataIndex:'inputDate',sortable:true, renderer : function(_registerDate){
	             return _registerDate.replace("T"," ").substring(0,16);
	         }},
	         ],
	autoHeight:true,
	authWidth:true,

	title:"公告信息",
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
	var editAnnouncement = Ext.create('Ext.Window',{
		id:'editAnnouncementId',
		layout:'form',
		width:700,
		height:400,
		//closeAction:'hide',
		plain:true,
		resizable : false,
		title:'公告信息',
		items:[{
			xtype:'textfield',
			fieldLabel:'编号',
			id:'announcementId',
			hidden:true,
			listeners: {
	               'afterrender': function () {
	            	   //Ext.Msg.alert("ss",record);
	                   if (record!=null){
	                	   this.setValue(record.get('id'));
	                   }
	               }
	           }
		},{
				   xtype:'textfield',  
		           fieldLabel:'标题', 
		          // width:400,
		           id:'announcementTitle',
		           name:'title',  
		           allowBlank:false,  
		           blankText:'标题不能为空',
		           listeners: {
		               'afterrender': function () {
		            	   //Ext.Msg.alert("ss",record);
		                   if (record!=null){
		                	   this.setValue(record.get('title'));
		                   }
		               }
		           }
			},{
				   xtype:'textfield',  
		           fieldLabel:'摘要', 
		          // width:400,
		           id:'announcementAbstracts',
		           name:'abstracts',  
		           allowBlank:false,  
		           blankText:'摘要不能为空',
		           listeners: {
		               'afterrender': function () {
		            	   //Ext.Msg.alert("ss",record);
		                   if (record!=null){
		                	   this.setValue(record.get('abstracts'));
		                   }
		               }
		           }
			},{
				xtype:'xhtmleditor',
            	//width:500,
				id:'announcementText',
				//name:'text',
        		height:300,
        		fieldLabel: '公告内容',
        		uploadConfig:{
                    url:"announcementPhotoAction.action"
                },
        		listeners: {
		               'afterrender': function () {
		                   if (record!=null){
		                	  this.setValue(record.get('text'));
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
				Ext.getCmp('announcementText').value='';
				Ext.getCmp('announcementAbstractss').value='';
				Ext.getCmp('announcementTitle').value='';
		}
		}],
	buttonAlign : "center",
	plain:true,
		
	});
	editAnnouncement.show();
}
function validatorData(){ 
	var text = Ext.getCmp('announcementText').value;
	if(text == "" || text == null){
		Ext.Msg.alert("提示","公告内容不能为空");
		return;
	}
	var title = Ext.getCmp('announcementTitle').value;
	if(title == null || title == ""){
		Ext.Msg.alert("提示","公告标题不能为空");
		return;
	}
	var abstracts = Ext.getCmp('announcementAbstracts').value;
	if(abstracts == null || abstracts == ""){
		Ext.Msg.alert("提示","公告摘要不能为空");
		return;
	}
	var id = Ext.getCmp('announcementId').value;
	Ext.Ajax.request({  
        url : 'addOrUpdateAnnouncementAction.action',  
        params : {  
        	id : id,
        	title:title,
        	abstracts:abstracts,
        	text:text,
        },  
        method : 'POST',  
        success : function(response, opts) {  
            var success = Ext.decode(response.responseText).success;  
            // 当后台数据同步成功时  
            if (success) {  
            	Ext.getCmp('editAnnouncementId').close();
            	announcementstore.load();
            	Ext.Msg.alert("提示","操作成功");
            } else {  
            	Ext.Msg.alert("提示","操作失败");
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
                var announcementIds = [];  
                Ext.Array.each(data, function(record) {  
                            var announcementId=record.get('id');  
                            announcementIds.push(announcementId);  
                        });
                Ext.Ajax.request({  
                    url : 'delAnnouncementAction.action',  
                    params : {  
                    	dels : announcementIds.join(',')  
                    },  
                    method : 'POST',  
                    success : function(response, opts) {  
                        var success = Ext.decode(response.responseText).success;  
                        // 当后台数据同步成功时  
                        if (success) {  
                        	announcementstore.load();
                        	Ext.Msg.alert("提示","删除成功");
                        } else {  
                        	Ext.Msg.alert("提示","删除失败");
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
