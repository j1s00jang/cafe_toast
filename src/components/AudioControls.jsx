function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M11 5 6 9H3v6h3l5 4V5z"
        fill="currentColor"
      />
      <path
        d="M15.5 8.5a5 5 0 0 1 0 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6a8.5 8.5 0 0 1 0 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M11 5 6 9H3v6h3l5 4V5z"
        fill="currentColor"
      />
      <path
        d="m16 9 5 5M21 9l-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function AudioControls({
  musicMuted,
  ambientMuted,
  musicVolume,
  ambientVolume,
  onToggleMusic,
  onToggleAmbient,
  onMusicVolumeChange,
  onAmbientVolumeChange,
}) {
  return (
    <div className="audio-controls">
      <div className="audio-controls__row">
        <span className="audio-controls__label">music</span>
        <input
          type="range"
          className="audio-controls__slider"
          min="0"
          max="100"
          value={Math.round(musicVolume * 100)}
          onChange={(event) => onMusicVolumeChange(Number(event.target.value) / 100)}
          aria-label="Music volume"
        />
        <button
          type="button"
          className="audio-controls__button"
          onClick={onToggleMusic}
          aria-label={musicMuted ? 'Unmute music' : 'Mute music'}
          aria-pressed={musicMuted}
        >
          {musicMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>
      </div>

      <div className="audio-controls__row">
        <span className="audio-controls__label">ambient sound</span>
        <input
          type="range"
          className="audio-controls__slider"
          min="0"
          max="100"
          value={Math.round(ambientVolume * 100)}
          onChange={(event) => onAmbientVolumeChange(Number(event.target.value) / 100)}
          aria-label="Ambient sound volume"
        />
        <button
          type="button"
          className="audio-controls__button"
          onClick={onToggleAmbient}
          aria-label={ambientMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
          aria-pressed={ambientMuted}
        >
          {ambientMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>
      </div>
    </div>
  )
}

export default AudioControls
