// interaction with the graph

// set up svg

// click location
// click label


var svgMode = false;
var automataIndex;
var stateIndex;
var labelIndex;

function setSvgMode (){
  svgMode = true;
}

function clearBuffer (){
  automataIndex = null;
  stateIndex = null;
  labelIndex = null;
}

var width = 640,
    height = 740;

var svg;

var nodes;
var links;

var force;
var circle;
var text;
var path;
var linktext;



// public methods:
/*

drawAutomata()
restart()
sets gets

updateLocationNode

 */

// function called by app.js

function updateLocationNode(locationName, locationNewName){

  //console.log(locationNewName);

  var pos1 = nodes.map(function(e){return e.name}).indexOf(locationName);

  var new_node = JSON.parse(JSON.stringify(nodes[pos1]));

  new_node.name = locationNewName;

  nodes.splice(pos1, 1);

  nodes.push(new_node);





  var indices = [];
  var array = nodes.map(function(e){return e.name.split(".")[0]});

  var idx = array.indexOf(locationName);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(locationName, idx + 1);
  }


  indices.reverse().forEach(function(pos){

    var new_node = JSON.parse(JSON.stringify(nodes[pos]));

    new_node.name = locationNewName + "." + new_node.name.split(".")[1];



    nodes.splice(pos, 1);

    nodes.push(new_node);

  });





  var links_to_remove = [];

  var links_to_add = [];


  links.forEach(function(link, index){

    var remove_flag = false;
    var source_flag = 0;
    var target_flag = 0;

    if (link.source.name == locationName){
      remove_flag = true;
      source_flag = 1;
      //link.source = new_node;

    }
    else if(link.source.name.split(".")[0] == locationName){
      remove_flag = true;
      source_flag = 2;
      //var pos = nodes.map(function(e){return e.name}).indexOf(locationNewName + "." + link.source.name.split(".")[1]);
      //link.source = nodes[pos];

    }

    if (link.target.name == locationName){
      remove_flag = true;
      target_flag = 1;
      //link.target = new_node;
    }
    else if(link.target.name.split(".")[0] == locationName){
      remove_flag = true;
      target_flag = 2;
      //var pos = nodes.map(function(e){return e.name}).indexOf(locationNewName + "." + link.target.name.split(".")[1]);
      //link.target = nodes[pos];
    }

    if(remove_flag){
      links_to_remove.push(index);

      var new_link = new Object();
      new_link.type = link.type;
      if (link.probability != null){
        new_link.probability = link.probability;
      }

      var new_source = new Object();
      var new_target = new Object();

      if(source_flag == 1){
        new_source = new_node;
      }
      else if(source_flag == 2){
        var pos = nodes.map(function(e){return e.name}).indexOf(locationNewName + "." + link.source.name.split(".")[1]);
        new_source = nodes[pos];
      }
      else {
        new_source = link.source;
      }

      if(target_flag == 1){
        new_target = new_node;
      }
      else if(target_flag == 2){
        var pos = nodes.map(function(e){return e.name}).indexOf(locationNewName + "." + link.target.name.split(".")[1]);
        new_target = nodes[pos];
      }
      else{
        new_target = link.target;
      }

      new_link.source = new_source;
      new_link.target = new_target;

      //var new_link = JSON.parse(JSON.stringify(link));
      //console.log(JSON.stringify(link));

      links.push(new_link);
    }

  });

  links_to_remove.reverse().forEach(function(pos){

    links.splice(pos, 1);

  });

  //links.push.apply(links, links_to_add);



  restart();


}


function deleteLocationNode(locationName){

  var pos1 = nodes.map(function(e){return e.name}).indexOf(locationName);

  nodes.splice(pos1, 1);


  var indices = [];
  var array = nodes.map(function(e){return e.name.split(".")[0]});

  var idx = array.indexOf(locationName);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(locationName, idx + 1);
  }


  indices.reverse().forEach(function(pos){

    nodes.splice(pos, 1);

  });


  var links_to_remove = [];


  links.forEach(function(link, index){

    var remove_flag = false;

    if (link.source.name == locationName){
      remove_flag = true;

    }
    else if(link.source.name.split(".")[0] == locationName){
      remove_flag = true;

    }

    if (link.target.name == locationName){
      remove_flag = true;

    }
    else if(link.target.name.split(".")[0] == locationName){
      remove_flag = true;

    }

    if(remove_flag){
      links_to_remove.push(index);
    }

  });

  links_to_remove.reverse().forEach(function(pos){

    links.splice(pos, 1);

  });


  restart();





}

