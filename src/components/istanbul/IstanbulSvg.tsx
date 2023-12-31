import { Box } from "@chakra-ui/react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { clearIstanbulAllPath } from "./IstanbulPath";

type Props = {
  isMobile: boolean;
};

export default function IstanbulSVG({ isMobile }: Props) {
  const animationControls = useAnimationControls();
  const secondAC = useAnimationControls();

  const [animationIsInProgress, setAnimationIsInProgress] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      handleAnimations();
    }
  }, [inView]);

  const handleAnimations = async () => {
    if (animationIsInProgress) return;

    setAnimationIsInProgress(true);

    try {
      await animationControls.start({
        pathLength: 0,
        transition: {
          duration: 0,
        },
      });
    } catch (error) {
      // not important
    }

    try {
      await secondAC.start({
        fillOpacity: 0,
        transition: {
          duration: 0,
        },
      });
    } catch (error) {
      // not important
    }

    try {
      await animationControls.start({
        pathLength: 1,
        transition: {
          delay: 0,
          ease: [1, 0.01, 0.9, 0.99],
          duration: 3,
          type: "tween",
        },
      });
    } catch (error) {
      // not important
    }

    try {
      await secondAC.start({
        fillOpacity: 1,
        transition: {
          delay: 0,
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    } catch (error) {
      // not important
    }

    setAnimationIsInProgress(false);
  };

  return (
    <Box
      ref={ref}
      p={0}
      width="100%"
      height="auto"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
      onMouseEnter={() => {
        if (isMobile) return;
        handleAnimations();
      }}
      onClick={() => {
        if (!isMobile) return;
        handleAnimations();
      }}
    >
      <svg width="100%" viewBox="0 0 425 115">
        <motion.g
          fill="#1b1918"
          fillRule="evenodd"
          fillOpacity={0}
          animate={secondAC}
        >
          <motion.path
            pathLength={0}
            animate={animationControls}
            strokeWidth="1"
            strokeLinecap="butt"
            stroke="#fff"
            d={clearIstanbulAllPath}
          />
        </motion.g>
      </svg>
    </Box>
  );
}
