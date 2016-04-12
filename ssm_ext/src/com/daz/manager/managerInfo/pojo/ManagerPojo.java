package com.daz.manager.managerInfo.pojo;

import java.util.Date;

import com.daz.common.publicDict.pojo.publicDictPojo;


public class ManagerPojo {
	private String managerId;
	private String managerAccount;
	private String managerPassword;
	private publicDictPojo managerLevel;
	private Date createDate;
	
	
	public publicDictPojo getManagerLevel() {
		return managerLevel;
	}
	public void setManagerLevel(publicDictPojo managerLevel) {
		this.managerLevel = managerLevel;
	}
	public String getManagerId() {
		return managerId;
	}
	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}
	public String getManagerAccount() {
		return managerAccount;
	}
	public void setManagerAccount(String managerAccount) {
		this.managerAccount = managerAccount;
	}
	public String getManagerPassword() {
		return managerPassword;
	}
	public void setManagerPassword(String managerPassword) {
		this.managerPassword = managerPassword;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
}
