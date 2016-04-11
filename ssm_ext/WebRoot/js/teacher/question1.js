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
yiquestionList = function(){
	
	var yiquestionstore = Ext.create('Ext.data.Store',{
		pageSize:8,
		model:	questionModel,		       
		autoLoad:true,
		proxy:{
			type:'ajax',
			url:'Question1_Action.action',
			reader:{
				type:'json',
				root:'items',
				totalProperty:'total'
			},
		},
	});
	var questiongrid1 = Ext.create('Ext.grid.Panel',{
		store:yiquestionstore,	
		columnLines:true,
		disableSelection:false,
		loadMask:true,
		columns:[
		         new Ext.grid.RowNumberer(),
		         {text:'编号',width:50,dataIndex:'questionId',sortable:true,hidden:true},
		         {text:'问题',width:200,dataIndex:'questionName',sortable:true},
		         {text:"提问时间",width:200,dataIndex:'questionDate',sortable:true,renderer : function(_registerDate){
		             return _registerDate.replace("T"," ").substring(0,16);
		         }},
		         {text:'回答',width:150,dataIndex:'answer',sortable:true},
		         {text:"回答时间",width:150,dataIndex:'answerDate',sortable:true,renderer : function(_registerDate){
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
				text:'回答',
				iconCls:'Applicationform',
				xtype:'button',
				handler:lookquestion1
			}]		
		},
		{
			dock:'bottom',
			xtype:'pagingtoolbar',	
			store:yiquestionstore,
			displayInfo:true,
			displayMsg:'显示{0}-{1}条，共计{2}条',
			emptyMsg:"没有数据",
		}]
	});
	//questionstore1.loadPage(1);
	function lookquestion1(){
		var selectedKeys = questiongrid1.getSelectionModel().getSelection();
		if(selectedKeys.length != 1){
			Ext.MessageBox.alert('提示','请选择一条数据');
		}else{
			var lookquestion1 = Ext.create('Ext.Window',{
				layout:'fit',
				width:700,
				height:400,
				closeAction:'hide',
				plain:true,
				title:'详细信息',
				items:questionForm,
				plain:true,
				buttons:[{
					text:'保存',
					handler:function(){
						questionSubmit();
						lookquestion1.hide();
					}
				},{
					text:'取消',
					handler:function(){
						questionForm.form.reset();					
					}
				}]
			});
		}
		lookquestion1.show();
		loadUser1();
	};
    function questionSubmit(){
    	var questionId = Ext.getCmp("questionId").getValue();
    	var answerText = Ext.getCmp("answer").getValue();
    	if(answerText == ""){
    		Ext.Msg.alert("警告", "你还没有回答");
			return;
    	}
    	Ext.Ajax.request( {
    		url : "submitQuestion_Action", //登录处理页面
    		params : {
    			answerText : answerText,
    			questionId:questionId,
    		}, //参数
    		success : function(response, option) {
    			var obj = Ext.decode(response.responseText);
    			if (obj.success == true) {  				
    				Ext.Msg.alert("提示", "保存成功");
    				questiongrid1.getStore().reload();
    				//questiongrid.getStore().reload();
    			} else {
    				Ext.Msg.alert("提示", "保存失败");
    			}
    		},
    		failure : function(response, option) {
    			Ext.Msg.alert("提示", "系统错误");
    		}
    		});

    }
	function loadUser1(){
		var selectedKeys = questiongrid1.getSelectionModel().getSelection();
		var questionId=selectedKeys[0].get("questionId");
		questionForm.form.load({					
			waitMsg : '正在加载数据请稍后',						
			url : 'Question1_Action',			
			params:{questionId:questionId},				
			method:'POST',//请求方式  
			failure : function(response, option) {
				Ext.Msg.alert("提示", "获取数据失败");
			}
	});
	};
	return questiongrid1;
};