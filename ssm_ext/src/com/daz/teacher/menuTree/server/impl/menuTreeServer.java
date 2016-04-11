package com.daz.teacher.menuTree.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.teacher.menuTree.dao.iMenuTreeDao;
import com.daz.teacher.menuTree.pojo.menuTreePojo;
import com.daz.teacher.menuTree.server.imenuTreeServer;

@Service
public class menuTreeServer implements imenuTreeServer{
	@Autowired
	private iMenuTreeDao menuTreeDao;
	@Override
	public List<menuTreePojo> getMenuTreeList(Map<String, Object> searchConditionMap) throws Exception{
		return menuTreeDao.getMenuTreeList(searchConditionMap);
	}
}
