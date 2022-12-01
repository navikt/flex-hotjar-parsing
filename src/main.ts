import * as csv from "csvtojson";
import * as dayjs from "dayjs";
import fetch from 'node-fetch';

console.log("Start")

interface Response {
    Emotion: string,
    Date: string
}

const jsonArray = await csv().fromFile("415368.csv");

const kvernet = jsonArray.map((a) => {
    return {
        emotion: Number(a.Emotion),
        sendt: dayjs(a.Date + "Z").toISOString(),
        survey: "415368"
    }
})
console.log(kvernet)


kvernet.forEach(async (k)=> {
    const response = await fetch("https://flex-hotjar-emotions.dev.intern.nav.no/api/v1/emotion/arkiv", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(k)
    });
    console.log("Status " + response.status)
})
