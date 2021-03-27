var hoursCont = $("#container");
var time = moment();
var current_hour = time.format("ha");
var day_of_year = "day"+time.format("DDD");
var hours = ["9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];
var day_data = localStorage.getItem(day_of_year);
// variable to use to store values
var sData = {}; 

$(hoursCont).addClass(day_of_year);
for (i of hours){
    // format the array item with moment to compare for the description coloring
    var comp = moment(i,"ha").format("ha")
    //creating the hour row, todo jqueryfy the creation of element not very jquery like right now
    var hourRow = $(document.createElement("div")).addClass( "hour-item row hour"+i);
    //creating the hour cell and add the loops current element
    var hour = $(document.createElement("div")).addClass( "col-md-1 hour").text(i);
    //creating the description cell
    var desc = $(document.createElement("div")).addClass( "col-md-10 description");
    //creating the hoursave cell
    var hoursave = $(document.createElement("div")).addClass( "col-md-1 saveBtn");
    //start appending items to the container, first the row
    $(hoursCont).append(hourRow);
    //the hour
    $(hourRow).append(hour);
    //the description
    $(hourRow).append(desc);
    //append text area to description
    $(desc).append('<textarea id="text'+i+'"></textarea>');
    //append the save button cont.
    $(hourRow).append(hoursave);
    //append the button element with unique identifier
    $(hoursave).append('<button class="btn" id="'+i+'"><i class="fa fa-save"></i></button>')
    //handle the descrition coloring, first if the current hour is bigger add past class
    if (current_hour == comp ){
        $(desc).addClass("present");
    }else if(current_hour < comp){
        //if current_hour is smaller add future class
        $(desc).addClass("future");
    }else{
        //fall back to present
        $(desc).addClass("past");
    }
}
if (day_data !== null) {
    // parse the scores into variable 
    var ex_text = JSON.parse(day_data)
     
        jQuery.each(ex_text, function(i, text) {
            $("#text"+i).text(text);
        }); 
     
    sData = JSON.parse(day_data);
}


$("body").on("click",".btn", function(){

    
    var btnId = $(this).attr("id");
    var desc_text = $("#text"+btnId).val();
    sData[btnId]=desc_text;
    // sData.push(btn_save);
    // store and json stringify the sData 
    localStorage.setItem(day_of_year, JSON.stringify(sData));

    console.log("here");
})