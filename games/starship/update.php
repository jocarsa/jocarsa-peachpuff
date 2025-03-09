<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!$data) {
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

try {
    $db = new SQLite3('game.db');
    $db->busyTimeout(5000);
    $db->exec('PRAGMA journal_mode = WAL;');
    
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
    
    $now = time();
    
    $stmt = $db->prepare('INSERT OR REPLACE INTO players 
        (id, username, color, posx, posy, rotation, projectiles, puntos, last_update)
        VALUES (:id, :username, :color, :posx, :posy, :rotation, :projectiles, :puntos, :last_update)');
    
    $stmt->bindValue(':id', $data['id'], SQLITE3_TEXT);
    $stmt->bindValue(':username', $data['usuario'], SQLITE3_TEXT);
    $stmt->bindValue(':color', $data['color'], SQLITE3_TEXT);
    $stmt->bindValue(':posx', $data['position']['x'], SQLITE3_FLOAT);
    $stmt->bindValue(':posy', $data['position']['y'], SQLITE3_FLOAT);
    $stmt->bindValue(':rotation', $data['rotation'], SQLITE3_FLOAT);
    $stmt->bindValue(':projectiles', json_encode($data['projectiles']), SQLITE3_TEXT);
    $stmt->bindValue(':puntos', $data['puntos'], SQLITE3_INTEGER);
    $stmt->bindValue(':last_update', $now, SQLITE3_INTEGER);
    $stmt->execute();
    
    echo json_encode(['status' => 'ok']);
} catch(Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>

