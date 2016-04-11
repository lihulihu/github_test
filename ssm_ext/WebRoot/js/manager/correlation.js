var correlation = function (data) {
	//年级数据
	var gradeStore = {
	        xtype: 'Ext.data.Store',
	        singleton : true,
	        proxy:{ 
	        	type:'ajax',
	        	url: 'publicDictAction.action' ,      
	        	reader: { 
	        		type: 'json', 
	        		root: 'list' 
	        	},
	        	extraParams:{
	        		publicCode:'grade',
	        	}
	        },
	        fields:['valueId','valueName'],
	        autoLoad: true,
	        listeners: {//为了编辑时设定初始值Ext.getCmp("fwz").setValue(2);  
                load: function(store,records) {  
                    Ext.getCmp('studentGrade').setValue(records[0].get('valueId'));  
                }  
            }  
	    };
	var gradeBox =  Ext.create('Ext.form.field.ComboBox',{
    	//extend: 'Ext.form.field.ComboBox',
    	id:'studentGrade',
    	alias:'widget.lifechannelCombo',
        width: 200,
        fieldLabel: '请选择年级',
        store: gradeStore,
        displayField: 'valueName',
        valueField: 'valueId',
        triggerAction: 'all',
        emptyText: '请选择...',
        blankText: '请选择年级',        
        queryMode:'local',
        listeners:{
        	select:function(combo,records,eopts){
        		var teacherId = leftStore.proxy.extraParams.teacherId;
        		if(teacherId != null){
        			leftStore.proxy.extraParams.grade=Ext.getCmp('studentGrade').value;
        			leftStore.proxy.extraParams.query=Ext.getCmp('userName').value;
        			leftStore.load({ 
    	    			callback: function(store,records, options ,success){ 
    	    				addUsersWin.getForm().findField('itemselector-field').store=leftStore.first().list();
    	    				addUsersWin.getForm().findField('itemselector-field').setValue(leftStore.first().get('isSelect'));
    	    			} 
    	    				});
        		}
        		//Ext.Msg.alert(records[0].get('valueId'));
        }}
    });
	
	
	Ext.define('ctreemodel', {  
	    extend: 'Ext.data.Model',  
	    fields: ['id','text','leaf','iconCls','parent']  
	});
	
	Ext.define('MyData',{
		extend: 'Ext.data.Model',
		fields: ['isSelect'],
		hasMany: {model: 'Order', name: 'list'},
	});
	Ext.define('Order',{
		extend: 'Ext.data.Model',
		fields: ['studentId','studentName'],
		belongsTo: 'MyData'
	});
	
	var leftStore = Ext.create('Ext.data.Store',{ 
	 	//fields: ['studentId','studentName'],
		model:MyData,
		//autoLoad:true,
		
		proxy:{
			type:'ajax',
			url:'searchStudentIsNotSelectAction.action',
			reader:{
				type:'json',
				root:'result',
			},
			extraParams:{
        		//teacherId:'',
        	}
		},
		
	});
	 var buildTree = function(el) {
		 var id = el.valueId;
         return Ext.create('Ext.tree.Panel', {  
                     rootVisible : false,  
                     border : false,  
                     store : Ext.create('Ext.data.TreeStore', {  
                    	 model: 'ctreemodel',
                    	 proxy:{    
                    	        type:'ajax',   
                    	        url:'teacherTreeAction.action', //请求  
                    	        reader:{    
                    	            type:'json',    
                    	            root:'nodeList' //数据  
                    	        },  
                    	        extraParams:{    
                    	            tid:id  //节点参数  
                    	        }  
                    	    },
                     }),
                    listeners : {  
                    	    	itemclick : function(view, record, item,  
                                        index, e){  
                    	    		 var id = record.get('id'); 
                    	    		leftStore.proxy.extraParams.teacherId = id;
                    	    		leftStore.proxy.extraParams.query = '';
                    	    		leftStore.proxy.extraParams.grade=Ext.getCmp('studentGrade').value;
                    	    		leftStore.load({ 
                    	    			callback: function(store,records, options ,success){ 
                    	    				addUsersWin.getForm().findField('itemselector-field').store=leftStore.first().list();
                    	    				addUsersWin.getForm().findField('itemselector-field').setValue(leftStore.first().get('isSelect'));
                    	    			} 
                    	    				});
                                }  
                             }, 
                             scope : this,
                 });  
     };
     
            addUsersWin = new Ext.form.FormPanel({
                title:"学生导师关联",
                width:780,
                height:500,
                buttonAlign:'center',
                margin:'0 0 0 100',
                modal:true,
                items:[
                    {
                        xtype:'form',
                        plain:true,
                       // labelWidth:50,
                        //baseCls:"x-plain",
                        bodyStyle:"padding:8px",
                        labelAlign:'right',
                        frame: true,
                        items: [{
                        	layout:'column',
                            height:30,
                            border :false,
                            items:[gradeBox]
                        },{
                            layout:'column',
                            height:30,
                            border :false,
                            bodyCssClass  : "queryForm",
                            defaults : {
                                layout : 'form',
                                border :false,
                                bodyCssClass: "queryForm",
                                defaults : {
                                    anchor : '95%',
                                    xtype : "textfield"
                                }
                            },
                            items:[
                                {
                                    columnWidth:0.7,
                                    //layout: 'form',
                                    items: [{
                                        xtype:'textfield',
                                        name: "filter['name']",
                                        id:'userName',
                                        fieldLabel: '学生姓名或学号'
                                    }]
                                },
                                {
                                    columnWidth:0.08,
                                    //layout: 'form',
                                    items: [
                                        {
                                            xtype:'button',
                                            text: '查询',
                                            iconCls: 'findItem',
                                            handler: function(){
                                                var un= Ext.getCmp('userName').value;
                                               
                                               // if(un == null || un ==""){
                                                //	Ext.Msg.alert("提示","学生姓名或学号不能为空");
                                                	var id = leftStore.proxy.extraParams.teacherId;
                                                    if(id == null){
                                                    	Ext.Msg.alert("提示","请先选择一名导师");
                                                    }
                                                //}
                                                else{
                                                leftStore.proxy.extraParams.grade=Ext.getCmp('studentGrade').value;
                                                leftStore.proxy.extraParams.query = un;
                                                leftStore.load({ 
                                	    			callback: function(store,records, options ,success){ 
                                	    				addUsersWin.getForm().findField('itemselector-field').store=leftStore.first().list();
                                	    				addUsersWin.getForm().findField('itemselector-field').setValue(leftStore.first().get('isSelect'));
                                	    			} 
                                	    				});
                                                }
                                            }
                                        }
                                    ]
                                },{
                                	xtype:'label',
                                	html:"<span style='color:red'>*用于可选学生<br></span>",
                                }
                            ]
                        },{
                        	xtype:'label',
                        	html:"<img src='Image/fam/confirm.png' width='15px'><span style='color:red'>提示：每配置完一名导师后记得保存<br></span>",
                        },{
                            layout:'column',
                            height:300,
                            items:[
                                {
                                    columnWidth:0.3,
                                    layout: 'form',
                                    items: [
                                    	new Ext.create('Ext.panel.Panel', {
                                    	//xtype:'Ext.panel.Panel',
                                    	id:'teacherleftPanel',
                                    	region : 'west',  
                                        title : '导师列表',  
                                        width : 230, 
                                        height:300,
                                        layout : 'accordion',  
                                        collapsible : true,
                                        autoScroll : true,
                                        rootVisible : true,
                                        })
                                    	]
                                },
                             
                                {
                                    columnWidth:0.7,
                                    layout: 'form',
                                   // height:300,
                                    items: [{
                                            xtype: 'itemselector',
                                            name: 'itemselector',
                                            id: 'itemselector-field',
                                            anchor: '100%',
                                            imagePath: '../ux/images/',
                                            height:300,
                                            displayField:'studentName',
                                            valueField:'studentId',
                                            store:leftStore,
                                            
                                            //value: ['1','ten'],
                                            //toStore:rightStore,
                                           // tpl: '<ul><tpl for="."><li role="option" class="<class>">{studentId}[{studentName}]</li></tpl></ul>',
                                            allowBlank: false,
                                            msgTarget: 'side',
                                            fromTitle: '可选学生',
                                            toTitle: '已选学生',
                                            buttons:["add","remove"],
                                            hideLabel:false,
                                            autoScroll:true,
                                            //fieldLabel:"数据",
                                            buttonsText:{
                                            	add:"添加>",
                                            	remove:"移除<",
                                            }
                                    }
                                     
                                    ]
                                }
                            ]
                        }
                        ]
                    }
                ],
                buttons:[
                    {
                        text:'保存',
                        handler:function () {
                        	var fromPanel = addUsersWin.getForm();
                        	var teacherId = leftStore.proxy.extraParams.teacherId;
                        	fromPanel.submit({
                        		 url : 'saveTeacherRelStudentAction.action',	
                                 params:{
                                	 teacherId:teacherId,
                                	 },
                                 waitMsg:'正在处理中...',
                                 failure:function (form, action) {
                                     Ext.Msg.alert('错误消息', "修改失败,请联系技术人员!");
                                 },
                                 success:function (form, action) {
                                         Ext.MessageBox.alert('消息提示', '添加成功!');
                                      
                                 }
                             });
                        }
                    }
                ]
            });
            Ext.Ajax.request({  
                url : 'publicDictAction.action',
                params : {
                	publicCode:'teacher job',
            	}, //参数
                success : function(response) {  
                    var json = Ext.JSON.decode(response.responseText); 
                    Ext.each(json.list, function(el) {  
                                var panel = Ext.create(  
                                        'Ext.panel.Panel', {  
                                            id : el.valueId,  
                                            title : el.valueName,  
                                            layout : 'fit'  
                                        });  
                                panel.add(buildTree(el));  
                                Ext.getCmp('teacherleftPanel').add(panel);  
                            });  
                },  
                failure : function(request) {  
                    Ext.MessageBox.show({  
                                title : '操作提示',  
                                msg : "连接服务器失败",  
                                buttons : Ext.MessageBox.OK,  
                                icon : Ext.MessageBox.ERROR  
                            });  
                },  
                method : 'post'  
            });
            return addUsersWin;
        }