exports.calcInterval = function (milliseconds) {
  var day = 86400000;
  var hour = 3600000;
  var minut = 60000;
  var second = 1000;
  var time = '';

  if (milliseconds > day) {
    var days = Math.floor(milliseconds / day);
    time += days + 'd ';
    milliseconds -= days * day;
  }
  if (milliseconds > hour) {
    var hours = Math.floor(milliseconds / hour);
    time += hours + 'hr ';
    milliseconds -= hours * hour;
  }
  if (milliseconds > minut) {
    var minuts = Math.floor(milliseconds / minut);
    time += minuts + 'm ';
    milliseconds -= minuts * minut;
  }
  if (milliseconds > second) {
    var seconds = Math.floor(milliseconds / second);
    time += seconds + 's';
    milliseconds -= seconds * second;
  }
  
  return time;
};
