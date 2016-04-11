Ext.define("Ext.ux.XHtmlEditor",{
        extend:"Ext.form.field.HtmlEditor",
        alias:"widget.xhtmleditor",
        //扩展的属性
        uploadConfig:{
            url:""//后台上传地址
        },
        initComponent : function(){
            this.callParent(arguments);
            var me = this;
            //创建组件
            me.initExtFun = function(){
                Ext.create("Ext.window.Window",{
                    title:"插入图片",
                    resizable:false,
                    border:false,
                    modal:true,
                    frame:false,
                    iconCls:"Photoadd",
                    items:[
                        {
                            xtype:"form",
                            width:320,
                            height:140,
                            padding:10,
                            border:false,
                            items:[
                                {
                                    width:280,
                                    labelAlign:"right",
                                    labelWidth:60,
                                    xtype:"filefield",
                                    name:"upload",
                                    allowBlank:false,
                                    fieldLabel:"选择图片",
                                    buttonText:"浏览..."
                                },{
                                	xtype:'numberfield',
                                	fieldLabel: '宽',
                                    name: 'photoWidth',
                                    minValue: 1
                                }, {
                                	xtype:'numberfield',
                                    fieldLabel: '高',
                                    name: 'photoHeight',
                                    minValue: 1
                                }
                            ]
                        }
                    ],
                    buttons:[
                        {
                            text:"上传",
                            handler:function(b,e){
                                //实现上传,完成之后插入带编辑器
                                var form = b.up("window").down("form");
                                form.submit({
                                    waitMsg:"正在上传...",
                                    clientValidation: true,
                                    url:me.uploadConfig.url,
                                    success:function(form,action){
                                        //返回图片路径
                                        var path = action.result.path;
                                        var width = action.result.photoWidth;
                                        var height = action.result.photoHeight;
                                        //将图片插入到光标所在的位置
                                        me.insertAtCursor("<img src='"+path+"' width='"+width+"' height='"+height+"'/>");
                                        b.up("window").close();
                                    },
                                    failure:function(form,action){
                                            switch (action.failureType) {
                                                case Ext.form.action.Action.CLIENT_INVALID:
                                                    Ext.Msg.alert("提示","客户端验证不通过!");
                                                    break;
                                                default:
                                                    Ext.Msg.alert("保存失败,",action.result.message);
                                            }
                                        }    
                                    });
                            }
                        },
                        {
                            text:"取消",
                            handler:function(b,e){
                                b.up("window").close();
                            }
                        }
                    ]
                }).show();
            };
            var b = Ext.create("Ext.button.Button",{
                xtype:"button",
                iconCls:"Photoadd",
                tooltip:"上传图片",
                text:"",
                listeners:{
                    click:function(b,e){
                         me.initExtFun();
                    }
                }
            });
            me.getToolbar().add(b);
        }
    });