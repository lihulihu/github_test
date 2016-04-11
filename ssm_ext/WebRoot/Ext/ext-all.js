/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
	Ext.data.Store.prototype.createComparator = function(sorters){
		return function(r1, r2){
			var s = sorters[0], f=s.property;
			var v1 = r1.data[f], v2 = r2.data[f];
			
			var result = 0;
			if(typeof(v1) == "string"){
				result = v1.localeCompare(v2);
				if(s.direction == 'DESC'){
					result *=-1;
				}
			} else {
				result =sorters[0].sort(r1, r2);
			}
			
			var length = sorters.length;
			
			for(var i = 1; i<length; i ++){
				s = sorters[i];
				f = s.property;
				v1 = r1.data[f];
				v2 = r2.data[f];
				if(typeof(v1) == "string"){
					result = result || v1.localeCompare(v2);
					if(s.direction == 'DESC'){
						result *=-1;
					}
				} else {
					result = result || s.sort.call(this, r1, r2);
				}
			}
			return result;
		};
	};