enum RadioMessage {
    message1 = 49434,
    message2 = 1435
}
namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
    _boss_blood += -1
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player_exp = sprites.createProjectileFromSprite(assets.image`player_exp`, player_plane, 100, 0)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 3900, 3500, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    player_exp.setFlag(SpriteFlag.AutoDestroy, true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    _boss_blood += _boss_blood
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    player_exp = sprites.createProjectileFromSprite(assets.image`player_exp`, player_plane, 100, 0)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 3900, 3500, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    player_exp.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
    for (let index = 0; index < 5; index++) {
        _2nd_plane.destroy()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
    info.changeLifeBy(-1)
    for (let index = 0; index < 5; index++) {
        _2nd_plane.destroy()
    }
    scene.cameraShake(4, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 200, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
    info.changeLifeBy(-3)
    scene.cameraShake(4, 100)
    _boss_blood += -1
})
let _2nd_plane: Sprite = null
let player_exp: Sprite = null
let player_plane: Sprite = null
let _boss_blood = 0
game.showLongText("帮助：按a发射炮弹，长按a发射激光，按B增强BOSS，目标击败BOSS！左上角是你的生命值，右上角是BOSS的生命值", DialogLayout.Full)
let b = 1
let boss = 0
_boss_blood = 500
scene.setBackgroundColor(8)
info.setLife(10)
player_plane = sprites.create(assets.image`player_plane`, SpriteKind.Player)
player_plane.setStayInScreen(true)
player_plane.setPosition(0, 60)
controller.moveSprite(player_plane)
let _boss = sprites.create(assets.image`boss`, SpriteKind.Boss)
_boss.setPosition(160, 60)
game.onUpdateInterval(2000, function () {
    _2nd_plane = sprites.create(assets.image`2nd_plane`, SpriteKind.Enemy)
    _2nd_plane.setPosition(135, randint(0, 120))
    _2nd_plane.setVelocity(-50, 0)
    _2nd_plane.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    _boss.setPosition(randint(0, 160), randint(0, 120))
    pause(500)
})
forever(function () {
    if (_boss_blood <= 0) {
        game.over(true, effects.confetti)
    }
})
forever(function () {
    info.setScore(_boss_blood)
})
