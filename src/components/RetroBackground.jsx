function RetroBackground({ children }) {
	const stars = Array.from({ length: 80 }).map((_, i) => (
		<div
			key={i}
			className="twinkle absolute"
			style={{
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
				width: '2px',
				height: '2px',
				backgroundColor: i % 7 === 0 ? 'var(--c-yellow)' : i % 5 === 0 ? 'var(--c-cyan)' : '#ffffff',
				animationDelay: `${(Math.random() * 2).toFixed(2)}s`,
			}}
		/>
	))

	return (
		<>
			<div className="pointer-events-none fixed inset-0 -z-10 select-none">
				<div className="absolute inset-0 bg-[var(--c-navy)]"></div>
				<div className="absolute inset-0">{stars}</div>
				<div className="scanlines"></div>
			</div>

			{children}
		</>
	)
}

export default RetroBackground


