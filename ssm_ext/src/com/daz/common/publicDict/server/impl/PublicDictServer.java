package com.daz.common.publicDict.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.common.publicDict.dao.IPublicDictDao;
import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.common.publicDict.server.IPublicDictServer;
@Service
public class PublicDictServer implements IPublicDictServer{
	@Autowired
	private IPublicDictDao publicDictDao;
	public List<publicDictPojo> searchPublicDict(Map<String, Object> map)throws Exception{
		return publicDictDao.searchPublicDict(map);
	}
	public publicDictPojo searchOnePublicDict(Map<String, Object> map) throws Exception{
		return publicDictDao.searchOnePublicDict(map);
	}
}
