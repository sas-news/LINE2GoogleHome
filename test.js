import express from "express";
import { Client, middleware } from "@line/bot-sdk";
import HomePlayer from "google-home-player";

// 初期設定
const ip = "192.168.10.107"; // GoogleHomeのIPアドレス
const lang = "ja";
const Home = new HomePlayer(ip, lang);

// トークン
const config = {
  channelSecret: "69052890172f92ec6a50cbcc224a8aeb",
  channelAccessToken:
    "OFhVEW1PwdqmWo5+/PeN1848N+2w4Gbe+moTSpvcOGmIhVoKKsNeNxvcEdWSknEkXbGBP8k1MmoUGiGAW+ak15/XZIaIDWWQGF8sIRYEvaiKFNuSHhMUMSATv4BpCfrKKnmKbi/GKySOFA4SsCncRgdB04t89/1O/w1cDnyilFU=",
};
const client = new Client(config);

// Webhook
const PORT = process.env.PORT || 3000;
const app = express();
app.post("/", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});
app.listen(PORT);

// 読み上げ
function handleEvent(event) {
  if (event.message.type === "text") {
    let Message = event.message.text;
    try {
      new URL(Message);
      Home.play(Message);
      console.log("Play:" + Message);
    } catch (err) {
      Home.say(Message);
      console.log("Say:" + Message);
    }
  }
}
