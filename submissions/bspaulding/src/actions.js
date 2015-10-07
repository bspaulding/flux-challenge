import ajax from "component-ajax";

export const SCROLL_UP = "SCROLL_UP";
export const SCROLL_DOWN = "SCROLL_DOWN";
export const PLANET_CHANGED = "PLANET_CHANGED";
export const JEDI_LOADED = "JEDI_LOADED";

export function scrollUp() {
  return function(dispatch) {
    dispatch({ type: SCROLL_UP });
    dispatch(loadJediAtIndex(1));
  };
}

export function scrollDown() {
  return function(dispatch) {
    dispatch({ type: SCROLL_DOWN });
    dispatch(loadJediAtIndex(3));
  };
}

export function planetChanged(planet) {
  return { type: PLANET_CHANGED, planet: planet };
}

function jediLoaded(jedi, index) {
  return { type: JEDI_LOADED, jedi: jedi, index: index };
}

function adjacentSithURL(sith, index) {
  var prev = sith[index - 1];
  var next = sith[index + 1];

  if (prev && prev.apprentice && prev.apprentice.url) {
    return prev.apprentice.url;
  } else if (next && next.master && next.master.url) {
    return next.master.url;
  }
}

function loadJediAtIndex(index) {
  return function(dispatch, getState) {
    var sith = getState().sith;
    var linkedSithURL = adjacentSithURL(sith, index);
    if (linkedSithURL) {
      fetchJSON(linkedSithURL)
        .then(function(jedi) {
          dispatch(jediLoaded(jedi, index));

          // todo, need to either load +/- 1
          if (index < 4) {
            var prev = sith[index - 1];
            var next = sith[index + 1];
            if (prev && prev.loading) {
              dispatch(loadJediAtIndex(index - 1));
            } else if (next && next.loading) {
              dispatch(loadJediAtIndex(index + 1));
            }
          }
        });
    }
  };
}

var fetchJSON = (function() {
  var xhr;

  function fetchJSON(url) {
    if (xhr && xhr.readyState !== 4) {
      xhr.abort();
    }

    return new Promise(function(resolve, reject) {
      xhr = ajax.getJSON(url, resolve);
    });
  }

  return fetchJSON;
}());

const sidiousID = "3616";
const sidiousURL = `http://localhost:3000/dark-jedis/${sidiousID}`;
function isLoading(s) { return s.loading; }
function loadJediIfNeeded(startIndex) {
  return function(dispatch, getState) {
    var sith = getState().sith;
    if (sith.filter(isLoading).length === sith.length) {
      // no sith to start from, start with Sidious
      fetchJSON(sidiousURL)
        .then(function(jedi) {
          dispatch(jediLoaded(jedi, 0));
          dispatch(loadJediAtIndex(1));
        });
      return;
    }
  };
}

export default { scrollUp, scrollDown, planetChanged, loadJediIfNeeded };
