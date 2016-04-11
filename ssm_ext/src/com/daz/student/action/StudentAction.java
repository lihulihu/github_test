package com.daz.student.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import oracle.net.aso.q;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.student.pojo.studentPojo;
import com.daz.student.server.IStudentServer;
import com.github.pagehelper.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
public class StudentAction extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private IStudentServer studentServer;

	/**
	 * ǰ��̨��������
	 */
	private String studentId;
	private String Password;
	private String teacherId;
	private Boolean success;
	private String grade;
	private String msg;
	private String idenTity;
	public String page;
	public String limit;
	public String query;
	private PageInfo<studentPojo> resultList;
	private List<studentPojo> list;
	private List<String> isSelect = new ArrayList<>();
	private Map<String, Object> result = new HashMap<>(); 
	/**
	 * ��֤��¼
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String login(){
		Map<String, Object> searchConditionMap = new HashMap<>();
		searchConditionMap.put("studentId", studentId);
		searchConditionMap.put("password", Password);
		List<studentPojo> list=null;
		Map<String, Object> session = ActionContext.getContext().getSession();
		try {
			list = studentServer.searchStudentList(searchConditionMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(null != list && list.size()>0){	
			studentPojo student= list.get(0);
			session.put("userInfo",student);
			session.put("idenTity","student");
			session.put("userId",student.getStudentId());
			this.setSuccess(true);
			return "success";
		}
		else{
			this.setSuccess(false);
			this.setMsg("用户名或密码错误");
			return "failed";
		}
	}
	public String logout(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		session.remove("userInfo");
		session.remove("idenTity");
		session.remove("userId");
		return SUCCESS;
	}
	public String searchStudent(){
		Map<String, Object> searchMap = new HashMap<>();
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		searchMap.put("studentId", studentId);
		searchMap.put("teacherId", teacherId);
		try {
			list=studentServer.searchStudentList(searchMap);
			this.setSuccess(true);
			return SUCCESS;
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
			return ERROR;
		}
	}
	public String searchStudentByTeacherId(){
		int s=0;
		int l=0;
		if(page!=null){
			s = Integer.parseInt(page);
		}
		if(limit != null){
			l = Integer.parseInt(limit);
		}
		try {
			Map<String, Object> session = ActionContext.getContext().getSession();
			teacherId = (String)session.get("userId");
			Map<String, Object> searchConditionMap = new HashMap<String, Object>();
			searchConditionMap.put("teacherId", teacherId);
			if(query!=null && !"".equals(query)){
				searchConditionMap.put("query", query);
			}
			if(grade!=null && !"".equals(grade)){
				searchConditionMap.put("grade", grade);
			}
			resultList = studentServer.searchStudentByTeacherId(searchConditionMap,s,l);
			this.setSuccess(true);
			return SUCCESS;
		} catch (Exception e) {			
			e.printStackTrace();
			this.setSuccess(false);
			return ERROR;
		}
	}
	public String searchStudentIsNotSelect(){
		try {
			Map<String, Object> map=new HashMap<>();
			if(query != null && !"".equals(query)){
				map.put("query", query);
			}
			if(grade != null && !"".equals(grade)){
				map.put("grade", grade);
			}
			list=studentServer.searchStudentIsNotSelect(map);
			Map<String, Object> searchConditionMap = new HashMap<String, Object>();
			searchConditionMap.put("teacherId", teacherId);
			if(grade!=null && !"".equals(grade)){
				searchConditionMap.put("grade", grade);
			}
			resultList = studentServer.searchStudentByTeacherId(searchConditionMap,0,0);
			if(resultList.getList().size()>0){
				for(int i=0;i<resultList.getList().size();i++){
					list.add(resultList.getList().get(i));
					isSelect.add(resultList.getList().get(i).getStudentId());
				}
			}
			result.put("list", list);
			result.put("isSelect", isSelect);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public List<studentPojo> getList() {
		return list;
	}
	public void setList(List<studentPojo> list) {
		this.list = list;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	
	public PageInfo<studentPojo> getResultList() {
		return resultList;
	}
	public void setResultList(PageInfo<studentPojo> resultList) {
		this.resultList = resultList;
	}
	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getIdenTity() {
		return idenTity;
	}
	public void setIdenTity(String idenTity) {
		this.idenTity = idenTity;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
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
	public List<String> getIsSelect() {
		return isSelect;
	}
	public void setIsSelect(List<String> isSelect) {
		this.isSelect = isSelect;
	}
	public Map<String, Object> getResult() {
		return result;
	}
	public void setResult(Map<String, Object> result) {
		this.result = result;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	
}


