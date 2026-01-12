import { Card } from "@mui/material";
import type { CardProps } from '@mui/material'
import { motion } from "framer-motion";
import type { MotionProps } from 'framer-motion'
import { forwardRef } from "react";

type AppCardProps = CardProps & MotionProps & { clickable?: boolean };

const MotionCard = motion(
  forwardRef<HTMLDivElement, CardProps>((props, ref) => <Card ref={ref} {...props} />)
);

export default function AppCard({ clickable = false, ...props }: AppCardProps) {
  return (
    <MotionCard
      whileHover={clickable ? { y: -4 } : undefined}
      whileTap={clickable ? { scale: 0.97 } : undefined}
      sx={{
        borderRadius: 3,
        cursor: clickable ? "pointer" : "default",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        mb: 2,
      }}
      {...props}
    />
  );
}
