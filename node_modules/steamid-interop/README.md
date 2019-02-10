# SteamID Interop

SteamID interop allows you to decode and encode SteamIDs to various formats, such as 32-bit, 64-bit and the new Steam3 format.

```js
var SteamID = require('steamid-interop")

var id = SteamID.decode('STEAM_0:1:1')
console.log(id.toString('64')) // 76561197960265731
console.log(id.toString('32')) // STEAM_0:1:1
console.log(id.toString('steam3')) // [U:1:3]
console.log(id.toString()) // Defaults to 64-bit when no encoding method specified.
```
