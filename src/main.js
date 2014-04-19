var TSMimg = 'http://i.imgur.com/U5YbY2u.png';
var CLGimg = 'http://i.imgur.com/vn4ZQES.png';
var C9img = 'http://i.imgur.com/kfEe9Gx.png';
var CRSimg = 'http://i.imgur.com/NWUEqFZ.png';
var XDGimg = 'http://i.imgur.com/jklm7lY.png';
var DIGimg = 'http://i.imgur.com/IErbRST.png';
var EGimg = 'http://i.imgur.com/9YA9ffr.png';
var CSTimg = 'http://i.imgur.com/jLDb8ge.png';

// Create a match day 
function createMatchDay() {
	
	// Create matchDay div
	var matchDayElement = document.createElement('div');
	matchDayElement.className = 'matchDay';
	$(matchDayElement).append('<br>');

	// Add the date and time inserts
	createDateInput(matchDayElement, 'matchDayDateTime');

	// Add remove match day button
	addRemoveButton(matchDayElement, 'Remove Match Day', 'MatchDay')

	// Add ability to create a match
	$(matchDayElement).append('<br>');
	var matchButton = document.createElement('button');
	matchButton.innerHTML = "Create Match";
	matchButton.className = 'matchButton';
	matchButton.onclick = function() { createMatch(matchDayElement, 'match'); }; 
	matchDayElement.appendChild(matchButton);

	$('body').append(matchDayElement);
}

// Create a date input for a match day
function createDateInput(appendElement, elementClass) {
	
	// Create date control
	var dateInput = document.createElement('input');
	dateInput.type = 'date';
	dateInput.className = elementClass;
	appendElement.appendChild(dateInput);

	// Create time control
	var timeInput = document.createElement('input');
	timeInput.type = 'time';
	timeInput.className = elementClass;
	appendElement.appendChild(timeInput);

	// Create time zone input
	var timeZoneInput = document.createElement('input');
	timeZoneInput.type = 'text';
	timeZoneInput.placeholder = 'Time Zone';
	timeZoneInput.className = elementClass;
	appendElement.appendChild(timeZoneInput);
}

// Creates a match in a match day (between two teams)
function createMatch(appendElement, elementClass) {
	var matchDiv = document.createElement('div');
	matchDiv.className = 'match';
	$(appendElement).append(matchDiv);
	$(matchDiv).append('Team 1: ');
	$(matchDiv).append(createTeamDropdown());
	$(matchDiv).append('<br>');
	$(matchDiv).append('Team 2: ');
	$(matchDiv).append(createTeamDropdown());
	$(matchDiv).append('<br>');
	$(matchDiv).append('Game Time: ');
	$(matchDiv).append('<input type="time"></input>');
	$(matchDiv).append('<br>');
	$(matchDiv).append('Match URL: ');
	$(matchDiv).append('<input type="text" placeholder="Match URL"></input>');
	$(matchDiv).append('<br>');
	addRemoveButton(matchDiv, 'Remove Match', 'Match');
}

// Creates a team dropdown (currently only NA teams)
function createTeamDropdown() {
	var teamDropdown = document.createElement('select');
	$(teamDropdown).append(createTeamOption('TSM',TSMimg));
	$(teamDropdown).append(createTeamOption('CLG',CLGimg));
	$(teamDropdown).append(createTeamOption('C9',C9img));
	$(teamDropdown).append(createTeamOption('XDG',XDGimg));
	$(teamDropdown).append(createTeamOption('EG',EGimg));
	$(teamDropdown).append(createTeamOption('DIG',DIGimg));
	$(teamDropdown).append(createTeamOption('CST',CSTimg));
	$(teamDropdown).append(createTeamOption('CRS',CRSimg));
	return teamDropdown;
}

// Adds a team option to a team select dropdown
function createTeamOption(team, image) {
	var teamOption = document.createElement('option');
	teamOption.value = image;
	teamOption.innerHTML = team;
	return teamOption;
}

// Adds a "remove surrounding element" button. Used for match days and matches.
function addRemoveButton(appendElement, removeText, removeType) {
	var removeButton = document.createElement('button');
	removeButton.innerHTML = removeText;
	removeButton.className = 'remove' + removeType;
	removeButton.onclick = function() { $(this.parentNode).remove(); }; 
	$(appendElement).append(removeButton);
}

// Uses the assembled information to create a TL BB code LR
function createLR() {
	//$('body').append(matchDayElement);
}