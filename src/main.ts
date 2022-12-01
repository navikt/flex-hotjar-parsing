import * as csv from "csvtojson";
import * as dayjs from "dayjs";
import fetch from 'node-fetch';

console.log("Start")

interface Response {
    Emotion: string,
    Date: string
}

const jsonArray: Response[] = await csv().fromFile("409483.csv");

const kvernet = jsonArray.map((a) => {
    return {
        emotion: Number(a.Emotion),
        sendt: dayjs(a.Date + "Z").toISOString(),
        survey: "409483"
    }
})
console.log(kvernet)

let antall201 = 0
let antall500 = 0
let antall504 = 0
let antallAnnet = 0

kvernet.forEach(async (k) => {
    const response = await fetch("https://flex-hotjar-emotions.intern.nav.no/api/v1/emotion/arkiv", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(k)
    });
    switch (response.status) {
        case 201:
            antall201++
            break
        case 500:
            antall500++
            break
        case 504:
            antall504++
            break
        default: {
            antallAnnet++
            console.log("Status " + response.status)
        }
    }
})

console.log("201 antall ", antall201)
console.log("500 antall ", antall500)
console.log("504 antall ", antall504)
console.log("annet antall ", antallAnnet)
