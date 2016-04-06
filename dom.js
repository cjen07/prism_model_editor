// dealing with get/create/flash DOM objects

function gen_text(name, child_id, parent_id){
  var a = document.getElementById(parent_id);

  clear(child_id, parent_id);

  var b = document.createElement('p');
  b.setAttribute("id", child_id);
  var c = document.createTextNode(name);
  b.appendChild(c);
  a.appendChild(b);
}


function gen_list(namelist, child_id, parent_id, f2){

  var a = document.getElementById(parent_id);

  clear(child_id, parent_id);

  var b = document.createElement('select');
  b.setAttribute("id", child_id);
  b.onchange = function(){
    var name;
    try{
      name = this.options[this.selectedIndex].value;
    }
    catch (e){
    }
    finally{
      f2(name);
    }
  };


  namelist.forEach(function(name){
    var c = document.createElement('option');
    var d = document.createTextNode(name);
    c.appendChild(d);
    c.value = name;
    b.appendChild(c);
  });

  a.appendChild(b);
  b.onchange();


}

function gen_button(name, child_id, parent_id, f2){
  var a = document.getElementById(parent_id);

  clear(child_id, parent_id);

  var b = document.createElement('button');
  b.setAttribute("id", child_id);
  var c = document.createTextNode(name);
  b.appendChild(c);
  b.onclick = function (){f2();};
  a.appendChild(b);
}

function gen_form(name, child_id, parent_id, f2){

  clear_form(parent_id);

  //clear(child_id, parent_id);

  var a = document.getElementById(parent_id);

  var b = document.createElement("div");
  b.setAttribute("id", child_id);

  var c = document.createElement("input");
  var x = document.createElement("BR");
  var d = document.createElement("button");
  var e = document.createElement("button");

  c.setAttribute("type", "text");
  c.setAttribute("placeholder", name);
  b.appendChild(c);

  b.appendChild(x);

  var d1 = document.createTextNode("update");
  d.appendChild(d1);
  d.onclick = function(){
    var new_name = c.value;
    f2(new_name);
    clear_form(parent_id);
  };
  b.appendChild(d);

  var e1 = document.createTextNode("back");
  e.appendChild(e1);
  e.onclick = function(){clear_form(parent_id);};
  b.appendChild(e);

  a.appendChild(b);

}

// helper functions


function gen_br(child_id, parent_id){
  var a = document.getElementById(parent_id);
  var b = document.createElement("BR");
  b.setAttribute("id", child_id);
  a.appendChild(b);
}

function clear(child_id, parent_id){
  var a = document.getElementById(parent_id);
  var r = document.getElementById(child_id);
  if(r != null)
    a.removeChild(r);
}

function clear_form(parent_id){

  var a = document.getElementById(parent_id);

  if (a.childNodes.length == 0)
    return;

  var b = a.childNodes[0];

  a.removeChild(b);

}


