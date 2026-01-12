import { forwardRef } from "react";
import { Button } from "@mui/material";
import type { ButtonProps } from '@mui/material'
import { motion } from "framer-motion";
import type {MotionProps} from 'framer-motion'

type AppButtonProps = ButtonProps & MotionProps & { fullWidth?: boolean };

const MotionButton = motion(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button ref={ref} {...props} />
  ))
);

export default function AppButton({ fullWidth = false, ...props }: AppButtonProps) {
  return (
    <MotionButton
      whileTap={{ scale: 0.96 }}
      fullWidth={fullWidth}
      variant="contained"
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 500,
        py: 1.2,
        mt: 2,
      }}
      {...props}
    />
  );
}
