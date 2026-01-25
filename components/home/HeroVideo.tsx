'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function HeroVideo() {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (window.YT) {
      createPlayer()
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = createPlayer
  }, [])

  const createPlayer = () => {
    if (!containerRef.current) return

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: 'sia3pPtCTdk',
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: 'sia3pPtCTdk',
        controls: 0,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        playsinline: 1,
      },
      events: {
        onReady: (e: any) => e.target.playVideo(),
      },
    })
  }

  const toggleMute = () => {
    if (!playerRef.current) return

    if (muted) {
      playerRef.current.unMute()
      playerRef.current.setVolume(100)
    } else {
      playerRef.current.mute()
    }

    setMuted(!muted)
  }

  return (
    <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
      {/* YouTube player */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

      {/* Custom mute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}
