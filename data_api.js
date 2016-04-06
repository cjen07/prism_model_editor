// dealing with the 'data' variable


// GET methods
function getLocations(data, automatonName){
  var result;
  data.automata.forEach(function(automaton){
    if (automaton.name == automatonName){
      result = automaton.locations;
      return;
    }
  });
  return result;
}
function getEdges(data, automatonName){
  var result = new Object();
  data.automata.forEach(function(automaton){
    if (automaton.name == automatonName){
      var links = [];
      var actions = [];

      if(automaton.edges == null)
        return;

      automaton.edges.forEach(function (edge) {
        // source target and P

        var action = new Object();
        action.type = 0;
        action.source = edge.location;
        action.target = edge.location + "." + edge.label;
        actions.push(action);

        if(edge.destinations == null)
          return;

        edge.destinations.forEach(function (destination) {

          var link = new Object();
          link.type = 1;
          link.source = action.target;
          link.target = destination.location;
          link.probability = destination.probability;
          links.push(link);
        });
      });

      result.links = links;
      result.actions = actions;
      return;
    }
  });
  return result;
}


// ADD methods
function addAutomaton(data, automaton){
  // add an empty autonmaton by automatonNamem, with locations and edges
  data.automata.push(automaton);
}
function addLocation(data, automataName, location){
  // only with location's name
  data.automata.forEach(function(automaton){
    if (automaton.name == automataName){
      automaton.locations.push(location);
      return true;
    }
  });
  return false;
}
function addEdge(data, automataName, edgeNewName){

  var pos1 = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  var pos2 = data.automata[pos1].edges.map(function(e) { return e.location + "." + e.label; })
               .indexOf(edgeName);

  var new_edge = new Object();

  new_edge.location = edgeNewName.split(".")[0];
  new_edge.label = edgeNewName.split(".")[1];

  data.automata[pos1].edges.push(new_edge);


}

// DELETE methods
function deleteAutomaton(data, automatonName){ // not used
  var pos = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  data.automata.splice(pos, 1);
}
function deleteLocation(data, automatonName, locationName){
  var pos1 = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  var pos2 = data.automata[pos1].locations.map(function(e) { return e.name; }).indexOf(locationName);
  data.automata[pos1].locations.splice(pos2, 1);

  // clear edges whose location is this
  // clear edges's destination whose location is this

  var indices = [];

  data.automata[pos1].edges.forEach(function(edge, index){
    if (edge.location == locationName){
      indices.push(index);
      return;
    }
    var pos = edge.destinations.map(function(e){return e.location}).indexOf(locationName);
    if (pos != -1){
      edge.destinations.splice(pos, 1);
    }
  });

  indices.reverse().forEach(function(pos){data.automata[pos1].edges.splice(pos, 1);});



}
function deleteEdge(data, automatonName, edgeName){
  var pos1 = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  var pos2 = data.automata[pos1].edges.map(function(e) { return e.location + "." + e.label; })
               .indexOf(edgeName);
  data.automata[pos1].edges.splice(pos2, 1);
}

// UPDATE methods (rename, location, edge)
function updateAutomataName(data, automataName, automatonNewName){
  data.automata.forEach(function(automaton){
    if (automaton.name == automataName){
      automaton.name = automatonNewName;
      return true;
    }
  });
  return false;
}
function updateLocationName(data, automatonName, locationName, locationNewName){
  var pos1 = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  var pos2 = data.automata[pos1].locations.map(function(e) { return e.name; }).indexOf(locationName);
  data.automata[pos1].locations[pos2].name = locationNewName;

  data.automata[pos1].edges.forEach(function(edge){
    if (edge.location == locationName)
      edge.location = locationNewName;
    edge.destinations.forEach(function(destination){
      if (destination.location == locationName)
        destination.location = locationNewName;
    });
  });
}
function editEdge(data, automatonName, edgeName, destinationList){
  var pos1 = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  var pos2 = data.automata[pos1].edges.map(function(e) { return e.location + "." + e.label; })
               .indexOf(edgeName);

  var destinations = [];

  var index = destinationList.length/2;

  while (index > 0){

    var destination = new Object();

    destination.location = destinationList[2*index-2];
    destination.probability = destinationList[2*index-1];

    destinations.push(destination);

    --index;

  }

  data.automata[pos1].edges[pos2].destinations = destinations;
}

function updateEdgeName(data, automatonName, edgeName, edgeNewName){
  var pos1 = data.automata.map(function(e) { return e.name; }).indexOf(automatonName);
  var pos2 = data.automata[pos1].edges.map(function(e) { return e.location + "." + e.label; })
               .indexOf(edgeName);
  data.automata[pos1].edges[pos2].label = edgeNewName;
}






