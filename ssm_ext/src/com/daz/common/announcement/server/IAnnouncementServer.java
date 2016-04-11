package com.daz.common.announcement.server;

import java.util.List;
import java.util.Map;

import com.daz.common.announcement.pojo.Announcement;
import com.github.pagehelper.PageInfo;
/**
 * 公告信息服务层
 * @author lihu
 * */
public interface IAnnouncementServer {
	/**
	 * 获取公告信息
	 * @param map
	 * @return PageInfo
	 * */
	public PageInfo<Announcement>searchAnnouncements(Map<String, Object> searchconditionMap,
			int pageNum,int pageSize) throws Exception;
	public int addAnnouncement(Announcement announcement) throws Exception;
	public int delAnnouncement(List<String> delList) throws Exception;
	public int updateAnnouncement(Announcement announcement) throws Exception;
}
