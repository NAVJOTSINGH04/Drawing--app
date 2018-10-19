$(function(){
   
    //painting erasing or not
  var paint = false;
    //painting or erasing 
    var paint_erase = "paint";
     // get canvas context
    var canvas = document.getElementById("paint");
     var ctx = canvas.getContext("2d");
    // get convas container
    
    var container = $("#container");
    
    //mouse position
    var mouse = {x: 0, y: 0};
    
    //on load saved work
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src=localStorage.getItem("imgCanvas");
    };
    // set drawing parameters
    
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    
    //click inside container
    container.mousedown(function(e){
        paint = true;
       // window.alert(paint);
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
         mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });
    
    //move the mouse while holding mouse key
    container.mousemove(function(e){
         mouse.x = e.pageX - this.offsetLeft;
         mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
            //get color input
            ctx.strokeStyle =$("#colorSelector").val();
        }else{
            //white color
            ctx.strokeStyle ="white";
        }
        ctx.lineTo(mouse.x,mouse.y);
       
    ctx.stroke();
    }
    });
    //mouse  up = we are not paint erasing anymore
    container.mouseup(function(){
       paint = false; 
    });
    // if we leave the container we are not painting anyomre
    container.mouseleave(function(){
        paint = false;
    });
    //reset button
    $("#reset").click(function(){
       ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
        }else{
            window.alert("your browser does not support local storage!");
        }
    });
    
    // click on erase
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
            
        }else{
            paint_erase ="paint";
        }
        $(this).toggleClass("eraseMode");
    });
    //color changer
    $("#colorSelector").change(function(){
        $("#circle").css("background-color",
                        $(this).val());
    });
    //line width and circle width
     $("#slider").slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
    
    
    
});