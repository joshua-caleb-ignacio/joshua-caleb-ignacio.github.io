/*
 * Left/Start trim for strings
 */
String.prototype.ltrim = function()
{
  return this.replace(/^\s+/g, '');
}

/*
 * Right/End trim for strings
 */
String.prototype.rtrim = function()
{
  return this.replace(/\s+$/g, '');
}

String.prototype.occurrences = function(subString, allowOverlapping) {
    let string = this;
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

/*
 * Returns the value of the indicated URL parameter name
 *
 * @param {Text} name The URL parameter name to get the value of
 * @return {Text} The value of the URL parameter specified
 */
window.location.get = function(name, defaultValue = null)
{
  // Use regex on location.href if URLSearchParams is not supported
  let paramValue = new RegExp('[\?&]' + name + '=([^&#]*)').exec(this.href);
  if (paramValue == null || (paramValue && !paramValue[1])) {
    if (defaultValue != null) {
      return defaultValue;
    }
    return null;
  }
  else {
    return decodeURI(paramValue[1]).ltrim().rtrim().replace(/\s\s+/g, ' ');
  }
};

/**
 * Determines if the local operating system has a preferred color scheme.
 * If none then we use the current time and checks if we consider it
 * 'dark' based on specific time ranges or not.
 * @return {boolean} Returns true if the current time falls within the
 *   'dark' time range, otherwise false.
 */
window.isDark = function() {
  const dark = '(prefers-color-scheme: dark)';
  const light = '(prefers-color-scheme: light)';
  const matchMedia = window.matchMedia;

  if (matchMedia && matchMedia(dark).matches) {
    return true;
  }

  if (matchMedia && matchMedia(light).matches) {
    return false;
  }

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let ampm = hours >= 12 ? 'pm' : 'am';

  // the hour '0' should be '12'
  let adjustedHours = hours % 12;
  adjustedHours = adjustedHours ? adjustedHours : 12;

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = `${adjustedHours}:${formattedMinutes} ${ampm}`;

  if (
    (adjustedHours >= 6 && adjustedHours <= 11 && ampm === 'pm') ||
    (adjustedHours >= 1 && adjustedHours <= 6 && ampm === 'am') ||
    (adjustedHours === 12 && ampm === 'am')
  ) {
    return true;
  }
  return false;
}

const BG_COLORS = [
  'f4c7c2',
  'f6cbc2',
  'f7cfbf',
  'fad3bd',
  'fcd9ba',
  'feddb6',
  'ffe2b4',
  'ffe6b2',
  'fbe8b2',
  'f7e9b4',
  'efe9b7',
  'e5e9ba',
  'dce7bf',
  'd1e5c4',
  'c6e3c7',
  'bee2cb',
  'b1e0c8',
];

const FG_COLORS = [
  '45140e',
  '46130a',
  '461403',
  '4a1800',
  '552200',
  '5f2c00',
  '683600',
  '6f4000',
  '704500',
  '6a4804',
  '61480c',
  '564812',
  '484817',
  '38451b',
  '29431d',
  '174120',
  '054021',
];

function colorScaler(percent) {
  percent = Math.max(0, Math.min(100, percent));
  return Math.round((percent * 16) / 100);
}

function dynamicStatusIcon(percent) {
  if (percent == 100) {
    return '✓';
  }
  if (percent >= 0 && percent <= 25) {
    return '✕';
  }
  return '?';
}

console.partly = function (message) {
  console.log(`%c[?] ${message}`, 'background-color: #fce8b2; color: #704500; padding: 2px 5px; border-radius: 3px; font-weight: bold;');
};

console.valid = function (message) {
  console.log(`%c[✓] ${message}`, 'background-color: #b1e0c8; color: #054021; padding: 2px 5px; border-radius: 3px; font-weight: bold;');
};

console.invalid = function (message) {
  console.log(`%c[✕] ${message}`, 'background-color: #f4c8c3; color: #45140e; padding: 2px 5px; border-radius: 3px; font-weight: bold;');
};

console.dynamic = function (message, count, total) {
  console.log(`%c[${dynamicStatusIcon(count / total * 100)}] ${message}`, `background-color: #${BG_COLORS[colorScaler(count / total * 100)]}; color: #${FG_COLORS[colorScaler(count / total * 100)]}; padding: 2px 5px; border-radius: 3px; font-weight: bold;`);
};

console.partlyGroup = function (message) {
  console.groupCollapsed(`%c[?] ${message}`, 'background-color: #fce8b2; color: #704500; padding: 2px 5px; border-radius: 3px; font-weight: bold;');
};

console.validGroup = function (message) {
  console.groupCollapsed(`%c[✓] ${message}`, 'background-color: #b1e0c8; color: #054021; padding: 2px 5px; border-radius: 3px; font-weight: bold;');
};

console.invalidGroup = function (message) {
  console.groupCollapsed(`%c[✕] ${message}`, 'background-color: #f4c8c3; color: #45140e; padding: 2px 5px; border-radius: 3px; font-weight: bold;');
};

console.dynamicGroup = function (message, count, total) {
  console.groupCollapsed(`%c[${dynamicStatusIcon(count / total * 100)}] ${message}`, `background-color: #${BG_COLORS[colorScaler(count / total * 100)]}; color: #${FG_COLORS[colorScaler(count / total * 100)]}; padding: 2px 5px; border-radius: 3px; font-weight: bold;`);
};

var isDark = window.isDark();
var isDarkQuery = window.location.get("dark");
var isLightQuery = window.location.get("light");
if (isDarkQuery !== null || isLightQuery !== null) {
  if (isDarkQuery == 'false' || isLightQuery == 'true') {
    isDark = false;
  } else if (isDarkQuery == 'true' || isLightQuery == 'false') {
    isDark = true;
  }
}

// Add dark mode class to any page using extend.js
function applyDarkMode() {
  if (isDark) {
     document.querySelector("body").classList.add('dark');
   }
}
const interval = setInterval(applyDarkMode, 1800000);

applyDarkMode();
clearInterval(interval);
// Version 4.0
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}