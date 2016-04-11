package com.daz.teacher.teacherInfo.dao;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;
import com.daz.teacher.teacherInfo.pojo.teacher;

@Repository
public interface iTeacherDao {
	public List<teacher> getTeacher(Map<String, Object> searchConditionMap) ;
	public int updateTeacher(teacher teacher) ;
	public int addTeacherBatch(List<TeacherInsertInfo> list);
	public int updateTeacherBatch(List<TeacherInsertInfo> list);
	public int deleteTeacherBatch(List<String> list);
}
