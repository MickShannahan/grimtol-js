


class Monster {
  constructor(name, health, damage, image) {
    this.name = name
    this.health = health
    this.maxHealth = health
    this.damage = damage
    this.portrait = image
    this.goldDropped = damage * 10 + 5
  }
}