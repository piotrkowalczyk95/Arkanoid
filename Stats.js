window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let db;
let dbReq = indexedDB.open('gameStatsDB', 1);

dbReq.onupgradeneeded = function (event) {
    db = event.target.result;
    let gameStats = db.createObjectStore('gameStats', { autoIncrement: true });
}

dbReq.onsuccess = function (event) {
    db = event.target.result;
}

dbReq.onerror = function (event) {
    alert('Database error:' + event.target.errorCode);
}

function displayStats(stats) {
    let listHTML = '';
    if (stats.length == 0) {
        listHTML = "List is empty";
    }
    else {
        for (let i = 0; i < stats.length; i++) {
            let stat = stats[i];
            listHTML += 'ID: ' + (i + 1) + ', '
                + 'Nickname: ' + stat.nick + ', '
                + 'Date: ' + stat.date + ', '
                + 'Points: ' + stat.points + ', '
                + 'Time: ' + stat.gameTime + ', '
                + 'Vertical Platform: ' + stat.platform + ', '
                + 'Mode: ' + stat.gamemode + '\n';
        }
    }
    window.alert(listHTML);
}

function getScores(db) {
    let tx = db.transaction(['gameStats'], 'readonly');
    let store = tx.objectStore('gameStats');

    let req = store.openCursor();
    let allStats = [];

    req.onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor != null) {
            allStats.push(cursor.value);
            cursor.continue();
        }
        else {
            displayStats(allStats);
        }
    }

    req.onerror = function (event) {
        alert('Error when accessing database: ' + event.target.errorCode);
    }
}

function addScore(db) {
    let tx = db.transaction(['gameStats'], 'readwrite');
    let store = tx.objectStore('gameStats');
    let date = new Date;
    let month = date.getMonth() + 1;
    let isPlatform;
    let whichMode;
    if (verticalPlatform) {
        isPlatform = "Yes";
    }
    else {
        isPlatform = "No";
    }
    if (mode == false) {
        whichMode = 1;
    }
    else {
        whichMode = 2;
    }
    let gameData = {
        nick: player,
        date: date.getDate() + "-" + month + "-" + date.getFullYear(),
        points: score,
        gameTime: time + "s",
        platform: isPlatform,
        gamemode: whichMode
    }
    store.add(gameData)
    tx.oncomplete = function () {
        console.log('score stored');
    }
    tx.onerror = function (event) {
        alert("Error with saving to database: " + event.target.errorCode);
    }
}

function timer() {
    if (!gamePaused) {
        time++;
    }
}

function displayScore() {
    document.getElementById('displayCurrentScore').innerHTML = score;
}

function displayTime() {
    document.getElementById('displayGameTime').innerHTML = time;
}

function showStats() {
    getScores(db);
}