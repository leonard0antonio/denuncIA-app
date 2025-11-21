import styled from 'styled-components';
import { motion } from 'framer-motion';

const Toggle = styled(motion.button)`
  border: none;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
`;

export default function ThemeToggle({ onToggle, isDark }: { onToggle: ()=>void, isDark: boolean }) {
  return (
    <Toggle onClick={onToggle} whileTap={{ scale: 0.95 }}>
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </Toggle>
  );
}
