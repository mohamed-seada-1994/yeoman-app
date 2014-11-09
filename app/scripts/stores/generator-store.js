'use strict';

var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/app-dispatcher');


var GeneratorStore = {

  events: new EventEmitter(),

  dispatcherIndex: AppDispatcher.register(function (payload) {

    var handlers = {

      VIEW_ACTION: {
        'grid-item-selected': function () {
          var questions = [{
            message: 'Please specify a folder to be used to generate the project',
            name: 'cwd',
            type: 'folder'
          }];
          GeneratorStore.events.emit('grid-item-selected', questions);
        }
      },

      BROWSER_ACTION: {
        'generators-data': function (action) {
          GeneratorStore.events.emit('generator-data', action.generators);
        }
      }
    };

    if (AppDispatcher.hasHandler(payload, handlers)) {
      handlers[payload.source][payload.action.actionType](payload.action);
    }

    return true;
  })

};


module.exports = GeneratorStore;
