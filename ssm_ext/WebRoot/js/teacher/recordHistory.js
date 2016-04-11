Ext.require(  
        [  
            'Ext.grid.*',  
            'Ext.toolbar.Paging',  
            'Ext.util.*',  
            'Ext.data.*',  
            //注意引用  
            'Ext.ux.form.SearchField'  
         ]          
); 

recordHistory = function(){	
Ext.define('recordData',{
	extend:'Ext.data.Model',
	//id:'myData',
	fields:[
	        	{name:'recordCode',type:'string'},
		        {name:'teacherName',type:'string'},
		        {name:'acadmy',type:'string'},
		        {name:'professional',type:'string'},
		        {name:'guideTime',type:'string'},
		        {name:'guideType',type:'string'},
		        {name:'studentNumber',type:'string'},
		        {name:'guideTitle',type:'string'},
		        {name:'guideText',type:'string'},
		        {name:'guideSummary',type:'string'},
		        {name:'createTime',type:'string'},
		        {name:'teacherId',type:'string'},	
		       ],
});
var reader = Ext.create('Ext.data.JsonReader',{
	root:'list',
	model:recordData,
});
var historyStore = Ext.create('Ext.data.Store',{
	pageSize:8,
	model:recordData,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'selectGuideRecodeAction.action',
		reader:{
			type:'json',
			root:'resultList.list',
			totalProperty:'total'
		},
	},
});
/*var studentForm = Ext.create('Ext.FormPanel',{
	frame:true,
	waitMsgTarget:true,
	width:200,
	title:'信息',
	defaultType:'displayfield',
	reader:reader,
	//style:'padding-left:100px',
	 layout: {
	        type: 'absolute'
	    },
	items:[{
		fieldLabel:'编号',
		x:100,
		y:20,
		name:'id',
		hidden:true
	},{
		fieldLabel:'学号',
		name:'studentId',
		x:100,
		y:50,
		allowBlank:false
	},{
		fieldLabel:'姓名',
		name:'studentName',
		x:100,
		y:80,
		allowBlank:false
	},{
		fieldLabel:'年级',
		name:'grade',
		x:100,
		y:110,
		allowBlank:false
	},{
		fieldLabel:'学院',
		name:'academy',
		x:100,
		y:140,
		allowBlank:false
	},{
		fieldLabel:'专业',
		name:'professional',
		x:100,
		y:170,
		allowBlank:false
	},{
		fieldLabel:'班级',
		name:'inclass',
		x:100,
		y:200,
		allowBlank:false
	},{
		fieldLabel:'备注',
		name:'remark',
		x:100,
		y:230,
		allowBlank:false
	},{
		fieldLabel:'联系电话',
		name:'phone',
		x:100,
		y:260,
		allowBlank:false
	},{
		fieldLabel:'邮箱',
		name:'email',
		x:100,
		y:290,
		allowBlank:false
	},{
		fieldLabel:'年龄',
		name:'ago',
		x:100,
		y:320,
		allowBlank:false
	},{
		fieldLabel:'性别',
		name:'sex',
		x:100,
		y:350,
		allowBlank:false
	},{
		fieldLabel:'',
		x:100,
		y:380,
		name:'photo',
		id:'photo',
		hidden:true
	},{
		xtype:'panel',
    	width:100,
    	height:130,
    	x:350,
		y:60,
    	style: 'clear:both;margin-left:37px;border:1px solid blue; margin-bottom:8px',
    	items:{
        xtype: 'box',
        id:'image',
        autoEl: {
            width: 100,         
           // style: '',
            tag: 'img',
            //src:findField("photo"),
            //id: 'user.save.photoshow.' + user.IntUserID,
           // src: (user.StrImagePath === '' || user.StrImagePath === undefined) ? nophone : user.StrImagePath
        }}
	}]
});*/
var checkBox = Ext.create('Ext.selection.CheckboxModel');
var grid = Ext.create('Ext.grid.Panel',{
	store:historyStore,	
	columnLines:true,
	selModel:checkBox,
	disableSelection:false,
	loadMask:true,
	columns:[
	         {text:'编号',width:50,dataIndex:'recordCode',sortable:true},
	         {text:'指导时间',width:200,dataIndex:'guideTime',sortable:true},
	         {text:'指导课题',width:150,dataIndex:'guideTitle',sortable:true},
	         {text:"参加人数",width:200,dataIndex:'studentNumber',sortable:true},
	         {text:"专业",width:150,dataIndex:'professional',sortable:true},
	         {text:"创建时间",width:150,dataIndex:'createTime',sortable:true,renderer : function(_registerDate){
	             return _registerDate.replace("T"," ").substring(0,16);
	         }},
	         
	         ],
	autoHeight:true,
	authWidth:true,

	title:"指导记录历史信息",
	loadMask:true,
	pageSize:5,
	listeners:{  
        'itemdblclick' : function(grid, rowIndex, e){
        	editRecord();
        }
        },
	/*viewConfig:{
		id:'gv',
		trackOver:false,
		stripeRows:false,
	},*/
	dockedItems:[{
		dock:'top',
		xtype:'toolbar',
		
		items:['->',{
			text:'修改',
			iconCls:'Applicationform',
			xtype:'button',
			handler:editRecord
		},'-',{
			text:'新增',
			iconCls:'Applicationform',
			xtype:'button',
			handler:addRecord
		},{
			text:'删除',
			iconCls:'Applicationform',
			xtype:'button',
			//handler:deleteRecord
		}]		
	},
	{
		dock:'bottom',
		xtype:'pagingtoolbar',	
		store:historyStore,
		displayInfo:true,
		displayMsg:'显示{0}-{1}条，共计{2}条',
		emptyMsg:"没有数据",
	},{
		dock:'bottom',
		xtype:'label',
		html:'<div style="font-size:12px;color:red">*双击可查看详细信息</div>'
	}]
});

