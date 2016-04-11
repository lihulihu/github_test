package com.daz.common.announcement.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.common.announcement.dao.IAnnouncementDao;
import com.daz.common.announcement.pojo.Announcement;
import com.daz.common.announcement.server.IAnnouncementServer;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class AnnouncementServer implements IAnnouncementServer{
	@Autowired
	private IAnnouncementDao announcementDao;
	public PageInfo<Announcement>searchAnnouncements(Map<String, Object> searchconditionMap,
			int pageNum,int pageSize) throws Exception{
		PageHelper.startPage(pageNum, pageSize);
		List<Announcement> list = announcementDao.searchAnnouncements(searchconditionMap);
		return new PageInfo<>(list);
	}
	public int addAnnouncement(Announcement announcement) throws Exception{
		return announcementDao.addAnnouncement(announcement);
	}
	public int delAnnouncement(List<String> delList) throws Exception{
		return announcementDao.deleteAnnouncement(delList);
	}
	public int updateAnnouncement(Announcement announcement) throws Exception{
		return announcementDao.updateAnnoumcement(announcement);
	}
}
