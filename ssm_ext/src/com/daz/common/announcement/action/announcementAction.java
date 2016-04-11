package com.daz.common.announcement.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.directwebremoting.export.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.daz.common.announcement.server.IAnnouncementServer;
import com.github.pagehelper.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.daz.common.announcement.pojo.Announcement;
import com.daz.teacher.teacherInfo.pojo.teacher;
@SuppressWarnings("serial")
public class announcementAction extends ActionSupport{
	public PageInfo<Announcement> items;
	public String page;
	public String limit;
	public String id;
	public String text;
	public String title;
	public String abstracts;
	public Boolean success;
	public String dels;
	private File upload; 
    private String uploadFileName;
    private String Path;
    private String photoWidth;
    private String photoHeight;
	@Autowired
	private IAnnouncementServer announcementServer;
	/**
	 * 获取公告信息
	 * */
	public String Announcement(){
		int s=0;
		int l=0;
		if(page!=null){
			s = Integer.parseInt(page);
		}
		if(limit != null){
			l = Integer.parseInt(limit);
		}
		Map<String, Object> searchconditionMap = new HashMap<String, Object>();
		try {
			items = announcementServer.searchAnnouncements(searchconditionMap, s, l);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String addOrUpdateAnnouncement(){
		Announcement announcement = new Announcement();
		announcement.setTitle(title);
		announcement.setText(text);
		announcement.setAbstracts(abstracts);
		announcement.setInputDate(new Date());
		System.out.println(id);
		try {
			if(id != null && !"".equals(id)){
				System.out.println("gengxin");
				announcement.setId(id);
				announcementServer.updateAnnouncement(announcement);
			}
			else{
				System.out.println("xinjia");
				announcementServer.addAnnouncement(announcement);
			}
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		this.setSuccess(true);
		return SUCCESS;
	}
	public String delAnnouncement(){
		String[] announcement = dels.split(",");
		List<String> delList = new ArrayList<>();
		Collections.addAll(delList, announcement);
		try {
			announcementServer.delAnnouncement(delList);
		} catch (Exception e) {
			this.setSuccess(false);
			e.printStackTrace();
		}
		this.setSuccess(true);
		return SUCCESS;
	}
	
	public String photoPath(){
		String imgpath = "\\announcementPhoto\\";
		String path = ServletActionContext.getServletContext().getRealPath("/");
		return path+imgpath;
	}
	public String uploadPhotoForM(){
		String realPath =  photoPath()+	uploadFileName;	
        if (upload != null) {
        	File pathFile = new File(photoPath());
    		if(!pathFile.isDirectory()){
    			pathFile.mkdir();
    		}
        	try { 
        		BufferedInputStream bis = new BufferedInputStream( 
                    new FileInputStream(upload)); 
        		BufferedOutputStream bos = null; 
                bos = new BufferedOutputStream(new FileOutputStream(realPath));
                byte[] buff = new byte[8192]; 
                for (int len = -1; (len = bis.read(buff)) != -1;) { 
                    bos.write(buff, 0, len); 
                } 
                bos.flush(); 
                bis.close(); 
                bos.close();
                this.setSuccess(true);
                this.setPath("announcementPhoto\\"+uploadFileName);
            } catch (Exception e) { 
                e.printStackTrace(); 
                this.setSuccess(false);               
            }
                                                                 
        } 
        else{
        	this.setSuccess(false);
        }
		return SUCCESS;
	}
	public PageInfo<Announcement> getItems() {
		return items;
	}
	public void setItems(PageInfo<Announcement> items) {
		this.items = items;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getDels() {
		return dels;
	}
	public void setDels(String dels) {
		this.dels = dels;
	}
	public File getUpload() {
		return upload;
	}
	public void setUpload(File upload) {
		this.upload = upload;
	}
	public String getUploadFileName() {
		return uploadFileName;
	}
	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}
	public String getPath() {
		return Path;
	}
	public void setPath(String path) {
		Path = path;
	}
	public String getAbstracts() {
		return abstracts;
	}
	public void setAbstracts(String abstracts) {
		this.abstracts = abstracts;
	}
	public String getPhotoWidth() {
		return photoWidth;
	}
	public void setPhotoWidth(String photoWidth) {
		this.photoWidth = photoWidth;
	}
	public String getPhotoHeight() {
		return photoHeight;
	}
	public void setPhotoHeight(String photoHeight) {
		this.photoHeight = photoHeight;
	}
	
}
