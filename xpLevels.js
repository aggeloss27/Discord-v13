 let levels = [{
   level: 0,
   requiredxp: 20,
   rewards: []
  },
  {
 		level: 1,
 		requiredxp: 20,
 		rewards: []
 	},
 	{
 		level: 2,
 		requiredxp: 40,
 		rewards: []
 	},
 	{
 		level: 3,
 		requiredxp: 80,
 		rewards: []
 	},
 	{
 		level: 4,
 		requiredxp: 100,
 		rewards: []
 	},
 	{
 		level: 5,
 		requiredxp: 120,
 		rewards: []
 	},
 	{
 		level: 6,
 		requiredxp: 140,
 		rewards: []
 	},
 	{
 		level: 7,
 		requiredxp: 160,
 		rewards: []
 	},
 	{
 		level: 8,
 		requiredxp: 180,
 		rewards: []
 	},
 	{
 		level: 9,
 		requiredxp: 200,
 		rewards: []
 	},
 	{
 		level: 10,
 		requiredxp: 220,
 		rewards: []
 	},
 	{
 		level: 11,
 		requiredxp: 250,
 		rewards: []
 	},
 	{
 		level: 12,
 		requiredxp: 270,
 		rewards: []
 	},
 	{
 		level: 13,
 		requiredxp: 300,
 		rewards: []
 	},
 	{
 		level: 14,
 		requiredxp: 325,
 		rewards: []
 	},
 	{
 		level: 15,
 		requiredxp: 350,
 		rewards: []
 	},
 	{
 		level: 16,
 		requiredxp: 375,
 		rewards: []
 	},
 	{
 		level: 17,
 		requiredxp: 400,
 		rewards: []
 	},
 	{
 		level: 18,
 		requiredxp: 420,
 		rewards: []
 	},
 	{
 		level: 19,
 		requiredxp: 430,
 		rewards: []
 	},
 	{
 		level: 20,
 		requiredxp: 440,
 		rewards: []
 	},
 ]


 function findExp(levels) {
  for (let i = 1; i < levels.length; i++) {
    let exp = levels[i].requiredxp = levels[i-1].requiredxp + levels[i].requiredxp;
    //console.log(exp + `\n${i}`)
    return parseInt(exp)
  }
}
function getPlayerLevel(levels, xp) {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].requiredxp) {
      return levels[i].level;
    }
  }
  return 0; // Player has not reached level 1 yet
}
function getXpToLevelUp(levels, playerLevel, playerXp) {
  const currentLevel = levels.find(level => level.level === playerLevel);
  if (!currentLevel) {
    console.log(`Invalid player level: ${playerLevel}`);
    return null;
  }
  const nextLevel = levels.find(level => level.level === playerLevel + 1);
  if (!nextLevel) {
    console.log(`Player has already reached the highest level`);
    return null;
  }
  const xpToLevelUp = nextLevel.requiredxp - playerXp;
  return xpToLevelUp;
}


 module.exports = {
 	findExp,
 	levels,
  getPlayerLevel,
   getXpToLevelUp
 }