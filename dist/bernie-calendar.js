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
      deferred = $.Deferred();
    } else {
      return deferred.promise();
    }
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
        deferred.resolve(events);
      }
    });
    return deferred.promise();
  }

  $.fn.bernieCalendar = function (options) {
    return this.each(function () {
      // initialize the calendar
      var settings = $.extend({}, DEFAULT_OPTIONS, options);
      settings.fullCalendar.events = function (start, end, timezone, callback) {
        getEvents().then(function (events) {
          events = _.chain(events).reduce(function (reduction, event) {
            if (!(event.date in reduction)) {
              reduction[event.date] = [event];
            } else if (reduction[event.date].length < settings.maxEvents) {
              reduction[event.date].push(event);
            }
            return reduction;
          },{});
          events = events.values().flatten().value();
          callback(events);
        });
      };
      $(this).addClass('bernie-calendar');
      $(this).fullCalendar(settings.fullCalendar);
    });
  };
})(jQuery);
