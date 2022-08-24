import { motion, wrapHandler } from "framer-motion";

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

export default function OperationButton2(props) {
  const { value, operationModifier } = props;
  return (
    <motion.button
      initial="stylenormal"
      whileHover="stylehover"
      whileTap="styletap"
      variants={buttonstyle}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={() => operationModifier({ value })}
      value={value}
      className={props.className}
    >
      {props.children}
    </motion.button>
  );
}
