package com.daz.teacher.teacherInfo.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.daz.student.pojo.studentPojo;
import com.daz.teacher.leaveMessage.server.ILeaveMessageService;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.github.pagehelper.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
public class teacherAction extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private iTeacherServer teacherServer;
	@Autowired
	private ILeaveMessageService leaveMessageService;
	/**
	 * ǰ��̨��������
	 */
	private String userName;
	private String userPassword;
	private String teacherId;
	private Boolean success;
	private String meg;
	private String idenTity;
	private String jsonString;
	private List<teacher> list;
	public String page;
	public String limit;
	public String query;
	private PageInfo<teacher> resultList;
	private Boolean isOk;
	/**
	 * ��֤��¼
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String login(){
		Map<String, Object> searchConditionMap = new HashMap<>();
		searchConditionMap.put("account", userName);
		searchConditionMap.put("password", userPassword);
		List<teacher> list=null;
		Map<String, Object> session = ActionContext.getContext().getSession();
		try {
			list = teacherServer.getTeacherInfo(searchConditionMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(null != list && list.size()>0){
			teacher teacher= list.get(0);
			session.put("userInfo",teacher);
			session.put("idenTity","teacher");
			session.put("userId",teacher.getTeacherId());
			teacher newTeacherInfo = new teacher();
			newTeacherInfo.setTeacherId(teacher.getTeacherId());
			newTeacherInfo.setLastTime(new Date());
			Map<String, Object> searchMessageMap = new HashMap<>();
			searchMessageMap.put("teacherId",teacher.getTeacherId());
			searchMessageMap.put("sentStatus","2");
			searchMessageMap.put("lookStatus","0");
			try {
				teacherServer.updateTeacher(newTeacherInfo);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			this.setSuccess(true);
			return "success";
		}
		else{
			this.setSuccess(false);
			this.setMeg("用户名或密码错误");
			return "failed";
		}
	}
	public String searchTeacherByName(){
		Map<String, Object> searchConditionMap = new HashMap<>();
		if(userName != null){
			searchConditionMap.put("account", userName);
		}
		try {
			list = teacherServer.getTeacherInfo(searchConditionMap);
			if(list.size() == 0){
				this.setIsOk(true);
			}
			else{
				this.setIsOk(false);
			}
			this.setSuccess(true);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String searchTeacherInfo(){
		Map<String, Object> searchConditionMap = new HashMap<>();
		if(teacherId !=null){
			searchConditionMap.put("teacherId", teacherId);
		}
		try {
			list = teacherServer.getTeacherInfo(searchConditionMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String logout(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		session.remove("userInfo");
		session.remove("idenTity");
		session.remove("userId");
		return SUCCESS;
	}
	public String searchAllTeacher(){
		int s=0;
		int l=0;
		if(page!=null){
			s = Integer.parseInt(page);
		}
		if(limit != null){
			l = Integer.parseInt(limit);
		}
		Map<String , Object> map = new HashMap<>();
		if(query != null){
			map.put("query",query);
		}
		try {
			resultList = teacherServer.getAllTeacher(map, s, l);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String updateTeacherInfo(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		System.out.println(jsonString);
		teacher teacher = JSON.parseObject(jsonString,teacher.class);
		System.out.println(teacher.toString());
		teacher.setTeacherId(teacherId);
		try {
			teacherServer.updateTeacher(teacher);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public List<teacher> getList() {
		return list;
	}
	public void setList(List<teacher> list) {
		this.list = list;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMeg() {
		return meg;
	}

	public void setMeg(String meg) {
		this.meg = meg;
	}
	public String getIdenTity() {
		return idenTity;
	}
	public void setIdenTity(String idenTity) {
		this.idenTity = idenTity;
	}
	public String getJsonString() {
		return jsonString;
	}
	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public PageInfo<teacher> getResultList() {
		return resultList;
	}
	public void setResultList(PageInfo<teacher> resultList) {
		this.resultList = resultList;
	}
	public Boolean getIsOk() {
		return isOk;
	}
	public void setIsOk(Boolean isOk) {
		this.isOk = isOk;
	}

	
}

