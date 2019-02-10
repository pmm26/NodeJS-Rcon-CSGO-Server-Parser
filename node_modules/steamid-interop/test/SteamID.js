var should = require('should')
var SteamID = require('../lib/SteamID')

describe('64-bit IDs', function() {
  describe('76561197960265731', function() {
    it('64-bit should be 76561197960265731', function() {
      var id = SteamID.decode('76561197960265731')
      should(id.toString()).equal('76561197960265731')
    })

    it('32-bit should be STEAM_0:1:1', function() {
      var id = SteamID.decode('76561197960265731')
      should(id.toString('32')).equal('STEAM_0:1:1')
    })

    it('Steam3 should be [U:1:3]', function() {
      var id = SteamID.decode('76561197960265731')
      should(id.toString('steam3')).equal('[U:1:3]')
    })
  })
})

describe('Steam 3 IDs', function() {
  describe('[U:1:39197534]', function() {
    it('Steam 3 should be [U:1:39197534]', function() {
      var id = SteamID.decode('[U:1:39197534]')
      should(id.toString('steam3')).equal('[U:1:39197534]')
    })
    it('64-bit should be 76561197999463262', function() {
      var id = SteamID.decode('[U:1:39197534]')
      should(id.toString()).equal('76561197999463262')
    })
    it('32-bit should be STEAM_0:0:19598767', function() {
      var id = SteamID.decode('[U:1:39197534]')
      should(id.toString('32')).equal('STEAM_0:0:19598767')
    })
  })
})

describe('32-bit IDs', function() {
  describe('STEAM_0:0:1', function() {
    it('Steam 3 should be [U:1:39197534]', function() {
      var id = SteamID.decode('STEAM_0:0:1')
      should(id.toString('steam3')).equal('[U:1:2]')
    })
    it('64-bit should be [U:1:39197534]', function() {
      var id = SteamID.decode('STEAM_0:0:1')
      should(id.toString()).equal('76561197960265730')
    })
    it('32-bit should be [U:1:39197534]', function() {
      var id = SteamID.decode('STEAM_0:0:1')
      should(id.toString('32')).equal('STEAM_0:0:1')
    })
  })

  describe('STEAM_0:1:1', function() {
    it('Steam 3 should be [U:1:3]', function() {
      var id = SteamID.decode('STEAM_0:1:1')
      should(id.toString('steam3')).equal('[U:1:3]')
    })
    it('64-bit should be 76561197960265731', function() {
      var id = SteamID.decode('STEAM_0:1:1')
      should(id.toString()).equal('76561197960265731')
    })
    it('32-bit should be STEAM_0:1:1', function() {
      var id = SteamID.decode('STEAM_0:1:1')
      should(id.toString('32')).equal('STEAM_0:1:1')
    })
  })

  describe('STEAM_1:0:42606488', function() {
    it('Steam 3 should be [U:1:85212976]', function() {
      var id = SteamID.decode('STEAM_1:0:42606488')
      should(id.toString('steam3')).equal('[U:1:85212976]')
    })
    it('64-bit should be 76561198045478704', function() {
      var id = SteamID.decode('STEAM_1:0:42606488')
      should(id.toString()).equal('76561198045478704')
    })
    it('32-bit should be STEAM_1:0:42606488', function() {
      var id = SteamID.decode('STEAM_1:0:42606488')
      should(id.toString('32')).equal('STEAM_0:0:42606488')
    })
  })
})