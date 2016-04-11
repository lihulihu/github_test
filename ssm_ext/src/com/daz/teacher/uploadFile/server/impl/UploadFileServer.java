package com.daz.teacher.uploadFile.server.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daz.teacher.uploadFile.dao.iUploadFileDao;
import com.daz.teacher.uploadFile.pojo.uploadFilePojo;
import com.daz.teacher.uploadFile.server.iUploadFileServer;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
@Service
public class UploadFileServer implements iUploadFileServer{
	@Autowired
	private iUploadFileDao uploadFileDao;
	public int addFile(uploadFilePojo uploadFilePojo) throws Exception{
		return uploadFileDao.addFile(uploadFilePojo);
	}
	public PageInfo<uploadFilePojo> searchFile(Map<String, Object> searchconditionMap,
			int pageNum,int pageSize)throws Exception{
		PageHelper.startPage(pageNum, pageSize);
		List<uploadFilePojo> list = uploadFileDao.getFileList(searchconditionMap);
		return new PageInfo<>(list);
	}
	public int deleteFile(Map<String, Object> delectConditionMap)throws Exception{
		return uploadFileDao.deleteFile(delectConditionMap);
	}
	public int updateFile(uploadFilePojo uploadFilePojo) throws Exception{
		return uploadFileDao.updateFile(uploadFilePojo);
	}
}
