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
      deferred = Q.defer();
    } else {
      return deferred.promise;
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
    return deferred.promise;
  }

  $.fn.bernieCalendar = function (options) {
    var settings = $.extend({}, DEFAULT_OPTIONS, options);
    return this.each(function () {
      // initialize the calendar
      $(this).fullCalendar(settings.fullCalendar);

      // async & await the events to load
      getEvents().then(function (events) {
        // fetch and group the events by date, reduce to the number of allowed events
        events = _.chain(events).reduce(function (reduction, event) {
          if (!(event.date in reduction)) {
            reduction[event.date] = [event];
          } else if (reduction[event.date] < settings.maxEvents) {
            reduction[event.date].push(event);
          }
          return reduction;
        },{}).values().flatten().value();
        // add the events to the calendar
        $(this).fullCalendar('events', events);
      });
    });
  };
})(jQuery);
