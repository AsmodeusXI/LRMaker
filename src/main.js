function createMatchDay() {
	var matchDayElement = document.getElementById("matchDay");
	createDateInput(matchDayElement, 'matchDay');
	var matchButton = document.createElement('button');
	matchButton.innerHTML = "Create Match";
	matchButton.className = 'matchDay';
	matchButton.onclick = function() { createMatch(); }; 
	matchDayElement.appendChild(matchButton);
}

function createDateInput(appendElement, elementClass) {
	var dateInput = document.createElement('input');
	dateInput.type = 'date';
	dateInput.className = elementClass;
	appendElement.appendChild(dateInput);
}

function createMatch() {
	alert("Making a match!");
}