function editRecord(){
	var selectedKeys = grid.getSelectionModel().getSelection();
	
	if(selectedKeys.length != 1){
		Ext.MessageBox.alert('提示','请选择一条数据');
	}else{
		var recordCode=selectedKeys[0].get("recordCode");
		var tab = center.queryById("8");
		if(tab){
			tab.close();
		}
		center.add({
	        id: "8",
	        iconCls: "",       
	        xtype: "panel",
	        title: "修改指导记录", 
	        closable: true,
	        maskDiabled: true,
	        frame: true,
	        baseCls:'allBackImage',
	        autoScroll : true,
	        items: new NewRecord(recordCode),
	    });
	    center.setActiveTab("8");
	}
};

function addRecord(){	
		var tab = center.queryById("8");
		if(tab){
			//center.setActiveTab(tab);
			tab.close();
		}
	
		center.add({
	        id: "8",
	        iconCls: "",       
	        xtype: "panel",
	        title: "新增指导记录", 
	        closable: true,
	        maskDiabled: true,
	        frame: true,
	        baseCls:'allBackImage',
	        autoScroll : true,
	        items: new NewRecord("-1"),
	    });
	    center.setActiveTab("8");
	
};

function loadUser(){
	var selectedKeys = grid.getSelectionModel().getSelection();
	var studentId=selectedKeys[0].get("studentId");
	studentForm.form.load({					
		waitMsg : '正在加载数据请稍后',						
		url : 'searchStudentAction.action',			
		params:{studentId:studentId},				
		//method:'POST',//请求方式  
		failure : function(response, option) {
			Ext.Msg.alert("提示", "获取数据失败");
		},
		success : function(form, action) {
    		//var obj = action.result;
			//Ext.Msg.alert("提示",action.row);
			Ext.getCmp('image').getEl().dom.src=Ext.getCmp("photo").value;
    		//action.result.data.list.photo != null ? Ext.getCmp('image').getEl().dom.src= action.result.data.list.photo:"";
		}
});
};
return grid;
};
