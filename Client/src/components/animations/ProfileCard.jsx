import React, { useEffect, useRef, useCallback, useMemo } from "react";
import "./ProfileCard.css";

const ProfileCard = ({
  avatarUrl,
  name = "Category Name",
  title = "Short Description",
  contactText = "Explore",
  enableTilt = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const clamp = (val, min = 0, max = 100) => Math.min(Math.max(val, min), max);
  const round = (val, precision = 3) => parseFloat(val.toFixed(precision));
  const adjust = (val, fromMin, fromMax, toMin, toMax) =>
    round(toMin + ((toMax - toMin) * (val - fromMin)) / (fromMax - fromMin));

  const easeInOutCubic = (x) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;
    let rafId = null;

    const updateCardTransform = (offsetX, offsetY, card, wrap) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const props = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      Object.entries(props).forEach(([key, val]) => {
        wrap.style.setProperty(key, val);
      });
    };

    const createSmoothAnimation = (duration, startX, startY, card, wrap) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = clamp(elapsed / duration);
        const eased = easeInOutCubic(progress);

        const currentX = adjust(eased, 0, 1, startX, targetX);
        const currentY = adjust(eased, 0, 1, startY, targetY);

        updateCardTransform(currentX, currentY, card, wrap);
        if (progress < 1) rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => rafId && cancelAnimationFrame(rafId),
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (card && wrap && animationHandlers) {
      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        e.clientX - rect.left,
        e.clientY - rect.top,
        card,
        wrap
      );
    }
  }, [animationHandlers]);

  const handlePointerEnter = useCallback(() => {
    cardRef.current?.classList.add("active");
    wrapRef.current?.classList.add("active");
  }, []);

  const handlePointerLeave = useCallback((e) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (card && wrap && animationHandlers) {
      animationHandlers.createSmoothAnimation(
        600,
        e.offsetX,
        e.offsetY,
        card,
        wrap
      );
      card.classList.remove("active");
      wrap.classList.remove("active");
    }
  }, [animationHandlers]);

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [enableTilt, animationHandlers, handlePointerEnter, handlePointerMove, handlePointerLeave]);

  return (
    <div ref={wrapRef} className="pc-card-wrapper">
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          <div className="pc-image-container">
            <img className="pc-image" src={avatarUrl} alt={name} />
          </div>
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
            <button className="pc-contact-btn" onClick={onContactClick}>
              {contactText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(ProfileCard);
