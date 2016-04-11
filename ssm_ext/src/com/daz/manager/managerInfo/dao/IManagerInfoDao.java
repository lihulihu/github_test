package com.daz.manager.managerInfo.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.manager.managerInfo.pojo.ManagerPojo;

@Repository
public interface IManagerInfoDao {
	public List<ManagerPojo> getManager(Map<String, Object> map) throws Exception;
}
