package com.daz.teacher.menuTree.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.teacher.menuTree.pojo.menuTreePojo;



@Repository
public interface iMenuTreeDao {
	public List<menuTreePojo> getMenuTreeList(Map<String, Object> searchConditionMap) throws Exception;
	public int updateMenuTree(menuTreePojo menuTreePojo) throws Exception;
	public int addMenuTree(menuTreePojo menuTreePojo) throws Exception;
	public int deleteMenuTree(Map<String, Object> delectConditionMap)throws Exception;
}