function addLocationNode(locationAddName){


  var new_node = new Object();
  new_node.name = locationAddName;
  nodes.push(new_node);

  restart();

}

function updateEdgeNode(edgeName, edgeNewName){

  var pos1 = nodes.map(function(e){return e.name}).indexOf(edgeName);

  var new_node = JSON.parse(JSON.stringify(nodes[pos1]));

  new_node.name = edgeName.split(".")[0] + "." + edgeNewName;

  nodes.splice(pos1, 1);

  nodes.push(new_node);




  var links_to_remove = [];

  var links_to_add = [];


  links.forEach(function(link, index){

    var remove_flag = false;
    var source_flag = 0;
    var target_flag = 0;

    if (link.source.name == edgeName){
      remove_flag = true;
      source_flag = 1;
      //link.source = new_node;

    }

    if (link.target.name == edgeName){
      remove_flag = true;
      target_flag = 1;
      //link.target = new_node;
    }

    if(remove_flag){
      links_to_remove.push(index);

      var new_link = new Object();
      new_link.type = link.type;
      if (link.probability != null){
        new_link.probability = link.probability;
      }

      var new_source = new Object();
      var new_target = new Object();

      if(source_flag == 1){
        new_source = new_node;
      }
      else {
        new_source = link.source;
      }

      if(target_flag == 1){
        new_target = new_node;
      }
      else{
        new_target = link.target;
      }

      new_link.source = new_source;
      new_link.target = new_target;

      //var new_link = JSON.parse(JSON.stringify(link));
      //console.log(JSON.stringify(link));

      links.push(new_link);
    }

  });

  links_to_remove.reverse().forEach(function(pos){

    links.splice(pos, 1);

  });

  //links.push.apply(links, links_to_add);



  restart();



}


function addEdgeNode(edgeAddName){

  var new_node = new Object();
  new_node.name = edgeAddName;
  nodes.push(new_node);


  var pos = nodes.map(function(e){return e.name}).indexOf(edgeAddName.split(".")[0]);

  var new_link = new Object();
  new_link.type = 0;
  new_link.source = nodes[pos];
  new_link.target = new_node;

  links.push(new_link);

  restart();

}

function deleteEdgeNode(edgeName){

  var pos = nodes.map(function(e){return e.name}).indexOf(edgeName);

  nodes.splice(pos, 1);


  var links_to_remove = [];


  links.forEach(function(link, index){


    if (link.source.name == edgeName || link.target.name == edgeName){

      links_to_remove.push(index);
    }

  });

  links_to_remove.reverse().forEach(function(pos){

    links.splice(pos, 1);

  });

  restart();

}

function editEdgeNode(edgeName, destinationList){

  var pos = nodes.map(function(e){return e.name}).indexOf(edgeName);

  var links_to_remove = [];


  links.forEach(function(link, index){


    if (link.source.name == edgeName){

      links_to_remove.push(index);
    }

  });

  links_to_remove.reverse().forEach(function(pos){

    links.splice(pos, 1);

  });

  // a trick

  restart();


  var index = destinationList.length/2;

  while (index > 0){

    var new_link = new Object();

    new_link.type = 1;
    new_link.source = nodes[pos];
    new_link.probability = destinationList[2*index-1];

    var target_pos = nodes.map(function(e){return e.name}).indexOf(destinationList[2*index-2]);

    new_link.target = nodes[target_pos];


    links.push(new_link);

    --index;

  }

  restart();


}

