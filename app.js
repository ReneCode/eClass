(function () {
  "use strict";

  var expat = require('node-expat')
  var parser = new expat.Parser('UTF-8')

  var fs = require('fs');

  parser.on('startElement', function (name, attrs) {
    console.log("start:" + name, attrs)
  })

  parser.on('endElement', function (name) {
    console.log("end:" + name)
  })

  parser.on('text', function (text) {
    console.log("text:" + text)
  })

  parser.on('error', function (error) {
    console.error(error)
  })


  fs.createReadStream("./data/ESPRIT-reformat.xml").pipe(parser);

  //parser.write('<html><head><title>Hello World</title></head><body><p>Foobar</p></body></html>')

}())

