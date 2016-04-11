var uploadFile = function(){
	 Ext.tip.QuickTipManager.init(); 
	Ext.define('fileModel',{
		extend:'Ext.data.Model',
		fields:[
		        	{name:'fileId',type:'String'},
			        {name:'fileName',type:'string'},
			        {name:'uploadTime',type:'string'},
			        {name:'downloadNumber',type:'int'},
			       ]
	});
	var fileStore = Ext.create('Ext.data.Store',{
		pageSize:5,
		model:fileModel,
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'history_FileAction.action',
			reader:{
				type:'json',
				root:'fileList.list',
				totalProperty:'fileList.total'
			},
		},
	});
	var historyFile = Ext.create('Ext.grid.Panel',{
		store:fileStore,	
		columnLines:true,
		disableSelection:false,
		loadMask:true,
		anchor:'100%',
		columns:[
		         new Ext.grid.RowNumberer(),
		         {text:'编号',width:150,dataIndex:'fileId',sortable:true,hidden:true},
		         {text:'文件名',width:300,dataIndex:'fileName',sortable:true},
		         {text:"上传时间",width:300,dataIndex:'uploadTime',sortable:true, renderer : function(_registerDate){
		             return _registerDate.replace("T"," ").substring(0,16);
		         }},
		         {text:'下载次数',width:250,dataIndex:'downloadNumber',sortable:true},        
		         { 
		        	 header: '操作', 
		        	 xtype: 'actioncolumn', 
		        	 width: 100, 
		        	 items: ['->',{ 
		        	 iconCls: 'Arrowdown', 
		        	 tooltip: '下载', 
		        	 handler: function (grid, rowIndex, colIndex) { 
		        		 var rec = grid.getStore().getAt(rowIndex);
		        		 var fileId = rec.get('fileId');		       
		        		 window.location.href="downloadFileAction.action?fileId="+fileId;
		        	 	}
		        	 },'-', { 
		        	 iconCls: 'closeone', 
		        	 tooltip: '删除', 
		        	 handler: function (grid, rowIndex, 
		        	 colIndex) { 
		        	 var rec = grid.getStore().getAt(rowIndex); 
		        	 var fileId = rec.get('fileId');
		        	 var fileName = rec.get('fileName');
		        	 var conn = new Ext.data.Connection();
		     		 conn.request({  
		                 // 请求地址  
		                 url: 'delect_FileAction.action',  
		                 method: 'post',  
		                 params: {fileId:fileId,
		                	 uploadFileName:fileName,
		                 }, 
		                 success:function(response, option){
		                	 Ext.Msg.alert("提示", "删除成功");
		                	 fileStore.load({params:{start : 0,limit : 5}});
		                 },
		                 failure : function(response, option) {
		             		Ext.Msg.alert("提示", "删除失败");
		             	}
		        	 }); 
		        	 }
		        	 }] 

		        	 }
		         ],
		//height:300,
		//width:800,

		title:"上传历史",
		loadMask:true,
		dockedItems:[
		{
			dock:'bottom',
			xtype:'pagingtoolbar',	
			store:fileStore,
			displayInfo:true,
			displayMsg:'显示{0}-{1}条，共计{2}条',
			emptyMsg:"没有数据",
		}]
	});
	var uploadForm=new Ext.FormPanel({ 
		title:'上传新文件',
	    id:'uploadForm', 
	    anchor:'100%',	    
	    frame:true, 
	    fileUpload: true,   
	    autoHeight:true, 
	    labelWidth:50, 
	    enctype: 'multipart/form-data',  
	    defaults:{ 
	        anchor: '55%', 
	        allowBlank: false 
	    }, 
	    items:[ 
	        { 
	            xtype:'fileuploadfield', 
	            emptyText: '请选择上传文件...',  
	            fieldLabel: '文件',  
	            id:'uploadFile', 
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
	                        if(uploadForm.getForm().isValid()){ 
	                            uploadForm.getForm().submit({ 
	                                url:'addFile_FileAction.action', 
	                                method:'POST', 
	                                waitTitle: '请稍后', 
	                                waitMsg: '正在上传文档文件 ...', 
	                                success: function(fp, action){ 
	                                    Ext.MessageBox.alert('信息', "上传成功");   
	                                    Ext.getCmp("uploadFile").reset();          // 指定文件字段的id清空其内容  
	                                    historyFile.store.load({params:{start : 0,limit : 5}}); 
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
	                        uploadForm.getForm().reset(); 
	                    } 
	                }],
	    buttonAlign:'center'
	       
	});
	var uploadFilePanel = Ext.create('Ext.Panel',{
		enableTabScroll: true,
		//width:800,
		//height:370,
		//x:100,
		//layout: 'column',
        layout: 'anchor',
		anchor:'100% 90%',
        items: [historyFile, uploadForm]
	});
	return uploadFilePanel;
};