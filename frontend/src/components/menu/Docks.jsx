'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import {
  MotionValue,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ReactNode, useRef } from 'react';


const SCALE = 2.25; 
const DISTANCE = 110; 
const NUDGE = 40;
const SPRING = {
  mass: 0.1,
  stiffness: 170,
  damping: 12,
};
const ICON_SIZE = 52; 
const DOCK_HEIGHT = 72; 
const DOCK_PADDING = 12; 
const DOCK_GAP = 12; 

export default function Dock({ 
  items, 
  iconSize = ICON_SIZE,
  dockHeight = DOCK_HEIGHT,
  dockPadding = DOCK_PADDING,
  dockGap = DOCK_GAP
}) {
  const mouseLeft = useMotionValue(-Infinity);
  const mouseRight = useMotionValue(-Infinity);
  const left = useTransform(mouseLeft, [0, 40], [0, -40]);
  const right = useTransform(mouseRight, [0, 40], [0, -40]);
  const leftSpring = useSpring(left, SPRING);
  const rightSpring = useSpring(right, SPRING);

  return (
    <>
      <motion.div
        onMouseMove={(e) => {
          const { left, right } = e.currentTarget.getBoundingClientRect();
          const offsetLeft = e.clientX - left;
          const offsetRight = right - e.clientX;
          mouseLeft.set(offsetLeft);
          mouseRight.set(offsetRight);
        }}
        onMouseLeave={() => {
          mouseLeft.set(-Infinity);
          mouseRight.set(-Infinity);
        }}
        style={{ 
          height: `${dockHeight}px`,
          padding: `0 ${dockPadding}px ${dockPadding}px`,
          gap: `${dockGap}px`
        }}
        className="mx-auto hidden items-end sm:flex relative"
      >
        {/* Glass-like background that follows the mouse */}
        <motion.div
          className="absolute rounded-2xl inset-y-0 bg-gray-700/70 backdrop-blur-md border border-gray-600/50 -z-10"
          style={{ left: leftSpring, right: rightSpring }}
        />

        {items.map((item) => (
          <AppIcon 
            key={item.id} 
            mouseLeft={mouseLeft} 
            item={item} 
            iconSize={iconSize}
          />
        ))}
      </motion.div>

      <div className="sm:hidden">
        <div 
          style={{ 
            height: `${dockHeight}px`,
            padding: `0 ${dockPadding}px ${dockPadding}px`,
            gap: `${dockGap}px`
          }}
          className="mx-auto flex max-w-full items-end overflow-x-scroll rounded-2xl bg-gray-700/70 backdrop-blur-md sm:hidden"
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
              className="flex-shrink-0"
            >
              <img src={item.icon} alt={item.label} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs font-medium text-gray-300">
          View at 640px with a mouse
          <br /> to see the interaction.
        </p>
      </div>
    </>
  );
}

function AppIcon({
  mouseLeft,
  item,
  iconSize
}) {
  const ref = useRef(null);

  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };

    return mouseLeft.get() - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);
  const x = useTransform(() => {
    const d = distance.get();
    if (d === -Infinity) {
      return 0;
    } else if (d < -DISTANCE || d > DISTANCE) {
      return Math.sign(d) * -1 * NUDGE;
    } else {
      return (-d / DISTANCE) * NUDGE * scale.get();
    }
  });

  const scaleSpring = useSpring(scale, SPRING);
  const xSpring = useSpring(x, SPRING);
  const y = useMotionValue(0);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            ref={ref}
            style={{ 
              x: xSpring, 
              scale: scaleSpring, 
              y,
              width: `${iconSize}px`,
              height: `${iconSize}px`
            }}
            onClick={() => {
              // Animate the bounce first
              animate(y, [0, -40, 0], {
                repeat: 2,
                ease: [
                  [0, 0, 0.2, 1],
                  [0.8, 0, 1, 1],
                ],
                duration: 0.7,
              });
              
              // Then execute the provided onClick handler
              item.onClick && item.onClick();
            }}
            className="flex items-center justify-center origin-bottom focus:outline-none"
          >
            <img 
              src={item.icon} 
              alt={item.label} 
              className="w-full h-full object-contain" 
            />
          </motion.button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={10}
            className="bg-gray-700 shadow shadow-black border border-gray-600 px-2 py-1.5 text-sm rounded text-white font-medium"
          >
            {item.label}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}