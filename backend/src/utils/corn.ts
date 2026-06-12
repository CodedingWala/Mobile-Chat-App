import cron from "node-cron";
import https from "https";

const job = cron.schedule("*/14 * * * *", () => {
    const URL=process.env.BACKEND_URL as string
    https.get(`${URL}/health`, (res) => {
        console.log("Pinged API:", res.statusCode);
    });
});



export default job;
