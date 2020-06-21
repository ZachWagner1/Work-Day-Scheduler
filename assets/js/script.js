// Today's Date
var today = moment().format('dddd, MMMM Do');
$('#currentDay').text(today);

// time block container
var containerEl = $('.container');
// 9 a.m. -> 5 p.m.
var timeStart = 9;
var timeEnd = 17;

for(var i = timeStart; i <= timeEnd; i++) {
    createTask(i);
}

function createTask(time) {
    var hour = moment(time, 'h');
    var hourView = hour.format('hA');

    var groupInput = $("<div>").addClass("group-input");
    var groupInputEl = $("<div>").addClass("group-input-element");
    var timeSpan = $("<span>").addClass("group-input-text hour").text(hourView);
    var taskEl = $('<textarea>').addClass('form-contrl').attr('data-id', time);
    var groupInputAppendEl = $('<div>').addClass('group-input-append');
    var saveBtn = $('<span>').addClass('group-input-text saveBtn').attr('data-id', time);
    var calendarPic = $('<i>').addClass('fas fa-calendar-plus');

    groupInputAppendEl.append(saveBtn);
    saveBtn.append(calendarPic);
    groupInputEl.append(timeSpan);
    groupInput.append(groupInputEl, taskEl, groupInputAppendEl);
    containerEl.append(groupInput);

    styleTaskColor(hour, taskEl);
}
function styleTaskColor(taskHour, taskEl) {
    var current = moment();
    if(taskHour.isBefore(current, 'hour')) {
        taskEl.addClass('past');
    } else if(taskHour.isSame(current, 'hour')) {
        taskEl.addClass('present');
    } else {
        taskEl.addClass('future');
    }
}

$('.saveBtn').on('click', saveTask);
var tasksArr = loadTask() || [];

function saveTask() {
    var taskText = $(this).parent().prev().val().trim();
    var taskObj = {
        id : $(this).attr('data-id'),
        taskText : taskText
    };
    for (var i = 0; i < tasksArr.length; i++) {
        if(tasksArr[i].id === taskObj.id) {
            tasksArr.splice(i, 1);
        }
    }
    tasksArr.push(taskObj);
    localStorage.setItem('tasksLocal', JSON.stringify(tasksArr));
}

function loadtask() {
	var tasksLocal = localStorage.getItem('tasksLocal');
	tasksLocal = JSON.parse(tasksLocal);
	console.log(tasksLocal);

	if (!tasksLocal) {
		return false;
	}

	for (var i = 0; i < tasksLocal.length; i++) {
		$('.form-control[data-id="' + tasksLocal[i].id + '"]').val(tasksLocal[i].eventText);
	}
	return tasksLocal;
}