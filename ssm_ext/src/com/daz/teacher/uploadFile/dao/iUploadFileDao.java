package com.daz.teacher.uploadFile.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.daz.teacher.uploadFile.pojo.uploadFilePojo;


@Repository
public interface iUploadFileDao {
	public int addFile(uploadFilePojo uploadFilePojo) throws Exception;
	public List<uploadFilePojo> getFileList(Map<String, Object> searchConditionMap)throws Exception;
	public int deleteFile(Map<String, Object> delectConditionMap)throws Exception;
	public int updateFile(uploadFilePojo uploadFilePojo) throws Exception;
}
