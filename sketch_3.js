// Using p5.js, we will draw the curves and position the paragraphs.
// Also currently plops the footer at the bottom lol

var topDistances = [0, 400, 750, 870, 1260];
// distances from top are absolute, in pixels
// each of these is a place for a paragraph, start/end for line.

var LeftDistances = [0.5, 0.67, 0.3, 0.8, 0.4];
// distances from left are % of window width

var topControls = [50,150, 600, 720, 900, 880, 600, 1000];
// four control values per text block (except first/last)

var leftControls = [60, -30, 10, -40, 100, -90, -20, 30];
// in pixels to add to w*proportions

function setup(){
  var w = windowWidth;
  createCanvas(w,max(topDistances)+400);

  newLeftDistances = math.multiply(LeftDistances, w);

  drawLines();
  drawBoxes();

  // tack the footer in at the end.
  docHeight = $(document).height();
  $('body').append("&copy; Hopscotch. Thanks, <a href='http://www.itsnicethat.com/articles/graphic-design-peter-mendelsund'>Peter Mendelsund</a>.")
  $("#footer").css("top",docHeight-150);
}

function windowResized(){
  var w = windowWidth;
  newLeftDistances = math.multiply(LeftDistances, w);
  drawLines();
  drawBoxes();
}

function drawLines(){
  //console.log('ok drawing lines');
  background(255);
  noFill();
  stroke(0);

  var n_beziers = topDistances.length - 1;

  for(i=0; i<n_beziers; i++){
    // bezier syntax:
    // bezier(pt1x, pt1y, cl1x,cl1y,cl2x,cl2y,pt2x,pt2y);
    bezier(newLeftDistances[i],topDistances[i],newLeftDistances[i]+leftControls[i*2],topControls[i*2],newLeftDistances[i+1]+leftControls[i*2+1],topControls[i*2+1],newLeftDistances[i+1],topDistances[i+1]);
  }
}

function drawBoxes(){
  //console.log('ok drawing boxes');

  var top_adjust = 105;
  var left_adjust = -115;

  $("#one").css("top",topDistances[1]+top_adjust);
  $("#two").css("top",topDistances[2]+top_adjust);
  $("#thr").css("top",topDistances[3]+top_adjust);
  $("#for").css("top",topDistances[4]+top_adjust);

  $("#one").css("left",newLeftDistances[1]+left_adjust);
  $("#two").css("left",newLeftDistances[2]+left_adjust);
  $("#thr").css("left",newLeftDistances[3]+left_adjust);
  $("#for").css("left",newLeftDistances[4]+left_adjust);

}

$(document).ready(function(){
  // plop them images in there, instead of shuffle.js
  var urls = ['images/frankenthaler.jpg','images/layla.jpg','images/girl.jpg','images/name.jpg'];

  var imgTopDistances = [0,150,850,1200];
  var imgLeftDistances = [880,80,200,800];
  var imgWidths = [300,540,220,280];

  for(var i = 0; i<urls.length; i++){
    var rotate = Math.floor((Math.random()-0.5)*30);
    $("#images").append("<img src='"+urls[i]+"' style='top: "+imgTopDistances[i]+"px; left: "+imgLeftDistances[i]+"px; -ms-transform: rotate("+rotate+"deg); -webkit-transform: rotate("+rotate+"deg); transform: rotate("+rotate+"deg);' width="+imgWidths[i]+" />");
  }

});