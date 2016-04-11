var autoCorrelation = function(){
	var numberLoad = function(){
		Ext.Ajax.request({  
	        url : 'selectNumberAction.action',
	        params : {
	        	grade:Ext.getCmp('autoStudentGrade').value,
	    	}, //参数
	        success : function(response) {  
	            var json = Ext.JSON.decode(response.responseText); 
	            Ext.getCmp('isNotCorrelationNum').setValue(json.studentSize);
	            Ext.getCmp('autoTeacherNum').setValue(json.teacherSize);
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
		};
	var autoGradeStore = {
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
                    Ext.getCmp('autoStudentGrade').setValue(records[0].get('valueId'));
                    numberLoad();
                },
            }
	    };
	var autogradeBox =  Ext.create('Ext.form.field.ComboBox',{
		id:'autoStudentGrade',
    	alias:'widget.lifechannelCombo',
        width: 200,
        fieldLabel: '请选择年级',
        store: autoGradeStore,
        displayField: 'valueName',
        valueField: 'valueId',
        triggerAction: 'all',
        emptyText: '请选择...',
        blankText: '请选择年级',        
        queryMode:'local',
        listeners:{
        	 select:function(){
             	numberLoad();
             }
        }
	});
	var autoPanel =  new Ext.form.FormPanel({
		title:"学生导师自动关联",
        width:580,
        height:380,
        buttonAlign:'center',
        margin:'0 0 0 200',
        modal:true,
        bodyStyle : "padding-left:120px;padding-top:25px;padding-right:120px;",
        layout : "form",
        items:[
               {
            	  xtype:'label',
            	  html:"<span style='color:red;font-size:11'>快速分配是将所有未分配的学生平均分配给所有老师，如果最后人数不够进行平均分配时，将不能在进行快速分配，需要使用手动分配</span><br><br>",
               },
        	autogradeBox,
        	{
            	 xtype:'displayfield',  
      	         fieldLabel:'未分配学生共有', 
      	         id:'isNotCorrelationNum',
      	         name:'isNotCorrelationNum',  
      	        // value:'34'
        	},
        	{
        		xtype:'displayfield',  
   	           fieldLabel:'导师共有', 
   	           id:'autoTeacherNum',
   	           name:'autoTeacherNum',  
   	          // value:'10'
        	},{
        	   xtype:'numberfield',  
  	           fieldLabel:'平均分配人数', 
  	           id:'autoCorrelationNum',
  	           name:'autoCorrelationNum',  
  	           allowBlank:false, 
  	           allowDecimals:false,
  	           blankText:'不能为空',
  	           minValue: 1,
  	           listeners:{
  	        	   blur:function(v){
  	        		   if(v.value !=0 && v.value != null){
  	        		   var teacher = Ext.getCmp('autoTeacherNum').value; 
  	        		   var student = Ext.getCmp('isNotCorrelationNum').value;
  	        		   var sy = student-teacher*v.value;
  	        		   if(sy<0){
  	        			 document.getElementById("correlationResult").innerHTML="<br>输入数据过大，不能进行分配,请尝试减小输入数据，如果不能平均分配，可以使用手动分配";
  	        			 Ext.getCmp('autoCorrelationButton').disable();
  	        		   }
  	        		   else{
  	        			 document.getElementById("correlationResult").innerHTML="<br>将分配"+teacher*v.value+"人，分配后将剩余"+sy+"人未分配";
  	        			 Ext.getCmp('autoCorrelationButton').enable();
  	        		   }}
  	        	   }
  	           }
        	},{
          	  xtype:'label',
        	  html:"<span style='color:red;font-size:11' id='correlationResult'></span><br><br>",
           },
        ],
        buttons : [ 
		{
			xtype : "button",
			text : "确定",
			id:'autoCorrelationButton',
			disabled:true,
			handler : function() {
				Ext.Ajax.request({  
			        url : 'autoCorrelationAction.action',
			        params : {
			        	grade:Ext.getCmp('autoStudentGrade').value,
			        	number:Ext.getCmp('autoCorrelationNum').value
			    	}, //参数
			        success : function(response) {  
			            var json = Ext.JSON.decode(response.responseText); 
			            Ext.getCmp('isNotCorrelationNum').setValue(json.studentSize);
			            Ext.getCmp('autoTeacherNum').setValue(json.teacherSize);
			            Ext.getCmp('autoCorrelationNum').reset();
			            document.getElementById("correlationResult").innerHTML="";
			            Ext.getCmp('autoCorrelationButton').disable();
			            Ext.Msg.alert("提示","分配成功");
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
		}
		}],
	buttonAlign : "center"
	});
	
	return autoPanel;
};