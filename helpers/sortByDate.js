var comparisons = {
  ascending : function(a,b){
    return Date.parse(a.dateStart) - Date.parse(b.dateStart);
  },
  descending : function(a,b){
    return Date.parse(b.dateStart) - Date.parse(a.dateStart);
  }
}

module.exports = function(events, options){
  var direction = options.hash["direction"] || "ascending";
  var sortedEvents = events.slice(0).sort(comparisons[direction]);
  return options.fn(sortedEvents);
}
