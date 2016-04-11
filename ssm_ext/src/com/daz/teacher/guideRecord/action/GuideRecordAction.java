package com.daz.teacher.guideRecord.action;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
import com.daz.teacher.guideRecord.server.IGuideRecordServer;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class GuideRecordAction extends ActionSupport{
	private String AddJson;
	private Boolean success;
	private String teacherId;
	@Autowired
	private IGuideRecordServer guideRecordServer;
	public String addGuideRecord(){
		System.out.println(AddJson);
			
		try {
			GuideRecordPojo guideRecordPojo = JSON.parseObject(AddJson,GuideRecordPojo.class);
			Map<String, Object> session = ActionContext.getContext().getSession();
			teacherId = (String)session.get("userId");
			guideRecordPojo.setTeacherId(teacherId);
			guideRecordServer.addGuideRecord(guideRecordPojo);
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			this.setSuccess(false);
			return ERROR;
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
	
	
}
