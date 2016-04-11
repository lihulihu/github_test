package com.daz.common.message;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

/**
 * 
 * 消息工具
 * 
 * @author yuxinchen
 * @version (1.0)
 */
public class MessageUtil {

	/**
	 * 
	 * getMsg:获取消息.<br>
	 * @param key 消息键
	 * @return
	 */
	private static WebApplicationContext applicationContext = ContextLoader
		      .getCurrentWebApplicationContext();
	public static String getMsg(String key) {
		MessageSource messageSource = applicationContext.getBean(MessageSource.class);
		return messageSource.getMessage(key, null, Locale.CHINA);
	}

}
