$("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
setInterval(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))  
  }, 1000);
// declair needed variables 
var hoursCont = $("#container");
var time = moment();
// format moment data to match the hours array
var current_hour = time.format("ha");
// get 24 hour value for ease of comparing for future, past , present class
var hour_24_format = time.format("H");
// building local storage key
var day_of_year = "day"+time.format("DDD");
// array of work hours
var hours = ["9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];
// get data from local sotrage for today
var day_data = localStorage.getItem(day_of_year);
// variable to use to store values
var sData = {}; 



$(hoursCont).addClass(day_of_year);
for (i of hours){
    // format the array item with moment to compare for the description coloring
    var comp = moment(i,"ha").format("H")
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
    //handle the descrition coloring by comparing 24 hour clock
    if (parseInt(hour_24_format) === parseInt(comp) ){
        $(desc).addClass("present");
    }else if(parseInt(hour_24_format) < parseInt(comp)){
        $(desc).addClass("future");
    }else{
        $(desc).addClass("past");
    }
}
if (day_data !== null) {
    // parse the day data into variable 
    var ex_text = JSON.parse(day_data);
        // idirate over the parsed data to insert data from local storage
        jQuery.each(ex_text, function(i, text) {
            $("#text"+i).text(text);
        }); 
    //add stored data to the sData varible to 
    sData = JSON.parse(day_data);
}
//handle save click
$("body").on("click",".btn", function(){
    // get button id
    var btnId = $(this).attr("id");
    // get typed text
    var desc_text = $("#text"+btnId).val();
    // update/create sData keys with values
    sData[btnId]=desc_text;
    //store data inot the local storage
    localStorage.setItem(day_of_year, JSON.stringify(sData));
})