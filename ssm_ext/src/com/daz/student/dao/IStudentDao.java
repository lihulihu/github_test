package com.daz.student.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.student.pojo.studentPojo;
@Repository
public interface IStudentDao {
	public List<studentPojo> searchStudentList(Map<String, Object> searchConditionMap) throws Exception;
	public List<studentPojo> searchStudentByTeacherId(Map<String, Object> searchConditionMap)throws Exception;
	public List<studentPojo> searchStudentIsNotSelect(Map<String, Object> searchConditionMap)throws Exception;
}
