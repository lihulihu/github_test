package com.daz.manager.managerInfo.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.daz.common.announcement.pojo.Announcement;
import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.daz.manager.managerInfo.server.IManagerServer;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.github.pagehelper.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class ManagerAction extends ActionSupport{
	private String userName;
	private String userPassword;
	private String idenTity;
	private Boolean success;
	private String msg;
	public PageInfo<ManagerPojo> items;
	public String page;
	public String limit;
	private String jsonString;
	public String dels;
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
	public String managerPageInfo(){
		int s=0;
		int l=0;
		if(page!=null){
			s = Integer.parseInt(page);
		}
		if(limit != null){
			l = Integer.parseInt(limit);
		}
		Map<String, Object> searchconditionMap = new HashMap<String, Object>();
		try {
			items = managerServer.getManagerPageInfo(searchconditionMap, s, l);
			this.setSuccess(true);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String addManager(){
		if(isAdmin()){
			ManagerPojo manager = JSON.parseObject(jsonString,ManagerPojo.class);
			try {
				this.setSuccess(managerServer.addManager(manager));
			} catch (Exception e) {
				this.setSuccess(false);
				this.setMsg("新增失败");
				e.printStackTrace();
			}
		}
		else{
			this.setSuccess(false);
			this.setMsg("你没有权限");
		}
		return SUCCESS;
	}
	public String updateManager(){
		if(isAdmin()){
			ManagerPojo manager = JSON.parseObject(jsonString,ManagerPojo.class);
			try {
				this.setSuccess(managerServer.updateManager(manager));
			} catch (Exception e) {
				this.setSuccess(false);
				this.setMsg("更新失败");
				e.printStackTrace();
			}
		}
		else{
			this.setSuccess(false);
			this.setMsg("你没有权限");
		}
		return SUCCESS;
	}
	public String deleteManager(){
		if(isAdmin()){

			String[] announcement = dels.split(",");
			List<String> delList = new ArrayList<>();
			Collections.addAll(delList, announcement);
			try {
				this.setSuccess(managerServer.deleteManager(delList));
			} catch (Exception e) {
				this.setMsg("删除失败");
				this.setSuccess(false);
				e.printStackTrace();
			}
		}else{
			this.setSuccess(false);
			this.setMsg("你没有权限");
		}
		return SUCCESS;
	}
	public Boolean isAdmin(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		ManagerPojo manager = (ManagerPojo)session.get("userInfo");
		if("1".equals(manager.getManagerLevel().getValueId())){
			return true;
		}else{
			return false;
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
	public PageInfo<ManagerPojo> getItems() {
		return items;
	}
	public void setItems(PageInfo<ManagerPojo> items) {
		this.items = items;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public String getJsonString() {
		return jsonString;
	}
	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}
	public String getDels() {
		return dels;
	}
	public void setDels(String dels) {
		this.dels = dels;
	}
	
}
