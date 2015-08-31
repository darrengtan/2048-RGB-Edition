# 2048: RGB Edition

An RGB version of the 2048 game. This application is written in Javascript and
uses adding/removing classes to apply the proper transitions.

Live Link: https://darrengtan.github.io

## How to Play

Use the arrow keys to move the tiles. Merge tiles of the same value and reach 2048 before the board is filled!

## Implementation

* Tile: My tiles hold information necessary to determine merging. Its attributes include value, position, whether it has merged or not, and the selector to grab the necessary tile in the index.html. It is also in charge of finding a random empty position on the board.

* Board: The board has the backend knowledge of the tile locations. It checks for any available spots on the board and whether a given position is within the boundaries of the game. It is in charge of inserting and removing tiles based on the game's commands.

* Game: The game holds all the logic of moving the tiles and when to merge the tiles. It does so by traversing in the opposite direction of the specified command and looks for a tile. Upon finding a tile, it recursively looks back in the correct direction and looks for an obstacle. If it's possible to merge with the obstacle, it will merge the tiles.

* GameView: The gameView is in charge of displaying the game and binding the proper events. It inputs the move command for the game based on the arrow key used and restarts the game if the reset buttons are pressed.

## Need to Work On

* merge tiles of same value
* listen to arrow keys
