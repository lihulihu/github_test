package com.daz.manager.teacherRelStudent.server.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.manager.teacherRelStudent.dao.ITeacherRelStudentDao;
import com.daz.manager.teacherRelStudent.pojo.TeacherRelStudentPojo;
import com.daz.manager.teacherRelStudent.server.ITeacherRelStudentServer;
import com.daz.teacher.teacherInfo.dao.iTeacherDao;
import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;

@Service
public class TeacherRelStudentServerImpl implements ITeacherRelStudentServer{
	@Autowired
	private ITeacherRelStudentDao teacherRelStudentDao;
	@Autowired
	private iTeacherDao teacherDao;
	public int addTeacherRelStudent(String teacherId,List<TeacherRelStudentPojo> list) throws Exception{
		if(teacherId != null){
			teacherRelStudentDao.deleteTeacherRelStudent(teacherId);
		}
			
		return teacherRelStudentDao.addTeacherRelStudent(list);
	}
	public void alterTeachers(List<TeacherInsertInfo> list) throws Exception{
		List<TeacherInsertInfo> addTeachers = new ArrayList<TeacherInsertInfo>();
		List<TeacherInsertInfo> updateTeachers = new ArrayList<TeacherInsertInfo>();
		for(int i = 0;i<list.size();i++){
			if(list.get(i).getTeacherId() == null || "".equals(list.get(i).getTeacherId())){
				addTeachers.add(list.get(i));
			}
			else{
				updateTeachers.add(list.get(i));
			}
		}
		if(addTeachers.size()>0){
			teacherDao.addTeacherBatch(addTeachers);
		}
		if(updateTeachers.size()>0){
			teacherDao.updateTeacherBatch(updateTeachers);
		}
	}
}
