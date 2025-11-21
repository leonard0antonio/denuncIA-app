import styled from "styled-components";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
        {children}
      </Box>
    </Backdrop>
  );
}
