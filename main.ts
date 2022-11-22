enum RadioMessage {
    message1 = 49434
}
namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (boss == 0) {
        _boss = sprites.create(assets.image`boss`, SpriteKind.Boss)
        _boss_blood = 100
        for (let index = 0; index < 10000; index++) {
            _boss.setPosition(randint(0, 160), randint(0, 120))
            pause(500)
        }
        boss = 1
    }
    if (boss == 1) {
        _boss1 = sprites.create(assets.image`boss2`, SpriteKind.Boss)
        _boss_blood = 1000
        for (let index = 0; index < 10000; index++) {
            _boss1.setPosition(randint(0, 160), randint(0, 120))
            pause(500)
        }
        boss = 2
    }
    if (boss == 2) {
        _boss2 = sprites.create(assets.image`boss3`, SpriteKind.Boss)
        _boss_blood = 10000
        for (let index = 0; index < 10000; index++) {
            _boss2.setPosition(randint(0, 160), randint(0, 120))
            pause(500)
        }
        boss = 3
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    scene.cameraShake(4, 100)
    _boss_blood += -1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    _boss_blood += -1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() > 0) {
        player_exp = sprites.createProjectileFromSprite(assets.image`player_exp`, player_plane, 100, 0)
        player_exp.setFlag(SpriteFlag.AutoDestroy, true)
        info.changeScoreBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    for (let index = 0; index < 5; index++) {
        _2nd_plane.destroy()
        boss += 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    for (let index = 0; index < 5; index++) {
        _2nd_plane.destroy()
        boss += 1
    }
    scene.cameraShake(4, 100)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (b == 0) {
        b = 1
        info.setLife(10000)
        info.setScore(10000)
    }
})
let _2nd_plane: Sprite = null
let player_exp: Sprite = null
let _boss2: Sprite = null
let _boss1: Sprite = null
let _boss: Sprite = null
let player_plane: Sprite = null
let _boss_blood = 0
let boss = 0
let b = 0
b = 0
boss = 0
_boss_blood = 100000
scene.setBackgroundColor(8)
info.setLife(3)
info.setScore(10)
player_plane = sprites.create(assets.image`player_plane`, SpriteKind.Player)
player_plane.setStayInScreen(true)
player_plane.setPosition(0, 60)
controller.moveSprite(player_plane)
forever(function () {
    if (_boss_blood <= 0) {
        info.setScore(10000000000000000)
        info.setLife(10000000000000000)
        _boss.destroy()
        _boss1 = sprites.create(assets.image`boss2`, SpriteKind.Boss)
        _boss_blood = 1000
        for (let index = 0; index < 10000; index++) {
            _boss1.setPosition(randint(0, 160), randint(0, 120))
            pause(500)
        }
        boss = 2
        _boss1.destroy()
        _boss2 = sprites.create(assets.image`boss3`, SpriteKind.Boss)
        _boss_blood = 10000
        for (let index = 0; index < 10000; index++) {
            _boss2.setPosition(randint(0, 160), randint(0, 120))
            pause(500)
        }
        boss = 3
        _boss2.destroy()
        game.over(true, effects.confetti)
    }
})
game.onUpdateInterval(2000, function () {
    _2nd_plane = sprites.create(assets.image`2nd_plane`, SpriteKind.Enemy)
    _2nd_plane.setPosition(160, randint(0, 120))
    _2nd_plane.setVelocity(-50, 0)
    _2nd_plane.setFlag(SpriteFlag.AutoDestroy, true)
})
