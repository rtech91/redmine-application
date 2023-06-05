import { Box } from "@chakra-ui/react";

const BoxOverlay = ({ bgColor, children }) => (
  <Box
    bg="red"
    sx={{
      position: "absolute",
    }}
    bgColor={bgColor}
    height="100%"
    width="100vw"
    left={0}
    top={0}
    ml="calc((-100vw + 100%) / 2)"
    zIndex={-3}
  >
    {children}
  </Box>
);

export default BoxOverlay;
