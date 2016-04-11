<%@page import="com.daz.teacher.teacherInfo.pojo.teacher"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%  
String path = request.getContextPath();  
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
%> 
<%@ page import="com.opensymphony.xwork2.ActionContext"%>                                                                                                   

<head>
    <title>导师制学生成长系统</title>
    <link rel="stylesheet" type="text/css" href="Ext/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="Ext/css/icon.css" />
    <script type="text/javascript" src="Ext/ext-all.js"></script>
    <script type="text/javascript" src="Ext/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="Ext/ux/form/SearchField.js"></script> 
    <script type="text/javascript" src="Ext/ux/TabCloseMenu.js"></script> 
    <script type="text/javascript" src="js/teacher/Save.js"></script>
    <script type="text/javascript" src="js/teacher/announcement.js"></script>
    <script type="text/javascript" src="js/teacher/list.js"></script>
    <script type="text/javascript" src="js/teacher/Menu.js"></script>
    <script type="text/javascript" src="js/teacher/message.js"></script>
    <script type="text/javascript" src="js/teacher/uploadFile.js"></script>
    <script type="text/javascript" src="js/teacher/NewRecord.js"></script>
    <script type="text/javascript" src="js/teacher/Main.js"></script>
    <script type="text/javascript" src="js/teacher/changepassword.js"></script>
   	<script type="text/javascript" src="<%=path%>/dwr/engine.js"></script>
	<script type="text/javascript" src="<%=path%>/dwr/util.js"></script>
	<script type="text/javascript" src="<%=path%>/dwr/interface/teacherPush.js"></script>
    <link rel="stylesheet" type="text/css" href="css/Main.css" />
    <script language="javascript" src="lodop/LodopFuncs.js"></script>
	<object  id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> 
       <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0></embed>
	</object>
    <style type="text/css">
        .x-grid-row td{   
  			height:30px;
  			line-height:30px;
		}
    </style>
    <script type="text/javascript">  
		function on(){			
			dwr.engine.setActiveReverseAjax(true); 			  
    		dwr.engine.setNotifyServerOnPageUnload(true);  
   			var userId = '${userInfo.teacherId}';
            teacherPush.onPageLoad(userId);  
		}
         //接收推送信息  
         function showMessage(autoMessage){ 
         		 
               document.getElementById("d2").innerHTML=autoMessage; 
                
        } 
     /*    推送消息  */
        function send(){
        	teacherPush.sendMessageAuto("1","你好");
        }
  </script>
</head>
<body onload="on()">
<%  
        teacher user = (teacher)ActionContext.getContext().getSession().get("userInfo");  
        java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = "你是第一次登录";
        if(user.getLastTime() != null) {
        	dateString = format1.format(user.getLastTime());
        	} 
        %>
<script>
	 var teacherId='<%=user.getTeacherId()%>';
	 var name=  '<%=user.getTeacherName()%>';
	 var lastTime=  '<%=dateString%>';
</script>
<div>

</div>
</body>

</html>
