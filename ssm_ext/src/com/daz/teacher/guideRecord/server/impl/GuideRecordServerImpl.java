package com.daz.teacher.guideRecord.server.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.teacher.guideRecord.dao.IGuideRecordDao;
import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
import com.daz.teacher.guideRecord.server.IGuideRecordServer;
@Service
public class GuideRecordServerImpl implements IGuideRecordServer{
	@Autowired
	private IGuideRecordDao guideRecordDao;
	public void addGuideRecord(GuideRecordPojo guideRecordPojo) throws Exception{
		guideRecordDao.insertGuideRecord(guideRecordPojo);
	}
}
