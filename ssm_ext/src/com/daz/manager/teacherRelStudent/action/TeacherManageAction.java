package com.daz.manager.teacherRelStudent.action;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.daz.manager.teacherRelStudent.server.ITeacherRelStudentServer;
import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.daz.teacher.teacherInfo.server.impl.teacherServer;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class TeacherManageAction extends ActionSupport{
	private String alterInfo;
	private String teacherIds;
	private Boolean success;
	@Autowired
	private ITeacherRelStudentServer teacherRelStudentServer;
	@Autowired
	private iTeacherServer teacherServer;
	public String updateTeachers(){
		List<TeacherInsertInfo> teacherInsertInfos = JSON.parseArray(alterInfo, TeacherInsertInfo.class);
		try {
			teacherRelStudentServer.alterTeachers(teacherInsertInfos);
			this.setSuccess(true);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String deleteTeachers(){
		String[] teacherId = teacherIds.split(",");
		List<String> list = new ArrayList<String>();
		Collections.addAll(list, teacherId);
		try {
			teacherServer.deleteTeacherBatch(list);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		this.setSuccess(true);
		return SUCCESS;
	}
	
	public String getTeacherIds() {
		return teacherIds;
	}
	public void setTeacherIds(String teacherIds) {
		this.teacherIds = teacherIds;
	}
	public String getAlterInfo() {
		return alterInfo;
	}
	public void setAlterInfo(String alterInfo) {
		this.alterInfo = alterInfo;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	
}
