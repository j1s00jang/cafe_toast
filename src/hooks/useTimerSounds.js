import { Howl } from 'howler'
import ambientSound from '../assets/sounds/cafe_ambient_sound.mp3'
import jazzCafe from '../assets/music/jazz_cafe.mp3'
import lofiJazzCafe from '../assets/music/lofi_jazz_cafe.mp3'
import smoothJazzCafe from '../assets/music/smooth_jazz_cafe.mp3'
import bookstoreCafe from '../assets/music/the_bookstore_cafe.mp3'

const MUSIC_TRACKS = [jazzCafe, lofiJazzCafe, smoothJazzCafe, bookstoreCafe]

function shuffleTracks(tracks) {
  const shuffled = [...tracks]

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

function clampVolume(volume) {
  return Math.min(1, Math.max(0, volume))
}

export function createTimerSounds() {
  const ambient = new Howl({
    src: [ambientSound],
    loop: true,
    volume: 1,
  })

  let music = null
  let musicPlaylist = []
  let musicPlaylistIndex = 0
  let isDestroyed = false
  let musicMuted = false
  let ambientMuted = false
  let musicVolume = 1
  let ambientVolume = 1

  const getMusicOutputVolume = () => (musicMuted ? 0 : musicVolume)
  const getAmbientOutputVolume = () => (ambientMuted ? 0 : ambientVolume)

  const playCurrentMusicTrack = () => {
    if (isDestroyed) return

    if (music) {
      music.unload()
      music = null
    }

    const track = musicPlaylist[musicPlaylistIndex]
    if (!track) return

    music = new Howl({
      src: [track],
      loop: false,
      volume: getMusicOutputVolume(),
      onend: () => {
        if (isDestroyed) return

        musicPlaylistIndex += 1

        if (musicPlaylistIndex >= musicPlaylist.length) {
          musicPlaylist = shuffleTracks(MUSIC_TRACKS)
          musicPlaylistIndex = 0
        }

        playCurrentMusicTrack()
      },
    })

    music.play()
  }

  const startMusic = () => {
    musicPlaylist = shuffleTracks(MUSIC_TRACKS)
    musicPlaylistIndex = 0
    playCurrentMusicTrack()
  }

  const start = () => {
    if (!ambient.playing()) {
      ambient.play()
    }

    if (music?.playing()) return

    if (music) {
      music.play()
      return
    }

    startMusic()
  }

  const setMusicMuted = (muted) => {
    musicMuted = muted
    if (music) music.volume(getMusicOutputVolume())
  }

  const setAmbientMuted = (muted) => {
    ambientMuted = muted
    ambient.volume(getAmbientOutputVolume())
  }

  const setMusicVolume = (volume) => {
    musicVolume = clampVolume(volume)
    if (music) music.volume(getMusicOutputVolume())
  }

  const setAmbientVolume = (volume) => {
    ambientVolume = clampVolume(volume)
    ambient.volume(getAmbientOutputVolume())
  }

  const destroy = () => {
    isDestroyed = true
    ambient.stop()
    ambient.unload()

    if (music) {
      music.stop()
      music.unload()
      music = null
    }
  }

  return {
    start,
    setMusicMuted,
    setAmbientMuted,
    setMusicVolume,
    setAmbientVolume,
    destroy,
  }
}
