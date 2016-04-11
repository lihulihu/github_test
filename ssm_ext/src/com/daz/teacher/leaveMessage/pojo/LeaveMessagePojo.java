package com.daz.teacher.leaveMessage.pojo;


import java.util.Date;

import com.daz.student.pojo.studentPojo;
import com.daz.teacher.teacherInfo.pojo.teacher;


public class LeaveMessagePojo {
	private String  messageId;
	private String text;
	private Date createTime;
	private teacher teacher;
	private studentPojo student;
	private String lookStatus;
    private String sentStatus;
	public String getMessageId() {
		return messageId;
	}
	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
	public teacher getTeacher() {
		return teacher;
	}
	public void setTeacher(teacher teacher) {
		this.teacher = teacher;
	}
	public studentPojo getStudent() {
		return student;
	}
	public void setStudent(studentPojo student) {
		this.student = student;
	}
	public String getLookStatus() {
		return lookStatus;
	}
	public void setLookStatus(String lookStatus) {
		this.lookStatus = lookStatus;
	}
	public String getSentStatus() {
		return sentStatus;
	}
	public void setSentStatus(String sentStatus) {
		this.sentStatus = sentStatus;
	}
	
}
