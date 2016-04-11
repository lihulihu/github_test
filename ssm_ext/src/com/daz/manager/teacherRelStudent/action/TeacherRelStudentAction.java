package com.daz.manager.teacherRelStudent.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.manager.teacherRelStudent.pojo.TeacherRelStudentPojo;
import com.daz.manager.teacherRelStudent.server.ITeacherRelStudentServer;
import com.daz.student.pojo.studentPojo;
import com.daz.student.server.IStudentServer;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class TeacherRelStudentAction extends ActionSupport{
	private String itemselector;
	private String teacherId;
	private Boolean success;
	private String grade;
	private String number;
	private int teacherSize;
	private int studentSize;
	private List<studentPojo> studentList;
	private List<teacher> teacherList;
	@Autowired
	private ITeacherRelStudentServer teacherRelStudentServer;
	@Autowired
	private IStudentServer studentServer;
	@Autowired
	private iTeacherServer teacherServer;
	public String saveTeacherRelStudent(){
		try {
			String[] studentId = itemselector.split(",");
			List<TeacherRelStudentPojo> list = new ArrayList<>();
			for(int i=0;i<studentId.length;i++){
				TeacherRelStudentPojo teacherRelStudentPojo = new TeacherRelStudentPojo();
				teacherRelStudentPojo.setTeacherId(teacherId);
				teacherRelStudentPojo.setStudentId(studentId[i]);
				list.add(teacherRelStudentPojo);
			}
			teacherRelStudentServer.addTeacherRelStudent(teacherId, list);
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
		}
		return SUCCESS;
	}
	public String selectNumber(){
		Map<String, Object> map=new HashMap<>();
		
		if(grade != null && !"".equals(grade)){
			map.put("grade", grade);
		}
		//Map<String, Object> teacherMap = new HashMap<>();
		
		try {
			studentList=studentServer.searchStudentIsNotSelect(map);
			teacherList = teacherServer.getTeacherInfo(null);
			this.setStudentSize(studentList.size());
			this.setTeacherSize(teacherList.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
		//Map<String, Object> searchConditionMap = new HashMap<String, Object>();
		return SUCCESS;
	}
	public String autoCorrelation(){
		int fpnum = Integer.parseInt(number);
		selectNumber();
		List<TeacherRelStudentPojo> list = new ArrayList<>();
		int k = 0;
		for(int i = 0;i<teacherSize;i++){
			for(int j = 0; j< fpnum ;j++){
				TeacherRelStudentPojo teacherRelStudentPojo = new TeacherRelStudentPojo();
				teacherRelStudentPojo.setTeacherId(teacherList.get(i).getTeacherId());
				teacherRelStudentPojo.setStudentId(studentList.get(k).getStudentId());
				list.add(teacherRelStudentPojo);
				k++;
			}
		}
		try {
			teacherRelStudentServer.addTeacherRelStudent(null, list);
			selectNumber();
			this.setSuccess(true);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String getItemselector() {
		return itemselector;
	}

	public void setItemselector(String itemselector) {
		this.itemselector = itemselector;
	}

	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public int getTeacherSize() {
		return teacherSize;
	}
	public void setTeacherSize(int teacherSize) {
		this.teacherSize = teacherSize;
	}
	public int getStudentSize() {
		return studentSize;
	}
	public void setStudentSize(int studentSize) {
		this.studentSize = studentSize;
	}
	
}
