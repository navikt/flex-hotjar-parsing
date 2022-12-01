import * as csv from "csvtojson";
import * as dayjs from "dayjs";
import fetch from 'node-fetch';

console.log("Start")

interface Response {
    "Emotion (1-5)": string,
    "Date Submitted": string
}

let survey = "415368";
const jsonArray: Response[] = await csv().fromFile(survey + ".csv");

const kvernet = jsonArray.map((a) => {
    return {
        emotion: Number(a["Emotion (1-5)"]),
        sendt: dayjs(a["Date Submitted"] + "Z").toISOString(),
        survey: survey
    }
})
console.log(kvernet)

throw Error("sdfsdf")
console.log(kvernet.length)

let antall201 = 0
let antall500 = 0
let antall504 = 0
let antallAnnet = 0

let i = 0
for (const k of kvernet) {
    i++
    const response = await fetch("https://flex-hotjar-emotions.intern.nav.no/api/v1/emotion/arkiv", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(k)
    });
    console.log(i + " : " + response.status)

    switch (response.status) {
        case 201:
            antall201 = antall201 + 1
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
}


console.log("201 antall ", antall201)
console.log("500 antall ", antall500)
console.log("504 antall ", antall504)
console.log("annet antall ", antallAnnet)
