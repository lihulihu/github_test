package com.daz.teacher.uploadFile.server;

import java.util.Map;

import com.daz.teacher.uploadFile.pojo.uploadFilePojo;
import com.github.pagehelper.PageInfo;

public interface iUploadFileServer {
	public int addFile(uploadFilePojo uploadFilePojo) throws Exception;
	public PageInfo<uploadFilePojo> searchFile(Map<String, Object> searchconditionMap,
			int pageNum,int pageSize)throws Exception;
	public int deleteFile(Map<String, Object> delectConditionMap)throws Exception;
	public int updateFile(uploadFilePojo uploadFilePojo) throws Exception;
}
