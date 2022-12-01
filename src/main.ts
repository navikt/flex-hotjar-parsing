import * as csv from "csvtojson";
import * as dayjs from "dayjs";

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
