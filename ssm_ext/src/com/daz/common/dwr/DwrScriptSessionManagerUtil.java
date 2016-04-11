package com.daz.common.dwr;

import org.directwebremoting.impl.DefaultScriptSessionManager;


public class DwrScriptSessionManagerUtil extends DefaultScriptSessionManager {  
    public DwrScriptSessionManagerUtil(){  
           //绑定一个ScriptSession增加销毁事件的监听器  
           this.addScriptSessionListener( new DWRScriptSessionListener());  
           System. out.println( "监听器绑定成功");   
    }  
} 