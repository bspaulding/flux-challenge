import { createSelector } from "reselect";

function findRight(f, xs) {
  for ( var i = xs.length - 1; i >= 0; i -= 1) {
    if (f(xs[i])) {
      return xs[i];
    }
  }
}

function currentPlanetSelector(state) {
  return state.currentPlanet;
}

function sithSelector(state) {
  return state.sith;
}

function notOnASithPlanet(currentPlanetName, sithHomeworldNames) {
  return sithHomeworldNames.indexOf(currentPlanetName) < 0;
}

function pluckHomeworldName(sith) {
  return sith.homeworld ? sith.homeworld.name : "";
}

function isLoaded(sith) {
  return !sith.loading;
}
function unloadedMasterAvailable(sith) {
  var firstLoaded = sith.find(isLoaded);
  return !!(firstLoaded && firstLoaded.master && firstLoaded.master.url);
}

function unloadedApprenticeAvailable(sith) {
  var lastLoaded = findRight(isLoaded, sith);
  return !!(lastLoaded && lastLoaded.apprentice && lastLoaded.apprentice.url);
}

function noMastersLoading(sith) {
  return !sith[0].loading && !sith[1].loading;
}
function noApprenticesLoading(sith) {
  return !sith[3].loading && !sith[4].loading;
}

export default createSelector([
  currentPlanetSelector,
  sithSelector
], function(currentPlanet, sith) {
  var _notOnASithPlanet = notOnASithPlanet(currentPlanet.name, sith.map(pluckHomeworldName));
  return {
    canScrollUp: _notOnASithPlanet && unloadedMasterAvailable(sith) && noMastersLoading(sith),
    canScrollDown: _notOnASithPlanet && unloadedApprenticeAvailable(sith) && noApprenticesLoading(sith),
    currentPlanet: currentPlanet,
    sith: sith
  }
});
