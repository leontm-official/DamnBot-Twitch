
const tmi = require('tmi.js');
const USERNAME = process.env.USERNAME;
const API_KEY = process.env.API_KEY;
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'DamnBot',
		password: 'oauth:y1v0ik218aakfv4nymu8e3fdxmoko7'
	},
	channels: [ 'DamnChaotix' ]
});

client.connect();

client.on('message', (channel, userstate, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${userstate.username}, heya!`);
	}
});
client.on("message", (channel, userstate, message, self) => {
    if (message.toLowerCase() === "damn!lurk") {
        client.say(channel, `@${userstate.username} ist nun im Lurk.`)
    }
    if (message.toLowerCase() === "damn!back") {
        client.say(channel, `Willkommen zurück @${userstate.username}`);
    }
    if (message.toLowerCase() === "damn!trophies") {
        fetch("https://api.brawlstars.com/v1/players/%232YCPG0U0", {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImUwZjc2MDAyLTUzZmYtNGEzNC04MDlkLTU2NWNiOTljYTAyNCIsImlhdCI6MTY2OTMxNjI4NSwic3ViIjoiZGV2ZWxvcGVyLzlmODQ1YmY3LTNjYmItMTkyNS00MDhkLTM3YzZmOTExYzYzOCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTg1LjIzMS4yNTQuMTA5Il0sInR5cGUiOiJjbGllbnQifV19.ifufTWlwjVgzdDk-P8TpQga7AwK1beuxZQrtlfgrYNMc7rz0FUFbCO1_JMCNzE4eOXHVcSW1_DFqCI-DK_oXQg`
            }
        })
        .then(res => res.json())
        .then(data => {
            client.say(channel, `Aktuell hat DamnChaotix ${data.trophies} Pokale in Brawl Stars ~ @${userstate.username}`)
        })
    };
    if (message.toLowerCase().startsWith("damn!brawler")) {
        fetch("https://api.brawlstars.com/v1/players/%232YCPG0U0", {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImUwZjc2MDAyLTUzZmYtNGEzNC04MDlkLTU2NWNiOTljYTAyNCIsImlhdCI6MTY2OTMxNjI4NSwic3ViIjoiZGV2ZWxvcGVyLzlmODQ1YmY3LTNjYmItMTkyNS00MDhkLTM3YzZmOTExYzYzOCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTg1LjIzMS4yNTQuMTA5Il0sInR5cGUiOiJjbGllbnQifV19.ifufTWlwjVgzdDk-P8TpQga7AwK1beuxZQrtlfgrYNMc7rz0FUFbCO1_JMCNzE4eOXHVcSW1_DFqCI-DK_oXQg`
            }
        })
        .then(res => res.json())
        .then(data => {
            let brawler = message.toUpperCase().split(" ")[1];
            if (brawler == "") {
                client.say(channel, `Du musst damn!brawler Brawlernamen schreiben um den Command richtig zu benutzen ~ @${userstate.username}`)
            } else {
                data.brawlers.filter(item => {
                    if (item.name.includes(brawler)) {
                        client.say(channel, `DamnChaotix hat aktuell ${item.trophies} 🏆 auf ${String(brawler.toLowerCase()).charAt(0).toUpperCase() + String(brawler.toLowerCase()).slice(1)} ~ @${userstate.username}`)
                    }
                });
            }
        })
    }});