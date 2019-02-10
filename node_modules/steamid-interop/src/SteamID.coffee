Long = require('long')

class SteamID
  constructor: (object) ->
    @accountID = object.accountID or 0
    @accountInstance = object.accountInstance or 1
    @accountType = object.accountType or 1
    @accountUniverse = object.accountUniverse or 0

  @decode = (steamID) ->
    if (steamID.indexOf('STEAM') > -1)
      return @decode32(steamID)
    else if (steamID.indexOf('[') > -1)
      return @decodeSteam3(steamID)
    else
      return @decode64(steamID)

  @decode64 = (steamID) ->
    steamID = Long.fromValue(steamID)
    new SteamID(
      accountID: steamID.low
      accountInstance: steamID.high & 0xFFFFF
      accountType: steamID.high >> 20 & 0xF
      accountUniverse: steamID.high >> 24 & 0xFF)

  @decode32 = (steamID) ->
    steamID = steamID.split(':')
    # Universe is the last character in the first part STEAM_0
    accountUniverse = parseInt(steamID[0][steamID[0].length - 1]) + 1
    missingBit = steamID[1] # Take the bit from the middle for use in our account ID.
    # The ID is the last set of numbers excluding the last bit.
    accountID = parseInt(steamID[2]) << 1 | missingBit
    new SteamID(
      accountUniverse: accountUniverse
      accountID: accountID)

  @decodeSteam3 = (steamID) ->
    steamID = steamID.replace(/[\[\]]/g, '')
    steamID = steamID.split(':')
    accountUniverse = parseInt(steamID[1])
    accountID = parseInt(steamID[2])
    new SteamID(
      accountUniverse: accountUniverse
      accountID: accountID)

  encode64: ->
    # 76561197999463262
    new Long(@accountID, @accountInstance | @accountType << 20 | @accountUniverse << 24).toString()

  encode32: ->
    # STEAM_0:0:19598767
    "STEAM_#{@accountUniverse-1}:#{@accountID & 0x1}:#{@accountID >> 1}"

  encodeSteam3: ->
    # [U:1:39197534]
    return "[#{SteamID.AccountTypes[@accountType]}:#{@accountUniverse}:#{@accountID}]"

  toString: (encoding='64') ->
    if (encoding == '64')
      return @encode64()
    else if (encoding == '32')
      return @encode32()
    else if (encoding == 'steam3')
      return @encodeSteam3()

# Types of Steam Accounts Indexed By ID
# More info at: https://developer.valvesoftware.com/wiki/SteamID
SteamID.AccountTypes = ['I', 'U', 'M', 'G', 'A', 'P', 'C', 'g', 'T', 'c', 'L']

module.exports = SteamID