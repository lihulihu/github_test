package com.daz.teacher.teacherInfo.action;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class ChangePasswordAction extends ActionSupport{
	private String historyPassword;
	private String newPassword ;
	private String newPassword1;
	private Boolean success;
	private String msg;
	@Autowired
	private iTeacherServer teacherServer;
	public String passwordController(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacher teacherInfo = (teacher)session.get("userInfo");
		
		if(!this.getHistoryPassword().equals(teacherInfo.getPassword())){
			this.setSuccess(false);
			this.setMsg("修改失败，原始密码错误");
			return "failed";
		}
		else{
			teacher teacherInfo2 = new teacher();
			teacherInfo2.setTeacherId(teacherInfo.getTeacherId());
			teacherInfo2.setPassword(newPassword);
			try {
				teacherServer.updateTeacher(teacherInfo2);
				this.setSuccess(true);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return SUCCESS;
	}
	public String getHistoryPassword() {
		return historyPassword;
	}
	public void setHistoryPassword(String historyPassword) {
		this.historyPassword = historyPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getNewPassword1() {
		return newPassword1;
	}
	public void setNewPassword1(String newPassword1) {
		this.newPassword1 = newPassword1;
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
	
}
