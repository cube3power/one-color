window.one=window.one||{};one.include=one.exclude=function(){};one.color=one.color||{};(function(){var a=String.prototype;a.capitalize=function(){return this.charAt(0).toUpperCase()+this.substring(1)}}());one.color.installedColorSpaces=[];one.color.installColorSpace=function(e,i,b){var c=i.map(function(j){return j.match(/[A-Z]/)[0].toLowerCase()}),d=i.map(function(j){return j.toLowerCase().capitalize()}),g=one.color[e]=new Function(c.join(","),"if (Object.prototype.toString.apply("+c[0]+") === '[object Array]') {"+c.map(function(j,k){return j+"="+c[0]+"["+k+"];"}).reverse().join("")+"}if ("+c.filter(function(j){return j!=="a"}).map(function(j){return"isNaN("+j+")"}).join("||")+'){throw "[one.color.'+e+']: Invalid color: ("+'+c.join('+","+')+'+")";}'+c.map(function(j){if(j==="h"){return"this.h=h<0?h-Math.floor(h):h%1"}else{if(j==="a"){return"this.a=(isNaN(a)||a>1)?1:(a<0?0:a);"}else{return"this."+j+"="+j+"<0?0:("+j+">1?1:"+j+")"}}}).join(";")+";"),h=g.prototype;g.propertyNames=c;g.longPropertyNames=d;["valueOf","toHex","toCSS","toCSSWithAlpha"].forEach(function(j){h[j]=h[j]||(e==="RGB"?h.toHex:new Function("return this.toRGB()."+j+"();"))});h.isColor=true;h.equals=function(l,k){if(typeof k==="undefined"){k=1e-10}l=l["to"+e]();for(var j=0;j<c.length;j=j+1){if(Math.abs(this[c[j]]-l[c[j]])>k){return false}}return true};h.toJSON=new Function("return ['"+e+"', "+c.map(function(j){return"this."+j},this).join(", ")+"];");if(b.fromRGB){one.color.RGB.prototype["to"+e]=b.fromRGB;delete b.fromRGB}for(var a in b){if(b.hasOwnProperty(a)){h[a]=b[a]}}h["to"+e]=function(){return this};h.toString=new Function('return "[one.color.'+e+':"+'+c.map(function(j,k){return'" '+d[k]+'="+this.'+j}).join("+")+'+"]";');c.forEach(function(j,k){var l=d[k];h["get"+l]=new Function("return this."+j+";");h["set"+l]=new Function("newValue","return new one.color."+e+"("+c.map(function(n,m){return j===n?"newValue":"this."+n}).join(", ")+");");h["adjust"+l]=new Function("delta","return new one.color."+e+"("+c.map(function(n,m){return"this."+n+(j===n?"+delta":"")}).join(", ")+");")});function f(k,j){var l={};l["to"+j]=new Function("return this.toRGB().to"+j+"();");one.color[j].propertyNames.forEach(function(p,n){var o=one.color[j].longPropertyNames[n];l["get"+o]=new Function("return this.to"+j+"().get"+o+"();");l["set"+o]=new Function("newValue","return this.to"+j+"().set"+o+"(newValue);");l["adjust"+o]=new Function("delta","return this.to"+j+"().adjust"+o+"(delta);")});for(var m in l){if(l.hasOwnProperty(m)&&one.color[k].prototype[m]===undefined){one.color[k].prototype[m]=l[m]}}}one.color.installedColorSpaces.forEach(function(j){f(e,j);f(j,e)});one.color.installedColorSpaces.push(e)};one.color.installColorSpace("RGB",["Red","Green","Blue","Alpha"],{toHex:function(){var a=(Math.round(255*this.r)*65536+Math.round(255*this.g)*256+Math.round(255*this.b)).toString(16);return"#"+("00000".substr(0,6-a.length))+a},toCSS:function(){return"rgb("+Math.round(255*this.r)+","+Math.round(255*this.g)+","+Math.round(255*this.b)+")"},toCSSWithAlpha:function(){return"rgba("+Math.round(255*this.r)+","+Math.round(255*this.g)+","+Math.round(255*this.b)+","+this.a+")"}});one.color.fromHex=function(a){if(a.length<6){a=a.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3")}var b=a.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(b){return new one.color.RGB(parseInt(b[1],16)/255,parseInt(b[2],16)/255,parseInt(b[3],16)/255)}};one.color.rgbaRegex=/^rgba?\(\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*,\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*,\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*(?:,\s*(\.\d+|\d+(?:\.\d+))\s*)?\)/i;one.color.fromCSSRGBA=function(a){var b=a.match(one.color.rgbaRegex);if(b){return new one.color.RGB(parseFloat(b[0])/(b[1]?100:255),parseFloat(b[2])/(b[3]?100:255),parseFloat(b[4])/(b[5]?100:255),parseFloat(b[6]))}};one.color.parse=function(a){if(a.charCodeAt){return one.color.fromCSSRGBA(a)||one.color.fromHex(a)}else{if(typeof a==="object"&&a.isColor){return a}else{if(Object.prototype.toString.apply(a)==="[object Array]"){return new one.color[a[0]](a.slice(1,a.length))}else{if(!isNaN(a)){return new one.color.RGB((a&255)/255,((a&65280)>>8)/255,((a&16711680)>>16)/255)}}}}return false};one.color.installColorSpace("HSV",["Hue","Saturation","Value","Alpha"],{toRGB:function(){var h,e,a,d=Math.min(5,Math.floor(this.h*6)),k=this.h*6-d,l=this.v*(1-this.s),j=this.v*(1-k*this.s),c=this.v*(1-(1-k)*this.s);switch(d){case 0:h=this.v;e=c;a=l;break;case 1:h=j;e=this.v;a=l;break;case 2:h=l;e=this.v;a=c;break;case 3:h=l;e=j;a=this.v;break;case 4:h=c;e=l;a=this.v;break;case 5:h=this.v;e=l;a=j;break}return new one.color.RGB(h,e,a,this.a)},toHSL:function(){var b=this.s*this.v,a=(2-this.s)*this.v;return new one.color.HSL(this.h,b/(a<=1?a:(2-a)),a/2,this.a)},fromRGB:function(){var a=Math.max(this.r,this.g,this.b),c=Math.min(this.r,this.g,this.b),f=a-c,e,d=(a===0)?0:(f/a),b=a;if(f===0){e=0}else{switch(a){case this.r:e=(this.g-this.b)/f/6+(this.g<this.b?1:0);break;case this.g:e=(this.b-this.r)/f/6+1/3;break;case this.b:e=(this.r-this.g)/f/6+2/3;break}}return new one.color.HSV(e,d,b,this.a)}});one.color.installColorSpace("HSL",["Hue","Saturation","Lightness","Alpha"],{toHSV:function(){var b=this.s,a=this.l*2;if(a<=1){b*=a}else{b*=(2-a)}return new one.color.HSV(this.h,(2*b)/(a+b),(a+b)/2,this.a)},toRGB:function(){return this.toHSV().toRGB()},fromRGB:function(){return this.toHSV().toHSL()}});one.color.installColorSpace("CMYK",["Cyan","Magenta","Yellow","blacK","Alpha"],{toRGB:function(){return new one.color.RGB((1-this.c*(1-this.k)-this.k),(1-this.m*(1-this.k)-this.k),(1-this.y*(1-this.k)-this.k),this.a)},fromRGB:function(){var e=1-this.r,a=1-this.g,d=1-this.b,b=1;if(this.r||this.g||this.b){b=Math.min(e,Math.min(a,d));e=(e-b)/(1-b);a=(a-b)/(1-b);d=(d-b)/(1-b)}else{b=1}return new one.color.CMYK(e,a,d,b,this.a)}});