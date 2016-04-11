package com.daz.teacher.teacherInfo.server;

import java.util.List;
import java.util.Map;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.github.pagehelper.PageInfo;

public interface iTeacherServer {
	public List<teacher> getTeacherInfo(Map<String, Object> searchConditionMap)throws Exception;
	public void updateTeacher(teacher teacher) throws Exception;
	public PageInfo<teacher> getAllTeacher(Map<String, Object> map,int pageNum,int pageSize) throws Exception;
	public int deleteTeacherBatch(List<String> list) throws Exception;
	public int addTeacherBatch(List<TeacherInsertInfo> list);
	public int updateTeacherBatch(List<TeacherInsertInfo> list);

}
