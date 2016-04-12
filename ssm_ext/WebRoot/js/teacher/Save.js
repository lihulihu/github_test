//用户添加与修改页面
mymessage = function () {
   
    var username = {
        width: 200,
        allowBlank: false,    
        xtype: 'textfield',
        id: 'teacherName',
        //maxLength: 10,
        fieldLabel: '姓名',
        blankText: '请输入姓名',
        maxLengthText: '姓名不能超过10个字符',
    };
    //政治面貌
    var cobpolitical = {
            width: 200,
            allowBlank: false,    
            xtype: 'textfield',
            id: 'political',
            //maxLength: 10,
            fieldLabel: '政治面貌',
            readOnly:true,
           // blankText: '请输入姓名',
           // maxLengthText: '姓名不能超过10个字符',
        };
    //毕业院校
    var finishschool = {
        name: 'finishschool',
        width: 200,
        allowBlank: false,
        xtype: 'textfield',
        maxLength: 10,
        id: 'finishschool',
        fieldLabel: '毕业院校',
        blankText: '请输入毕业院校',
        maxLengthText: '毕业院校不能超过30个字符',
       
    };
    //年龄
    var age = {
    		fieldLabel: '年龄',
            width: 117,
            xtype: 'numberfield',
            decimalPrecision: 0,
            minValue: 1,
            maxValue: 60,
            name: 'age',
            id:'age',
            allowBlank: false,
            blankText: '请输入年龄',  
    };
    //学院
    var academybox = {
            width: 200,
            allowBlank: false,    
            xtype: 'textfield',
            id: 'academy',
            //maxLength: 10,
            fieldLabel: '学院',
            readOnly:true,
           // blankText: '请输入姓名',
           // maxLengthText: '姓名不能超过10个字符',
        };
    
    //第一列包含4行
    var column1 = {
        columnWidth: .30,
        height:150,
        layout: 'form',
        xtype:'panel',
        border:false,
        style:'margin-left:50px;margin-top:50px',
        items: [
                    username, cobpolitical, finishschool, age, academybox
                ]
    };
    //------------第一列内容结束-------------//
    //------------第二列内容开始-------------//
    //性别
    var rdosex = {
        fieldLabel: '性别',
        id: 'sex',
        xtype: 'radiogroup',
        width: 200,
        style: 'padding-top:3px;height:17px;',
        items: [{ name: 'sex', inputValue: '0', boxLabel: '男', checked: true }, { name: 'sex', inputValue: '1', boxLabel: '女'}],
       
    };
    var teacherJob = {
            width: 200,
            allowBlank: false,    
            xtype: 'textfield',
            id: 'job',
            readOnly:true,
            //maxLength: 10,
            fieldLabel: '职称',
           // blankText: '请输入姓名',
           // maxLengthText: '姓名不能超过10个字符',
        };
    
    //email
    var email = {
        width: 200,
        xtype: 'textfield',
        allowBlank: false,
        maxLength: 30,
        id: 'email',
        fieldLabel: '邮箱',
        blankText: '请输入邮箱',
        maxLengthText: '不能超过30个字符',
        vtype: 'email'
    };
    //联系电话
    var phone = {
        width: 200,
        xtype: 'textfield',
        allowBlank: false,
        maxLength: 20,
        id: 'phone',
        fieldLabel: '联系电话',
        blankText: '请输入联系电话',
        maxLengthText: '联系电话不能超过20个字符',
      
    };
  //专业数据
    var professionalstore = {
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
            		publicCode:'professional',
            	}
            },
            fields:['valueId','valueName'],
            autoLoad: true,        
        };
        //专业下拉列表
       var professionalbox =  Ext.create('Ext.form.field.ComboBox',{
        	//extend: 'Ext.form.field.ComboBox',
        	id:'professional',
        	alias:'widget.lifechannelCombo',
            width: 200,
            fieldLabel: '专业',
            store: professionalstore,
            displayField: 'valueName',
            valueField: 'valueId',
            triggerAction: 'all',
            emptyText: '请选择...',
            blankText: '请选择专业',        
            queryMode:'local',
        });
    //第二列包含4行
    var column2 = {
        columnWidth: .30,
        xtype:'panel',
        border:false,
        layout: 'form',
        style:'margin-left:50px;margin-top:50px',
        items: [rdosex, teacherJob, email, phone, professionalbox]
    };
    //------------第二列内容结束-------------//
    //------------第三列内容开始-------------//
    /*//年龄
    var numage = {
        fieldLabel: '年龄',
        width: 117,
        xtype: 'numberfield',
        decimalPrecision: 0,
        minValue: 1,
        maxValue: 60,
        name: 'age',
        unitText: ' 岁',
        allowBlank: false,
        blankText: '请输入年龄',
      
    };
    //体重
    var numweight = {
        fieldLabel: '体重',
        xtype: 'numberfield',
        width: 100,
        decimalPrecision: 0,
        minValue: 1,
        maxValue: 300,
        name: 'weight',
        unitText: 'kg',
        allowBlank: false,
        blankText: '请输入体重',
      
    };
    //毕业日期
    var dategraduation = {
        fieldLabel: '毕业日期',
        xtype: 'datefield',
        name: 'graduationdate',
        width: 117,
        format: 'Y-m-d',
        editable: false,
        allowBlank: false,
        blankText: '请选择毕业日期',
     
    };
    //密码
    var password = {
        fieldLabel: '密码',
        inputType: 'password',
        xtype: 'textfield',
        name: 'password',
        width: 117,
        allowBlank: false,
        blankText: '请输入密码',
        maxLength: 20,
        maxLengthText: '密码不能超过20个字符!',
      
    };
    //第三列包含3行
    var column3 = {
        columnWidth: .25,
        xtype:'panel',
        border:false,
        layout: 'form',
        style:'margin-left:50px',
        items: [numage, numweight, dategraduation, password]
    };*/
    //------------第三列内容结束-------------//
    //------------第四列内容开始-------------//
    //创建相片div组件
    var imagebox = {
    	xtype:'panel',
    	width:80,
    	height:100,
    	style: 'clear:both;margin-left:37px;border:1px solid blue; margin-bottom:8px',
    	items:{
        xtype: 'box',
        id:'image',
 
        autoEl: {
            width: 80,         
           // style: '',
            tag: 'img',
            
            //id: 'user.save.photoshow.' + user.IntUserID,
           // src: (user.StrImagePath === '' || user.StrImagePath === undefined) ? nophone : user.StrImagePath
        }}
    };
 
    //上传按钮
    var uploadselect = {
        xtype: 'fileuploadfield',
        width:130,
        emptyText: '请选择上传文件',
        name: 'upload', 
        buttonConfig: { 
            text: '选择'
        },
    };
    //每4列定义
    var column4 = new Ext.FormPanel({
        columnWidth: .23,
        id:'photoFrom',
        fileUpload: true,
        enctype: 'multipart/form-data',
        border:0,
        buttonAlign: 'center',
        //layout: 'form',
        style:'margin-left:45px;margin-top:50px;',
        items: [imagebox,uploadselect,{
        	layout: 'column',
        	border:0,
        	items:[
        	       
        	       {
        	       	xtype:'button',
        	       	text:'上传',
        	        width:60,
        	       	handler: function(){ 
                        if(column4.getForm().isValid()){ 
                        	column4.getForm().submit({ 
                                url:'uploadPhotoAction.action', 
                                method:'POST', 
                                waitTitle: '请稍后', 
                                waitMsg: '正在上传文档文件 ...', 
                                success: function(fp, action){ 
                                    Ext.MessageBox.alert('信息', "上传成功");   
                                    Ext.getCmp('image').getEl().dom.src= action.result.path;                            
                                }, 
                                failure: function(fp, action){ 
                                    Ext.MessageBox.alert('警告', action.result.message);   
                                } 
                            }); 
                        } 
        	       }
        	       },{
        	    	   xtype:'button',
        	    	   text:'删除',
        	    	   width:60,
        	    	   style:'margin-left:10px',
        	    	   handler:function(){
        	    		   Ext.Ajax.request( {
        	    		    	url : "deletePhotoAction.action", 
        	    		    	params : {
        	    		    		teacherId : teacherId,
        	    		    	}, //参数
        	    		    	success : function(response, option) {
        	    		    		Ext.getCmp('image').getEl().dom.src= "";
        	    		    	},
        	    		    	failure : function(response, option) {
        	    		    		Ext.Msg.alert("失败", "系统错误");
        	    		    	}
        	    		    	});
        	    	   }
        	       }
        	       ]
        	},
        ]      
    });
  
    //创建文本上传域
    var exteditor = {
        xtype: 'htmleditor',
        name: 'other',
        fieldLabel: '个人简介',
        width: 845,
        height: 130,
        id:'synopsis',
        defaultValue:'你可以做个简单的介绍'
    };
    //表单
    var form = {
        frame: true,  
        xtype: 'form',
        iconCls: 'nodeicon',
        title: '个人信息',
       // width: 850,
        //height: 570,
        //labelWidth: 150,
        buttonAlign: 'center',
       
        items: [{
            layout: 'column',
            items: [
                        column1,
                        column2,
            	       	//column3,
                        column4
                    ]
        	},exteditor],
        buttons: [{
        	xtype : "button",
            text: '保存',
            handler: sumbit
        }, {
        	xtype : "button",
            text: '重置',
            handler: reset
        }]
    };
    Ext.Ajax.request( {
    	url : "searchTeacherAction.action", 
    	params : {
    		teacherId : teacherId,
    	}, //参数
    	success : function(response, option) {
    		var obj = Ext.decode(response.responseText);
    		Ext.getCmp("teacherName").setValue(obj.list[0].teacherName);
    		Ext.getCmp("email").setValue(obj.list[0].email);
    		Ext.getCmp("phone").setValue(obj.list[0].phone);
    		Ext.getCmp("job").setValue(obj.list[0].job.valueName);
    		obj.list[0].photo != null ? Ext.getCmp('image').getEl().dom.src= obj.list[0].photo:"";
    		Ext.getCmp('political').setValue(obj.list[0].political.valueName);
    		Ext.getCmp('synopsis').setValue(obj.list[0].synopsis);
    		Ext.getCmp('age').setValue(obj.list[0].age);
    		Ext.getCmp('finishschool').setValue(obj.list[0].finishSchool);
    		Ext.getCmp('sex').setValue({sex:obj.list[0].sex});
    		Ext.getCmp('academy').setValue(obj.list[0].academy.valueName);
    		Ext.getCmp('professional').setValue(obj.list[0].professional.valueId);
    	},
    	failure : function(response, option) {
    		Ext.Msg.alert("失败", "系统错误");
    	}
    	});
    //------------事件处理方法开始-------------//
    //提交
    function sumbit() {
    	var jsonString="{'teacherName':"+"'"+Ext.getCmp('teacherName').value+"'"
    	+",'sex':"+Ext.getCmp('sex').getChecked()[0].inputValue
    	+",'finishSchool':"+"'"+Ext.getCmp('finishschool').value+"'"
    	+",'age':"+Ext.getCmp('age').value
    	+",'email':"+"'"+Ext.getCmp('email').value+"'"
    	+",'phone':"+"'"+Ext.getCmp('phone').value+"'"
    	/*+",'job':"+"{'valueId':"+"'"+Ext.getCmp('job').value+"'}"*/
    	/*+",'political':"+"{'valueId':"+"'"+Ext.getCmp('political').value+"'}"*/
    	+",'synopsis':"+"'"+Ext.getCmp('synopsis').value+"'"
    	/*+",'academy':"+"{'valueId':"+"'"+Ext.getCmp('academy').value+"'}"*/
    	+",'professional':"+"{'valueId':"+"'"+Ext.getCmp('professional').value+"'}"
    	+"}";
    	
    	Ext.Ajax.request( {
    		url : "updateTeacherInfoAction.action", 
    		params : {
    			jsonString : jsonString,
    		}, //参数
    		success : function(response, option) {
    			Ext.Msg.alert("提示", "保存成功");
    		},
    		failure : function(response, option) {
    			Ext.Msg.alert("提示", "保存失败");
    		}
    		});
    		
    }
    //重置
    function reset() {
        this.ownerCt.ownerCt.getForm().reset();
    }

    //------------事件处理方法结束-------------//
    //返回表单
    return form;
}