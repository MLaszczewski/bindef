var tokenizer = require("./tokenizer.js")

var ParserError=function(message,at,begin) {
  this.message=message
  this.at=at
  this.begin=begin
}
ParserError.prototype.toString = function() {
  return "ParserError: " + this.message + (this.at ? " at " + this.at.join('.') : "") +
    (this.begin ? " with begin at " + this.begin.join('.') : "")
}

var blockParser = function(scope,type,content,begin,end,line,lineBegin) {

  return blockParser
}

var parse = function(code,sourceName) {
  code += ' '
  var stack = []
  var parser = blockParser
  var scope = {}

  tokenize(code,function(type,content,begin,end,line,lineBegin) {
    var res=parser(scope,type,content,begin,end,line,lineBegin)
  })
}