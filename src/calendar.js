(function ($) {
  var EVENT_ENDPOINT = 'http://d2bq2yf31lju3q.cloudfront.net/js/event-data.gz',
      DEFAULT_OPTIONS = {
        maxEvents: 10,
        fullCalendar: {
          header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          }
        }
      },
      deferred,
      events = [];

  function getEvents () {
    if (!deferred) {
      // if there has not yet been a request for the events, create the deferred object
      deferred = $.Deferred();
    } else {
      // if a request has already been made for the events, return the promise
      return deferred.promise();
    }
    // request the events
    $.ajax({
      url: EVENT_ENDPOINT,
      dataType: 'script',
      success: function () {
        events = _.map(window.EVENT_DATA.results, function (event) {
          return {
            title: event.name,
            start: event.start_dt,
            date: event.start_day
          };
        });
        // resolve the events
        deferred.resolve(events);
      }
    });
    // return the promise for the first caller
    return deferred.promise();
  }

  $.fn.bernieCalendar = function (options) {
    return this.each(function () {
      // initialize the calendar
      var settings = $.extend({}, DEFAULT_OPTIONS, options);

      // define the asynchronous events source for the calendar
      settings.fullCalendar.events = function (start, end, timezone, callback) {
        // fetch the events and wait for the resolve
        getEvents().then(function (events) {
          // reduce the collection into a map of events grouped by by date of `maxEvents` length
          events = _.chain(events).reduce(function (reduction, event) {
            if (!(event.date in reduction)) {
              reduction[event.date] = [event];
            } else if (reduction[event.date].length < settings.maxEvents) {
              reduction[event.date].push(event);
            }
            return reduction;
          },{})
          .values()
          .flatten()
          .value();

          // send the eents back to the calendar
          callback(events);
        });
      };

      // the CSS class for the calendar
      $(this).addClass('bernie-calendar');
      // wire up the calendar
      $(this).fullCalendar(settings.fullCalendar);
    });
  };
})(jQuery);
