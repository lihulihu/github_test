package com.daz.common.publicDict.server;

import java.util.List;
import java.util.Map;

import com.daz.common.publicDict.pojo.publicDictPojo;

public interface IPublicDictServer {
	public List<publicDictPojo> searchPublicDict(Map<String, Object> map)throws Exception;
	public publicDictPojo searchOnePublicDict(Map<String, Object> map) throws Exception;
}
