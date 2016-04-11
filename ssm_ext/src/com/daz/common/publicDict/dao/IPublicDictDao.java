package com.daz.common.publicDict.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.common.publicDict.pojo.publicDictPojo;
@Repository
public interface IPublicDictDao {
	public List<publicDictPojo> searchPublicDict(Map<String, Object> map) throws Exception;
	public publicDictPojo searchOnePublicDict(Map<String, Object> map) throws Exception;
}
