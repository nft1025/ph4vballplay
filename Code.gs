// Google Apps Script for Volleyball Team Manager
// Handles Teams, Matches, and Attendance data

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    let result;
    
    switch(action) {
      case 'saveTeams':
        result = saveTeams(data);
        break;
      case 'saveMatches':
        result = saveMatches(data);
        break;
      case 'saveAttendance':
        result = saveAttendance(data);
        break;
      default:
        result = { success: false, error: 'Unknown action' };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'Volleyball Team Manager API is running',
    endpoints: ['saveTeams', 'saveMatches', 'saveAttendance']
  })).setMimeType(ContentService.MimeType.JSON);
}

// Save Teams
function saveTeams(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Teams');
  
  if (!sheet) {
    sheet = ss.insertSheet('Teams');
    
    // Add headers
    sheet.getRange('A1:H1').setValues([[
      'Timestamp',
      'Team Number',
      'Open Spiker 1',
      'Open Spiker 2',
      'Middle Blocker 1',
      'Middle Blocker 2',
      'Setter',
      'Opposite Hitter'
    ]]);
    
    // Format headers
    sheet.getRange('A1:H1')
      .setFontWeight('bold')
      .setBackground('#FF6B35')
      .setFontColor('#FFFFFF')
      .setHorizontalAlignment('center');
    
    sheet.setFrozenRows(1);
  }
  
  const timestamp = new Date(data.timestamp);
  const rows = [];
  
  data.teams.forEach(team => {
    rows.push([
      timestamp,
      team.number,
      team.players['Open Spiker 1'] || '',
      team.players['Open Spiker 2'] || '',
      team.players['Middle Blocker 1'] || '',
      team.players['Middle Blocker 2'] || '',
      team.players['Setter'] || '',
      team.players['Opposite Hitter'] || ''
    ]);
  });
  
  const lastRow = sheet.getLastRow();
  const startRow = lastRow + 1;
  
  sheet.getRange(startRow, 1, rows.length, 8).setValues(rows);
  
  // Format rows
  sheet.getRange(startRow, 1, rows.length, 8)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('middle');
  
  // Alternate row colors
  for (let i = 0; i < rows.length; i++) {
    if (i % 2 === 0) {
      sheet.getRange(startRow + i, 1, 1, 8).setBackground('#F7F7FF');
    }
  }
  
  sheet.autoResizeColumns(1, 8);
  
  return {
    success: true,
    message: 'Teams saved successfully',
    rowsAdded: rows.length
  };
}

// Save Matches
function saveMatches(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Matches');
  
  if (!sheet) {
    sheet = ss.insertSheet('Matches');
    
    // Add headers
    sheet.getRange('A1:G1').setValues([[
      'Timestamp',
      'Match ID',
      'Team 1',
      'Team 2',
      'Score 1',
      'Score 2',
      'Status'
    ]]);
    
    // Format headers
    sheet.getRange('A1:G1')
      .setFontWeight('bold')
      .setBackground('#1E90FF')
      .setFontColor('#FFFFFF')
      .setHorizontalAlignment('center');
    
    sheet.setFrozenRows(1);
  }
  
  const timestamp = new Date(data.timestamp);
  const rows = [];
  
  data.matches.forEach(match => {
    rows.push([
      timestamp,
      match.id,
      match.team1,
      match.team2,
      match.score1,
      match.score2,
      match.played ? 'Played' : 'Pending'
    ]);
  });
  
  const lastRow = sheet.getLastRow();
  const startRow = lastRow + 1;
  
  sheet.getRange(startRow, 1, rows.length, 7).setValues(rows);
  
  // Format rows
  sheet.getRange(startRow, 1, rows.length, 7)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('middle');
  
  // Color code status
  for (let i = 0; i < rows.length; i++) {
    const rowNum = startRow + i;
    if (rows[i][6] === 'Played') {
      sheet.getRange(rowNum, 7).setBackground('#C8E6C9');
    } else {
      sheet.getRange(rowNum, 7).setBackground('#FFECB3');
    }
    
    if (i % 2 === 0) {
      sheet.getRange(rowNum, 1, 1, 6).setBackground('#F7F7FF');
    }
  }
  
  sheet.autoResizeColumns(1, 7);
  
  return {
    success: true,
    message: 'Matches saved successfully',
    rowsAdded: rows.length
  };
}

