package com.daz.teacher.guideRecord.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
@Repository
public interface IGuideRecordDao {
	public int insertGuideRecord(GuideRecordPojo guideRecordPojo) throws Exception;
	public List<GuideRecordPojo> selectGuideRecord(Map<String, Object> map) throws Exception;
	public int deleteRecord(Map<String, Object> map) throws Exception;
	public int updateRecord(GuideRecordPojo guideRecordPojo) throws Exception;
}
