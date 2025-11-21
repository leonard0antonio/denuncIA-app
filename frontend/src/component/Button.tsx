import styled from "styled-components";
import { motion } from "framer-motion";

const Btn = styled(motion.button)`
  padding: 10px 16px;
  border: none;
  background: #0066ff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

export default function Button({ children, ...props }) {
  return (
    <Btn whileTap={{ scale: 0.95 }} {...props}>
      {children}
    </Btn>
  );
}
