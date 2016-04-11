package com.daz.manager.excel.action;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.stream.FileImageInputStream;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import com.daz.common.publicDict.pojo.publicDictPojo;
import com.daz.common.publicDict.server.IPublicDictServer;
import com.daz.manager.teacherRelStudent.server.ITeacherRelStudentServer;
import com.daz.teacher.teacherInfo.pojo.TeacherInsertInfo;
import com.daz.teacher.teacherInfo.pojo.teacher;
import com.daz.teacher.teacherInfo.server.iTeacherServer;
import com.opensymphony.xwork2.ActionSupport;

public class TeacherExcel extends ActionSupport{
	private File upload; 
    private String uploadFileName;
    private String uploadContentType;
    private int num;
    private Boolean success;
    @Autowired
    public iTeacherServer teacherServer;
    @Autowired
    public IPublicDictServer publicDictServer;
	public String importTeacher(){
		String[] type={".xls",".xlsx"};
		Boolean flag=false;
        for(int i = 0;i<type.length;i++){
        	if(type[i].equals(uploadContentType)){
        		flag=true;
        		break;
        	}
        }
        if(upload.isFile()){
        	InputStream input = null;
            try {
            	input = new FileInputStream(upload);
            	XSSFWorkbook workBook;
            	workBook = new XSSFWorkbook(input);
				XSSFSheet sheet = workBook.getSheetAt(0);  
	            if (sheet != null)  
	            {  
	            	List<TeacherInsertInfo> teachersList = new ArrayList<>();
	            	num=0;
	                for (int i = 1; i < sheet.getPhysicalNumberOfRows();i++)  
	                {  
	                	XSSFRow row = sheet.getRow(i);
	                	TeacherInsertInfo t = new TeacherInsertInfo();
	                    if("".equals(row.getCell(0).toString().trim())){
	                    	break;
	                    }
	                    t.setTeacherName(row.getCell(0).toString());
	                    if("".equals(row.getCell(1).toString().trim())){
	                    	break;
	                    }
	                    Map<String, Object> searchConditionMap = new HashMap<>();
	            		searchConditionMap.put("account", row.getCell(1).toString());
	            		try {
							if(teacherServer.getTeacherInfo(searchConditionMap).size()>0){
								break;
							}
						} catch (Exception e1) {
							e1.printStackTrace();
						};
	                    t.setAccount(row.getCell(1).toString());
	                    if("".equals(row.getCell(2).toString().trim())){
	                    	break;
	                    }
	                    t.setPassword(row.getCell(2).toString());
	                   
	                    if("".equals(row.getCell(3).toString().trim())){
	                    	break;
	                    }
	                    Map<String, Object> map= new HashMap<>();
	                    map.put("publicCode", "teacher job");
	                    map.put("valueName", row.getCell(3).toString());
	                    try {
							publicDictPojo re = publicDictServer.searchOnePublicDict(map);
							if(re!=null){
								t.setJob(re.getValueId());
							}
							else{
								break;
							}
							 
						} catch (Exception e) {
							e.printStackTrace();
						}
	                   	                 	                    
	                    if("".equals(row.getCell(4).toString().trim())){
	                    	break;
	                    }
	                    map.put("publicCode", "political status");
	                    map.put("valueName", row.getCell(4).toString());
	                    try {
							publicDictPojo re = publicDictServer.searchOnePublicDict(map);
							if(re!=null){
								t.setPolitical(re.getValueId());
							}
							else{
								break;
							}
							 
						} catch (Exception e) {
							e.printStackTrace();
						}	                    
	                    
	                    if("".equals(row.getCell(5).toString().trim())){
	                    	break;
	                    }
	                    map.put("publicCode", "academy");
	                    map.put("valueName", row.getCell(5).toString());
	                    try {
							publicDictPojo re = publicDictServer.searchOnePublicDict(map);
							if(re!=null){
								t.setAcademy(re.getValueId());
							}
							else{
								break;
							}
							 
						} catch (Exception e) {
							e.printStackTrace();
						}
	                    teachersList.add(t);	
	                    num++;
						}
	                //teacherServer.addTeacherBatch(teachersList);
	                this.setSuccess(true);
	                }
    		} catch (IOException e) {
    			e.printStackTrace();
    			this.setSuccess(false);
    		}
        }
		return SUCCESS;
	}
	public String downLoad(){
		return SUCCESS;
	}
	public InputStream getInputStream(){
		 System.out.println("进去");
		 InputStream inputStream = null;
		 String[] title={"姓名","登录账号","密码","职称","政治面貌","学院"};
		 uploadFileName="导师信息.xlsx";
		 try {
			uploadFileName=new String(uploadFileName.getBytes(), "ISO8859-1");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		 
		 this.setUploadFileName(uploadFileName);
		 try{
			 
		 System.out.println(uploadFileName);
		 XSSFWorkbook workBook = new XSSFWorkbook();
		 System.out.println(uploadFileName);
         XSSFFont font = workBook.createFont();    
         font.setFontName("黑体");    
         font.setFontHeightInPoints((short) 13);//设置字体大小  
         XSSFCellStyle style = workBook.createCellStyle();
         style.setAlignment(XSSFCellStyle.ALIGN_CENTER);
         //style.setAlignment(XSSFCellStyle.VERTICAL_CENTER);
         style.setFont(font);
         XSSFSheet sheet = workBook.createSheet("导出excel"); 
         System.out.println("biaotou");
         // 构建表头  
         XSSFRow headRow = sheet.createRow(0);
         XSSFCell cell = null; 
         for(int i=0;i<title.length;i++){
        	 cell = headRow.createCell(i);  
             cell.setCellValue(title[i]); 
             cell.setCellStyle(style);
             sheet.autoSizeColumn((short ) i);
         }
         List<teacher> list =null;
         System.out.println("list");
         
			list = teacherServer.getTeacherInfo(null);
			System.out.println(list.size());
			if(list != null){
				for(int i=0;i<list.size();i++){
					teacher t = list.get(i);
					
					XSSFRow bodyRow = sheet.createRow(i+1);
					cell = bodyRow.createCell(0);  
                	cell.setCellValue(t.getTeacherName());
                	cell = bodyRow.createCell(1);  
                	cell.setCellValue(t.getAccount());
                	cell = bodyRow.createCell(2);  
                	cell.setCellValue(t.getPassword());
                	cell = bodyRow.createCell(3);  
                	cell.setCellValue(t.getJob().getValueName());
                	cell = bodyRow.createCell(4);  
                	cell.setCellValue(t.getPolitical().getValueName());
                	cell = bodyRow.createCell(5);  
                	cell.setCellValue(t.getAcademy().getValueName());
				}
			}
	
         ByteArrayOutputStream output = new ByteArrayOutputStream();
         System.out.println("ddd");
         
			workBook.write(output);
			byte[] ba = output.toByteArray();
			inputStream= new ByteArrayInputStream(ba);
		} catch (Exception e) {
			e.printStackTrace();
		}
         System.out.println("dddd");
		return inputStream;
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
	public String getUploadContentType() {
		return uploadContentType;
	}
	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	
}
