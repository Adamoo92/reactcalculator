import { motion } from "framer-motion";

const buttonstyle = {
  stylenormal: {
    scale: 1,
  },
  stylehover: {
    scale: 1.05,
  },
  styletap: {
    scale: 0.9,
  },
};

export default function DigitButton2({ digit, digitModifier, className }) {
  return (
    <motion.button
      className={className}
      onClick={() => digitModifier({ digit })}
      initial="stylenormal"
      whileHover="stylehover"
      whileTap="styletap"
      variants={buttonstyle}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {digit}
    </motion.button>
  );
}
