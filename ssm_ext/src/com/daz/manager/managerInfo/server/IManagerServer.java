package com.daz.manager.managerInfo.server;

import java.util.List;
import java.util.Map;

import com.daz.manager.managerInfo.pojo.ManagerPojo;


public interface IManagerServer {
   public List<ManagerPojo> getManger(Map<String, Object> map) throws Exception;
}
