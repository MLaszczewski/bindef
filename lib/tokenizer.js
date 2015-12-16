

var tokenize = function(code,token) {
  var length=code.length
  var line=0
  var lineBegin=0
  var char
  var mode=0
  var beginCharacter=null
  var beginPosition=0
  var beginLineBegin=0
  var beginLine=0

  for(var position=0; position<length; position++) {
    char=code[position]
    switch(mode) {
      case 0: switch(char) { // reading whitespaces and brackets
        case ' ' :
        case '\t' : // ignore whitespaces
        case '\r' : break; // ignore whitespaces
        case '(' :
        case ')' :
        case '[' : // brackets
        case ']' :
        case '{' :
        case '}' :
          token(char,char,position,position,line,lineBegin); break;
        case '\n' :
        case ';' :
          token(';',char,position,position,line,lineBegin); break;
        case ',' :
          token(',',char,position,position,line,lineBegin); break;
        case "'" :
        case '"' :
          beginPosition=position; beginCharacter=char; beginLine=line; beginLineBegin=lineBegin; mode=1; break;
        default:
          beginPosition=position; mode=2
      } break;
      case 1: switch(char) { // reading strings
        case beginCharacter :
          token(beginCharacter,code.slice(beginPosition,position+1),beginPosition,position,beginLine,beginLineBegin);
          mode=0;
          break;
        case '\\' : position++
      } break;
      case 2: switch(char) {
        case ' ' :
        case '\t' :
        case '\r' : // whitespace or comma ends atom
        case '\n' :
        case ',' :
          token('a',code.slice(beginPosition,position),beginPosition,position-1,line,lineBegin); mode=0; break;
        case '(' :
        case ')' :
        case '[' : // brackets ends atom too
        case ']' :
        case '{' :
        case '}' : token('a',code.slice(beginPosition,position),beginPosition,position-1,line,lineBegin);
          mode=0; position--; break;
      }
    }
    if(char=='\n') {
      line++
      lineBegin=position+1 // count lines
    }
  }
}

module.exports=tokenize