function drawAutomata(data, automatonName) {

  console.log("show: " + automatonName);

  var result = getEdges(data, automatonName);
  var A_links = result.actions;
  var B_links = result.links;

  try{

  links = A_links.concat(B_links);
  nodes = {};

  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });

  nodes = d3.values(nodes);
  }
  catch(e){
    links = [];
    nodes = [];
  }




  // add nodes that have no links

  try{

  locations = getLocations(data, automatonName);

  locations.forEach(function(location){

    var pos = nodes.map(function(e){return e.name}).indexOf(location.name);

    if (pos == -1){
      var new_node = new Object();
      new_node.name = location.name;
      nodes.push(new_node);
    }

  });

  }
  catch(e){
  }

  //console.log(links);
  //console.log(nodes);

  drawAutomata1();

}

function drawAutomata1() {
  if(svgMode){
    svg.remove();
  }
  setSvgMode();
  drawAutomata2();
}


function drawAutomata2() {

  force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance(function(d) {
      if (d.type == 0)
        return 20;
      else
        return 60;
    })
    .linkStrength(function(d) {
      if (d.type == 0)
        return 1;
      else
        return 0.5;
    })
    .charge(-200)
    .on("tick", tick)
    .start();

  svg = d3.select("#app-body .graph").append("svg")
               .attr("width", width)
               .attr("height", height);


  // Per-type markers, as they don't inherit styles.
  svg.append("defs").selectAll("marker")
      .data(["suit"])
    .enter().append("marker")
      .attr("id", function(d) { return d; })
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .text(function(d) { return d.name; });

  path = svg.append("g").selectAll("path")
      .data(links, function(d) { return d.source.name + "." + d.target.name; })
    .enter().append("path")
      .attr("class", function(d) { return "link " + "suit"; })
      .attr("id",function(d) { console.log(d.source.name + "." + d.target.name); return "linkId_" + d.source.name + "." + d.target.name; })
      .attr("marker-end", function(d) {
        if (d.type == 1)
          return "url(#" + "suit" + ")";
        else
          return;
      });

  linktext = svg.append("g").selectAll("linklabelholder").data(links, function(d) { return d.source.name + "." + d.target.name; })
        .enter().append("g").attr("class", "linklabelholder")
       .append("text")
       .attr("class", "linklabel")
     .style("font-size", "8")
       .attr("dx", "30")
       .attr("text-anchor", "start")
       .style("fill","#000")
     .append("textPath")
      .attr("xlink:href",function(d) { return "#linkId_" + d.source.name + "." + d.target.name;})
       .text(function(d) {
     return d.probability;
     });

  circle = svg.append("g").selectAll("circle")
      .data(nodes, function(d) { return d.name; })
    .enter().append("circle")
      .attr("r", function(d) {
        var str = d.name;
        var res = str.split(".");
        if(res.length == 1)
          return 8;
        else
          return 3;
      })
      .call(force.drag);

  text = svg.append("g").selectAll("text")
      .data(nodes, function(d) { return d.name; })
    .enter().append("text")
      .attr("x", "8")
      .attr("y", ".31em")
      .text(function(d) {
        var str = d.name;
        var res = str.split(".");
        if(res.length == 1)
          return d.name;
        else
          return res[1];
      });

  // Use elliptical arc path segments to doubly-encode directionality.
  function tick() {
    path.attr("d", linkArc);
    circle.attr("transform", transform);
    text.attr("transform", transform);
  }

  function linkArc(d) {

    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    var dx1 = d.source.x,
        dx2 = d.target.x,
        dy1 = d.source.y,
        dy2 = d.target.y;

    if (d.type == 0){
      return "M" + dx1 + "," + dy1 + "L" + dx2 + "," + dy2;
    }
    else{
      var str = d.source.name;
      var res = str.split(".");
      if (d.target.name == res[0]){
        return "M" + dx1 + "," + dy1 + "A" + dr/2 + "," + dr/2 + " 0 1,1 " + dx2 + "," + dy2;
      }
      else{
        return "M" + dx1 + "," + dy1 + "A" + dr + "," + dr + " 0 0,1 " + dx2 + "," + dy2;
      }
    }


  }

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }


}

// untested helper functions
function getNodes(){
  return nodes;
}

