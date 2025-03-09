<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

try {
    $db = new SQLite3('game.db');
    
    // Set busy timeout and enable WAL mode to reduce lock conflicts
    $db->busyTimeout(5000);
    $db->exec('PRAGMA journal_mode = WAL;');

    // Create the players table if it doesn't exist
    $db->exec('CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        username TEXT,
        color TEXT,
        posx REAL,
        posy REAL,
        rotation REAL,
        projectiles TEXT,
        puntos INTEGER,
        last_update INTEGER
    )');
    
    // Only fetch players updated in the last 5 seconds
    $threshold = time() - 5;
    $results = $db->query("SELECT * FROM players WHERE last_update > $threshold");
    
    $players = [];
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $row['projectiles'] = json_decode($row['projectiles'], true);
        $players[] = $row;
    }
    
    echo json_encode($players);
} catch(Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

