var cache = require('memory-cache');
var fetch = require('node-fetch');
const moment = require('moment');
var Event = require('./event.model');

module.exports = {
    getAvailableTimes: async function (req, res) {
       Event.findOne({date: moment("2020-04-29").format("YYYY-MM-DD"), endTime: {$gt: new Date()}}, function(err, event){
           if(err) {
               return res.status(500).send(err)
           }
           let times = event.availableTimes;
           res.send(times.filter(function(time){
                return time.count < 2 && moment(time.time).isAfter(moment().add(15,'m'))
           }))
       }) 
    },

    getNextEvent: async function (req, res) {
        Event.findOne({date: moment("2020-04-29").format("YYYY-MM-DD"), endTime: {$gt: new Date()}}, function(err, event){
            if(err) {
                return res.status(500).send(err)
            }
            res.send(event);
        })
    },

    batchUpdateEvents: async function (req, res) {
        eventsResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/doughboyswoodfiredpizza@gmail.com/events?key=' + process.env.GOOGLE_API_KEY + '&timeMin=' + moment().format() + '&timeMax=' + moment().add(1, 'y').format())
        events = await eventsResponse.json()
        events.items.forEach(element => {
            let hoursAmount = moment.duration(moment(element.end.dateTime).diff(moment(element.start.dateTime))).hours()
            let times = []
            for (i = 1; i < hoursAmount * 12; i++) {
                times.push({
                    time: moment(element.start.dateTime).add(i * 5, 'm').format(), count: 0
                })
            }
            let event = new Event(
                {
                    description: element.summary,
                    startTime: moment(element.start.dateTime),
                    endTime: moment(element.end.dateTime),
                    date: moment(element.start.dateTime).format("YYYY-MM-DD"),
                    availableTimes: times
                }
            )
            event.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('event added')
                }
            })
        });
        res.send("Events Update")
    }
}