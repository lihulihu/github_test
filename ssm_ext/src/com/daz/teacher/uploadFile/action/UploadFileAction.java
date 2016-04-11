package com.daz.teacher.uploadFile.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.daz.common.announcement.pojo.Announcement;
import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.daz.teacher.uploadFile.pojo.uploadFilePojo;
import com.daz.teacher.uploadFile.server.iUploadFileServer;
import com.github.pagehelper.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.thoughtworks.xstream.io.path.Path;

public class UploadFileAction extends ActionSupport{
	@Autowired
	private iUploadFileServer uploadFileServer;
	@Autowired
	private iTeacherServer teacherServer;
	private String uploadContentType; 
    private File upload; 
    private String uploadFileName;
    private String Path; 
    private String teacherId;
    private PageInfo<uploadFilePojo> fileList;
    private String page;
    private String limit;
    private String fileId;
    public Boolean success;
    public String message;
	public String addFile(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		String realPath = "E:\\" +teacherId+"\\"+uploadFileName; 
		File pathFile = new File("E:\\"+teacherId);
		if(!pathFile.isDirectory()){
			pathFile.mkdir();
		}
		if(new File(realPath).exists()){
			this.setSuccess(false);
			this.setMessage("文件已存在");
			return "failed";
		}
        if (upload.isFile()) { 
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
                uploadFilePojo fileInfo = new uploadFilePojo();
                fileInfo.setFileName(uploadFileName);
                fileInfo.setTeacherId(teacherId);
                fileInfo.setFilePath(realPath);
                uploadFileServer.addFile(fileInfo);
                this.setSuccess(true);
               
            } catch (Exception e) { 
                e.printStackTrace(); 
                this.setSuccess(false);
                this.setMessage("系统错误");
                return "failed"; 
                
            }
                                                                 
        } 
		return SUCCESS;
	}
	public String photoPath(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		String imgpath = "\\photo\\"+teacherId+"\\";
		String path = ServletActionContext.getServletContext().getRealPath("/");
		return path+imgpath;
	}
	public String uploadPhoto(){
		
		String realPath =  photoPath()+	uploadFileName;	
        if (upload != null) {
        	File pathFile = new File(photoPath());
    		if(!pathFile.isDirectory()){
    			pathFile.mkdir();
    		}
    		else{
    			deleteFile(pathFile);
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
                teacher teacherInfo = new teacher();
                
                teacherInfo.setTeacherId(teacherId);
                teacherInfo.setPhoto("photo/"+teacherId+"/"+uploadFileName);
                teacherServer.updateTeacher(teacherInfo);
                this.setSuccess(true);
                this.setPath("photo/"+teacherId+"/"+uploadFileName);
            } catch (Exception e) { 
                e.printStackTrace(); 
                this.setSuccess(false);
                this.setMessage("系统错误");
                return "failed"; 
                
            }
                                                                 
        } 
        else{
        	this.setSuccess(false);
            this.setMessage("请选择图片");
        }
		return SUCCESS;
	}
	public String deletePhoto(){
		teacher teacher = new teacher();
		teacher.setTeacherId(teacherId);
		teacher.setPhoto("");
		try {
			teacherServer.updateTeacher(teacher);
		} catch (Exception e) {
			e.printStackTrace();
		}
		File pathFile = new File(photoPath());
		if(!pathFile.isDirectory()){
			pathFile.mkdir();
		}
		else{
			deleteFile(pathFile);
		}
		return SUCCESS;
	}
	public String history(){
		int s=0;
		int l=0;
		if(page!=null){
			s = Integer.parseInt(page);
		}
		if(limit != null){
			l = Integer.parseInt(limit);
		}
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		Map<String, Object> searchconditionMap = new HashMap<String, Object>();
		searchconditionMap.put("teacherId", teacherId);
		try {
			fileList = uploadFileServer.searchFile(searchconditionMap, s, l);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	public String delect(){
		Map<String, Object> session = ActionContext.getContext().getSession();
		teacherId = (String)session.get("userId");
		Map<String, Object> delectConditionMap = new HashMap<>();
		delectConditionMap.put("fileId", fileId);
		try {
			if(1 != uploadFileServer.deleteFile(delectConditionMap)){
				return "failed";
			}
			File file = new File("E:\\" +teacherId+"\\"+ uploadFileName);
			if(file.exists()){
				file.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return SUCCESS;
	}
	public String downLoad(){
		return SUCCESS;
	}
	public InputStream getDownloadFile(){
		System.out.println("下载");
		InputStream in = null;
		Map<String, Object> searchconditionMap = new HashMap<String, Object>();
		searchconditionMap.put("fileId", fileId);
		try {
			fileList = uploadFileServer.searchFile(searchconditionMap, 0, 0);
			uploadFileName=(String)fileList.getList().get(0).getFileName();
			uploadFileName=new String(uploadFileName.getBytes(), "ISO8859-1");
			this.setUploadFileName(uploadFileName);
			String filePath = (String)fileList.getList().get(0).getFilePath();
			File fieFile = new File(filePath);
			if(fieFile.exists()){
				in = new FileInputStream(fieFile);				
			}
			uploadFileServer.updateFile(fileList.getList().get(0));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return in;
	}
	
	public void deleteFile(File oldPath) {
        if (oldPath.isDirectory()) {
        
         File[] files = oldPath.listFiles();
         for (File file : files) {
           deleteFile(file);
         }
        }else{
          oldPath.delete();
        }
      }
	public String getUploadContentType() {
		return uploadContentType;
	}
	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
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
	public void setUploadFileName (String uploadFileName){
		this.uploadFileName = uploadFileName;
	}
	public String getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	
	public PageInfo<uploadFilePojo> getFileList() {
		return fileList;
	}
	public void setFileList(PageInfo<uploadFilePojo> fileList) {
		this.fileList = fileList;
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
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPath() {
		return Path;
	}
	public void setPath(String path) {
		Path = path;
	}	
}
