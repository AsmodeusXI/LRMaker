/* 
Image variables for teams (should be more dynamic)
*/
var TSMimg = 'http://i.imgur.com/U5YbY2u.png';
var CLGimg = 'http://i.imgur.com/vn4ZQES.png';
var C9img = 'http://i.imgur.com/kfEe9Gx.png';
var CRSimg = 'http://i.imgur.com/NWUEqFZ.png';
var XDGimg = 'http://i.imgur.com/jklm7lY.png';
var DIGimg = 'http://i.imgur.com/IErbRST.png';
var EGimg = 'http://i.imgur.com/9YA9ffr.png';
var CSTimg = 'http://i.imgur.com/jLDb8ge.png';

/*
Create a match day 
*/
function createMatchDay() {
	
	// Create matchDay div
	var matchDayElement = document.createElement('div');
	matchDayElement.className = 'matchDay';
	$(matchDayElement).append('<h3>Match Day</h3>');

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

/* 
Create a date input for a match day
*/
function createDateInput(appendElement, elementClass) {
	
	// Create date control
	var dateInput = document.createElement('input');
	dateInput.type = 'date';
	dateInput.name = 'date-cntl';
	dateInput.className = elementClass;
	appendElement.appendChild(dateInput);

	// Create time control
	var timeInput = document.createElement('input');
	timeInput.type = 'time';
	timeInput.name = 'time-cntl';
	timeInput.className = elementClass;
	appendElement.appendChild(timeInput);

	// Create time zone input
	var timeZoneInput = document.createElement('input');
	timeZoneInput.type = 'text';
	timeZoneInput.name = 'tz-cntl';
	timeZoneInput.placeholder = 'Time Zone';
	timeZoneInput.className = elementClass;
	appendElement.appendChild(timeZoneInput);
}

/*
Creates a match in a match day (between two teams)
*/
function createMatch(appendElement, elementClass) {
	var matchDiv = document.createElement('div');
	matchDiv.className = 'match';
	$(appendElement).append(matchDiv);
	$(matchDiv).append('<h4>Match</h4>')
	$(matchDiv).append('Team 1: ');
	$(matchDiv).append(createTeamDropdown(1));
	$(matchDiv).append('<br>');
	$(matchDiv).append('Team 2: ');
	$(matchDiv).append(createTeamDropdown(2));
	$(matchDiv).append('<br>');
	$(matchDiv).append('Game Time: ');
	$(matchDiv).append('<input name="game-time" type="time"></input>');
	$(matchDiv).append('<input name="game-tz" type="text" placeholder="Time Zone"></input>')
	$(matchDiv).append('<br>');
	$(matchDiv).append('Match URL: ');
	$(matchDiv).append('<input name="match-url" type="text" placeholder="Match URL"></input>');
	$(matchDiv).append('<br>');
	addRemoveButton(matchDiv, 'Remove Match', 'Match');
}

/*
Creates a team dropdown (currently only NA teams)
*/
function createTeamDropdown(teamNo) {
	var ddName = "team" + teamNo;
	var teamDropdown = document.createElement('select');
	teamDropdown.id = ddName;
	addNATeams(teamDropdown);
	return teamDropdown;
}

/*
Adds a team option to a team select dropdown
*/
function createTeamOption(team, image) {
	var teamOption = document.createElement('option');
	teamOption.value = image;
	teamOption.innerHTML = team;
	return teamOption;
}

/*
Adds a "remove surrounding element" button. Used for match days and matches.
*/
function addRemoveButton(appendElement, removeText, removeType) {
	var removeButton = document.createElement('button');
	removeButton.innerHTML = removeText;
	removeButton.className = 'remove' + removeType;
	removeButton.onclick = function() { $(this.parentNode).remove(); }; 
	$(appendElement).append(removeButton);
}

/*
Uses the assembled information to create a TL BB code LR
*/
function createLR() {
	$('body').append('<br>');
	$('body').append( '<textarea name="LRpaste" id="LRpaste" rows="40" cols="100"></textarea>' );
	var LRtext = $("textarea[name='LRpaste']").get(0);

	// ===== LR Creation area ====== //
	/* Top image */
	$(LRtext).append("[center][img]");
	$(LRtext).append( $("input[name='top-image']").val() );
	$(LRtext).append("[/img]\n\n");

	/* Match Tracker image */
	$(LRtext).append("[img]http://i.imgur.com/oBJH4Bs.png[/img][url=");
	$(LRtext).append( $("input[name='match-tracker']").val() );
	$(LRtext).append("]LoLeSports Match Tracker[/url]\n\n");

	/* Stream Section */
	$(LRtext).append("[hr]\n[img]http://i.imgur.com/08h88.png[/img]\n\n");
	addStreams(LRtext);

	/* MATCHES SECTION */
	insertBreak(LRtext)
	$(LRtext).append("[img]http://i.imgur.com/gsiQ0.png[/img]\n\n");
	$(".matchDay").each(function() {
		createMatchDayLR(LRtext, this);
	});

	/* RESULTS SECTION */
	insertBreak(LRtext)
	$(LRtext).append("[img]http://i.imgur.com/L6Pww.png[/img]\n\n");
	$(".matchDay").each(function() {
		createMatchDaySpoilers(LRtext, this);
	});

	/* POLLS SECTION (Duplicate of results) */
	insertBreak(LRtext);
	$(LRtext).append("[img]http://i.imgur.com/0PxXd.png[/img]\n\n");
	$(".matchDay").each(function() {
		createMatchDaySpoilers(LRtext, this);
	});

	/* VODS AND FOOTER SECTION */
	insertBreak(LRtext);
	$(LRtext).append("[img]http://i.imgur.com/QARj1.png[/img]\n\n");
	$(LRtext).append("[spoiler][url=http://vods.leaguepedia.com/tournaments/]LoLVODs[/url][/spoiler][/center]\n");
	$(LRtext).append("[hr][center][small]Thanks to Shiroiusagi for the banner.[/small][/center]");
}

/*
Creates the "Match Day" wrapper BBCode for each day of the event
*/
function createMatchDayLR(LRtext, currentMatchDay) {
	var dateVal = getMatchDate(currentMatchDay);
	var timeVal = $("input[name='time-cntl']", currentMatchDay).val();
	var tzVal = $("input[name='tz-cntl']", currentMatchDay).val();

	$(LRtext).append("[b][blue][big][date]");
	$(LRtext).append(dateVal);
	$(LRtext).append(" ");
	$(LRtext).append(timeVal);
	$(LRtext).append(" ");
	$(LRtext).append(tzVal);
	$(LRtext).append("[/date][/big][/blue][/b]\n\n");

	$(".match", currentMatchDay).each(function() {
		createMatchLR(LRtext, this);
	});
}

/*
Create the actual match BBCode
*/
function createMatchLR(LRtext, currentMatch) {

	var team1 = getTeam("team1", currentMatch);
	var team1img = getTeamImg("team1");
	var team2 = getTeam("team2", currentMatch);
	var team2img = getTeamImg("team2");

	var gameTime = $("input[name='game-time']", currentMatch).val();
	var gameTZ = $("input[name='game-tz']", currentMatch).val();
	var matchURL = $("input[name='match-url']", currentMatch).val();

	$(LRtext).append("[img]" + team1img + "[/img]");
	$(LRtext).append(" [indent] ");
	$(LRtext).append("[url=" + matchURL + "][img]http://i.imgur.com/BUBCHaR.png[/img][/url]");
	$(LRtext).append(" [indent] ");
	$(LRtext).append("[img]" + team2img + "[/img]\n\n");

	$(LRtext).append("[b]" + team1 + " [indent][indent][indent][indent][indent][indent][indent][indent][indent][indent] " + team2 + "[/b]\n");
	$(LRtext).append("[time]" + gameTime + " " + gameTZ + "[/time]\n");

	$(LRtext).append("[spoiler=Bans and Picks]\n[/spoiler]\n\n");
}

/*
Creates the spoiler BBCode for each match day (used for polls and results)
*/
function createMatchDaySpoilers(LRtext, currentMatchDay) {
	var dateVal = getMatchDate(currentMatchDay);
	$(LRtext).append("[spoiler=" + dateVal + "]\n");

	$(".match", currentMatchDay).each(function() {
		createMatchSpoilers(LRtext, this);
	});

	$(LRtext).append("[/spoiler]\n\n");
}

/* 
Creates the spoiler BBCode for each match (used for polls and results)
*/
function createMatchSpoilers(LRtext, currentMatch) {
	var team1 = getTeam("team1", currentMatch);
	var team2 = getTeam("team2", currentMatch);

	$(LRtext).append("[i]");
	$(LRtext).append(team1 + " vs " + team2);
	$(LRtext).append("[/i]\n");
	$(LRtext).append("[spoiler][/spoiler]\n\n");
}

/*
Adds teams to the dropdowns (should be more dynamic)
*/
function addNATeams(teamDropdown) {
	$(teamDropdown).append(createTeamOption('TSM',TSMimg));
	$(teamDropdown).append(createTeamOption('CLG',CLGimg));
	$(teamDropdown).append(createTeamOption('C9',C9img));
	$(teamDropdown).append(createTeamOption('XDG',XDGimg));
	$(teamDropdown).append(createTeamOption('EG',EGimg));
	$(teamDropdown).append(createTeamOption('DIG',DIGimg));
	$(teamDropdown).append(createTeamOption('CST',CSTimg));
	$(teamDropdown).append(createTeamOption('CRS',CRSimg));
	/* ADD OTHER TEAMS HERE */
}

/*
Add streams to the top of the LR (probably should be more dynamic)
*/
function addStreams(LRtext) {
	// Riot Twitch
	$(LRtext).append("[url=http://www.twitch.tv/team/riotgames]Twitch TV[/url]\n");
	// Riot YT
	$(LRtext).append("[url=http://www.youtube.com/lolchampseries]Youtube Stream[/url]\n");
	/* ADD OTHER DEFAULT STREAMS HERE */
}

/*
* ====================================
*
* Basic shortcut methods to improve
* code legibility.
*
* ====================================
*/

function getMatchDate(currentMatchDay) {
	return $("input[name='date-cntl']", currentMatchDay).val();
}

function getTeam(team, currentMatch) {
	return $("#" + team + " option:selected", currentMatch).text();
}

function getTeamImg(team, currentMatch) {
	return $("#" + team, currentMatch).val();
}

function insertBreak(LRtext) {
	$(LRtext).append("\n[hr]\n");
}