var timer;
var countDownNumber = 3;
var currentCount = 3;

$(document).ready( function(){
    
    
    $("#uploading").hide();
	
    startWebcam();
    init();
    
    $("#photoBtn").click(function(){
        $("#countdown").html( countDownNumber );
        startCountDown();        
    })
    
    $("#retakeBtn").click(function(){
        $("#countdown").html( countDownNumber );
        retake();        
    })
    
	$("#saveBtn").click(function(){
        $("#uploading").show();       
		setTimeout(savingDone, 1000);		
    })
	
    
});

function savingDone(){
  $("#uploading").hide();    
  init();
}


function init () {
    $("#retakeBtn").hide();
    $("#saveBtn").hide();
    $("#countdown").hide();
    $("#captured-still").hide();
	
	$("#live-view").show();
	 $("#photoBtn").show();
    //$("#controls").hide();
}

function startCountDown(){
    console.log("Start countDown")
    $("#countdown").show();
    $("#controls").hide();
    timer = window.setTimeout( "countDown()", 1000 );
}

function countDown(){
	
	console.log("countDown " + currentCount)
    currentCount--;
    $("#countdown").html( currentCount );
    if ( currentCount > 0 ){        
        console.log(currentCount);
        startCountDown();
    } else {
        currentCount = countDownNumber;
        takePhoto();        
    }        
}

function retake(){
    $("#live-view").show();
    $("#captured-still").hide();
    $("#controls").hide();
    startCountDown();
}


function takePhoto()
{
    $("#captured-still").show();
    $("#controls").show();
    
    $("#countdown").hide();
    $("#retakeBtn").show();
    $("#saveBtn").show();
    $("#photoBtn").hide();
    
    $("#live-view").hide();
    draw();
}







function draw() {
    
    var canvas = document.getElementById('captured-still');
    var context = canvas.getContext('2d');
    v = document.getElementById('live-view');
    context.drawImage( v, 0, 0, 640, 480 ); // draw video feed to canvas
    var uri = canvas.toDataURL("image/png"); // convert canvas to data URI
    console.log(uri); // uncomment line to log URI for testing
    //var imgtag = document.getElementById('imgtag');
    //imgtag.src = uri; // add URI to IMG tag src
}





function startWebcam() {
    
    navigator.getUserMedia = (navigator.getUserMedia || 
                          navigator.webkitGetUserMedia || 
                          navigator.mozGetUserMedia || 
                          navigator.msGetUserMedia);
   if (navigator.getUserMedia) {
      navigator.getUserMedia(
         {
            video:true,
            audio:false
         },        
         function(stream) { 
            /* do something */ 
            var url = window.URL || window.webkitURL;
            $("#live-view").get(0).src = url ? url.createObjectURL(stream) : stream;
            console.log(url);
            $("#live-view").get(0).play();
            console.log("Video streaming started")
         },
         function(error) { 
             /* do something */ 
         }
      );
   }
   else {
      alert('Sorry, the browser you are using doesn\'t support getUserMedia');
      return;
    }
}

