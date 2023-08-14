import { titleNamesStateAtom } from "@/atoms/sectionNumberStateAtom";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilValue } from "recoil";

export default function PhoneMockUp() {
  const [phoneMockUpRef, phoneMockUpInView] = useInView({
    triggerOnce: true,
  });

  const titleNameState = useRecoilValue(titleNamesStateAtom);

  const images = [
    "theNext",
    "unLeash",
    "crafting",
    "rewards",
    "seamless",
    "elevate",
    "unlock",
    "elevateYour",
    "seize",
    "craft",
    "your",
    "enter",
    "be",
    "unleashAlgo",
    "elevateWith",
    "fuel",
    "privacy",
    "yourMonetization",
  ];

  useEffect(() => {
    console.log(titleNameState);
  }, [titleNameState]);

  return (
    <>
      {images.map((n, i) => (
        <Flex
          transform="auto"
          translateX={
            titleNameState === "theNext"
              ? "-25rem"
              : phoneMockUpInView
              ? "130px"
              : "-200px"
          }
          transition="all 1s ease-in-out"
          rotate={titleNameState === "theNext" ? "90deg" : "0deg"}
          scale={titleNameState === "theNext" ? "1.5" : "1"}
          userSelect="none"
          pointerEvents="none"
          ref={phoneMockUpRef}
          key={i}
          opacity={titleNameState === n ? 1 : 0}
          position="fixed"
          right="10"
          top="10"
        >
          <Image
            src={`/images/${n}.png`}
            alt={n}
            objectFit="contain"
            boxSize="3xl"
          />
        </Flex>
      ))}
    </>
  );
}