export default function PlanetSubscriber(onNewPlanet) {
  this.connection = new WebSocket('ws://localhost:4000');
  this.connection.onopen = this.onopen.bind(this);
  this.connection.onerror = this.onerror.bind(this);
  this.connection.onmessage = this.onmessage.bind(this);
  this.onNewPlanet = onNewPlanet;
}

PlanetSubscriber.prototype.onopen = function() {
  console.log("[PlanetSubscriber] connection open");
};

PlanetSubscriber.prototype.onerror = function(error) {
  console.log("[PlanetSubscriber] connection error:", error);
};

PlanetSubscriber.prototype.onmessage = function(event) {
  this.onNewPlanet(JSON.parse(event.data));
};

PlanetSubscriber.prototype.close = function() {
  this.connection.close();
};
