// Example Switch Plugin

module.exports = (api) => {
  api.registerAccessory('RaspiRelay', ExampleSwitchAccessory);
};

class ExampleSwitchAccessory {

  constructor(log, config, api) {
      this.log = log;
      this.config = config;
      this.api = api;

      this.Service = this.api.hap.Service;
      this.Characteristic = this.api.hap.Characteristic;

      // extract name from config
      this.name = config.name;

      // create a new Switch service
      this.service = new this.Service(this.Service.Switch);

      // create handlers for required characteristics
      this.service.getCharacteristic(this.Characteristic.On)
        .on('get', this.handleOnGet.bind(this))
        .on('set', this.handleOnSet.bind(this));

  }

  /**
   * Handle requests to get the current value of the "On" characteristic
   */
  handleOnGet(callback) {
    this.log.debug('Triggered GET On');

    // set this to a valid value for On
    const currentValue = 1;

    callback(null, currentValue);
  }

  /**
   * Handle requests to set the "On" characteristic
   */
  handleOnSet(value, callback) {
    this.log.debug('Triggered SET On:' + value);

    callback(null);
  }

}