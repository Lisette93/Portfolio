import { useId } from 'react'

const WAVE_PATH = "M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
const WAVY_PATH = "M0,40 C100,5 220,75 380,38 C540,2 660,78 840,40 C1020,3 1140,76 1280,40 C1360,20 1410,55 1440,40 L1440,80 L0,80 Z"

interface WaveDividerProps {
  fill?: string
  imageSrc?: string
  flip?: boolean
  wavy?: boolean  // more oscillations and amplitude
  className?: string
  height?: string
}

export default function WaveDivider({
  fill = '#FAF7F2',
  imageSrc,
  flip = false,
  wavy = false,
  className = '',
  height = imageSrc ? 'h-40 md:h-52' : 'h-16 md:h-20',
}: WaveDividerProps) {
  const uid = useId()
  const patternId = `wave-img-${uid.replace(/:/g, '')}`
  const path = wavy ? WAVY_PATH : WAVE_PATH

  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full ${height}`}
      >
        {imageSrc && (
          <defs>
            <pattern id={patternId} patternUnits="userSpaceOnUse" width="1440" height="80">
              <image
                href={imageSrc}
                x="0"
                y="-80"
                width="1440"
                height="280"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
        )}
        <path
          d={path}
          fill={imageSrc ? `url(#${patternId})` : fill}
        />
      </svg>
    </div>
  )
}
