package com.daz.manager.teacherRelStudent.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.daz.manager.teacherRelStudent.pojo.TeacherRelStudentPojo;

@Repository
public interface ITeacherRelStudentDao {
	public int addTeacherRelStudent(List<TeacherRelStudentPojo> list) throws Exception;
	public int deleteTeacherRelStudent(String teacherId)throws Exception;
}
