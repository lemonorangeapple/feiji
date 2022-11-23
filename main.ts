enum RadioMessage {
    message1 = 49434,
    message2 = 1435
}
namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    info.changeLifeBy(-3)
    scene.cameraShake(4, 100)
    _boss_blood += -1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    _boss_blood += -1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player_exp = sprites.createProjectileFromSprite(assets.image`player_exp`, player_plane, 100, 0)
    player_exp.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    for (let index = 0; index < 5; index++) {
        _2nd_plane.destroy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    for (let index = 0; index < 5; index++) {
        _2nd_plane.destroy()
    }
    scene.cameraShake(4, 100)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    _boss = sprites.create(assets.image`boss`, SpriteKind.Boss)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    player_exp = sprites.createProjectileFromSprite(assets.image`player_exp`, player_plane, 100, 0)
    player_exp.setFlag(SpriteFlag.AutoDestroy, true)
})
let _2nd_plane: Sprite = null
let player_exp: Sprite = null
let _boss: Sprite = null
let player_plane: Sprite = null
game.showLongText("帮助：按a发射炮弹，长按a发射激光，目标击败BOSS！左上角是你的生命值，右上角是BOSS的生命值", DialogLayout.Full)
let b = 1
let boss = 0
let _boss_blood = 500
scene.setBackgroundColor(8)
info.setLife(10)
player_plane = sprites.create(assets.image`player_plane`, SpriteKind.Player)
player_plane.setStayInScreen(true)
player_plane.setPosition(0, 60)
controller.moveSprite(player_plane)
_boss = sprites.create(assets.image`boss`, SpriteKind.Boss)
_boss.setPosition(160, 60)
forever(function () {
    if (_boss_blood <= 0) {
        game.over(true, effects.confetti)
    }
})
forever(function () {
    _boss.setPosition(randint(0, 160), randint(0, 120))
    pause(500)
})
forever(function () {
    info.setScore(_boss_blood)
})
game.onUpdateInterval(2000, function () {
    _2nd_plane = sprites.create(assets.image`2nd_plane`, SpriteKind.Enemy)
    _2nd_plane.setPosition(160, randint(0, 120))
    _2nd_plane.setVelocity(-50, 0)
    _2nd_plane.setFlag(SpriteFlag.AutoDestroy, true)
})
