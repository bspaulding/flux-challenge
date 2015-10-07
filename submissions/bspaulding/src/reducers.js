import {
  SCROLL_UP,
  SCROLL_DOWN,
  PLANET_CHANGED,
  JEDI_LOADED
} from "./actions";

const initialState = {
  currentPlanet: {},
  sith: [{
    loading: true
  }, {
    loading: true
  }, {
    loading: true
  }, {
    loading: true
  }, {
    loading: true
  }]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SCROLL_UP:
    return {
      ...state,
      sith: [{ loading: true }, { loading: true }, ...state.sith.slice(0, 3)]
    };
  case SCROLL_DOWN:
    return {
      ...state,
      sith: [...state.sith.slice(2), { loading: true }, { loading: true }]
    };
  case PLANET_CHANGED:
    return {
      ...state,
      currentPlanet: action.planet
    };
  case JEDI_LOADED:
    return {
      ...state,
      sith: state.sith.slice(0, action.index)
        .concat(action.jedi)
        .concat(state.sith.slice(action.index + 1))
    };
  }
  return state;
};
