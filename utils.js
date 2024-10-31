import 'dotenv/config';

const MORADOR = ["altamires", "ricardo", "paulo roberto", "paulin", "pr", "luanzao", "diego","vinicius","erick","sacola legal", "kitada"];
const bichaLabel = "Vezes que é bicha";
const notBichaLabel = "Vezes que não é bicha";
const botSep = `+---------+--------------------+\n`;

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/simasgrilo/JCBot.git, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}


export function getIsBicha(name, bicha) {
  let currJcMember = name.options[0].value;
  let memberEval = true;
  if (!(currJcMember.toLowerCase() === "altamires" || currJcMember.toLowerCase().substring(0,4) == 'alta')) {
    //memberEval = `${jcMember} is bicha`;
    memberEval = (getRandomInt(11) % 2 === 0);
  }
  let header =  `+---------+--------------------+\n| Morador | ${bichaLabel} | ${notBichaLabel} |\n ${botSep}`;
  let body = "";
  if (!(currJcMember in bicha)) {
    bicha[currJcMember] = { 
                        "isBicha": 0, 
                        "isNotBicha": 0
                      };
  }
  if (memberEval) {
    bicha[currJcMember].isBicha += 1;
  }
  else {
    bicha[currJcMember].isNotBicha += 1;
  }
  for (let member in bicha) {
    let row = `| ${member} | ${bicha[member].isBicha} | ${bicha[member].isNotBicha} |\n`;
    body += row;
  }
  return header + body + botSep;
  
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRandomInt(maxVal) {
  return Math.floor(Math.random() * maxVal);
}
