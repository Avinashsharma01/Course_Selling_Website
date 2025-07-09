import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-[140%] left-[-15%] w-[500px] h-[340px] rounded-xl border border-white bg-white shadow-md cursor-pointer [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const CardSwap = ({
  children,
  width = 320,
  height = 400,
  cardDistance = 100,
  verticalDistance = 90,
  delay = 3000,
  pauseOnHover = true,
  onFrontCardChange = () => {},
}) => {
  const [paused, setPaused] = useState(false);
  const cardRefs = useRef([]);
  const total = Children.count(children);

  const slots = useMemo(
    () =>
      Array.from({ length: total }, (_, i) =>
        makeSlot(i, cardDistance, verticalDistance, total)
      ),
    [total, cardDistance, verticalDistance]
  );

  // initialize card positions
  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      gsap.set(card, {
        transformOrigin: "center center",
        zIndex: slots[i].zIndex,
        xPercent: -50,
        yPercent: -50,
        ...slots[i],
        rotate: 0,
        scale: 1 - i * 0.04,
      });
    });

    onFrontCardChange?.(0); // default front card on mount
  }, [slots, onFrontCardChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) handleNext();
    }, delay);
    return () => clearInterval(interval);
  });

  const handleNext = () => {
    const first = cardRefs.current.shift();
    cardRefs.current.push(first);
    updatePositions();
    onFrontCardChange((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    const last = cardRefs.current.pop();
    cardRefs.current.unshift(last);
    updatePositions();
    onFrontCardChange((prev) =>
      prev - 1 < 0 ? total - 1 : (prev - 1) % total
    );
  };

  const updatePositions = () => {
    cardRefs.current.forEach((card, i) => {
      gsap.to(card, {
        duration: 0.6,
        ease: "power2.inOut",
        ...slots[i],
        scale: 1 - i * 0.04,
        zIndex: slots[i].zIndex,
      });
    });
  };

  return (
    <div
      className="relative mx-auto"
      style={{ width, height }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child, {
              ref: (el) => (cardRefs.current[i] = el),
            })
          : null
      )}

      {/* Manual Controls */}
      <div className="absolute bottom-[-330px] left-[-25%] -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={handlePrev}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardSwap;
