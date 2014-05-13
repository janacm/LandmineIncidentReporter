function convert_JSON_to_CSV(json, newline) {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * *
   * Parameter:
   * 
   *   This function takes as parameter a JSON object
   *   or a properly forma                                                                                               ted JSON string of the
   *   following form:
   *   
   *   { entry1 : {key1: val11, key2: val12, key3: val13},
   *     entry2 : {key1: val21, key2: val22, key3: val23},
   *     entry3 : {key1: val31, key2: val32, key3: val33},
   *     entry4 : {key1: val41, key2: val42, key3: val43}
   *   }
   *   
   *   That is, it has 'entries' each of which have
   *   identical 'keys' with arbitrary 'values'.  The
   *   entries become rows of the CSV, and the keys
   *   become headers of the CSV.
   * 
   * Optional:
   * 
   *   This function takes as an optional parameter a
   *   string to be used as the line delimiter.  The 
   *   default is (shudder) Windows newlines '\r\n',
   *   but anything is accepted, e.g. '\n', ';', etc.
   * 
   * Result:
   * 
   *   This function returns a string in CSV format of
   *   the following form:
   *   
   *   "key1,key2,key3\r\nval11,val12,val13\r\nval21, ...
   *   ... val41,val42,val43"
   * 
   * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
  
  // Validate Parameters:
  json      = ( typeof json     === 'object' ? json     : JSON.parse(json) );
  newline   = ( typeof newline  === 'string' ? newline  : '\r\n' );
  var delim = ',';
  
  var str = '';
  var line = '';
  
  // Generate Header Lines:
  for (var entry in json) {  // need to get index of an element (i.e. json[0] is undefined)
    for (var key in json[entry])
      line += key + delim;
    break;  // only print one header row.
  }
  
  line = line.slice(0, -1);  // remove last comma
  str += line + newline;
  
  // Generate Value Lines
  for (var entry in json) {
    line = '';
    
    for (var key in json[entry])
      line += json[entry][key] + delim;
    
    line = line.slice(0, -1);  // remove last comma
    str += line + newline;
  }
  
  return str;
}


function downloadCSV( csvString, filename ) {
  var link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
  link.setAttribute('type', "text/csv");
  link.setAttribute('download', filename);
  link.click();
}


 $("#DownloadBtn").click(function() {
    $.getJSON(
      "https://landmine.firebaseio.com/.json?print=pretty&format=export&download=landmine-export.json&auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwidiI6MCwiZCI6eyJmb3JnZSI6dHJ1ZX0sImlhdCI6MTM5OTg0MDE3NH0.GlajV4gv6xTGrK6QSyggqFFxiRy3L_7VfYCUI1Jmc2A", 
      function(jsonObj) {
        var csvStrg  = convert_JSON_to_CSV(jsonObj);
        downloadCSV( csvStrg, "landmines_tracker_data.csv" );
      }
    );
});
