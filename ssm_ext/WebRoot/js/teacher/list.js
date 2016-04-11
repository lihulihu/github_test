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

studentList = function(){	
Ext.define('MyData',{
	extend:'Ext.data.Model',
	id:'myData',
	fields:[
	        	{name:'id',type:'string'},
		        {name:'studentId',type:'string'},
		        {name:'studentName',type:'string'},
		        {name:'grade',type:'string'},
		        {name:'inclass',type:'string'},
		        {name:'remark',type:'string'},
		        {name:'photo',type:'string'},
		        {name:'phone',type:'string'},
		        {name:'email',type:'string'},
		        {name:'sex',type:'string'},
		        {name:'ago',type:'string'},
		        {name:'password',type:'string'},
		        {name:'academy',type:'string'},
		        {name:'professional',type:'string'}
		       ],
});
var reader = Ext.create('Ext.data.JsonReader',{
	root:'list',
	model:MyData,
});
var store = Ext.create('Ext.data.Store',{
	pageSize:8,
	model:MyData,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'searchStudentByTeacherIdAction.action',
		reader:{
			type:'json',
			root:'resultList.list',
			totalProperty:'total'
		},
	},
});
var studentForm = Ext.create('Ext.FormPanel',{
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
});
var checkBox = Ext.create('Ext.selection.CheckboxModel');
var grid = Ext.create('Ext.grid.Panel',{
	store:store,	
	columnLines:true,
	selModel:checkBox,
	disableSelection:false,
	loadMask:true,
	columns:[
	         {text:'编号',width:50,dataIndex:'id',sortable:true},
	         {text:'学号',width:200,dataIndex:'studentId',sortable:true},
	         {text:'姓名',width:150,dataIndex:'studentName',sortable:true},
	         {text:"年级",width:200,dataIndex:'grade',sortable:true},
	         {text:"班级",width:150,dataIndex:'inclass',sortable:true},
	         {text:"备注",width:150,dataIndex:'remark',sortable:true}
	         ],
	autoHeight:true,
	authWidth:true,

	title:"学生选课信息",
	loadMask:true,
	pageSize:5,
	listeners:{  
        'itemdblclick' : function(grid, rowIndex, e){
        	editStudent();
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
		
		items:[{
			width:300,
			fieldLabel:'搜索',
			labelWidth:70,
			xtype:'searchfield',
			store:store			
		},{
			xtype:'label',
			html:'<div style="font-size:12px;color:red">支持学号和姓名的模糊查询</div>'
		},'->',{
			text:'查看成绩',
			iconCls:'Applicationform',
			xtype:'button',
		},'-',{
			text:'详细信息',
			iconCls:'Applicationform',
			xtype:'button',
			handler:editStudent
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
		html:'<div style="font-size:12px;color:red">*双击可查看详细信息</div>'
	}]
});

function editStudent(){
	var selectedKeys = grid.getSelectionModel().getSelection();
	if(selectedKeys.length != 1){
		Ext.MessageBox.alert('提示','请选择一条数据');
	}else{
		var editStudent = Ext.create('Ext.Window',{
			layout:'fit',
			width:600,
			height:500,
			closeAction:'hide',
			plain:true,
			resizable : false,
			title:'学生相信信息',
			items:studentForm,
			plain:true,
			
		});
	}
	editStudent.show();
	loadUser();
	
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
