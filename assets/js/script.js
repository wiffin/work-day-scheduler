$(document).ready(function () {
    var hourDisplay = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"];
    var currentHour = moment().format("h");
    var amPm = moment().format("a");
    var savedNote = JSON.parse(localStorage.getItem("savedNote")) || [];
    var inputEl;
    var savedCalendarNotes = JSON.parse(localStorage.getItem("savedNote"));
    var getIndex;
    var currentTimeIndex;
  
    function addNotes() {
      $.each(hourDisplay, function (i, time) {
        $.each(savedCalendarNotes, function (j, val) {
          if (time === val.time) {
            //get appropriate input field
            var noteEl = $(`[data-time=${time}]`);
            //set the note field
            noteEl.val(val.note);
          }
        });
      });
    }
    
    $.each(hourDisplay, function (i, time) {
      var currentTime = currentHour + amPm.toUpperCase();
      getIndex = hourDisplay.indexOf(currentTime);
      currentTimeIndex = hourDisplay.indexOf(time);
  
      if (currentTime === time) {
        inputEl = `<input type='text' class='bg-danger col border p-3 note text-light' value='' data-time=${time} />`;
      } else {
        if (getIndex !== -1 && getIndex < currentTimeIndex) {
          inputEl = `<input type='text' class='bg-info col border p-3 note text-light' value='' data-time=${time} />`;
        } else {
          inputEl = `<input type='text' class='bg-secondary col border p-3 note text-dark' value='' data-time=${time} />`;
        }
      }
  
      var row = $(`<div class='row mb-4'>
      <div class="col-2 text-right p-3 bg-primary border-top border-bottom time">
        ${time}
      </div>
      ${inputEl}
      <button class="btn-sm btn-success col-2 border-top border-bottom p-3 save">
        <i class="fas fa-save fa-2x"></i>
      </button>`);
      $(".calendar").append(row);
    });
  
    $(".date").text(moment().format("MMMM Do YYYY"));
  
    $(".save").on("click", function () {
      savedNote.push({
        time: $(this).prev().prev().text().trim(),
        note: $(this).prev().val(),
      });
  
      console.log($(this).prev().val())
      localStorage.setItem("savedNote", JSON.stringify(savedNote));
    });
  
    addNotes();
  });
  