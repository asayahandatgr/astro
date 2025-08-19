import { useEffect, useRef, useState } from 'react'

function GlobalSoundtrack() {
	const audioRef = useRef(null)
	const [isMuted, setIsMuted] = useState(() => localStorage.getItem('astro_bgm_muted') !== '1')
	const [hasStarted, setHasStarted] = useState(() => sessionStorage.getItem('astro_has_started') === '1')
	const [isPanelOpen, setIsPanelOpen] = useState(false)

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return
		audio.loop = true
		audio.volume = 0.35
		audio.muted = isMuted
		if (hasStarted && !isMuted) {
			audio.play().catch(() => {})
		} else {
			audio.pause()
		}
	}, [isMuted, hasStarted])

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		const tryStart = () => {
			setHasStarted(true)
			sessionStorage.setItem('astro_has_started', '1')
			audio.play().catch(() => {})
		}

		if (!hasStarted) {
			document.addEventListener('click', tryStart, { once: true })
			document.addEventListener('keydown', tryStart, { once: true })
			return () => {
				document.removeEventListener('click', tryStart)
				document.removeEventListener('keydown', tryStart)
			}
		}
	}, [hasStarted])

	const toggleMute = () => {
		setIsMuted((prev) => {
			const next = !prev
			localStorage.setItem('astro_bgm_muted', next ? '1' : '0')
			return next
		})
	}

	return (
		<>
			<audio ref={audioRef} src="/anova.mp3" preload="auto" className="hidden" />
			{hasStarted && (
			<div className="fixed bottom-3 right-3 z-[200]">
				<div className="flex items-end justify-end gap-2">
					{isPanelOpen && (
						<button
							onClick={toggleMute}
							title={isMuted ? 'Unmute music' : 'Mute music'}
							className="pixel-border rounded-md bg-[var(--c-yellow)] w-10 h-10 flex items-center justify-center text-xs font-bold text-black transition hover:shadow-[0_0_16px_var(--c-yellow)]"
						>
							<span className="inline-block align-middle">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
									<path d="M9 3v12.26c-.59-.4-1.3-.64-2.06-.64-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h8V3H9z" />
									{isMuted ? (
										<path d="M4 4l16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
									) : null}
								</svg>
							</span>
						</button>
					)}
					<button
						onClick={() => setIsPanelOpen((v) => !v)}
						title="Toggle soundtrack controls"
						className="pixel-border rounded-md bg-[var(--c-cyan)] w-10 h-10 flex items-center justify-center text-xs font-bold text-black transition hover:shadow-[0_0_16px_var(--c-cyan)]"
					>
						{isPanelOpen ? '>' : '<'}
					</button>
				</div>
			</div>
			)}
		</>
	)
}

export default GlobalSoundtrack


