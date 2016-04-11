package com.daz.common.announcement.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.common.announcement.pojo.Announcement;
/**
 * 公告信息数据层接口
 * @author lihu
 * @version 1.0
 * */
@Repository
public interface IAnnouncementDao {
	/**
	 * 获取公告信息
	 * @param map
	 * @return List<Announcement>
	 * */
	public List<Announcement> searchAnnouncements(Map<String, Object> searchconditionMap) throws Exception;
	
	/**
	 * 新增公告信息
	 * @param announcement
	 * @return int
	 * */
	public int addAnnouncement(Announcement announcement) throws Exception;
	
	/**
	 * 更新公告信息
	 * @param announcement
	 * @return int
	 * */
	public int updateAnnoumcement(Announcement announcement) throws Exception;
	
	/**
	 * 删除公告信息
	 * @param map
	 * @return int
	 * */
	public int deleteAnnouncement(List<String> delList) throws Exception;
}
