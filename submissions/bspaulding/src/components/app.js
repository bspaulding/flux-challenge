import React from "react";
import PlanetSubscriber from "../planet-subscriber";
import classnames from "classnames";


var App = React.createClass({
  componentWillMount: function() {
    this.planetSubscriber = new PlanetSubscriber(this.props.actions.planetChanged);
    this.props.actions.loadJediIfNeeded();
  },
  componentWillUnmount: function() {
    this.planetSubscriber.close();
  },
  propTypes: {
    actions: React.PropTypes.shape({
      scrollUp: React.PropTypes.func.isRequired,
      scrollDown: React.PropTypes.func.isRequired,
      planetChanged: React.PropTypes.func.isRequired,
      loadJediIfNeeded: React.PropTypes.func.isRequired
    }).isRequired,
    canScrollDown: React.PropTypes.bool.isRequired,
    canScrollUp: React.PropTypes.bool.isRequired,
    currentPlanet: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired
    })
  },
  scrollUpButtonClasses: function() {
    return classnames({
      "css-button-up": true,
      "css-button-disabled": !this.props.canScrollUp
    });
  },
  scrollDownButtonClasses: function() {
    return classnames({
      "css-button-down": true,
      "css-button-disabled": !this.props.canScrollDown
    });
  },
  render() {
    var currentPlanetName = this.props.currentPlanet.name;
    return (
      <div className="css-root">
        <h1 className="css-planet-monitor">
          {this.props.currentPlanet.name ?
            `Obi-Wan currently on ${currentPlanetName}` : `Loading Obi-Wan's location...`}
        </h1>

        <section className="css-scrollable-list">
          <ul className="css-slots">
            {this.props.sith.map(function(sith) {
              if (sith.loading) {
                return <li className="css-slot" key={sith.name}></li>;
              } else {
                var style = {
                  color: sith.homeworld.name === currentPlanetName ? 'red' : ''
                };
                return (
                  <li className="css-slot" style={style} key={sith.name}>
                    <h3>{sith.name}</h3>
                    <h6>Homeworld: {sith.homeworld.name}</h6>
                  </li>
                );
              }
            })}
          </ul>

          <div className="css-scroll-buttons">
            <button disabled={!this.props.canScrollUp} onClick={this.props.actions.scrollUp} className={this.scrollUpButtonClasses()}></button>
            <button disabled={!this.props.canScrollDown} onClick={this.props.actions.scrollDown} className={this.scrollDownButtonClasses()}></button>
          </div>
        </section>
      </div>
    );
  }
});

export default App;
