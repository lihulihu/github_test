package com.daz.teacher.guideRecord.dao;

import org.springframework.stereotype.Repository;

import com.daz.teacher.guideRecord.pojo.GuideRecordPojo;
@Repository
public interface IGuideRecordDao {
	public int insertGuideRecord(GuideRecordPojo guideRecordPojo) throws Exception;
}
