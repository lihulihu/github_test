package com.daz.manager.managerInfo.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.daz.manager.managerInfo.server.IManagerServer;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class ManagerAction extends ActionSupport{
	private String userName;
	private String userPassword;
	private String idenTity;
	private Boolean success;
	private String msg;
	@Autowired
	private IManagerServer managerServer;
	public String managerLogin(){
		Map<String, Object> searchConditionMap = new HashMap<>();
		searchConditionMap.put("managerAccount", userName);
		searchConditionMap.put("managerPassword", userPassword);
		List<ManagerPojo> list=null;
		Map<String, Object> session = ActionContext.getContext().getSession();
		try {
			list = managerServer.getManger(searchConditionMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(null != list && list.size()>0){
			ManagerPojo manager= list.get(0);
			session.put("userInfo",manager);
			session.put("idenTity","manager");
			session.put("userId",manager.getManagerId());
			this.setSuccess(true);
			return "success";
		}
		else{
			this.setSuccess(false);
			this.setMsg("用户名或密码错误");
			return "failed";
		}
	}
	
	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getIdenTity() {
		return idenTity;
	}
	public void setIdenTity(String idenTity) {
		this.idenTity = idenTity;
	}
	
}
