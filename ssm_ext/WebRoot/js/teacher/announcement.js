annoumcement = function(){
	
	Ext.define('announcementData',{
		extend:'Ext.data.Model',
		fields:[
		        	{name:'id',type:'string'},
			        {name:'title',type:'string'},
			        {name:'text',type:'string'},
			        {name:'abstracts',type:'string'},
			        {name:'inputDate',type:'string'},
			       ]
	});
	
	var announcementstore = Ext.create('Ext.data.Store',{
		pageSize:5,
		model:announcementData,
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
	var announcementgrid = Ext.create('Ext.grid.Panel',{
		store:announcementstore,	
		columnLines:false,
		disableSelection:false,
		loadMask:true,
		border:0,
		//autoHeight:true,
		//height:400,
		anchor:'100% 100%',
		columns:[
		         new Ext.grid.RowNumberer(),
		         {text:'编号',width:40,dataIndex:'id',sortable:true,hidden:true},
		         {text:'标题',width:165,dataIndex:'title',sortable:false,},
		         {text:'内容',width:150,dataIndex:'text',sortable:false,hidden:true},
		         {text:'摘要',width:150,dataIndex:'abstracts',sortable:false,hidden:true},
		         {text:'日期',width:150,dataIndex:'inputDate',sortable:false,hidden:true},
		         ],
		//autoWidth:true,
		loadMask:true,
		dockedItems:{
			dock:'bottom',
			xtype:'pagingtoolbar',	
			store:announcementstore,
			displayInfo:true,
			beforePageText:'',
			afterPageText:'',
			displayMsg:'',
			//emptyMsg:"没有数据",
		},
		
		listeners:
        {
            'cellclick': function(view,td,cellIndex,record, rowIndex, e)     //单击击事件
            {
            	var tab = center.queryById('111');
 		        if (!tab) {
 		        	var tab = center.add({
 		        		id: '111',
 		        		iconCls: 'Bookopen',       
 		        		xtype: "panel",
 		        		title: '信息公告<span style=display:none></span>',
 		        		closable: true,
 		        		//maskDiabled: true,
 		        		frame: true,
 		        		autoScroll : true,
 		        		//baseCls:'allBackImage',
 		        		/*bodyStyle: 'background:white; padding:10px;',*/
 		        		/*items:{
 		        			xtype:'panel',
 		        			id:'gonggao',
 		        			//html:'dfdfgdgdg',
 		        			title:'公告信息展示',
 		        			padding:'10,10,10,10',	
 		        			//anchor:'100% 100%',
 		        			autoScroll : true,
 		        	        frame: true,
 		        	        maskDiabled: true,
 		        			//height:400,
 		        		},*/
 		        	});
 		        }
 		        Ext.getCmp('111').update('<div style="width:90%;padding-left:80px"><h2 style="text-align:center">'+record.get("title")+'</h2>'+
 		        		'<h4 style="text-align:center">摘要：'+record.get("abstracts")+'</h4>'+
 		        		'<div style="font-size:15px;text-indent:2em">'+record.get("text")+'</div>'+
 		        		'<div style="font-size:15px;text-align:right"><br><br>发布日期:&nbsp;&nbsp;'+record.get("inputDate").substring(0,10)+'</div></div>');
            	center.setActiveTab('111');
            }
        }
	});
	//announcementstore.loadPage(1);
	return announcementgrid;
};