function getLinks(){
  return links;
}

function setNodes(new_nodes){
  nodes = new_nodes;
}

function setLinks(new_links){
  links = new_links;
}

/*
// tested helper functions
var linkDistance = function(d) {
  return (d.type == 0) ? 20 : 60;
};

var linkStrength = function(d) {
  return (d.type == 0) ? 1 : 0.5;
};

var circleR = function(d) {
  var str = d.name;
  var res = str.split(".");
  if(res.length == 1)
    return 8;
  else
    return 3;
};

var textR = function(d) {
  var str = d.name;
  var res = str.split(".");
  if(res.length == 1)
    return d.name;
  else
    return res[1];
}; */

// public function: very important
function restart(){

  // add a circle
/*   var m2 = new Object();
  m2.name = "m2";
  nodes.push(m2); */

  //nodes.splice(0, 1);

  circle = circle.data(nodes, function(d) { return d.name; });

  circle.selectAll("circle")
  .attr("r", function(d) {
        var str = d.name;
        var res = str.split(".");
        if(res.length == 1)
          return 8;
        else
          return 3;
      })
      .call(force.drag);
  circle
  .enter()
  .append("circle")
      .attr("r", function(d) {
        var str = d.name;
        var res = str.split(".");
        if(res.length == 1)
          return 8;
        else
          return 3;
      })
      .call(force.drag);

  circle.exit().remove();


  text = text.data(nodes, function(d) { return d.name; });

  text.selectAll("text")
      .attr("x", "8")
      .attr("y", ".31em")
      .text(function(d) {
        var str = d.name;
        var res = str.split(".");
        if(res.length == 1)
          return d.name;
        else
          return res[1];
      });
  text
      .enter().append("text")
    .attr("x", "8")
      .attr("y", ".31em")
      .text(function(d) {
        var str = d.name;
        var res = str.split(".");
        if(res.length == 1)
          return d.name;
        else
          return res[1];
      });
  text.exit().remove();

/*   var l2 = new Object();
  l2.type = 1;
  l2.probability = 0;
  l2.source = nodes[1];
  l2.target = nodes[9];

  links.push(l2); */

  //links.splice(0, 1);

  path = path.data(links, function(d) { console.log(d.source.name + "." + d.target.name); return d.source.name + "." + d.target.name; });

  path.selectAll("path")
    .attr("class", function(d) { return "link " + "suit"; })
      .attr("id",function(d,i) { console.log(d.source.name + "." + d.target.name); return "linkId_" + d.source.name + "." + d.target.name; })
      .attr("marker-end", function(d) {
        if (d.type == 1)
          return "url(#" + "suit" + ")";
        else
          return;
      });
  path.enter().append("path")
      .attr("class", function(d) { return "link " + "suit"; })
      .attr("id",function(d,i) { console.log(d.source.name + "." + d.target.name); return "linkId_" + d.source.name + "." + d.target.name; })
      .attr("marker-end", function(d) {
        if (d.type == 1)
          return "url(#" + "suit" + ")";
        else
          return;
      });
  path.exit().remove();



  linktext = linktext.data(links, function(d) { return d.source.name + "." + d.target.name; });

  linktext.selectAll("linklabelholder")
    .attr("class", "linklabelholder")
       .append("text")
       .attr("class", "linklabel")
     .style("font-size", "8")
       .attr("dx", "30")
       .attr("text-anchor", "start")
       .style("fill","#000")
     .append("textPath")
      .attr("xlink:href",function(d,i) { return "#linkId_" + d.source.name + "." + d.target.name;})
       .text(function(d) {
     return d.probability;
     });
  linktext.enter().append("g")
      .attr("class", "linklabelholder")
       .append("text")
       .attr("class", "linklabel")
     .style("font-size", "8")
       .attr("dx", "30")
       .attr("text-anchor", "start")
       .style("fill","#000")
     .append("textPath")
      .attr("xlink:href",function(d,i) { return "#linkId_" + d.source.name + "." + d.target.name;})
       .text(function(d) {
     return d.probability;
     });
  linktext.exit().remove();


  force.start();

}
