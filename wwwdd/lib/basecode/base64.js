var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var base64DecodeChars = new Array(
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
          52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
          -1,0,1,2,3, 4,5,6,7,8,9, 10, 11, 12, 13, 14,
          15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
          -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if(i == len)
      {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
      }
      c2 = str.charCodeAt(i++);
      if(i == len)
      {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
        out += "=";
        break;
      }
      c3 = str.charCodeAt(i++);
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
      out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while(i < len && c1 == -1);
      if(c1 == -1)
      break;

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while(i < len && c2 == -1);
      if(c2 == -1)
      break;
      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
        return out;
        c3 = base64DecodeChars[c3];
      } while(i < len && c3 == -1);
      if(c3 == -1)
      break;
      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
        return out;
        c4 = base64DecodeChars[c4];
      } while(i < len && c4 == -1);
      if(c4 == -1)
      break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >>6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>0) & 0x3F));
      }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
      c = str.charCodeAt(i++);
      switch(c >> 4)
      {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;

        case 12: case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;

        case 14:
        // 1110 xxxx10xx xxxx10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
        break;
      }
    }
    return out;
}

function doit() {
  var f = document.f
  // f.output.value = base64encode(utf16to8(f.source.value))
  // f.decode.value = utf8to16(base64decode(f.output.value))
  f.output.value = utf16to8(f.source.value)
  f.decode.value = utf8to16(f.output.value)
}
//加密
function encrypt(str1, pwd) {
    var str = utf16to8(str1);
    if(pwd == null || pwd.length <= 0) {
      alert("Please enter a password with which to encrypt the message.");
      return null;
    }
    var prand = "";
    for(var i=0; i<pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    var sPos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
    var incr = Math.ceil(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    if(mult < 2) {
      alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
      return null;
    }
    var salt = Math.round(Math.random() * 1000000000) % 100000000;
    prand += salt;
    while(prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for(var i=0; i<str.length; i++) {
      enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
      if(enc_chr < 16) {
        enc_str += "0" + enc_chr.toString(16);
      } else enc_str += enc_chr.toString(16);
        prand = (mult * prand + incr) % modu;
      }
      salt = salt.toString(16);
      while(salt.length < 8)salt = "0" + salt;
      enc_str += salt;
      return enc_str;
}
//解密
function decrypt(str, pwd) {
    if(str == null || str.length < 8) {
      alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
      return;
    }
    if(pwd == null || pwd.length <= 0) {
      alert("Please enter a password with which to decrypt the message.");
      return;
    }
    var prand = "";
    for(var i=0; i<pwd.length; i++) {
      prand += pwd.charCodeAt(i).toString();
    }
    var sPos = Math.floor(prand.length / 5);
    var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
    var incr = Math.round(pwd.length / 2);
    var modu = Math.pow(2, 31) - 1;
    var salt = parseInt(str.substring(str.length - 8, str.length), 16);
    str = str.substring(0, str.length - 8);
    prand += salt;
    while(prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
    }
    prand = (mult * prand + incr) % modu;
    var enc_chr = "";
    var enc_str = "";
    for(var i=0; i<str.length; i+=2) {
      enc_chr = parseInt(parseInt(str.substring(i, i+2), 16) ^ Math.floor((prand / modu) * 255));
      enc_str += String.fromCharCode(enc_chr);
      prand = (mult * prand + incr) % modu;
    }
    return utf8to16(enc_str);
}
// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('g C="1C+/";g Q=1T 1N(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1M,-1,-1,-1,1K,1S,1G,1R,1B,1D,1E,2j,2l,2i,1a,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,2p,1H,2q,2m,1W,2d,2f,2k,2c,2b,2a,2e,1V,1U,1Z,1Y,1X,2o,2n,-1,-1,-1,-1,-1);M 2r(e){g d,i,k;g o,r,n;k=e.h;i=0;d="";y(i<k){o=e.l(i++)&P;m(i==k){d+=C.j(o>>2);d+=C.j((o&1d)<<4);d+="==";D}r=e.l(i++);m(i==k){d+=C.j(o>>2);d+=C.j(((o&1d)<<4)|((r&1l)>>4));d+=C.j((r&1p)<<2);d+="=";D}n=e.l(i++);d+=C.j(o>>2);d+=C.j(((o&1d)<<4)|((r&1l)>>4));d+=C.j(((r&1p)<<2)|((n&1s)>>6));d+=C.j(n&K)}q d}M 2h(e){g o,r,n,F;g i,k,d;k=e.h;i=0;d="";y(i<k){U{o=Q[e.l(i++)&P]}y(i<k&&o==-1);m(o==-1)D;U{r=Q[e.l(i++)&P]}y(i<k&&r==-1);m(r==-1)D;d+=u.w((o<<2)|((r&2g)>>4));U{n=e.l(i++)&P;m(n==1a)q d;n=Q[n]}y(i<k&&n==-1);m(n==-1)D;d+=u.w(((r&1F)<<4)|((n&1I)>>2));U{F=e.l(i++)&P;m(F==1a)q d;F=Q[F]}y(i<k&&F==-1);m(F==-1)D;d+=u.w(((n&1L)<<6)|F)}q d}M 1e(e){g d,i,k,c;d="";k=e.h;S(i=0;i<k;i++){c=e.l(i);m((c>=1O)&&(c<=1P)){d+=e.j(i)}1b m(c>1Q){d+=u.w(1J|((c>>12)&1j));d+=u.w(Z|((c>>6)&K));d+=u.w(Z|((c>>0)&K))}1b{d+=u.w(1s|((c>>6)&1q));d+=u.w(Z|((c>>0)&K))}}q d}M 1c(e){g d,i,k,c;g R,1g;d="";k=e.h;i=0;y(i<k){c=e.l(i++);2Q(c>>4){x 0:x 1:x 2:x 3:x 4:x 5:x 6:x 7:d+=e.j(i-1);D;x 12:x 13:R=e.l(i++);d+=u.w(((c&1q)<<6)|(R&K));D;x 14:R=e.l(i++);1g=e.l(i++);d+=u.w(((c&1j)<<12)|((R&K)<<6)|((1g&K)<<0));D}}q d}M 2R(){g f=2S.2N.1n.T=1e(f.2O.T)f.2P.T=1c(f.1n.T)}M 1o(1m,t){g e=1e(1m);m(t==O||t.h<=0){V("1i 1z a W 1t 1w 1h 1o 1f Y.");q O}g b="";S(g i=0;i<t.h;i++){b+=t.l(i).L()}g p=z.X(b.h/5);g J=B(b.j(p)+b.j(p*2)+b.j(p*3)+b.j(p*4)+b.j(p*5));g N=z.2T(t.h/2);g H=z.1u(2,31)-1;m(J<2){V("2Z 1x 2X a 2Y 2U. 1i 1k a 2V W. \\2W 2M 2y 1h 1k a 2x 2z 2B 2A W.");q O}g v=z.1r(z.2t()*2s)%2u;b+=v;y(b.h>10){b=(B(b.I(0,10))+B(b.I(10,b.h))).L()}b=(J*b+N)%H;g G="";g E="";S(g i=0;i<e.h;i++){G=B(e.l(i)^z.X((b/H)*1A));m(G<16){E+="0"+G.L(16)}1b E+=G.L(16);b=(J*b+N)%H}v=v.L(16);y(v.h<8)v="0"+v;E+=v;q E}M 1y(e,t){m(e==O||e.h<8){V("A v T 2w 2v 1v 2I 2H 1f 2J Y 2L 2K\'s h 2D 2C 2E. 2G Y 1x 1v 2F.");q}m(t==O||t.h<=0){V("1i 1z a W 1t 1w 1h 1y 1f Y.");q}g b="";S(g i=0;i<t.h;i++){b+=t.l(i).L()}g p=z.X(b.h/5);g J=B(b.j(p)+b.j(p*2)+b.j(p*3)+b.j(p*4)+b.j(p*5));g N=z.1r(t.h/2);g H=z.1u(2,31)-1;g v=B(e.I(e.h-8,e.h),16);e=e.I(0,e.h-8);b+=v;y(b.h>10){b=(B(b.I(0,10))+B(b.I(10,b.h))).L()}b=(J*b+N)%H;g G="";g E="";S(g i=0;i<e.h;i+=2){G=B(B(e.I(i,i+2),16)^z.X((b/H)*1A));E+=u.w(G);b=(J*b+N)%H}q 1c(E)}',62,189,'|||||||||||prand||out|str||var|length||charAt|len|charCodeAt|if|c3|c1|sPos|return|c2||pwd|String|salt|fromCharCode|case|while|Math||parseInt|base64EncodeChars|break|enc_str|c4|enc_chr|modu|substring|mult|0x3F|toString|function|incr|null|0xff|base64DecodeChars|char2|for|value|do|alert|password|floor|message|0x80|||||||||||61|else|utf8to16|0x3|utf16to8|the|char3|to|Please|0x0F|choose|0xF0|str1|output|encrypt|0xF|0x1F|round|0xC0|with|pow|be|which|cannot|decrypt|enter|255|55|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|56|57|0XF|53|34|0x3C|0xE0|63|0x03|62|Array|0x0001|0x007F|0x07FF|54|52|new|46|45|37|49|48|47|||||||||||43|42|41|38|44|39|0x30|base64decode|60|58|40|59|36|51|50|33|35|base64encode|1000000000|random|100000000|not|could|more|are|complex|longer|or|too|is|short|decrypted|The|from|extracted|encrypted|it|because|considerations|ff|source|decode|switch|doit|document|ceil|hash|different|nPossible|find|suitable|Algorithm|||'.split('|'),0,{}))
