package com.daz.manager.managerInfo.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.manager.managerInfo.dao.IManagerInfoDao;
import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.daz.manager.managerInfo.server.IManagerServer;
@Service
public class MangerServerImpl implements IManagerServer{
	@Autowired
	private IManagerInfoDao managerInfoDao;
	public List<ManagerPojo> getManger(Map<String, Object> map) throws Exception{
		return managerInfoDao.getManager(map);
	}
}
