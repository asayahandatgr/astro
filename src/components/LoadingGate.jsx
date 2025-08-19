import { useEffect, useRef, useState } from 'react'

function LoadingGate({ children }) {
	const [isReady, setIsReady] = useState(false)
	const coinRef = useRef(null)

	useEffect(() => {
		const stored = sessionStorage.getItem('astro_has_started')
		if (stored === '1') {
			setIsReady(true)
			return
		}

		const onAnyStart = () => {
			setIsReady(true)
			sessionStorage.setItem('astro_has_started', '1')
		}

		document.addEventListener('click', onAnyStart, { once: true })
		document.addEventListener('keydown', onAnyStart, { once: true })

		return () => {
			document.removeEventListener('click', onAnyStart)
			document.removeEventListener('keydown', onAnyStart)
		}
	}, [])

	const handleStartClick = () => {
		// Play button sound then proceed
		const playBeepFallback = () => {
			try {
				const AudioCtx = window.AudioContext || window.webkitAudioContext
				if (!AudioCtx) return
				const ctx = new AudioCtx()
				const osc = ctx.createOscillator()
				const gain = ctx.createGain()
				osc.type = 'triangle'
				osc.frequency.setValueAtTime(880, ctx.currentTime)
				osc.connect(gain)
				gain.connect(ctx.destination)
				gain.gain.setValueAtTime(0.001, ctx.currentTime)
				gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.015)
				gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
				osc.start()
				osc.stop(ctx.currentTime + 0.23)
			} catch {}
		}

		try {
			if (coinRef.current) {
				coinRef.current.currentTime = 0
				coinRef.current.play().catch(() => {
					playBeepFallback()
				})
			} else {
				playBeepFallback()
			}
		} catch {}

		setIsReady(true)
		sessionStorage.setItem('astro_has_started', '1')
	}

	return (
		<div className="relative min-h-screen">
			{/* Main content */}
			<div className={isReady ? 'animate-fade-in' : 'opacity-0 pointer-events-none select-none'}>
				{children}
			</div>

			{/* Loading overlay */}
			{!isReady && (
				<div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 backdrop-blur-sm">
					<div className="anim-blink text-center font-['Press Start 2P'] text-sm sm:text-base md:text-xl">
						<button onClick={handleStartClick} className="inline-block cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--c-pink)] via-[var(--c-yellow)] to-[var(--c-cyan)] p-[3px] transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_20px_var(--c-yellow)]">
							<span className="block rounded-[14px] bg-black px-8 py-6">
								<span className="bg-gradient-to-r from-[var(--c-pink)] via-[var(--c-yellow)] to-[var(--c-cyan)] bg-clip-text text-transparent drop-shadow-[0_3px_0_#000]">
									START
								</span>
							</span>
						</button>
					</div>
				</div>
			)}

			{/* Hidden SFX tag */}
			<audio ref={coinRef} src="/coin.mp3" preload="auto" className="hidden" />
		</div>
	)
}

export default LoadingGate


