NewRecord = function(){
	var recordPanel = Ext.create('Ext.Panel',{
			id:'record',
		 	frame: true,		 
		 	bodyStyle: {
                background: 'white',
                padding: '20px'
            },
		 	layout: {
                type: 'table',
                columns: 6,
                tableAttrs: {
                    border: 1,
                    cellpadding: 5,
                    cellspacing: 1,
                    width: 660,
                    align: 'center',
                    style: "border:1px solid black;border-collapse:collapse;margin:0 auto;text-align:center;"
                },
                tdAttrs: {
                    width: '90px',
                    //height: '40px',
                    //style: "padding:5px",
                    valign: 'middle',
                    align: 'center',
                }
            },
            defaults: {
                // applied to each contained panel
                xtype: 'label'
            },
            items: [{
            	colspan: 6,
            	text:'指导记录表',
            	style:"font-size:30px",
            	
            },{
            	
                text: '指导人'
            }, {
                id:'recordteacherName',
                xtype: 'textfield',
                //fieldCls: 'textfieldBorder',
                readOnly:true,
                width:130
            },{
            	
                text: '学院'
            }, {
                id:'recordacadmy',
                xtype: 'textfield',
                //fieldCls: 'textfieldBorder',
                readOnly:true,
                width:130
            },{
            	
                text: '专业'
            }, {
                id:'recordprofessional',
                xtype: 'textfield',
                //fieldCls: 'textfieldBorder',
                readOnly:true,
                width:130
            },, {
                text: '指导时间',
            },
        {
            id:'recordguideTime',
            xtype: 'datefield',
           // fieldCls: 'textfieldBorder',
            width:130,
            format: 'Y-m-d',
            editable: false,
            allowBlank: false,
            blankText: '请选择指导日期',
        }
        , {
            text: '指导形式'
        },
            {
        	 id:'recordguideType',
        	 xtype: 'textfield',
            // fieldCls: 'textfieldBorder',
             width:130
            },
            {
                text: '参加人数',
            },
            {
            	id:'recordstudentNumber', 
            	xtype: 'textfield',
                // fieldCls: 'textfieldBorder',
                 width:130
            },{
            	colspan: 1,
            	text:'指导课题',
            	
            },
            {
            	id:'recordguideTitle',
            	colspan: 5,
            	xtype:'textfield',
            	width:460,
        		
        		//fieldCls: 'textfieldBorder',           	
            },
            {
            	colspan: 1,
            	text:'指导内容',
            	
            },{
            	id:'recordguideText',
            	colspan: 5,
            	xtype:'htmleditor',
            	width:500,
        		height:200,
        		//fieldCls: 'textfieldBorder',           	
            },{
            	colspan: 1,
            	text:'指导总结',
            	
            },{
            	id:'recordguideSummary',
            	colspan: 5,
            	xtype:'htmleditor',
            	width:500,
        		height:200,
        		//fieldCls: 'textfieldBorder',
            },{
            	colspan: 1,
            	text:'指导人签名：',
            },{
            	colspan: 1,
            },{
            	colspan: 1,
            	text:'学生签名：',
            },{
            	colspan: 3,
            }],
            buttons:[{
           	 text:'保存',
             handler: sumbit,
            },{
                 text:'打印预览',
                 handler: prn1_preview,
                
            }],
            buttonAlign : "center",
            
	});
	 Ext.Ajax.request( {
	    	url : "searchTeacherAction.action", 
	    	params : {
	    		teacherId : teacherId,
	    	}, //参数
	    	success : function(response, option) {
	    		var obj = Ext.decode(response.responseText);
	    		Ext.getCmp("recordteacherName").setValue(obj.list[0].teacherName);
	    		Ext.getCmp('recordacadmy').setValue(obj.list[0].academy.valueName);
	    		Ext.getCmp('recordprofessional').setValue(obj.list[0].professional.valueName);
	    	},
	    	failure : function(response, option) {
	    		Ext.Msg.alert("失败", "系统错误");
	    	}
	    	});
	function prn1_preview() { 
	    CreateOneFormPage(); 
	    //LODOP.SET_PREVIEW_WINDOW(1,1,1,);
	    LODOP.PREVIEW(); 
	    //LODOP.RRINT_SETUP();
	  };
	function CreateOneFormPage()
	  {
	   LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
	   LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
	  // LODOP.SET_PRINT_STYLE("FontSize",15);
	  // LODOP.SET_PRINT_STYLE("Bold",1);
	   
	  // LODOP.ADD_PRINT_HTM(0,0,660,900,document.getElementById("record").innerHTML);
	   var teacherName = Ext.getCmp('recordteacherName').value;
	   var acadmy = Ext.getCmp('recordacadmy').value;
	   var professional = Ext.getCmp('recordprofessional').value;
	   var guideTime = Ext.Date.format(new Date(Ext.getCmp('recordguideTime').getValue()),'Y-m-d'); 
	   var guideType = Ext.getCmp('recordguideType').value;
	   var studentNumber = Ext.getCmp('recordstudentNumber').value;
	   var guideTitle = Ext.getCmp('recordguideTitle').value;
	   var guideText = Ext.getCmp('recordguideText').value;
	   var guideSummary = Ext.getCmp('recordguideSummary').value; 
	   LODOP.ADD_PRINT_HTM(50,100,660,900,
			   "<table width='90%' border='1' cellpadding='0' cellspacing='0' algin='center'>" +
			   "<tr><td colspan='6' align='center'><h2>导师指导记录表<h2></td></tr>"+
			   "<tr><td width='14%' height='40'>指导人：</td><td width='20%'>"+teacherName+"</td>" +
			   		"<td width='13%'>学院:</td><td width='20%'>"+acadmy+"</td>" +
			   		"<td width='13%'>专业:</td><td>"+professional+"</td>" +
			   "</tr>" +
			   "<tr><td width='14%' height='40'>指导时间：</td><td width='20%'>"+guideTime+"</td>" +
			   		"<td width='13%'>指导形式:</td><td width='20%'>"+guideType+"</td>" +
			   		"<td width='13%'>参考人数:</td><td>"+studentNumber+"</td>" +
			   "</tr>" +
			   "<tr><td width='14%' height='50'>指导课题：</td><td colspan='5'>"+guideTitle+"</td></tr>" +
			   "<tr><td width='14%' height='250'>指导内容：</td><td colspan='5'>"+guideText+"</td></tr>" +
	   		   "<tr><td width:'14%' height='250'>指导总结：</td><td colspan='5'>"+guideSummary+"</td></tr>+" +
	   		   "<tr><td width:'14%' height='40'>导师签字：</td><td></td><td width:'14%'>学生签字：</td><td colspan='3'></td></tr></table>");
	   		   
	 
	  };
	  
	  function sumbit() {
	    	var jsonString="{'teacherName':"+"'"+Ext.getCmp('recordteacherName').value+"'"
	    	+",'acadmy':"+"'"+Ext.getCmp('recordacadmy').value+"'"
	    	+",'professional':"+"'"+Ext.getCmp('recordprofessional').value+"'"
	    	+",'guideTime':"+"'"+Ext.Date.format(new Date(Ext.getCmp('recordguideTime').getValue()),'Y-m-d')+"'"
	    	+",'guideType':"+"'"+Ext.getCmp('recordguideType').value+"'"
	    	+",'studentNumber':"+"'"+Ext.getCmp('recordstudentNumber').value+"'"
	    	+",'guideTitle':"+"'"+Ext.getCmp('recordguideTitle').value+"'"
	    	+",'guideText':"+"'"+Ext.getCmp('recordguideText').value+"'"
	    	+",'guideSummary':"+"'"+Ext.getCmp('recordguideSummary').value+"'"
	    	+"}";
	    	
	    	Ext.Ajax.request( {
	    		url : "addGuideRecodeAction.action", 
	    		params : {
	    			AddJson : jsonString,
	    		}, //参数
	    		success : function(response, option) {
	    			Ext.Msg.alert("提示", "保存成功");
	    		},
	    		failure : function(response, option) {
	    			Ext.Msg.alert("提示", "保存失败");
	    		}
	    		});
	    		
	    }
	return recordPanel;
};

