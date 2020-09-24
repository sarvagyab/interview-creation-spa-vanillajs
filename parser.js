const Parser = {
    parseRequestURL: () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/");
        let request = {
            route: null,
            id: null,
        }
        for(let i=1;i<r.length;i++){
            if(r[i] && !isNaN(r[i])){
                request.id = r[i];
                r[i] = ':id';
            }
        }
        request.route = r.join('/');
        request.route = (request.route[request.route.length-1] == '/')?request.route.slice(0,-1):request.route;
        return request;
    }
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    parseDate: (date) => {
        date = new Date(date);
        let mon = date.getMonth() + 1;
        mon = mon.toString()
        if (mon.length == 1) mon = '0' + mon;

        let day = date.getDate();
        day = day.toString();
        if (day.length == 1) day = '0' + day;

        return `${date.getFullYear()}-${mon}-${day}`
    },
    parseTime: (date) => {
        date = new Date(date);
        let hours = date.getHours();
        hours = hours.toString()
        if (hours.length == 1) hours = '0' + hours;

        let minutes = date.getMinutes();
        minutes = minutes.toString();
        if (minutes.length == 1) minutes = '0' + minutes;

        return `${hours}:${minutes}`
    }
}

export default Parser;