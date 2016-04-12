package com.daz.manager.managerInfo.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.manager.managerInfo.dao.IManagerInfoDao;
import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.daz.manager.managerInfo.server.IManagerServer;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class MangerServerImpl implements IManagerServer{
	@Autowired
	private IManagerInfoDao managerInfoDao;
	public List<ManagerPojo> getManger(Map<String, Object> map) throws Exception{
		return managerInfoDao.getManager(map);
	}
	public PageInfo<ManagerPojo> getManagerPageInfo(Map<String, Object> map,
			int pageNum,int pageSize) throws Exception{
		PageHelper.startPage(pageNum, pageSize) ;
		List<ManagerPojo> list = managerInfoDao.getManager(map);
		return new PageInfo<>(list);
	}
	public Boolean addManager(ManagerPojo managerPojo) throws Exception{
		if(managerInfoDao.addManager(managerPojo) == 1){
			return true; 
		}else{
			return false;
		}
		
	}
	public Boolean updateManager(ManagerPojo managerPojo) throws Exception{
		if(managerInfoDao.updateManager(managerPojo) == 1){
			return true; 
		}else{
			return false;
		}
	}
	public Boolean deleteManager(List<String> list) throws Exception{
		if(managerInfoDao.deleteManager(list) == list.size()){
			return true;
		}else {
			return false;
		}
	}
}
