package com.daz.teacher.guideRecord.action;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.daz.student.pojo.studentPojo;
import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
import com.daz.teacher.guideRecord.server.IGuideRecordServer;
import com.github.pagehelper.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class GuideRecordAction extends ActionSupport{
	private String AddJson;
	private Boolean success;
	private String teacherId;
	public String page;
	public String limit;
	public String recordCode;
	public PageInfo<GuideRecordPojo> resultList;
	public GuideRecordPojo guideRecordPojo;
	@Autowired
	private IGuideRecordServer guideRecordServer;
	public String addGuideRecord(){
		System.out.println(AddJson);
			
		try {
			GuideRecordPojo guideRecordPojo = JSON.parseObject(AddJson,GuideRecordPojo.class);
			Map<String, Object> session = ActionContext.getContext().getSession();
			teacherId = (String)session.get("userId");
			guideRecordPojo.setTeacherId(teacherId);
			if(guideRecordPojo.getRecordCode() != null && !"".equals(guideRecordPojo.getRecordCode())){
				guideRecordServer.updateRecord(guideRecordPojo);
			}else{
				guideRecordServer.addGuideRecord(guideRecordPojo);
			}
			
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
			return ERROR;
		}
		return SUCCESS;
	}
	public String selectAllRecord(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("techerId", teacherId);
		int s=0;
		int l=0;
		if(page!=null){
			s = Integer.parseInt(page);
		}
		if(limit != null){
			l = Integer.parseInt(limit);
		}
		try {
			resultList = guideRecordServer.selectGuideRecord(map, s, l);
			this.setSuccess(true);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String selectGuideRecordByCode(){
		Map<String, Object> map = new HashMap<>();
		map.put("recordCode", recordCode);
		try {
			guideRecordPojo = guideRecordServer.selectOneGuideRecord(map);
			this.setSuccess(true);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String getAddJson() {
		return AddJson;
	}
	public void setAddJson(String addJson) {
		AddJson = addJson;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
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
	public PageInfo<GuideRecordPojo> getResultList() {
		return resultList;
	}
	public void setResultList(PageInfo<GuideRecordPojo> resultList) {
		this.resultList = resultList;
	}
	public GuideRecordPojo getGuideRecordPojo() {
		return guideRecordPojo;
	}
	public void setGuideRecordPojo(GuideRecordPojo guideRecordPojo) {
		this.guideRecordPojo = guideRecordPojo;
	}
	public String getRecordCode() {
		return recordCode;
	}
	public void setRecordCode(String recordCode) {
		this.recordCode = recordCode;
	}
	
	
}