// Save Attendance
function saveAttendance(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Attendance');
  
  if (!sheet) {
    sheet = ss.insertSheet('Attendance');
    
    // Add headers
    sheet.getRange('A1:E1').setValues([[
      'Timestamp',
      'Player Name',
      'Team',
      'Position',
      'Payment Status'
    ]]);
    
    // Format headers
    sheet.getRange('A1:E1')
      .setFontWeight('bold')
      .setBackground('#4CAF50')
      .setFontColor('#FFFFFF')
      .setHorizontalAlignment('center');
    
    sheet.setFrozenRows(1);
  }
  
  const timestamp = new Date(data.timestamp);
  const rows = [];
  
  data.attendance.forEach(player => {
    rows.push([
      timestamp,
      player.name,
      player.team,
      player.position,
      player.paid ? 'Paid' : 'Unpaid'
    ]);
  });
  
  const lastRow = sheet.getLastRow();
  const startRow = lastRow + 1;
  
  sheet.getRange(startRow, 1, rows.length, 5).setValues(rows);
  
  // Format rows
  sheet.getRange(startRow, 1, rows.length, 5)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('middle');
  
  // Color code payment status
  for (let i = 0; i < rows.length; i++) {
    const rowNum = startRow + i;
    if (rows[i][4] === 'Paid') {
      sheet.getRange(rowNum, 5).setBackground('#C8E6C9').setFontWeight('bold');
    } else {
      sheet.getRange(rowNum, 5).setBackground('#FFCDD2');
    }
    
    if (i % 2 === 0) {
      sheet.getRange(rowNum, 1, 1, 4).setBackground('#F7F7FF');
    }
  }
  
  sheet.autoResizeColumns(1, 5);
  
  return {
    success: true,
    message: 'Attendance saved successfully',
    rowsAdded: rows.length
  };
}

// Optional: Clear specific sheet
function clearSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (sheet) {
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
      SpreadsheetApp.getUi().alert(`${sheetName} sheet cleared!`);
    } else {
      SpreadsheetApp.getUi().alert('No data to clear.');
    }
  } else {
    SpreadsheetApp.getUi().alert(`${sheetName} sheet not found.`);
  }
}

// Optional: Export latest teams to separate sheet
function exportLatestTeams() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const teamsSheet = ss.getSheetByName('Teams');
  
  if (!teamsSheet || teamsSheet.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('No team records found.');
    return;
  }
  
  const lastRow = teamsSheet.getLastRow();
  const timestamps = teamsSheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const latestTimestamp = new Date(Math.max(...timestamps.map(row => new Date(row[0]))));
  
  const allData = teamsSheet.getRange(2, 1, lastRow - 1, 8).getValues();
  const latestTeams = allData.filter(row => 
    new Date(row[0]).getTime() === latestTimestamp.getTime()
  );
  
  const sheetName = 'Current_Teams';
  let exportSheet = ss.getSheetByName(sheetName);
  
  if (exportSheet) {
    ss.deleteSheet(exportSheet);
  }
  
  exportSheet = ss.insertSheet(sheetName);
  
  // Add headers
  exportSheet.getRange('A1:G1').setValues([[
    'Team',
    'Open Spiker 1',
    'Open Spiker 2',
    'Middle Blocker 1',
    'Middle Blocker 2',
    'Setter',
    'Opposite Hitter'
  ]]);
  
  exportSheet.getRange('A1:G1')
    .setFontWeight('bold')
    .setBackground('#FF6B35')
    .setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');
  
  const teamData = latestTeams.map(row => row.slice(1));
  exportSheet.getRange(2, 1, teamData.length, 7).setValues(teamData);
  
  exportSheet.getRange(2, 1, teamData.length, 7)
    .setBorder(true, true, true, true, true, true);
  
  for (let i = 0; i < teamData.length; i++) {
    if (i % 2 === 0) {
      exportSheet.getRange(i + 2, 1, 1, 7).setBackground('#FFF3E0');
    }
  }
  
  exportSheet.autoResizeColumns(1, 7);
  
  SpreadsheetApp.getUi().alert('Current teams exported!');
}

