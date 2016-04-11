package com.daz.teacher.leaveMessage.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.daz.common.dwr.teacherPush;
import com.daz.student.pojo.studentPojo;
import com.daz.teacher.leaveMessage.pojo.LeaveMessagePojo;
import com.daz.teacher.leaveMessage.server.ILeaveMessageService;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class LeaveMessageAction extends ActionSupport{
	@Autowired
	private ILeaveMessageService leaveMessageService;
	private String studentId;
	private String result;
	private String text;
	private boolean success;
	private int size;
	private String teacherId;
	public String searchLeaveMessage(){
		List<LeaveMessagePojo> items=null;
		Map<String, Object> searchconditionMap = new HashMap<String, Object>();
		Map<String, Object> session = ActionContext.getContext().getSession();
		this.teacherId = (String)session.get("userId");
		searchconditionMap.put("studentId",studentId);
		searchconditionMap.put("teacherId", teacherId);
		try {
			items=leaveMessageService.searchLeaveMessage(searchconditionMap);
			updateMessage();
			sendMessage();
		} catch (Exception e) {
			e.printStackTrace();
		}
		StringBuffer s= new StringBuffer();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd H:m:s");
		for(int i=0;i<items.size();i++){		
			String dentity = null;
			Date date = items.get(i).getCreateTime();
			String dateString = format.format(date); 
			if("1".equals(items.get(i).getSentStatus())){
				dentity = dateString+" <span style='color:red'>[我] </span>";
				s.append("<div style='margin:10px 5px 10px 5px'><img src='Image/im32x32.gif' width='20px'/>"+dentity+"说：<br>"+items.get(i).getText()+" </div>");
			}
			else{
				dentity=dateString+"<span style='color:red'> ["+items.get(i).getStudent().getStudentName()+"] </span>";
				s.append("<div style='margin:10px 5px 10px 5px;text-align:right'>"+dentity+"说：<img src='Image/im32x32.gif' width='20px'/><br>"+items.get(i).getText()+" </div>");
			}
			
		}
		result = s.toString();
		//System.out.println(result);
		return SUCCESS;
	}
	public String submitLeaveMessage(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		String identity = (String)session.get("idenTity");
		LeaveMessagePojo leaveMessagePojo = new LeaveMessagePojo();
		leaveMessagePojo.setText(text);
		leaveMessagePojo.setLookStatus("0");
		leaveMessagePojo.setCreateTime(new Date());
		teacher teacherInfo = new teacher();
		studentPojo studentPojo = new studentPojo();
		if("teacher".equals(identity)){
			leaveMessagePojo.setSentStatus("1");
			teacherInfo.setTeacherId((String)session.get("userId"));
			studentPojo.setStudentId(studentId);
		}
		leaveMessagePojo.setStudent(studentPojo);
		leaveMessagePojo.setTeacher(teacherInfo);
		try {
			
			leaveMessageService.addLeaveMessage(leaveMessagePojo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String searchNotLookMessage(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		Map<String, Object> searchConditionMap = new HashMap<>();
		String idneTity = (String)session.get("idenTity");
		teacherId = (String)session.get("userId");
		if("teacher".equals(idneTity)){
			searchConditionMap.put("teacherId",teacherId);
			searchConditionMap.put("sentStatus", "2");
		}
		searchConditionMap.put("lookStatus", "0");
		try {
			this.setSize(leaveMessageService.searchLeaveMessage(searchConditionMap).size());				
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String searchId(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		Map<String, Object> searchConditionMap = new HashMap<>();
		String idneTity = (String)session.get("idenTity");
		this.teacherId = (String)session.get("userId");
		List<LeaveMessagePojo> list = null;
		if("teacher".equals(idneTity)){
			searchConditionMap.put("teacherId", teacherId);
			searchConditionMap.put("sentStatus", "2");
		}
		searchConditionMap.put("lookStatus", "0");
		try {
			list = leaveMessageService.searchLeaveMessage(searchConditionMap);
			if(null != list){
				studentId=((studentPojo)list.get(0).getStudent()).getStudentId();
				updateMessage();
				sendMessage();
			}
			this.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return searchLeaveMessage();
	}
	public void updateMessage(){
		Map<String, Object> updateConditionMap = new HashMap<>();		
		updateConditionMap.put("teacherId", teacherId);
		updateConditionMap.put("sentStatus", "2");
		updateConditionMap.put("studentId", studentId);
		try {
			leaveMessageService.updateMessage(updateConditionMap);
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	public void sendMessage(){
		teacherPush Push = new teacherPush();
		searchNotLookMessage();
		if(this.size != 0){
			Push.sendMessageAuto(teacherId, "<span style='color:red'>你有"+size+"条新留言</span>");
		}
		else{
			Push.sendMessageAuto(teacherId, "暂无消息");
		}
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	
}
