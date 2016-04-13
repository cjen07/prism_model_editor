// globals:
// time
// alphabet
// automatonName
// locationName
// edgeName (edge.location + "." + edge.label)

// callbacks:
// add an empty automata/delete an existed automata
// add an new state/delete an existed state
// add a variable in the alphabet/delete a variable in the alphabet
// add a label and its links/delete a label and its links

// infos
// no automata is selected
// no state or label is selected

// checks
// if a new automata is of the same name with old states.
// if a new state is of the same name with old states.
// if a new variable in already in the alphabet.
// if a label name is the alphabet.
// if a label name is already existed with the states.
// if the automata to delete is already existed.
// if the state to delete is already existed.
// if the variable to delete is already existed.
// if the label to delete is already existed.

// fix me
// name generation function


// on init
// 1: data from data.js
// 2: data method from api.js
// 3: bind data method to html dom from control.js

// copy data

// model layer
// pos top1
// input: time + button: set
// input: alphabet + button: set
// inputlist: automata: view&update + input: add
// input: automatonName: update/delete

// automaton layer: automaton button clicked
// pos: top2
// inputlist location: update/delete + input: add
// inputlist edge: update/delete + input: add

// edges layer: edge button clicked
// pos: top3
// input: locationName, labelName, destinations* + button: update
// button: delete edge: delete

// info layer: send information

// remark: not pure function currently




// globals

var data = raw;
var time = data.time,
    alphabet = data.alphabet,
    automatonName,
    locationName,
    edgeName;

// init first layer

init();

function init(){
  showTime();
  showAlphabet();
  showAutomata();
}

function showTime(){
  gen_text("Time: ", "timeLiteral", "time");
  gen_text(time, "timeContent", "time");
}

function showAlphabet(){
  gen_text("Alphabet:", "alphabetLiteral", "alphabet");
  gen_text(data.alphabet, "alphabetContent", "alphabet");
}

function showAutomata(){
  gen_text("Automata:", "automataLiteral", "automata");

  var automataList = data.automata.map(function(e) { return e.name; });

  function f2(name){

    clear_form("form");

    if(name == null){
      clear_automaton();
    }
    else{

    automatonName = name;
    drawAutomata(data, automatonName);

    function f3(){
      console.log("hi");
      function f4(automatonNewName){

        // same name check
        var pos = automataList.indexOf(automatonNewName);

        if (pos != -1){
          console.log("wrong format");
          return;
        }

        
        var re = /^\w+$/;
        if (re.test(automatonNewName)){
          updateAutomataName(data, automatonName, automatonNewName);
          showAutomata();
        }
        else{
          console.log("wrong format");
        }
      }
      gen_form(name,"automatonNameForm", "form", f4);
    }
    gen_button("Rename", "renameAutomaton", "automata", f3);

    function g2(){
      deleteAutomaton(data, automatonName);
      showAutomata();
    }
    gen_button("Delete", "deleteAutomaton", "automata", g2);

    // set locations and edges
    showLocations();

    }


    function h2(){

      function f4(automatonAddName){

        // same name check
        var pos = automataList.indexOf(automatonAddName);

        if (pos != -1){
          console.log("wrong format");
          return;
        }

        var re = /^\w+$/;
        if (re.test(automatonAddName)){
          var automaton = new Object();
          automaton.name = automatonAddName;
          automaton.locations = [];
          automaton.edges = [];
          addAutomaton(data, automaton);

          showAutomata();
        }
        else{
          console.log("wrong format");
        }
      }
      gen_form("add a new automaton", "automatonAddForm", "form", f4);
    }
    gen_button("Add", "addAutomaton", "automata", h2);

  }
  gen_list(automataList, "automataList", "automata", f2);
}


function showLocations(){
  gen_text("Locations: ", "locationsLiteral", "locations");
  var locationlist = [];
  try{
    locationlist = getLocations(data, automatonName).map(function(e) { return e.name; });
  }
  catch(e){}

  function f2(name){
    clear_form("form");
    clear("brLocation", "locations");

    if(name == null){
      clear_location();
      gen_br("brLocation", "locations");
    }
    else{

    locationName = name;

    function f3(){
      function f4(locationNewName){
        // same name check

        var pos = locationlist.indexOf(locationNewName);

        if (pos != -1){
          console.log("wrong format");
          return;
        }

        var re = /^\w+$/;
        if (re.test(locationNewName)){
          console.log("renameLocation");
          updateLocationName(data, automatonName, locationName, locationNewName); // checked

          updateLocationNode(locationName, locationNewName);

          showLocations();
        }
        else{
          console.log("wrong format");
        }
      }
      gen_form(locationName, "locationNameForm", "form", f4);
    }
    gen_button("Rename", "renameLocation", "locations", f3);
    function g2(){

      deleteLocation(data, automatonName, locationName);

      deleteLocationNode(locationName); // a little complex

      showLocations();
    }
    gen_button("Delete", "deleteLocation", "locations", g2);

      showEdges();
    }


    function h2(){

      function f4(locationAddName){
        // same name check

        var pos = locationlist.indexOf(locationAddName);

        if (pos != -1){
          console.log("wrong format");
          return;
        }

        var re = /^\w+$/;
        if (re.test(locationAddName)){
          var location = new Object();
          location.name = locationAddName;
          addLocation(data, automatonName, location);

          addLocationNode(locationAddName);

          showLocations();
        }
        else{
          console.log("wrong format");
        }
      }
      gen_form("add a new location", "locationAddForm", "form", f4);
    }
    gen_button("Add", "addLocation", "locations", h2);

  }
  gen_list(locationlist, "locationList", "locations", f2);
}


