package com.daz.teacher.menuTree.pojo;

/**
 * Menutree entity. @author MyEclipse Persistence Tools
 */

public class menuTreePojo implements java.io.Serializable {

	// Fields

	private String id;
	private String text;
	private boolean leaf;
	private String parent;
	private String iconCls;
	private String idenTity;
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

	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getIdenTity() {
		return idenTity;
	}
	public void setIdenTity(String idenTity) {
		this.idenTity = idenTity;
	}
	

}
