package com.daz.common.dwr;

import java.util.Collection;

import javax.servlet.ServletException;

import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;
import org.directwebremoting.WebContextFactory;


public class teacherPush{  
    public void onPageLoad(String userId) {  
    	 ScriptSession scriptSession = WebContextFactory.get().getScriptSession();
         scriptSession.setAttribute("userId", userId);
    }
    public void sendMessageAuto(String touserid, String message){
    	System.out.println("开始推送信息，推送模式为指定用户推送");
        final String touserId = touserid;  
        final String autoMessage = message;  
        ScriptBuffer script = new ScriptBuffer();
        script.appendCall("showMessage", autoMessage);
        Collection<ScriptSession> sessions = DWRScriptSessionListener.getScriptSessions();
        System.out.println(sessions.size());
        for (ScriptSession scriptSession : sessions){   
        	if(scriptSession.getAttribute("userId") != null && (scriptSession.getAttribute("userId")).equals(touserId)){
                scriptSession.addScript(script);
        	}
        	  
        } 
/*        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {  
            public boolean match(ScriptSession session){ 
            	System.out.println(session.getAttribute("userId"));
                if (session.getAttribute("userId") == null)  
                    return false;  
                else { 
                    return (session.getAttribute("userId")).equals(touserId);
                 
                }
            }  
        }, new Runnable(){  
               
            private ScriptBuffer script = new ScriptBuffer();  
               
            public void run(){ 
            	System.out.println("1111");
                script.appendCall("showMessage", autoMessage);                    
                //Collection<ScriptSession> sessions = DWRScriptSessionListener.getScriptSessions(); 
                Collection<ScriptSession> sessions=Browser.getTargetSessions();
                System.out.println(sessions.size());
                for (ScriptSession scriptSession : sessions){ 
                	System.out.println(scriptSession.toString());
                    scriptSession.addScript(script);  
                }  
            }  
        });*/  
    }  
}
