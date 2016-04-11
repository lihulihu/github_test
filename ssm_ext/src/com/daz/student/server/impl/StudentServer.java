package com.daz.student.server.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.student.dao.IStudentDao;
import com.daz.student.pojo.studentPojo;
import com.daz.student.server.IStudentServer;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class StudentServer implements IStudentServer{
	@Autowired
	private IStudentDao studentDao;
	public List<studentPojo> searchStudentList(Map<String, Object> searchConditionMap) throws Exception{
		return studentDao.searchStudentList(searchConditionMap);
	}
	public PageInfo<studentPojo> searchStudentByTeacherId(Map<String, Object> searchConditionMap,int pageNum,int pageSize)throws Exception{
		
		PageHelper.startPage(pageNum, pageSize);
		List<studentPojo> list = studentDao.searchStudentByTeacherId(searchConditionMap);
		return new PageInfo<>(list);
	}
	public List<studentPojo> searchStudentIsNotSelect(Map<String, Object> searchConditionMap)throws Exception{
		return studentDao.searchStudentIsNotSelect(searchConditionMap);
	}
}
