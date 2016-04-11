package com.daz.teacher.menuTree.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.teacher.menuTree.pojo.menuTreePojo;
import com.daz.teacher.menuTree.server.imenuTreeServer;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class treeNodeAction extends ActionSupport{
	@Autowired
	private imenuTreeServer menuTreeServer;
	
	private List<menuTreePojo> nodeList;
	private String tid;
	public String Tree(){
		System.out.println(tid);		
		Map<String, Object> searchConditionMap = new HashMap<String, Object>();
		searchConditionMap.put("idenTity", ActionContext.getContext().getSession().get("idenTity"));
		searchConditionMap.put("treeParent", tid);
		try {
			nodeList = menuTreeServer.getMenuTreeList(searchConditionMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
		
	}
	
	public List<menuTreePojo> getNodeList() {
		return nodeList;
	}

	public void setNodeList(List<menuTreePojo> nodeList) {
		this.nodeList = nodeList;
	}

	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	
	
}
