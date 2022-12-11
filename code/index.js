const fetch = require("node-fetch");
const mainurl = "https://damnapi.onrender.com";
const http = require("http");
const env = require("dotenv").config()
const tmi = require('tmi.js');
const USERNAME = process.env['USERNAME'];
const API_KEY = process.env['API_KEY'];
const PASSWORD = process.env['PASSWORD'];
const CHANNEL = process.env['CHANNEL'];
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: USERNAME,
		password: PASSWORD
	},
	channels: [ CHANNEL ]
});

client.connect();
const trusted = [
    "damnchaotix", "milky_gayh", "ninja_mouz", "fruchtmixer", "waechter__", "ceron164", "joni_26_", "alex_0602_18", "gamingking00", "robiin104",
    "zoshy91", "setoxeu", "black_squadttv", "teamwerkbank", "strawthug7", "einwildesmoritz", "mor1tzz", "ghost_manucrafter",
    "mrsmile_333", "berlincityclub", "lostinspace420", "oblivion_nico", "surrealad", "d0minikd0me", "west_bs", "dcx_leontm",
    "itszeusssss", "blackmamba1707", "frozenberyl", "hb_mark", "rolli21067", "erebos9_", "selfiii_", "dcx_anton_trunks",
    "asardebasar", "dieeine_saskia", "itsmedevos", "mepplgotdrip", "muning_16", "nightbot", "otto_paul_alge", "phkonradsr08",
    "songoku1808"
]
var badwords = [];
setInterval(() => {
    fetch(mainurl + "/bot/badword/all", {method: "GET"})
    .then(res => res.json())
    .then(data => {
        badwords = data;
    })
},60000)
client.on('message', (channel, userstate, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${userstate.username}, heya!`);
	}
});
client.on("message", (channel, userstate, message, self) => {
    if (message) {
        if (!badwords.some(i => String(message).toUpperCase().includes(i))) {
            fetch(mainurl + "/twitch/messages/new/" + userstate.username, {method: "POST"})
                  .then(res => res.json())
                  .then(data => {data})
            if (message.toLowerCase() === "damn!lurk") {
                client.say(channel, `@${userstate.username} ist nun im Lurk.`)
            }
            if (message.toLowerCase() === "damn!back") {
                client.say(channel, `Willkommen zurück @${userstate.username}`);
            }
            if (message.toLowerCase() === "damn!trophies") {
                fetch(mainurl + "/brawlstars/data", {method: "GET"})
                .then(res => res.json())
                .then(data => {
                    client.say(channel, `Aktuell hat DamnChaotix ${data.trophies} Pokale in Brawl Stars ~ @${userstate.username}`)
                })
            };
            if (message.toLowerCase().includes("damn!brawler")) {
                fetch(mainurl + "/brawlstars/data", {method: "GET"})
                .then(res => res.json())
                .then(data => {
                    console.log(message.toUpperCase().slice(13));
                    data.brawlers.filter(item => {
                        if (item.name == message.toUpperCase().slice(13)) {
                            let brawler = message.toUpperCase().slice(13);
                            client.say(channel, `DamnChaotix hat aktuell ${item.trophies} 🏆 auf ${String(brawler.toLowerCase()).charAt(0).toUpperCase() + String(brawler.toLowerCase()).slice(1)} ~ @${userstate.username}`)
                        }
                    });
                })
            };
            if (message.toLowerCase() === "damn!dc") {
                client.say(channel, `Den Discord der Damn Community findest du hier ➡ https://discord.gg/yR5cD3Hcnn ~ @${userstate.username}`);
            };
            if (message.toLowerCase() === "damn!sub") {
                client.say(channel, `Du findest den Content von Damn super? Dann unterstütze ihn doch mit einem Sub ➡ https://www.twitch.tv/subs/damnchaotix ~ @${userstate.username}`);
            };
            if (message.toLowerCase() === "damn!kanäle") {
                client.say(channel, `Falls du es noch nicht wusstest, Damn macht auch was anderes als Twitch, schau gerne mal rein ➡ https://linktr.ee/DamnChaotix ~ @${userstate.username}`);
            };
            if (message.toLowerCase().includes("damn!messages")) {
                if (message.slice(14).toUpperCase() != "") {
                    fetch(mainurl + "/twitch/messages/get/" + message.slice(14).toLowerCase().replace("@",""), {method: "GET"})
                    .then(res => res.json())
                    .then(data => {
                        if (data.message == undefined) {
                            client.say(`${message.slice(14)} hat bisher ${data} Nachrichten verschickt! ~ @${userstate.username}`);
                        } else {
                            client.say(`${data.message} ~ @${userstate.username}`);
                        }
                    })
                } else {
                    fetch(mainurl + "/twitch/messages/get/" + userstate.username, {methood: "GET"})
                    .then(res => res.json())
                    .then(data => {
                        if (data.message == undefined) {
                            client.say(`Du hast ${data} Nachrichten auf diesem Kanal verschickt ~ @${userstate.username}`);
                        } else {
                            client.say(`${data.message} ~ @${userstate.username}`);
                        }
                    })
                }
            };
            if (String(message).toLowerCase() == "damn!heute") {
                fetch("https://damnchaotix.5head.win/trophies/live/diff", {method: "GET"})
                .then(res => console.log(res.body))
                .then(data => console.log(data))
            };
            if (String(message).toLowerCase() == "damn!nachrichten") {
                const numbers = [];
                var all = 0;
                fetch(mainurl+"/twitch/messages/all", {method: "GET"})
                .then(res => res.json())
                .then(data => {
                    data.forEach(e => {
                        const {key, value} = e;
                        numbers.push(parseInt(value));
                    });
                });
                numbers.forEach(item => {
                    all = all + parseInt(item);
                })
                client.say(channel, `Aktuell wurden insgesamt ${all} Nachrichten auf diesem Channel geschickt ~ @${userstate.username}`);
            };
            if (String(message).toLowerCase() === "poggers") {
                if (userstate.username != "dcx_leontm") {
                    client.say(channel, "POGGERS");
                }
            };
        } else {
            client.deletemessage(channel, String(userstate.id));
            client.say(channel, `So etwas sagt man nicht! ~ @${userstate.username}`);
        };
    }
});
const server = http.createServer((req,res) => {
  res.write("Hallo")
});
server.listen()