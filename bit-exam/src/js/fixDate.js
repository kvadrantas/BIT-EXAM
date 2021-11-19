import moment from "moment-timezone";

function fixdate(data) {
    return data.map((e, i) =>  {
        return({
            id: e.id,
            registration_code: e.registration_code,
            day_ride: e.day_ride,
            total_ride_kilometers: e.total_ride_kilometers,
            last_use_time: moment.tz(e.last_use_time, "Europe/Vilnius").format('YYYY-MM-DD'),
            is_busy: e.is_busy,
        })
    })
}

export default fixdate;