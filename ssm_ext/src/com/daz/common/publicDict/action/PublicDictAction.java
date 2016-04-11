package com.daz.common.publicDict.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.common.publicDict.server.IPublicDictServer;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class PublicDictAction extends ActionSupport{
	private String publicCode;
	private List<publicDictPojo> list;
	@Autowired
	private IPublicDictServer publicDictServer;
	public String searchPublicDict(){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("publicCode", publicCode);
		try {
			list = publicDictServer.searchPublicDict(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	public List<publicDictPojo> getList() {
		return list;
	}

	public void setList(List<publicDictPojo> list) {
		this.list = list;
	}

	public String getPublicCode() {
		return publicCode;
	}
	public void setPublicCode(String publicCode) {
		this.publicCode = publicCode;
	}
	
}
