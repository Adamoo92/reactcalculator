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

export default function DefaultButton(props) {
  return (
    <motion.button
      initial="stylenormal"
      whileHover="stylehover"
      whileTap="styletap"
      variants={buttonstyle}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </motion.button>
  );
}
