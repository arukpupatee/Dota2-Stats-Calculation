const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const apiBaseURL = "https://api.stratz.com/api/v1";
const apiKey = process.env.API_KEY;
const axiosClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const arukPlayerId = "133033035";
const mosPlayerId = "209579075";
const champPlayerId = "192422309";
const artPlayerId = "160810727";
const playerId = artPlayerId;

const GAME_MODE = {
  ALL_PICK_RANKED: 22,
  TURBO: 23,
};
const LANE = {
  // NOTE: Not sure
  HARD_SUPPORT: 0,
  SAFE_LANE: 1,
  MID: 2,
  SOFT_SUPPORT: 3,
  OFF_LANE: 4,
  ALL: 255,
};
const ROLE = {
  CORE: 0,
  SOFT_SUPPORT: 1,
  HARD_SUPPORT: 2,
  ALL: 255,
};
const role = ROLE.CORE;
const take = 50;

async function getMatches(gameMode, isVictory) {
  const response = await axiosClient.get(
    `/Player/${playerId}/matches?gameMode=${gameMode}&role=${role}&isVictory=${isVictory}&take=${take}`
  );

  return response.data;
}

function calculateAverageLastHitsPerMinutes(matches) {
  const lastHitsPerMinutes = matches.map((match) => {
    const durationInSeconds = match.durationSeconds;
    const durationInMinutes = durationInSeconds / 60;
    const lastHits = match.players[0].numLastHits;

    return lastHits / durationInMinutes;
  });

  return (
    lastHitsPerMinutes.reduce((sum, n) => sum + n, 0) /
    lastHitsPerMinutes.length
  );
}

function sumTotalKills(matches) {
  const kills = matches.map((match) => {
    return match.players[0].numKills;
  });

  return kills.reduce((sum, n) => sum + n, 0);
}

function sumTotalDeaths(matches) {
  const deaths = matches.map((match) => {
    return match.players[0].numDeaths;
  });

  return deaths.reduce((sum, n) => sum + n, 0);
}

function sumTotalAssists(matches) {
  const assists = matches.map((match) => {
    return match.players[0].numAssists;
  });

  return assists.reduce((sum, n) => sum + n, 0);
}

function calculateKDA(matches) {
  const totalKills = sumTotalKills(matches);
  const totalDeaths = sumTotalDeaths(matches);
  const totalAssists = sumTotalAssists(matches);

  return (totalKills + totalAssists) / totalDeaths;
}

async function display(gameMode, isVictory) {
  const matches = await getMatches(gameMode, isVictory);
  const averageLastHitsPerMinute = calculateAverageLastHitsPerMinutes(matches);
  const kda = calculateKDA(matches);

  const [gameModeName] = Object.entries(GAME_MODE).find(
    ([name, value]) => value === gameMode
  );

  console.log(`Game mode ${gameModeName}, ${isVictory ? "WIN" : "LOSE"}`);
  console.log(`Total matches: ${matches.length}`);
  console.log(`Average last hits per minute:`, averageLastHitsPerMinute);
  console.log(`KDA:`, kda);
  console.log("\n");
}

async function main() {
  await display(GAME_MODE.ALL_PICK_RANKED, true);
  await display(GAME_MODE.ALL_PICK_RANKED, false);
  await display(GAME_MODE.TURBO, true);
  await display(GAME_MODE.TURBO, false);
}

main();
