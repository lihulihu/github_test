package com.daz.teacher.guideRecord.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.teacher.guideRecord.dao.IGuideRecordDao;
import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
import com.daz.teacher.guideRecord.server.IGuideRecordServer;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class GuideRecordServerImpl implements IGuideRecordServer{
	@Autowired
	private IGuideRecordDao guideRecordDao;
	public void addGuideRecord(GuideRecordPojo guideRecordPojo) throws Exception{
		guideRecordDao.insertGuideRecord(guideRecordPojo);
	}
	public PageInfo<GuideRecordPojo> selectGuideRecord(Map<String, Object> map ,int pageNum,int pageSize) throws Exception{
		PageHelper.startPage(pageNum, pageSize);
		List<GuideRecordPojo> list = guideRecordDao.selectGuideRecord(map);
		return new PageInfo<>(list);
	}
	public Boolean deleteRecord(Map<String, Object> map) throws Exception{
		if(guideRecordDao.deleteRecord(map)>0){
			return true;
		}else{
			return false;
		}
	}
	public Boolean updateRecord(GuideRecordPojo guideRecordPojo) throws Exception{
		if(guideRecordDao.updateRecord(guideRecordPojo) == 1){
			return true;
		}else{
			return false;
		}
	}
}
