package com.daz.manager.teacherRelStudent.server;

import java.util.List;

import com.daz.manager.teacherRelStudent.pojo.TeacherRelStudentPojo;
import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;

public interface ITeacherRelStudentServer {
	public int addTeacherRelStudent(String teacherId,List<TeacherRelStudentPojo> list) throws Exception;
	public void alterTeachers(List<TeacherInsertInfo> list) throws Exception;
}
