package com.daz.manager.managerInfo.server;

import java.util.List;
import java.util.Map;

import com.daz.manager.managerInfo.pojo.ManagerPojo;
import com.github.pagehelper.PageInfo;


public interface IManagerServer {
   public List<ManagerPojo> getManger(Map<String, Object> map) throws Exception;
   public PageInfo<ManagerPojo> getManagerPageInfo(Map<String, Object> map,
		   int pageNum,int pageSize) throws Exception;
   public Boolean addManager(ManagerPojo managerPojo) throws Exception;
   public Boolean updateManager(ManagerPojo managerPojo) throws Exception;
   public Boolean deleteManager(List<String> list) throws Exception;
}
