var HP = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  formatBytes: function(bytes,decimals) {
     if(bytes == 0) return '0 Byte';
     var k = 1000; // or 1024 for binary
     var dm = decimals + 1 || 3;
     var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     var i = Math.floor(Math.log(bytes) / Math.log(k));
     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  iterate: function iterate(obj, cb) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object")
          iterate(obj[property], cb);
        else {
          if (cb(obj[property])) {
            break;
          }
        }
      }
    }
  }

}

export default HP;