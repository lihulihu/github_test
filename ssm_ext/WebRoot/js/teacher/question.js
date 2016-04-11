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

Ext.define('questionModel',{
	extend:'Ext.data.Model',

	fields:[
	        	{name:'questionId',type:'String'},
		        {name:'questionName',type:'string'},
		        {name:'answer',type:'string'},
		        {name:'questionDate',type:'string'},
		        {name:'answerDate',type:'string'},
		        {name:'answerStatus',type:'string',convert:function(val){
		        	if(val=="0")
		        	{
		        		return"未回答";
		        		};
		        	if(val=="1"){
		        		return "已回答";
		        		};
		        	}}
		       ]
});
var questionreader = Ext.create('Ext.data.JsonReader',{
	root:'items',
	model:questionModel,
});
var questionForm = Ext.create('Ext.FormPanel',{
	frame:true,
	waitMsgTarget:true,
	title:'信息',
	defaultType:'textfield',
	reader:questionreader,
	items:[{
		fieldLabel:'编号',
		xtype:'textfield',
		name:'questionId',
		id:'questionId',
		hidden:true
	},{
		xtype:'textarea',
		width:400,
		height:100,
		fieldLabel:'问题',
		name:'questionName',
		readOnly:true,
	},{
		xtype: 'textarea',
        name: 'answer',
        fieldLabel: '回答内容',
        width: 600,
        height: 200,
        id:'answer'
	}]
});
questionList = function(){	
	

var questionstore = Ext.create('Ext.data.Store',{
	pageSize:8,
	model:questionModel,
	autoLoad:true,
	proxy:{
		type:'ajax',
		url:'Question_Action.action',
		reader:{
			type:'json',
			root:'items',
			totalProperty:'total'
		},
	},
});

var questiongrid = Ext.create('Ext.grid.Panel',{
	store:questionstore,	
	columnLines:true,
	disableSelection:false,
	loadMask:true,
	columns:[
	         new Ext.grid.RowNumberer(),
	         {text:'编号',width:50,dataIndex:'questionId',sortable:true,hidden:true},
	         {text:'留言信息',width:200,dataIndex:'questionName',sortable:true},
	         {text:"留言时间",width:200,dataIndex:'questionDate',sortable:true, renderer : function(_registerDate){
	             return _registerDate.replace("T"," ").substring(0,16);
	         }},
	         {text:'回答',width:150,dataIndex:'answer',sortable:true},        
	         {text:"回答时间",width:150,dataIndex:'answerDate',sortable:true, renderer : function(_registerDate){
	             return _registerDate.replace("T"," ").substring(0,16);
	         }},
	         {text:"状态",width:150,dataIndex:'answerStatus',sortable:true}
	         ],
	autoHeight:true,
	authWidth:true,

	title:"疑问解答",
	loadMask:true,
	/*viewConfig:{
		id:'gv',
		trackOver:false,
		stripeRows:false,
	},*/
	dockedItems:[{
		dock:'top',
		xtype:'toolbar',		
		items:['->',{
			text:'查看详细',
			iconCls:'Applicationform',
			xtype:'button',
			handler:lookquestion
		}]		
	},
	{
		dock:'bottom',
		xtype:'pagingtoolbar',	
		store:questionstore,
		displayInfo:true,
		displayMsg:'显示{0}-{1}条，共计{2}条',
		emptyMsg:"没有数据",
	}]
});
//questionstore.loadPage(1);

function lookquestion(){
	var selectedKeys = questiongrid.getSelectionModel().getSelection();
	if(selectedKeys.length != 1){
		Ext.MessageBox.alert('提示','请选择一条数据');
	}else{
		var lookquestion = Ext.create('Ext.Window',{
			layout:'fit',
			width:700,
			height:400,
			closeAction:'hide',
			plain:true,
			title:'详细信息',
			items:questionForm,
			plain:true,
			buttons:[{
				text:'取消',
				handler:function(){
					questionForm.form.reset();
					lookquestion.hide();
				}
			}]
		});
	}
	questionForm.form.findField('answer').setReadOnly(true);
	lookquestion.show();
	loadUser();
};

function loadUser(){
	var selectedKeys = questiongrid.getSelectionModel().getSelection();
	var questionId=selectedKeys[0].get("questionId");
	questionForm.form.load({					
		waitMsg : '正在加载数据请稍后',						
		url : 'Question_Action',			
		params:{questionId:questionId},				
		method:'POST',//请求方式  
		failure : function(response, option) {
			Ext.Msg.alert("提示", "获取数据失败");
		}
});
};
return questiongrid;
};
