$(document).ready(function() {
	// Focus input on load
	$("#input input").focus();	
	// Loading stored tasks
	var storedTasks = JSON.parse(localStorage.getItem("tasks"));
	for (i = 0; i < storedTasks.length; i++) {
		$("ol").append(createTask(storedTasks[i]));
	}
	$("li.task").show();
	storeData();
});

// Create task
function createTask(taskText) {
	return $('<li class="task">' +
					 '<p title="' + taskText + '">' + taskText + '</p>' +
					 '<input type="text" class="editable" value="' + taskText + '">' +
					 '<div class="button-wrap">' +
					 '<button title="Complete" class="complete"><i class="fa fa-check" aria-hidden="true"></i></button>' +
					 '<button title="Edit" class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>' +
					 '<button title="Delete" class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button>' +
					 '<button title="Save" class="save"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>' +
					 '<button title="Cancel" class="cancel"><i class="fa fa-times" aria-hidden="true"></i></button>' +
					 '</div></li>').hide();
};

// Add new task
$("#add-task").click(function() {
	if ( !$("#input input").val() ) {
		error("The input field is empty.");
	} else {
		$("#error").removeClass("active");
		var newTask = createTask($("#input input").val());
		$("#tasks ol").append(newTask);
		newTask.slideDown();
		$("#input input").val('');
		$("#input input").focus();
		storeData();
	}
});

// Complete a task
$("#tasks ol").on("click", ".complete", function() {
	$(this).parents("li.task").addClass("completed");
	$(this).parents("li.task").animate({
		opacity: 0	
	}, 300, 'linear', function() {
		$(this).remove();
		storeData();
	});
});

// Delete a task
$("#tasks ol").on("click", ".delete", function() {
	$(this).parents("li.task").animate({
		opacity: 0,
		left: '-200px'
	}, 300, 'linear', function() {
		$(this).remove();
		storeData();
	});
});

// Edit a task
$("#tasks ol").on("click", ".edit", function() {
	$(this).closest("li.task").find("p").css("display", "none");
	$(this).closest("li.task").find(".editable").css("display", "block");
	$(this).closest("li.task").find(".editable").focus().val('').val($(this).closest("li.task").find("p").html());
	$(this).parent().find("button").css("display", "none");
	$(this).parent().find(".save, .cancel").css("display", "inline-block");
});

// Save edited task
$("#tasks ol").on("click", ".save", function() {
	$(this).closest("li.task").find("p").html($(this).closest("li.task").find(".editable").val()); // Setting the HTML of <p> to the input value
	$(this).closest("li.task").find(".editable").css("display", "none");
	$(this).closest("li.task").find("p").css("display", "inline-block");
	$(this).parent().find("button").css("display", "inline-block");
	$(this).parent().find(".save, .cancel").css("display", "none");
	storeData();
});

// Cancel edited task
$("#tasks ol").on("click", ".cancel", function() {
	$(this).closest("li.task").find(".editable").css("display", "none");
	$(this).closest("li.task").find("p").css("display", "inline-block");
	$(this).parent().find("button").css("display", "inline-block");
	$(this).parent().find(".save, .cancel").css("display", "none");
});

// Store data in localStorage
function storeData() {
	// Clearing existing storage
	localStorage.removeItem("tasks");
	
	// Store tasks in array
	var tasksArray = [];
	$("li.task p").each(function() { tasksArray.push($(this).html()) });

	// Store the array in localStorage
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

// Error
function error(message) {
	$("#error").html(message);
	$("#error").addClass("active");
};