package com.daz.teacher.teacherInfo.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.teacher.menuTree.pojo.menuTreePojo;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.opensymphony.xwork2.ActionSupport;

public class TeacherTreeAction extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String tid;
	private List<menuTreePojo> nodeList=new ArrayList<>();
	private List<teacher> teacherList;
	@Autowired
	private iTeacherServer teacherServer;
	public String selectTeacherTree(){
		Map<String, Object> map = new HashMap<String, Object>();
		publicDictPojo publicDict = new publicDictPojo();
		publicDict.setValueId(tid);
		map.put("job", publicDict);
		try {
			teacherList = teacherServer.getTeacherInfo(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(teacherList != null && teacherList.size()>0){
			
			for(int i=0;i<teacherList.size();i++){
				menuTreePojo menuTree = new menuTreePojo();
				menuTree.setId(teacherList.get(i).getTeacherId());
				menuTree.setLeaf(true);
				menuTree.setText(teacherList.get(i).getTeacherName());
				nodeList.add(menuTree);
			}
			
		}
		return SUCCESS;

	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public List<menuTreePojo> getNodeList() {
		return nodeList;
	}
	public void setNodeList(List<menuTreePojo> nodeList) {
		this.nodeList = nodeList;
	}
	public List<teacher> getTeacherList() {
		return teacherList;
	}
	public void setTeacherList(List<teacher> teacherList) {
		this.teacherList = teacherList;
	}
	
}
