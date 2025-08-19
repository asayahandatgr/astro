import { useEffect, useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Lomba', href: '#lomba' },
    { label: 'Daftar', href: '#daftar' },
  ]

  // Animated color cycle across the 8-bit palette
  const paletteClasses = [
    'text-[var(--c-green)]',
    'text-[var(--c-cyan)]',
    'text-[var(--c-orange)]',
    'text-[var(--c-pink)]',
    'text-[var(--c-purple)]',
    'text-[var(--c-red)]',
    'text-[var(--c-flame)]',
    'text-[var(--c-yellow)]',
  ]
  const [colorOffset, setColorOffset] = useState(0)
  useEffect(() => {
    const cycleIntervalMs = 800
    const id = setInterval(() => { 
      setColorOffset((prev) => (prev + 1) % paletteClasses.length)
    }, cycleIntervalMs)
    return () => clearInterval(id)
  }, [])
  const getColorClassForIndex = (index) => paletteClasses[(index + colorOffset) % paletteClasses.length]

  return (
    <nav className="sticky top-0 z-50 bg-transparent text-white backdrop-blur supports-[backdrop-filter]:bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 lg:h-28 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img src="/astro.png" alt="ASTRO" className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 select-none pixelated" />
          </a>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-10 font-['Press Start 2P'] text-xs md:text-sm">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={"inline-block px-2 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-yellow)] hover:text-[var(--c-yellow)] " + getColorClassForIndex(index)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-3 text-[var(--c-yellow)] transition-colors hover:text-[var(--c-cyan)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-cyan)]"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="relative block h-6 w-6">
              <span
                className={
                  'absolute left-0 top-1.5 block h-1 w-6 bg-[var(--c-yellow)] transition-transform ' +
                  (isOpen ? 'translate-y-1.5 rotate-45' : '')
                }
              />
              <span
                className={
                  'absolute left-0 top-3 block h-1 w-6 bg-[var(--c-yellow)] transition-opacity ' +
                  (isOpen ? 'opacity-0' : 'opacity-100')
                }
              />
              <span
                className={
                  'absolute left-0 top-4.5 block h-1 w-6 bg-[var(--c-yellow)] transition-transform ' +
                  (isOpen ? '-translate-y-1.5 -rotate-45' : '')
                }
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet dropdown */}
      <div
        className={
          'lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ' +
          (isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <ul className="space-y-2 px-4 py-4 font-['Press Start 2P'] text-xs">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={"block rounded px-3 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-yellow)] hover:text-[var(--c-yellow)] " + getColorClassForIndex(index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar


