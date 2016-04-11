package com.daz.teacher.guideRecord.pojo;

import java.util.Date;

public class GuideRecordPojo {
	/**
	 * 记录编码
	 * */
	private String recordCode;
	/**
	 * 指导人姓名
	 * */
	private String teacherName;
	private String teacherId;
	/**
	 * 学院
	 * */
	private String acadmy;
	/**
	 * 专业
	 * */
	private String professional;
	/**
	 * 指导日期
	 * */
	private String guideTime;
	
	private Date createTime;
	/**
	 * 指导类型
	 * */
	private String guideType;
	/**
	 * 学生人数
	 * */
	private String studentNumber;
	/**
	 * 指导课题
	 * */
	private String guideTitle;
	/**
	 * 指导内容
	 * */
	private String guideText;
	/**
	 * 指导总结
	 * */
	private String guideSummary; 
	
	
	
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getRecordCode() {
		return recordCode;
	}
	public void setRecordCode(String recordCode) {
		this.recordCode = recordCode;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public String getAcadmy() {
		return acadmy;
	}
	public void setAcadmy(String acadmy) {
		this.acadmy = acadmy;
	}
	public String getProfessional() {
		return professional;
	}
	public void setProfessional(String professional) {
		this.professional = professional;
	}
	
	public String getGuideTime() {
		return guideTime;
	}
	public void setGuideTime(String guideTime) {
		this.guideTime = guideTime;
	}
	public String getGuideType() {
		return guideType;
	}
	public void setGuideType(String guideType) {
		this.guideType = guideType;
	}
	public String getStudentNumber() {
		return studentNumber;
	}
	public void setStudentNumber(String studentNumber) {
		this.studentNumber = studentNumber;
	}
	public String getGuideTitle() {
		return guideTitle;
	}
	public void setGuideTitle(String guideTitle) {
		this.guideTitle = guideTitle;
	}
	public String getGuideText() {
		return guideText;
	}
	public void setGuideText(String guideText) {
		this.guideText = guideText;
	}
	public String getGuideSummary() {
		return guideSummary;
	}
	public void setGuideSummary(String guideSummary) {
		this.guideSummary = guideSummary;
	}
	
	
}
