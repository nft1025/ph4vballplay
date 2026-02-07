# 🏐 Volleyball Team Manager

A comprehensive volleyball team management system with team randomization, match control, standings tracking, and attendance management.

![Volleyball Theme](https://img.shields.io/badge/Sport-Volleyball-orange)
![Status](https://img.shields.io/badge/Status-Ready-success)

## ✨ Features

### 🎲 Team Randomizer
- **Flexible Player Distribution**: Players don't need to be equal across positions
- **Smart Team Creation**: Creates as many teams as possible with 6 players each
- **6 Positions Supported**:
  - Open Spiker 1 & 2
  - Middle Blocker 1 & 2
  - Setter
  - Opposite Hitter
- **Random Distribution**: Ensures fair and random team assignments

### 🏆 Match Control
- **Round Robin Generator**: Automatically creates all possible match combinations
- **Score Tracking**: Real-time score input for each match
- **Match Status**: Track which matches have been played

### 📊 Standings & Rankings
- **Live Rankings**: Automatically calculated from match results
- **Complete Statistics**:
  - Games Played, Won, Lost
  - Points (3 for win, 1 for draw)
  - Goals Scored, Conceded, Difference
- **Medal Rankings**: Top 3 teams highlighted with Gold, Silver, Bronze

### ✅ Attendance & Payment
- **Player Tracking**: List all players with their teams and positions
- **Payment Checkbox**: Mark players as paid/unpaid
- **Quick Actions**: Mark all players as paid with one click
- **Visual Status**: Color-coded payment status

### 💾 Google Sheets Integration
- Save teams, matches, and attendance to Google Sheets
- Timestamped records for historical tracking
- Color-coded spreadsheets for easy reading

## 🚀 Quick Start

### Option 1: Local Usage
1. Download the files
2. Open `index.html` in your browser
3. Start managing your volleyball teams!

### Option 2: Deploy to Vercel (Recommended)
1. Install [Vercel CLI](https://vercel.com/download): `npm i -g vercel`
2. Navigate to project folder
3. Run: `vercel`
4. Follow the prompts
5. Your app will be live at a Vercel URL!

### Option 3: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository or drag & drop the folder
4. Click "Deploy"
5. Done! Your app is live

## 📋 Google Sheets Setup

### Step 1: Create Google Apps Script
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Click **Extensions** > **Apps Script**
4. Delete any existing code
5. Copy the contents of `Code.gs` and paste it
6. Click **Save** (💾)

### Step 2: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click gear icon next to "Select type"
3. Choose **Web app**
4. Settings:
   - **Description**: "Volleyball Manager"
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. **Copy the Web app URL**

### Step 3: Update Your App
1. Open `index.html` in a text editor
2. Find this line (around line 736):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_SCRIPT_URL_HERE'` with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby7aASAv2TPbb20sS7_76uPcp0UxMs_8LuodTT2WNeM/dev';
   ```
4. Save the file

**Note**: The script URL is already pre-configured with your provided URL!

### What Gets Saved to Sheets?

#### Teams Sheet
- Timestamp
- Team Number
- All 6 player positions

#### Matches Sheet
- Timestamp
- Match ID
- Team matchups
- Scores
- Status (Played/Pending)

#### Attendance Sheet
- Timestamp
- Player Name
- Team Number
- Position
- Payment Status (Paid/Unpaid)

## 🎯 How to Use

### Creating Teams
1. Go to the **Teams** tab
2. Enter player names in each position (one per line)
3. Players **don't need to be equal** - the system will work with unequal numbers
4. Click **🎲 Randomize Teams**
5. Teams will be displayed
6. Click **💾 Save to Google Sheets** to save

**Example with Unequal Players:**
- Open Spiker 1: 5 players
- Open Spiker 2: 3 players  
- Middle Blocker 1: 4 players
- Middle Blocker 2: 5 players
- Setter: 5 players
- Opposite Hitter: 4 players

Result: 5 teams will be created (based on the maximum), with some positions having no player assigned.

### Managing Matches
1. Go to the **Matches** tab
2. Click **Generate Round Robin Matches**
3. Enter scores for each match
4. Scores automatically update standings
5. Click **💾 Save Matches to Sheets** to save

### Viewing Standings
1. Go to the **Standings** tab
2. Rankings update automatically as you enter match scores
3. Top 3 teams get medal rankings
4. View complete statistics for each team

### Tracking Attendance
1. Go to the **Attendance** tab
2. Check the box for players who have paid
3. Visual indicators show payment status
4. Click **✓ Mark All Paid** to mark everyone
5. Click **💾 Save Attendance to Sheets** to save

## 🎨 Theme

The app features a **volleyball-inspired theme**:
- **Colors**: Orange (volleyball), Yellow (court), Blue (sky)
- **Design**: Court-inspired grid patterns
- **Typography**: Bold, sporty fonts (Oswald, Bebas Neue, Rajdhani)
- **Animations**: Smooth transitions and micro-interactions

## 📁 File Structure

```
volleyball-team-manager/
├── index.html          # Main application (single file)
├── Code.gs            # Google Apps Script
├── vercel.json        # Vercel configuration
├── package.json       # Package metadata
└── README.md          # This file
```

## 🔧 Customization

### Change Colors
Edit the CSS variables in `index.html`:
```css
:root {
    --volleyball-orange: #FF6B35;
    --volleyball-yellow: #FFA500;
    --court-blue: #1E90FF;
    --dark-bg: #1a1a1a;
}
```

### Modify Scoring System
In `index.html`, find the `updateScore` function:
```javascript
if (match.score1 > match.score2) {
    t1.points += 3;  // Change win points here
}
```

### Add More Positions
1. Add new position in HTML (around line 850)
2. Update `positions` object in `randomizeTeams()` function
3. Update Google Sheets headers in `Code.gs`

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Mobile Responsive

Fully responsive design works on:
- 📱 Phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🆘 Troubleshooting

### Teams not saving to Google Sheets
- Check that your Web App URL is correct
- Ensure deployment is set to "Anyone" access
- Check Apps Script execution logs (View > Executions)

### Scores not updating standings
- Make sure you're entering scores as numbers
- Refresh the Standings tab to see updates

### Can't generate matches
- Ensure you have at least 2 teams created first
- Click "Randomize Teams" before generating matches

### Deployment issues on Vercel
- Make sure all files are in the same directory
- Check that `vercel.json` is present
- Use Vercel CLI for better error messages

## 📊 Optional Google Sheets Functions

Run these from the Apps Script editor:

### Export Current Teams
```
Run > exportLatestTeams
```
Creates a "Current_Teams" sheet with just the latest team setup.

### Export Standings
```
Run > exportStandings
```
Creates a "Current_Standings" sheet with calculated rankings.

### Clear Data
```
Run > clearSheet('Teams')
Run > clearSheet('Matches')
Run > clearSheet('Attendance')
```

## 🔐 Privacy & Data

- All data is stored in YOUR Google Sheets
- No external databases or third-party services
- You control all player information
- Can be used completely offline (without Sheets integration)

## 📝 License

MIT License - Free to use and modify!

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit improvements
- Share with your volleyball community!

## 💡 Tips

1. **Save regularly** to Google Sheets to keep records
2. **Use consistent naming** for players across sessions
3. **Mark attendance** before each game day
4. **Export standings** periodically for historical records
5. **Test the app** with sample data before your tournament

## 🏐 Perfect For

- 🎯 Volleyball tournaments
- 🏫 School volleyball programs
- 🏢 Corporate volleyball leagues
- 👥 Recreational volleyball groups
- 🏆 Community sports events

---

**Made for volleyball enthusiasts!** 🏐

Questions? Issues? Check the troubleshooting section or review the Google Apps Script logs for detailed error information.

**Happy playing! 🏐🎉**
