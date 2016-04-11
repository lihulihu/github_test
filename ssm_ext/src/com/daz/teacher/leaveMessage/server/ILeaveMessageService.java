package com.daz.teacher.leaveMessage.server;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.daz.teacher.leaveMessage.pojo.LeaveMessagePojo;



public interface ILeaveMessageService {
	public List<LeaveMessagePojo> searchLeaveMessage(Map<String, Object> searchconditionMap) throws Exception;
	public void addLeaveMessage(LeaveMessagePojo leaveMessagePojo) throws Exception;
	public void updateMessage(Map<String, Object> updateconditionMap)throws Exception;
}
