package com.daz.common.filer;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.daz.student.pojo.studentPojo;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
/**
 * 是否登录验证
 * @author lihu
 * */
@SuppressWarnings("serial")
public class Interceptor extends AbstractInterceptor{
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {  
		  
        // 获取登录的session
        ActionContext ctx = invocation.getInvocationContext();  
        Map session = ctx.getSession(); 
        Object user = null;
        if("teacher".equals(session.get("idenTity"))){
        	user = (teacher) session.get("userInfo");
        }
        else if("student".equals(session.get("idenTity"))){
        	user = (studentPojo) session.get("userInfo");
        }
        else if("manager".equals(session.get("idenTity"))){
        	user = (ManagerPojo) session.get("userInfo");
        }
        if (user == null) {             /* 如果用户信息为空，则拦截*/
        	HttpServletRequest request = ServletActionContext.getRequest();
        	HttpServletResponse response = ServletActionContext.getResponse();
        	PrintWriter pw = response.getWriter();
        	String flag = "";
        	//判断请求方式
        	if (request.getHeader("X-Requested-With") != null
        	&& request.getHeader("X-Requested-With").equalsIgnoreCase(     //ajax请求
        	"XMLHttpRequest")) {  
        		response.setCharacterEncoding("text/html;charset=utf-8");
        		response.setContentType("text/html;charset=utf-8");
        		flag = "9999";
        		pw.write(flag);
        		System.out.println("ajax拦截");
        		return null;
        	} else {
        		System.out.println("登录过期，请从新登录");
        		ctx.put("tip", "登录过期，请从新登录");
        		response.setCharacterEncoding("text/html;charset=utf-8");
        		response.sendRedirect("/ssm_ext/login.jsp");        	
        		//return Action.LOGIN;
        		return null;
        	}
        }
        else {  
            return invocation.invoke();  
        }    
  
    }  
}
