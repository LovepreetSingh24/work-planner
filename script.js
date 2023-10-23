function updateTimeBlockColors() {
    $(".time-block").each(function () {
        const timeBlockHourText = $(this).find(".hour").text();
        const timeBlockHour = dayjs(timeBlockHourText, "hA").format("H"); // Convert to 24-hour format
        //const currentHour = dayjs().format("H"); // Get current hour in 24-hour format
        const currentHour = "15"
    
        if (timeBlockHour < currentHour) {
            $(this).addClass("past").removeClass("present future");
        } else if (timeBlockHour == currentHour) {
            $(this).addClass("present").removeClass("past future");
        } else {
            $(this).addClass("future").removeClass("past present");
        }
    });
}

$(function () {

    $(".saveBtn").on("click", function () {

        const userInput = $(this).siblings(".description").val().trim();

        const timeBlockId = $(this).parent().attr("id");

        localStorage.setItem(timeBlockId, userInput);
        
    });

    $(".time-block").each(function () {

        const timeBlockId = $(this).attr("id");

        const userInput = localStorage.getItem(timeBlockId);

        $(this).find(".description").val(userInput);
    });

    const currentDayElement = document.getElementById("currentDay");
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    currentDayElement.textContent = currentDate;

    const startHour = 9;
    const endHour = 17;
    const currentHourInt = parseInt(dayjs().format("H"),10)

    for (let hour = startHour; hour <= endHour; hour++) {

        const timeBlock = $("<div>")
            .addClass("row time-block")
            .attr("id", `hour-${hour}`);

        const ampm = hour < 12 ? "AM" : "PM";
        const hourLabel = hour <= 12 ? hour : hour - 12
        const hourElement = $("<div>")
            .addClass("col-2 col-md-1 hour text-center py-3")
            .text(`${hourLabel}${ampm}`);

        const descriptionElement = $("<textarea>")
            .addClass("col-8 col-md-10 description")
            .attr("rows", 3);

        const saveButton = $("<button>")
            .addClass("btn saveBtn col-2 col-md-1")
            .attr("aria-label", "save")
            .html('<i class="fas fa-save" aria-hidden="true"></i>');

        if (currentHourInt < startHour || currentHourInt > endHour){
            timeBlock.addClass("past");
        }

        timeBlock.append(hourElement, descriptionElement, saveButton);
        $(".container-lg").append(timeBlock);
    }
    updateTimeBlockColors();

});
  