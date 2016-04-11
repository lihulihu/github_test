package com.daz.teacher.menuTree.server;

import java.util.List;
import java.util.Map;

import com.daz.teacher.menuTree.pojo.menuTreePojo;



public interface imenuTreeServer {
	public List<menuTreePojo> getMenuTreeList(Map<String, Object> searchConditionMap)throws Exception; 
}
