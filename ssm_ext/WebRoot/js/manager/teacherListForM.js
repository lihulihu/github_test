
teacherListForM = function(){
Ext.define('teacherModel',{
	extend:'Ext.data.Model',
	fields:[
	        	{name:'teacherId',type:'String'},
	        	{name:'teacherName',type:'string'},
	        	{name:'account',type:'string'},
		        {name:'password',type:'string'},
		        {name:'job',mapping:'job.valueId',type:'string'},
		        {name:'political',mapping:'political.valueId',type:'string'},
		        {name:'academy',mapping:'academy.valueId',type:'string'}
		       ],
	idProperty : 'teacherId'
});
var teacherJobForMStore  = Ext.create('Ext.data.Store',{
       // xtype: 'Ext.data.Store',
       // singleton : true,
        proxy:{ 
        	type:'ajax',
        	url: 'publicDictAction.action' ,      
        	reader: { 
        		type: 'json', 
        		root: 'list' 
        	},
        	extraParams:{
        		publicCode:'teacher job',
        	}
        },
        fields:['valueId','valueName'],
        autoLoad: true,        
    });

var teacherPoliticalForMStore  = Ext.create('Ext.data.Store',{
    // xtype: 'Ext.data.Store',
     //singleton : true,
     proxy:{ 
     	type:'ajax',
     	url: 'publicDictAction.action' ,      
     	reader: { 
     		type: 'json', 
     		root: 'list' 
     	},
     	extraParams:{
     		publicCode:'political status',
     	}
     },
     fields:['valueId','valueName'],
     autoLoad: true,        
 });

var teacherAcademyForMStore  = Ext.create('Ext.data.Store',{
    // xtype: 'Ext.data.Store',
     //singleton : true,
     proxy:{ 
     	type:'ajax',
     	url: 'publicDictAction.action' ,      
     	reader: { 
     		type: 'json', 
     		root: 'list' 
     	},
     	extraParams:{
     		publicCode:'academy',
     	}
     },
     fields:['valueId','valueName'],
     autoLoad: true,        
 });

var store = Ext.create('Ext.data.Store',{
	pageSize:8,
	model:teacherModel,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'searchAllTeacherAction.action',
		reader:{
			type:'json',
			root:'resultList.list',
			totalProperty:'total'
		},
	},
});
var checkBox = Ext.create('Ext.selection.CheckboxModel');

