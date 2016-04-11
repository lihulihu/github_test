package com.daz.student.server;

import java.util.List;
import java.util.Map;







import com.daz.student.pojo.studentPojo;
import com.github.pagehelper.PageInfo;

public interface IStudentServer {
	public List<studentPojo> searchStudentList(Map<String, Object> searchConditionMap) throws Exception;
	public PageInfo<studentPojo> searchStudentByTeacherId(Map<String, Object> searchConditionMap,int pageNum,int pageSize)throws Exception;
	public List<studentPojo> searchStudentIsNotSelect(Map<String, Object> searchConditionMap)throws Exception;
}
