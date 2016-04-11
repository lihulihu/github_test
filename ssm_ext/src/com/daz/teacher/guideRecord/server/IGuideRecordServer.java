package com.daz.teacher.guideRecord.server;

import java.util.Map;

import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
import com.github.pagehelper.PageInfo;

public interface IGuideRecordServer {
	public void addGuideRecord(GuideRecordPojo guideRecordPojo) throws Exception;
	public PageInfo<GuideRecordPojo> selectGuideRecord(Map<String, Object> map,int pageNum,int pageSize) throws Exception;
	public Boolean deleteRecord(Map<String, Object> map) throws Exception;
	public Boolean updateRecord(GuideRecordPojo guideRecordPojo) throws Exception;
	public GuideRecordPojo selectOneGuideRecord(Map<String, Object> map) throws Exception;
}
