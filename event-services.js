var cache = require('memory-cache');
var fetch = require('node-fetch');
const moment = require('moment');
var Event = require('./event.model');

module.exports = {
    getAvailableTimes: async function (req, res) {
        Event.findOne({ endTime: { $gte: moment().utcOffset(0).toDate(), $lte: moment().add(1, 'd').hour(1).utcOffset(0).toDate() } }, function (err, event) {
            if (err) {
                return res.status(500).send(err)
            }
            let times = event.availableTimes;
            res.send(times.filter(function (time) {
                return time.count < 3 && moment(time.time).isAfter(moment().add(15, 'm'))
            }))
        })
    },

    getNextEvent: async function (req, res) {
        Event.findOne({ endTime: { $gte: moment().utcOffset(0).toDate(), $lte: moment().add(1, 'd').hour(1).utcOffset(0).toDate() } }).sort({ _id: -1 }).exec(function (err, event) {
            if (err) {
                return res.status(500).send(err)
            }
            res.send(event ? event : {});
        })
    },

    batchUpdateEvents: async function (req, res) {
        const googleUrl = 'https://www.googleapis.com/calendar/v3/calendars/doughboyswoodfiredpizza@gmail.com/events?key=' + process.env.GOOGLE_API_KEY + '&timeMin=' + moment("2020-01-01").format();
        eventsResponse = await fetch(googleUrl)
        events = await eventsResponse.json()
        events.items.forEach(element => {
            let minutes = moment.duration(moment(eventReq.end).diff(moment(eventReq.start))).asMinutes();
            let times = []
            for (i = 1; i <= Math.floor(minutes / 5); i++) {
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
    },

    addEvent: async function (req, res) {
        let eventReq = req.body.event;
        let minutes = moment.duration(moment(eventReq.end).diff(moment(eventReq.start))).asMinutes();
        let times = []
        for (i = 1; i <= Math.floor(minutes / 5); i++) {
            times.push({
                time: moment(eventReq.start).utcOffset(-5).add(i * 5, 'm').format(), count: 0
            })
        }
        let event = new Event(
            {
                description: eventReq.summary,
                startTime: moment(eventReq.start),
                endTime: moment(eventReq.end),
                date: moment(eventReq.start).format("YYYY-MM-DD"),
                availableTimes: times
            }
        )
        event.save(function (err) {
            if (err) {
                res.send("Error while adding event.")
            } else {
                res.send({message: "Event added succesfully."})
            }
        })
    },

    getEvents: async function (req, res) {
        let events = await Event.find().sort({ date: -1 })
        res.send(events)
    },

    editEvent: async function (req, res) {
        let eventReq = req.body.event;
        let minutes = moment.duration(moment(eventReq.end).diff(moment(eventReq.start))).asMinutes();
        let times = []
        for (i = 1; i <= Math.floor(minutes / 5); i++) {
            times.push({
                time: moment(eventReq.start).utcOffset(-5).add(i * 5, 'm').format(), count: 0
            })
        }

        Event.findByIdAndUpdate(req.params.id, { description: eventReq.summary, startTime: moment(eventReq.start), endTime: moment(eventReq.end), date: moment(eventReq.start).format("YYYY-MM-DD"), availableTimes: times }).then((ret, err) => {
            if (err) {
                res.error("Error while editing event.")
            } else {
                res.send({ message: "Event edited succesfully." })
            }
        })
    },

    deleteEvent: async function(req, res) {
        Event.findByIdAndDelete(req.params.id).then((ret, err) => {
            if (err) {
                res.error("Error while deleting event.")
            } else {
                res.send({ message: "Event deleted succesfully." })
            }
        })
    }
}