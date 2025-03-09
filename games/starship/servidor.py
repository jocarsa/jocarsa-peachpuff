import asyncio
import websockets

# Maintain a set of connected clients
connected_clients = set()

# Define a function to handle incoming WebSocket connections
async def handle_client(websocket, path):
    # Add the client to the set of connected clients
    connected_clients.add(websocket)

    try:
        async for message in websocket:
            # Handle incoming messages from clients
            # Broadcast messages to all connected clients
            for client in connected_clients:
                await client.send(message)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        # Remove the client from the set of connected clients when they disconnect
        connected_clients.remove(websocket)

# Start the WebSocket server on port 3000
start_server = websockets.serve(handle_client, "192.168.1.38", 3000)

# Run the WebSocket server
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
