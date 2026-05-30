import { useEffect, useRef } from 'react'

interface Atom {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  connections: number[]
}

const ATOM_COLORS = ['#00e5ff', '#ff6d00', '#7c3aed', '#10b981', '#f59e0b']

export function MoleculeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const atomsRef = useRef<Atom[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initAtoms()
    }

    const initAtoms = () => {
      const count = Math.max(12, Math.floor((width * height) / 35000))
      atomsRef.current = []

      for (let i = 0; i < count; i++) {
        const atom: Atom = {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2.5 + 1.5,
          color: ATOM_COLORS[Math.floor(Math.random() * ATOM_COLORS.length)],
          connections: [],
        }
        atomsRef.current.push(atom)
      }

      for (let i = 0; i < atomsRef.current.length; i++) {
        const atom = atomsRef.current[i]
        const nearby: { index: number; dist: number }[] = []

        for (let j = 0; j < atomsRef.current.length; j++) {
          if (i === j) continue
          const other = atomsRef.current[j]
          const dx = atom.x - other.x
          const dy = atom.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            nearby.push({ index: j, dist })
          }
        }

        nearby.sort((a, b) => a.dist - b.dist)
        const maxConn = Math.min(3, nearby.length)
        for (let k = 0; k < maxConn; k++) {
          atom.connections.push(nearby[k].index)
        }
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const atoms = atomsRef.current

      for (let i = 0; i < atoms.length; i++) {
        const atom = atoms[i]
        atom.x += atom.vx
        atom.y += atom.vy

        if (atom.x < -50) atom.x = width + 50
        if (atom.x > width + 50) atom.x = -50
        if (atom.y < -50) atom.y = height + 50
        if (atom.y > height + 50) atom.y = -50

        const mdx = mouseX - atom.x
        const mdy = mouseY - atom.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 200 && mdist > 0) {
          const force = 0.02 / (mdist * 0.1)
          atom.vx -= (mdx / mdist) * force
          atom.vy -= (mdy / mdist) * force
        }

        atom.vx *= 0.999
        atom.vy *= 0.999
      }

      for (let i = 0; i < atoms.length; i++) {
        const atom = atoms[i]
        for (const ci of atom.connections) {
          const other = atoms[ci]
          if (!other) continue
          const dx = atom.x - other.x
          const dy = atom.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            const alpha = 1 - dist / 200
            ctx.beginPath()
            ctx.moveTo(atom.x, atom.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (const atom of atoms) {
        ctx.beginPath()
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2)
        ctx.fillStyle = atom.color
        ctx.globalAlpha = 0.5
        ctx.fill()

        ctx.beginPath()
        ctx.arc(atom.x, atom.y, atom.radius * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = atom.color
        ctx.globalAlpha = 0.08
        ctx.fill()

        ctx.globalAlpha = 1
      }

      animRef.current = requestAnimationFrame(animate)
    }

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
