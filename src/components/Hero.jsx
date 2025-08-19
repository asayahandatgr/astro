function Hero() {
    const playCoinSound = () => {
		try {
			const audio = new Audio('/coin.mp3')
			audio.volume = 0.5
			audio.play().catch(() => {
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
			})
		} catch {}
	}

	return (
		<section id="home" className="relative min-h-screen overflow-hidden text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-7rem)] flex-col items-center justify-center text-center">
					<h1 className="bg-gradient-to-r from-[var(--c-pink)] via-[var(--c-yellow)] to-[var(--c-cyan)] bg-clip-text text-transparent drop-shadow-[0_3px_0_#000] text-2xl leading-tight sm:text-3xl md:text-5xl md:leading-[1.15] lg:text-6xl">
						Aksi Seni Teknologi Olahraga
					</h1>
                    <p className="anim-blink mt-6 max-w-3xl text-[11px] leading-relaxed text-white/90 sm:text-xs md:text-sm lg:text-base">
						Game On, Vibe Up !
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a
							href="#lomba"
							className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--c-cyan)] px-5 py-3 text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_24px_var(--c-cyan)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-cyan)] md:px-6 md:py-4"
                            onClick={playCoinSound}
						>
							{/* <span>🎮</span> */}
							<span className="tracking-tight">Lihat Lomba</span>
						</a>
						<a
							href="#daftar"
							className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--c-yellow)] px-5 py-3 text-black transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_24px_var(--c-yellow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-yellow)] md:px-6 md:py-4"
                            onClick={playCoinSound}
						>
							{/* <span>📝</span> */}
							<span className="tracking-tight">Daftar Sekarang</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero


