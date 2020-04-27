var cache = require('memory-cache');

async function getEvents() {
    let events = []
    if(cache("events")) {
        events = cache.get("events");
    } else {
        eventsResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/doughboyswoodfiredpizza@gmail.com/events?key=' + process.env.REACT_APP_GOOGLE_API_KEY + '&timeMin=' + moment().hour(0).format() + '&timeMax=' + moment().hour(23).format())
        events = eventsResponse.items;
        cache.put("events",events);
    }
}
module.exports = {
    getAvailableTimes: async function(){

    },
    getNextEvent: async function() {

    }
}