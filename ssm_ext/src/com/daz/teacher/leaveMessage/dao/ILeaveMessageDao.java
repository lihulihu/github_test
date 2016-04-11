package com.daz.teacher.leaveMessage.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.teacher.leaveMessage.pojo.LeaveMessagePojo;


@Repository
public interface ILeaveMessageDao {
	public List<LeaveMessagePojo> searchLeaveMessage(Map<String, Object> searchconditionMap);
	public int addLeaveMessage(LeaveMessagePojo leaveMessagePojo);
	public int updateMessage(Map<String, Object> updateconditionMap);
}
