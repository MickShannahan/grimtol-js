
// State management -------
const character = {
  name: 'Spell Sword',
  healthLvl: 1,
  health: 25,
  maxHealth: 25,
  sword: 1,
  bow: 1,
  magic: 1,
  gold: 125
}

let monster = new Monster('Kobold', 10, 1, 'Kobold.png')

const monsterPool = [
  new Monster('Stinky Goblin', 15, 2, 'Goblin.png'),
  new Monster('Shambling Skeleton', 18, 4, 'Skeleton.png'),
  new Monster('Orc', 25, 4, 'Orc.png'),
  new Monster('Acidic Slime', 30, 5, 'Slime.png'),
  new Monster('Animated Armor', 45, 5, 'AnimatedArmor.png'),
  new Monster("Fallen Hero's Shade", 45, 7, 'Shade.png'),
  new Monster('Evil Summoner', 45, 10, 'DarkWizard.png'),
  new Monster('Observer', 75, 12, 'Beholder.png'),

]

// Visualizations ---------
const characterStatsElm = document.getElementById('character-stats')
const currentHealthElm = characterStatsElm.querySelector('#health-current')
const healthLevelElm = characterStatsElm.querySelector('#health-level')
const characterNameElm = characterStatsElm.querySelector('#character-name')
const characterSwordLevel = characterStatsElm.querySelector('#sword-level')
const characterBowLevel = characterStatsElm.querySelector('#bow-level')
const characterMagicLevel = characterStatsElm.querySelector('#magic-level')
const characterGold = characterStatsElm.querySelector('#current-gold')

function drawCharacterStats() {
  characterNameElm.textContent = character.name
  characterGold.textContent = `👛 : ${character.gold}`
  healthLevelElm.textContent = `lvl.${character.healthLvl}`
  currentHealthElm.textContent = `${character.health}/${character.maxHealth}`
  // @ts-ignore
  currentHealthElm.style = `width:${(character.health / character.maxHealth) * 100}%;`
  characterSwordLevel.textContent = `🗡️:${character.sword}`
  characterBowLevel.textContent = `🏹:${character.bow}`
  characterMagicLevel.textContent = `🔮:${character.magic}`
}
drawCharacterStats()


const dungeonScreenElm = document.getElementById('dungeon')
const townScreenElm = document.getElementById('town')

function goToDungeon() {
  dungeonScreenElm.classList.remove('hide')
  townScreenElm.classList.add('hide')
  monster.health = monster.maxHealth
  drawMonsterStats()
}

const monsterStatsElm = document.getElementById('monster-stats')
const monsterNameElm = monsterStatsElm.querySelector('.name')
const monsterPortrait = monsterStatsElm.querySelector('.monster-portrait')
const monsterHealth = monsterStatsElm.querySelector('.health')
const monsterDamage = monsterStatsElm.querySelector('.damage')
function drawMonsterStats() {
  monsterNameElm.textContent = monster.name
  // @ts-ignore
  monsterPortrait.src = `imgs/${monster.portrait}`
  monsterHealth.textContent = `${monster.health}/${monster.maxHealth}`
  monsterDamage.textContent = monster.damage
}


function drawActions(characterAction, monsterAction) {
  document.getElementById('character-action').textContent = characterAction
  document.getElementById('monster-action').textContent = monsterAction
}

function damageMonster() {
  monsterStatsElm.classList.add('damage-shake')
  setTimeout(() => monsterStatsElm.classList.remove('damage-shake'), 250)
}

function damageCharacter() {
  characterStatsElm.classList.add('damage-shake')
  setTimeout(() => characterStatsElm.classList.remove('damage-shake'), 250)
}

// Actions Town -----------
function sleepAtTavern() {
  if (character.gold >= 25) {
    console.log('zzzz 🛏️')
    character.gold -= 25
    character.health = character.maxHealth
    drawCharacterStats()
  } else {
    window.alert("You are too poor to sleep!")
  }
}

function upgradeArmorAtSmith() {
  if (character.gold >= 100) {
    character.gold -= 100
    character.healthLvl++
    character.maxHealth += Math.round(character.healthLvl * 10)
    drawCharacterStats()
  } else {
    window.alert("You are too poor to buy this!")
  }
}

function buyShopUpgrade(selectedWeapon) {
  if (character.gold >= 50) {
    character.gold -= 50
    character[selectedWeapon]++
    drawCharacterStats()
  } else {
    window.alert("You are too poor to buy this!")
  }
}


// Actions Dungeon --------
function goToTown() {
  townScreenElm.classList.remove('hide')
  dungeonScreenElm.classList.add('hide')
}

const lossMap = { sword: 'bow', bow: 'magic', magic: 'sword' }

function attackMonster(characterAttack) {
  let monsterAttack = randomizeMonsterAttack()
  console.log(characterAttack, monsterAttack)

  drawActions(characterAttack, monsterAttack)

  if (characterAttack == monsterAttack) {
    console.log('TIE')
    monster.health -= character[characterAttack]
    damageMonster()
  } else if ((characterAttack == 'sword' && monsterAttack == 'magic') || (characterAttack == 'bow' && monsterAttack == 'sword') || (characterAttack == 'magic' && monsterAttack == 'bow')) {
    console.log('YOU WIN')
    monster.health -= character[characterAttack] * 2
    damageMonster()
  } else {
    console.log('YOU LOSE')
    character.health -= monster.damage - character[monsterAttack]
    damageCharacter()
  }

  if (character.health <= 0) {
    gameOver()
  }

  if (monster.health <= 0) {
    monsterDied()
  }
  drawCharacterStats()
  drawMonsterStats()
}

let options = ['sword', 'bow', 'magic']
function randomizeMonsterAttack() {
  let randomIndex = Math.floor(Math.random() * 3)
  return options[randomIndex]
}

function monsterDied() {
  character.gold += monster.goldDropped
  let nextMonster = monsterPool.shift()
  if (nextMonster == undefined) {
    victory()
  }
  monster = nextMonster
  drawMonsterStats()
}

function gameOver() {
  window.alert('GAME OVER! you have died')
}

function victory() {
  window.alert('YOU CLEARED THE DUNGEON')
}

