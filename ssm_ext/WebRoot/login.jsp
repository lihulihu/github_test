<%@ page language="java" pageEncoding="UTF-8"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
  <head>
    <base href="<%=basePath%>">
 
    <title>系统用户登录</title>
    
	<link rel="stylesheet" type="text/css" href="Ext/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="Ext/css/icon.css" />
	<link rel="stylesheet" type="text/css" href="css/Main.css" />
    <script type="text/javascript" src="Ext/ext-all.js"></script>
    <script type="text/javascript" src="Ext/locale/ext-lang-zh_CN.js"></script>	
	<script type="text/javascript" src="js/teacher/login-form.js"></script>
  <script type="text/javascript">
  	function load(){
 		 var tip='${tip}';
  		 if(tip != ""){
  		 alert(tip);
  		}
  	}
  </script>
  </head>

  <body onload="load()" style='background-image: url(Image/cuitbeijing1.png);background-position:center center;background-repeat: no-repeat;'>  
  </body>
</html>