function showEdges(){
  gen_text("Edges: ", "edgesLiteral", "edges");

  var locationlist = [];
  try{
    locationlist = getLocations(data, automatonName).map(function(e) { return e.name; });
  }
  catch(e){}

  var edgelist = getEdges(data, automatonName).actions.map(function(e) { return e.target; });


  function f2(name){

    clear_form("form");
    clear("brEdge", "edges");

    if(name == null){
      clear_edge();
      gen_br("brEdge", "edges");
    }
    else{

    edgeName = name;

    function f3(){
      function f4(edgeNewName){
        // assume it is in the alphabet
        // same name check

        var pos = edgelist.indexOf(edgeName.split(".")[0] + "." + edgeNewName);

        if (pos != -1){
          console.log("wrong format");
          return;
        }

        var re = /^\w+$/;
        if (re.test(edgeNewName)){
          console.log("renameEdge");
          updateEdgeName(data, automatonName, edgeName, edgeNewName);
          updateEdgeNode(edgeName, edgeNewName);

          showEdges();
        }
        else{
          console.log("wrong format");
        }
      }
      gen_form(edgeName.split(".")[1], "edgeNameForm", "form", f4);
    }
    gen_button("Rename", "renameEdge", "edges", f3);

    function g2(){
      console.log("deleteEdge");
      deleteEdge(data, automatonName, edgeName);
      deleteEdgeNode(edgeName);

      showEdges();
    }
    gen_button("Delete", "deleteEdge", "edges", g2);


    function m2(){

      function f4(destinationInput){

        var destinationList = destinationInput.split(",");
        // check destinationList format
        var index = destinationList.length;

        if (index % 2 != 0){
          console.log("wrong format");
          return;
        }

        var array = [];
        while (index > 0){
          
          var s = destinationList[index-2];
          var pos = array.indexOf(s);
          if (pos != -1){
            console.log("wrong format");
            return;
          }

          var pos = locationlist.indexOf(s);
          if (pos == -1){
            console.log("wrong format");
            return;
          }

          array.push(s);

          var p = destinationList[index-1];

          if( isNaN(parseFloat(p)) || p < 0 || p > 1){
            console.log("wrong format");
            return;
          }
          index -= 2;
        }

        editEdge(data, automatonName, edgeName, destinationList);
        editEdgeNode(edgeName, destinationList);
        console.log("editEdge");

        showEdges();

      }
      gen_form("edit the edge", "edgeEditForm", "form", f4);
    }
    gen_button("Edit", "editEdge", "edges", m2);

    }


    function h2(){

      function f4(edgeAddName){
        // assume it is in the alphabet
        // same name check

        var pos = edgelist.indexOf(edgeAddName);

        if (pos != -1){
          console.log("wrong format");
          return;
        }

        console.log("addEdge");
        addEdge(data, automatonName, edgeAddName);
        addEdgeNode(edgeAddName);

        showEdges();
      }
      gen_form("add a new edge", "edgeAddForm", "form", f4);
    }
    gen_button("Add", "addEdge", "edges", h2);



  }
  gen_list(edgelist, "edgelist", "edges", f2);
}




function clear_automaton(){
  clear("renameAutomaton", "automata");
  clear("deleteAutomaton", "automata");
  clear_location();
  clear("locationsLiteral", "locations");
  clear("locationList", "locations");
}


function clear_location(){
  clear("renameLocation", "locations");
  clear("deleteLocation", "locations");
  clear("addLocation", "locations");
  clear("brLocation", "locations");
  clear_edge();
  clear("edgesLiteral", "edges");
  clear("edgelist", "edges");

}

function clear_edge(){
  clear("renameEdge", "edges");
  clear("deleteEdge", "edges");
  clear("editEdge", "edges");
  clear("addEdge", "edges");
  clear("brEdge", "edges");
}

