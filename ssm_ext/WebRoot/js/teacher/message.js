message = function(){	
	Ext.define('messageStudentModel',{
		extend:'Ext.data.Model',

		fields:[
		        	{name:'studentId',type:'String'},
			        {name:'studentName',type:'string'}		       
			    ]
	});
	var store = Ext.create('Ext.data.Store',{
		pageSize:8,
		model:messageStudentModel,
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

	var messageWest = Ext.create('Ext.grid.Panel',{
		id:"messageWest",
		store:store,
		columnLines:true,
		disableSelection:false,
		loadMask:true,
		columns:[
		         {text:'编号',width:50,dataIndex:'studentId',sortable:true,hidden:true},
		         {text:'学生',width:200,dataIndex:'studentName',sortable:true},
		        ],
		height:390,
		width:205,
		loadMask:true,
	});
	messageWest.addListener('cellclick', cellclick);
	function cellclick(view,td,cellIndex,record, rowIndex, e) {
		 var conn = new Ext.data.Connection();  
		 var studentId = record.get('studentId');
	        // 发送异步请求  
	        conn.request({  
	            // 请求地址  
	            url: 'leaveMessageAction.action',  
	            method: 'post',  
	            params: {studentId:studentId},  
	            // 指定回调函数  
	            callback: historyMsg  
	        });
		
	};
	function historyMsg(options, success, response){
		var data = Ext.JSON.decode(response.responseText.trim());
		Ext.getCmp("history_panel").body.update(data.result); 
		moveScroll();		
	}
	var historyList = Ext.create('Ext.Panel',{
		id:'history_panel',
		title:'历史记录',
		autoScroll : true,
		height:260,
		
	});
	var messageInput = Ext.create('Ext.Panel',{
		height:100,
		width:490,
		buttonAlign:'right',
		items:[{
			id:'messageText',
			xtype:'textarea',
			height:100,
			width:480,
		}],
		buttons:[ {
			xtype : "button",
			text : "发送",
			handler: function(){  
            	messageSend();  
            }
		}],
	});
	function messageSend(){
		var selectedKeys = messageWest.getSelectionModel().getSelection();
		var studentId=selectedKeys[0].get("studentId");
		var text = Ext.getCmp('messageText').getValue();
		 

		var conn = new Ext.data.Connection();
		conn.request({  
            // 请求地址  
            url: 'submitleaveMessageAction.action',  
            method: 'post',  
            params: {studentId:studentId,
            		text:text
            }, 
            success:function(response, option){
            	var submitTime = Ext.Date.format(new Date(), 'Y-m-d g:i:s');
        		var chat_record = new Ext.Element(document.createElement('div'));
        		var msg = '<div style="margin:10px 5px 10px 5px"><img src="Image/im32x32.gif" width="20px"/>'+submitTime+' <span style="color:red">[我] </span> 说：<br> '+text+'</div>';
        		chat_record.update(msg);  
        		Ext.getCmp("history_panel").body.appendChild(chat_record);
        		Ext.getCmp('messageText').reset();
        		moveScroll();
            },
            failure : function(response, option) {
        		Ext.Msg.alert("发送失败", "系统错误");
        	}
            // 指定回调函数  
           // callback: historyMsg  
        });
	};
	function moveScroll(){
		var d = Ext.getCmp('history_panel').body.dom;
		d.scrollTop = d.scrollHeight - d.offsetHeight;		
	}
	var messageCenter = Ext.create('Ext.Panel',{
		height:390,
		width:490,
		 frame: true,
		   // html: "<div class='footer'></div>",
		// region: 'center',
		 //collapsible: true,
		 
		 items:[historyList,messageInput]
		      
	});
	
	var messagePanel = Ext.create('Ext.Panel',{
		enableTabScroll: true,
		width:700,
		height:400,
		x:100,
		layout: 'column',
       // layout: 'border',
        items: [messageWest, messageCenter]
	});
	return messagePanel;
};
