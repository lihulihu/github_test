package com.daz.teacher.teacherInfo.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.common.message.MessageUtil;
import com.daz.manager.teacherRelStudent.dao.ITeacherRelStudentDao;
import com.daz.teacher.teacherInfo.dao.iTeacherDao;
import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class teacherServer implements iTeacherServer{
	@Autowired
	private iTeacherDao teacherDao;
	@Autowired
	private ITeacherRelStudentDao teacherRelStudentDao;
	@Override
	public List<teacher> getTeacherInfo(Map<String, Object> searchConditionMap) throws Exception{
		return teacherDao.getTeacher(searchConditionMap);
	}
	@Override
	public void updateTeacher(teacher teacher) throws Exception{
		if(teacherDao.updateTeacher(teacher) != 1){
			throw new Exception(MessageUtil.getMsg("ERROR_TEACHER_0001"));
		}
	}
	public PageInfo<teacher> getAllTeacher(Map<String, Object> map,int pageNum,int pageSize) throws Exception{
		PageHelper.startPage(pageNum, pageSize);
		List<teacher> list = teacherDao.getTeacher(map);
		return new PageInfo<>(list);
	}
	public int deleteTeacherBatch(List<String> list) throws Exception{
		for(int i=0;i<list.size();i++){
			teacherRelStudentDao.deleteTeacherRelStudent(list.get(i));
		}
		return teacherDao.deleteTeacherBatch(list);
	}
	public int addTeacherBatch(List<TeacherInsertInfo> list){
		return teacherDao.addTeacherBatch(list);
	}
	public int updateTeacherBatch(List<TeacherInsertInfo> list){
		return teacherDao.updateTeacherBatch(list);
	}
}
