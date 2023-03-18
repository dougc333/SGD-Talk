(function(f) {
  var haveAUI = typeof P !== 'undefined' && P.AUI_BUILD_DATE;
  if (typeof SiegeCrypto !== 'undefined') {
    if (haveAUI) {
      P.now('siege-cse').register('siege-cse:profile:Wfm-DigitalTech-StoreFinder-Query', function(lib) {
        return f(lib || SiegeCrypto);
      });
    } else {
      f(SiegeCrypto);
    }
  } else if (haveAUI) {
    P.when('siege-cse').register('siege-cse:profile:Wfm-DigitalTech-StoreFinder-Query', f);
  } else {
    var err = new Error('CSE library not loaded, and no AUI');
    try {
      ueLogError(err, {attribution: 'siege-cse:profile:Wfm-DigitalTech-StoreFinder-Query', logLevel: 'WARN'});
    } catch (e) {
      throw err;
    }
  }
})(function(SiegeCrypto) {

SiegeCrypto.addProfile("Wfm-DigitalTech-StoreFinder-Query", {
  "query": {dataType: "Wfm-DigitalTech-StoreFinder-Query", requiresTail: false},
});

var createDeferred = SiegeCrypto.createDeferred || (function() {
  return {
    resolve: function() {},
    reject: function(e) {
      console.error(e);
    }
  };
});

function addMissingDataType(id) {
  var deferred = createDeferred();
  if (SiegeCrypto.addLoadingDataType) {
    SiegeCrypto.addLoadingDataType(id, deferred.promise);
  }
  deferred.reject(new Error('Datatype ' + id + ' is not supported in CSE'));
}

SiegeCrypto.addDataType({
	"dataTypeId": "Wfm-DigitalTech-StoreFinder-Query",
	"jwkPublicKey": {"kty":"RSA","e":"AQAB","n":"qNPG6GixuWx4K4kotdlRyy5qGzEBphRaJDqDZYcVOUolKpaGjSHcSjwumAX1A6LJqGYrh5GPGOuJoy8DIhA4GP933pLo-J4wVxwtXxGLsJjmM_kE4ZHdtaSty2eZxM5EfkaBVaUeIIfHnNVC4lh-4WJwbcmGm9rV6wK7O_7PWGpbvsgX46gdSF1wkRoP-AkiNzbw6MD4oDw5duyy5ReA4pHQeg8aegysECQ4BJpmSgW2gVM9DhIWVXjKJ0j1O9yg3O3TiCwAW1fW4MkEXAX0kyP4BwlRoKZTGr-shmVPf9VD1HwFYIg_M09oaHGGG5BOSaVc17rE9hHE47JNLrUaow"},
	"providerId": "si:md5",
	"keyId": "c612730fc870466218df4b275aaea2b5"
});

return SiegeCrypto;

});