// Optional: Calculate and export standings
function exportStandings() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const matchesSheet = ss.getSheetByName('Matches');
  
  if (!matchesSheet || matchesSheet.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('No match data found.');
    return;
  }
  
  // Get latest match data
  const lastRow = matchesSheet.getLastRow();
  const timestamps = matchesSheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const latestTimestamp = new Date(Math.max(...timestamps.map(row => new Date(row[0]))));
  
  const allData = matchesSheet.getRange(2, 1, lastRow - 1, 7).getValues();
  const latestMatches = allData.filter(row => 
    new Date(row[0]).getTime() === latestTimestamp.getTime()
  );
  
  // Calculate standings
  const teams = {};
  
  latestMatches.forEach(match => {
    const team1 = match[2];
    const team2 = match[3];
    const score1 = match[4];
    const score2 = match[5];
    const played = match[6] === 'Played';
    
    if (!teams[team1]) {
      teams[team1] = { team: team1, played: 0, won: 0, lost: 0, points: 0, scored: 0, conceded: 0 };
    }
    if (!teams[team2]) {
      teams[team2] = { team: team2, played: 0, won: 0, lost: 0, points: 0, scored: 0, conceded: 0 };
    }
    
    if (played) {
      teams[team1].played++;
      teams[team2].played++;
      teams[team1].scored += score1;
      teams[team1].conceded += score2;
      teams[team2].scored += score2;
      teams[team2].conceded += score1;
      
      if (score1 > score2) {
        teams[team1].won++;
        teams[team1].points += 3;
        teams[team2].lost++;
      } else if (score2 > score1) {
        teams[team2].won++;
        teams[team2].points += 3;
        teams[team1].lost++;
      } else {
        teams[team1].points += 1;
        teams[team2].points += 1;
      }
    }
  });
  
  // Sort teams
  const standings = Object.values(teams).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.scored - a.conceded;
    const diffB = b.scored - b.conceded;
    if (diffB !== diffA) return diffB - diffA;
    return b.scored - a.scored;
  });
  
  // Create standings sheet
  const sheetName = 'Current_Standings';
  let standingsSheet = ss.getSheetByName(sheetName);
  
  if (standingsSheet) {
    ss.deleteSheet(standingsSheet);
  }
  
  standingsSheet = ss.insertSheet(sheetName);
  
  // Headers
  standingsSheet.getRange('A1:I1').setValues([[
    'Rank', 'Team', 'Played', 'Won', 'Lost', 'Points', 'Scored', 'Conceded', 'Diff'
  ]]);
  
  standingsSheet.getRange('A1:I1')
    .setFontWeight('bold')
    .setBackground('#1E90FF')
    .setFontColor('#FFFFFF')
    .setHorizontalAlignment('center');
  
  // Data
  const standingsData = standings.map((s, index) => [
    index + 1,
    'Team ' + s.team,
    s.played,
    s.won,
    s.lost,
    s.points,
    s.scored,
    s.conceded,
    s.scored - s.conceded
  ]);
  
  standingsSheet.getRange(2, 1, standingsData.length, 9).setValues(standingsData);
  standingsSheet.getRange(2, 1, standingsData.length, 9)
    .setBorder(true, true, true, true, true, true)
    .setHorizontalAlignment('center');
  
  // Highlight top 3
  if (standingsData.length >= 1) standingsSheet.getRange(2, 1, 1, 9).setBackground('#FFD700');
  if (standingsData.length >= 2) standingsSheet.getRange(3, 1, 1, 9).setBackground('#C0C0C0');
  if (standingsData.length >= 3) standingsSheet.getRange(4, 1, 1, 9).setBackground('#CD7F32');
  
  standingsSheet.autoResizeColumns(1, 9);
  
  SpreadsheetApp.getUi().alert('Standings exported!');
}
