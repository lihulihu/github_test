package com.daz.teacher.teacherInfo.pojo;

import java.util.Date;

import com.daz.common.publicDict.pojo.publicDictPojo;

public class teacher {
	private String teacherId;
	private String teacherName;
	private String phone;
	private String email;
	private String account;
	private String password;
	private Date lastTime;
	private Date createTime;
	private publicDictPojo job;
	private String photo;
	private publicDictPojo political;
	private String synopsis;
	private String age;
	private String sex;
	private String  finishSchool;
	private publicDictPojo academy;
	private publicDictPojo professional;
	
	public publicDictPojo getJob() {
		return job;
	}
	public void setJob(publicDictPojo job) {
		this.job = job;
	}
	public publicDictPojo getPolitical() {
		return political;
	}
	public void setPolitical(publicDictPojo political) {
		this.political = political;
	}
	public publicDictPojo getAcademy() {
		return academy;
	}
	public void setAcademy(publicDictPojo academy) {
		this.academy = academy;
	}
	public publicDictPojo getProfessional() {
		return professional;
	}
	public void setProfessional(publicDictPojo professional) {
		this.professional = professional;
	}
	public String getFinishSchool() {
		return finishSchool;
	}
	public void setFinishSchool(String finishSchool) {
		this.finishSchool = finishSchool;
	}
	
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getLastTime() {
		return lastTime;
	}
	public void setLastTime(Date lastTime) {
		this.lastTime = lastTime;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	public String getSynopsis() {
		return synopsis;
	}
	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}
	
}
