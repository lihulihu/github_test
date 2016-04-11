package com.daz.teacher.leaveMessage.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;





import com.daz.common.message.MessageUtil;
import com.daz.teacher.leaveMessage.dao.ILeaveMessageDao;
import com.daz.teacher.leaveMessage.pojo.LeaveMessagePojo;
import com.daz.teacher.leaveMessage.server.ILeaveMessageService;
@Service
public class LeaveMessageServiceImpl implements ILeaveMessageService{
	@Autowired
	private ILeaveMessageDao leaveMessageDao;

	public List<LeaveMessagePojo> searchLeaveMessage(Map<String, Object> searchconditionMap) throws Exception{
		List<LeaveMessagePojo> list = leaveMessageDao.searchLeaveMessage(searchconditionMap);
		return list;
	}
	public void addLeaveMessage(LeaveMessagePojo leaveMessagePojo) throws Exception{
		if( leaveMessageDao.addLeaveMessage(leaveMessagePojo) != 1){
			throw new Exception("添加失败");
		}
	}
	public void updateMessage(Map<String, Object> updateconditionMap)throws Exception{
		leaveMessageDao.updateMessage(updateconditionMap);
	}
}