var importTeacherForm=new Ext.FormPanel({ 
	title:'上传新文件',
   // id:'uploadForm', 
   // anchor:'100%',	    
    frame:true, 
    fileUpload: true,   
    autoHeight:true, 
    //labelWidth:50, 
    enctype: 'multipart/form-data',  
    defaults:{ 
        anchor: '90%', 
        allowBlank: false 
    }, 
    items:[ 
        { 
            xtype:'fileuploadfield', 
            emptyText: '请选择上传文件...',  
            fieldLabel: '文件',  
           // id:'uploadFile', 
            name: 'upload',  
            allowBlank: false,    
            blankText: '文件名称不能为空.',    
            buttonConfig: { 
                        text: '选择...'
              } 
        } 
    ], 
    buttons: [{ 
                    text: '上传', 
                    handler: function(){ 
                        if(importTeacherForm.getForm().isValid()){ 
                        	importTeacherForm.getForm().submit({ 
                                url:'importTeacherAction.action', 
                                method:'POST', 
                                waitTitle: '请稍后', 
                                waitMsg: '正在上传文档文件 ...', 
                                success: function(fp, action){ 
                                    Ext.MessageBox.alert('信息', "导入成功,共导入"+action.result.num+"条数据");   
                                    importTeacherForm.getForm().reset();         // 指定文件字段的id清空其内容  
                                    store.load(); 
                                }, 
                                failure: function(fp, action){ 
                                    Ext.MessageBox.alert('警告', action.result.message);   
                                } 
                            }); 
                        } 
                    } 
                },{ 
                    text: '重置', 
                    handler: function(){ 
                    	importTeacherForm.getForm().reset(); 
                    } 
                }],
    buttonAlign:'center'
       
});
var grid = Ext.create('Ext.grid.GridPanel',{
	store:store,	
	columnLines:true,
	selModel:checkBox,
	disableSelection:false,
	loadMask:true,
	plugins:[  
             Ext.create('Ext.grid.plugin.RowEditing',{
            	// pluginId:'newEdit',
            	 saveBtnText: '确定', 
                 cancelBtnText: "取消", 
             })  
    ],
	columns:[
	         {text:'编号',width:150,dataIndex:'teacherId',sortable:true,hidden:true,editor:{allowBlank : true}},
	         {text:'姓名',width:150,dataIndex:'teacherName',sortable:true,editor:{allowBlank : false}},
	         {text:'登录账号',width:150,dataIndex:'account',sortable:true,
	        	 editor:{
	        		 id:'accountText',
	        		 allowBlank : false,
	        		 validateOnChange:false,
	        		 validator:accountValidator,
	        		 },
	        		 },
	         {text:"登录密码",width:200,dataIndex:'password',sortable:true,editor:{allowBlank : false}},
	         {text:"职称",width:150,dataIndex:'job',sortable:true,
	        	 editor:{
	        			    	xtype:'combobox',
	        			    	alias:'widget.lifechannelCombo',
	        			        width: 100,
	        			        store: teacherJobForMStore,
	        			        displayField: 'valueName',
	        			        valueField: 'valueId',
	        			        triggerAction: 'all',
	        			        queryMode:'local', 
	        			        allowBlank : false
	        	 },renderer:function(v){
	        			 var index = teacherJobForMStore.find('valueId',v); 
	        			 if(index != -1){
	        				 var r = teacherJobForMStore.getAt(index);
	        				 return r.get("valueName");
	        			 }
	        			 else{
	        				 return v;
	        			 }
	        	 } 
	        	 },
	         {text:"政治面貌",width:150,dataIndex:'political',sortable:true,
	        		 editor:{
     			    	xtype:'combobox',
     			    	alias:'widget.lifechannelCombo',
     			        width: 100,
     			        store: teacherPoliticalForMStore,
     			        displayField: 'valueName',
     			        valueField: 'valueId',
     			        triggerAction: 'all',
     			        queryMode:'local', 
     			       allowBlank : false
	        		 },renderer:function(v){
	        			 var index = teacherPoliticalForMStore.find('valueId',v); 
	        			 if(index != -1){
	        				 var r = teacherPoliticalForMStore.getAt(index);
	        				 return r.get("valueName");
	        			 }
	        			 else{
	        				 return v;
	        			 }
	        		 } 
	         },
	         {text:"学院",width:150,dataIndex:'academy',sortable:true,
	        	 editor:{
  			    	xtype:'combobox',
  			    	alias:'widget.lifechannelCombo',
  			        width: 100,
  			        store: teacherAcademyForMStore,
  			        displayField: 'valueName',
  			        valueField: 'valueId',
  			        triggerAction: 'all',
  			        queryMode:'local', 
  			        allowBlank : false
	        		 },renderer:function(v){
	        			 var index = teacherAcademyForMStore.find('valueId',v); 
	        			 if(index != -1){
	        				 var r = teacherAcademyForMStore.getAt(index);
	        				 return r.get("valueName");
	        			 }
	        			 else{
	        				 return v;
	        			 }
	        		 } 
	         }
	         ],
	autoHeight:true,
	authWidth:true,

	title:"信息",
	loadMask:true,
	pageSize:5,
	dockedItems:[{
		dock:'top',
		xtype:'toolbar',
		
		items:[{
			width:300,
			fieldLabel:'搜索',
			labelWidth:70,
			xtype:'searchfield',
			store:store			
		},{
			xtype:'label',
			html:'<div style="font-size:12px;color:red">*支持导师编号和姓名的模糊查询</div>'
		},'->',{
			text:'Excel导入',
			iconCls:'applicationOsxGet',
			xtype:'button',
			handler:function(){
				var importTeacherWindow = Ext.create('Ext.Window',{
					layout:'fit',
					width:400,
					height:200,
					closeAction:'hide',
					plain:true,
					resizable : false,
					title:'excel导入',
					items:importTeacherForm,
					plain:true,
					
				});
				importTeacherWindow.show();
			}
		},{
			text:'Excel导出',
			iconCls:'applicationPut',
			xtype:'button',
			handler:function(){
				window.location.href="exportTeacherAction.action";
			}
		},{
			text:'新增',
			iconCls:'Add',
			xtype:'button',
			handler:addOne
		},'-',{
			text:'删除',
			iconCls:'Decline',
			xtype:'button',
			handler:otherDelete
		},'-',
		{
			text:'提交数据',
			iconCls:'Applicationform',
			xtype:'button',
			handler:alter
		}]		
	},
	{
		dock:'bottom',
		xtype:'pagingtoolbar',	
		store:store,
		displayInfo:true,
		displayMsg:'显示{0}-{1}条，共计{2}条',
		emptyMsg:"没有数据",
	},{
		dock:'bottom',
		xtype:'label',
		html:'<div style="font-size:12px;color:red">1.双击进行单行编辑&nbsp&nbsp2.编辑或新增后需要提交数据进行保存&nbsp&nbsp3.登录账号不能重复，输入后会验证</div>'
	}]
});
function addOne(){ 
	var newstore ={
		teacherName:'请输入姓名',
		account:'请输入登录账号',
        password:'123456',
        job:'01',
        political:'1',
        academy:'1'
	};
    store.insert(0,newstore);
    var edit = grid.editingPlugin;
    edit.startEdit(0,1);
}
function otherDelete() {  
    var data = grid.getSelectionModel().getSelection();  
    if (data.length == 0) {  
        Ext.Msg.alert("提示","请先选择要操作的行");  
        return;  
    } else {  
        Ext.Msg.confirm("请确认", "是否真的要删除数据？", function(button, text) {  
            if (button == "yes") {  
                var teacherIds = [];  
                Ext.Array.each(data, function(record) {  
                            var teacherId=record.get('teacherId');  
                            //如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可  
                            if(teacherId){  
                            	teacherIds.push(teacherId);  
                            } 
                            else{
                            	store.remove(record);
                            }
                        });
                //Ext.Msg.alert(teacherIds);
                if(teacherIds.length==0){return;}
                Ext.Ajax.request({  
                    url : 'deleteTeachersAction.action',  
                    params : {  
                    	teacherIds : teacherIds.join(',')  
                    },  
                    method : 'POST',  
                    success : function(response, opts) {  
                        var success = Ext.decode(response.responseText).success;  
                        // 当后台数据同步成功时  
                        if (success) {  
                           /* Ext.Array.each(data, function(record) {  
                                        store.remove(record);// 页面效果  
                                    });  */
                        	store.load();
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
    var records = store.getUpdatedRecords();// 获取修改的行的数据，无法获取幻影数据  
    var phantoms=store.getNewRecords( ) ;//获得幻影行  
    records=records.concat(phantoms);//将幻影数据与真实数据合并  
    if (records.length == 0) {  
    	Ext.Msg.alert("提示","请先选择要操作的行");   
        return;  
    } else {  
        Ext.Msg.confirm("请确认", "是否真的要修改数据？", function(button, text) {  
            if (button == "yes") {  
                var data = [];  
                Ext.Array.each(records, function(record) {
                	Ext.Msg.alert(record.data.teacherName);
                    data.push(record.data);  
                    });  
                Ext.Ajax.request({  
                    url : 'alterTeachersAction.action',  
                    params : {  
                        alterInfo : Ext.encode(data)  
                    },  
                    method : 'POST',  
                    success : function(response, opts) {  
                        var success = Ext.decode(response.responseText).success;  
                        // 当后台数据同步成功时  
                        if (success) {  
                        	store.load();
                            Ext.Msg.alert("提示","提交成功");
                        } else {  
                            Ext.Msg.alert("提示","提交失败"); 
                        }  
                    }  
                });  
            }  
        });  
    }  
} 
function accountValidator(v){
	var text = Ext.getCmp('accountText');
	if(v!= "" && text.isDirty()){
		Ext.Ajax.request({  
            url : 'searchTeacherByNameAction.action',  
            params : {  
            	userName :  v
            },  
            method : 'POST',  
            success : function(response, opts) {  
                var success = Ext.decode(response.responseText).success;  
                if (success) {  
                	var result = Ext.decode(response.responseText).isOk;
                	if(result){
                		text.clearInvalid();
                		return true;
                	}
                	else{
                		text.markInvalid('用户名已被使用');
                		return false;
                	}
                } 
                else {  
                	Ext.Msg.alert("提示","系统错误");
                	return false;
                }  
            }  
        }); 
	}
	
	return true;
		
}
return grid;
};
