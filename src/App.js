import { useState, useRef } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import DefaultButton from "./DefaultButton";
import { motion } from "framer-motion";
import {
  IconAC,
  IconArrowLeft,
  IconDivide,
  IconEqual,
  IconMinus,
  IconMultiply,
  IconPlus,
  IconPlusMinus,
} from "./Icon/Icon";

let answered = false;

// let numArr = [];

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default function App() {
  // 设置数字颜色
  // const [textColor, setTextColor] = useState("#bcbacb");

  // 设置当前数字
  const [currentOperand, setCO] = useState("");
  // 设置前一个数字
  const [previousOperand, setPO] = useState("");
  // 设置运算符号
  const [displayOperand, setDO] = useState(null);

  // 设置主题
  const [theme, setTheme] = useState("light");

  // 设置运算记录
  const [numArr, setNumArr] = useState([]);

  // 屏幕添加数字
  function addDigit({ digit }) {
    // 判断是不是 . => 是 .
    if (digit === ".") {
      // 判断是不是已经包含 . => 不包含 .
      if (!currentOperand.includes(".")) {
        // 设置当前数字 => 当前 + 输入
        setCO(currentOperand + digit);
      }
    }
    // 判断是不是 . => 不是 .
    else {
      // 如果 answered 为 true
      if (answered) {
        // currentOperand 转换为字符串
        setCO(digit.toString());
        answered = false;
      }
      // 如果 answered 为 false
      else {
        // 设置当前数字 => 当前 + 输入
        setCO(currentOperand.toString() + digit);
      }
    }
  }

  // 按AC
  function clear() {
    setCO("");
    setPO("");
    setDO(null);
  }

  // 按 ←
  function del() {
    setCO(currentOperand.slice(0, -1));
  }

  // 按运算符
  function setMath({ value }) {
    if (currentOperand !== "" || previousOperand !== "") {
      // 如果运算符为空
      if (displayOperand === null) {
        setPO(currentOperand);
        setCO("");
        setDO(value);
      }
      // 如果运算符不为空
      else {
        setDO(value);
      }
    }
  }

  const plusminus = () => {
    if (currentOperand !== "") {
      setCO(currentOperand * -1);
    }
  };

  // 按 =
  function executeMath() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    answered = true;

    switch (displayOperand) {
      case "+":
        setCO((prev + current).toString());
        setPO(previousOperand + " " + displayOperand + " " + currentOperand);
        setDO(null);
        setNumArr((numArr) => [
          ...numArr,
          `${
            previousOperand +
            " " +
            displayOperand +
            " " +
            currentOperand +
            " " +
            "=" +
            " " +
            (prev + current)
          }`,
        ]);
        break;
      case "-":
        setCO((prev - current).toString());
        setPO(previousOperand + " " + displayOperand + " " + currentOperand);
        setDO(null);
        setNumArr((numArr) => [
          ...numArr,
          `${
            previousOperand +
            " " +
            displayOperand +
            " " +
            currentOperand +
            " " +
            "=" +
            " " +
            (prev + current)
          }`,
        ]);
        break;
      case "*":
        setCO((prev * current).toString());
        setPO(previousOperand + " " + displayOperand + " " + currentOperand);
        setDO(null);
        setNumArr((numArr) => [
          ...numArr,
          `${
            previousOperand +
            " " +
            displayOperand +
            " " +
            currentOperand +
            " " +
            "=" +
            " " +
            (prev + current)
          }`,
        ]);
        break;
      case "/":
        setCO((prev / current).toString());
        setPO(previousOperand + " " + displayOperand + " " + currentOperand);
        setDO(null);
        setNumArr((numArr) => [
          ...numArr,
          `${
            previousOperand +
            " " +
            displayOperand +
            " " +
            currentOperand +
            " " +
            "=" +
            " " +
            (prev + current)
          }`,
        ]);
        break;
      default:
        break;
    }
  }

  const handleSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`${theme}calculator calculator`}>
      <div className="header">
        <div className={`${theme}clear clear`} onClick={() => setNumArr([])}>
          ClearAll
        </div>
        <div className={`${theme}switch switch`} onClick={handleSwitch}>
          <motion.span
            className={`${theme}handle handle`}
            layout
            transition={spring}
          ></motion.span>
        </div>
      </div>
      <div className={`${theme}output output`}>
        <div className={`${theme}arr arr`}>
          {numArr.map((item) => (
            <div>{item}</div>
          ))}
        </div>
        <div className={`${theme}previous previous`}>
          {previousOperand} {displayOperand}
        </div>
        <div>{currentOperand}</div>
      </div>
      <div className={`${theme}numbers-grid numbers-grid`}>
        <DefaultButton className={`${theme}default default`} onClick={clear}>
          <IconAC width={"66.667%"} fill={"#F98319"} />
        </DefaultButton>
        <DefaultButton className={`${theme}default default`} onClick={del}>
          <IconArrowLeft width={"66.667%"} fill={"#F98319"} />
        </DefaultButton>
        <DefaultButton
          className={`${theme}default default`}
          onClick={plusminus}
        >
          <IconPlusMinus width={"66.667%"} fill={"#F98319"} />
        </DefaultButton>
        <OperationButton
          className={`${theme}operation operation`}
          value={"/"}
          operationModifier={setMath}
        >
          <IconDivide width={"66.667%"} fill={"#F98319"} />
        </OperationButton>
        <DigitButton digit={1} digitModifier={addDigit} />
        <DigitButton digit={2} digitModifier={addDigit} />
        <DigitButton digit={3} digitModifier={addDigit} />
        <OperationButton
          className={`${theme}operation operation`}
          value={"*"}
          operationModifier={setMath}
        >
          <IconMultiply width={"66.667%"} fill={"#F98319"} />
        </OperationButton>

        <DigitButton digit={4} digitModifier={addDigit} />
        <DigitButton digit={5} digitModifier={addDigit} />
        <DigitButton digit={6} digitModifier={addDigit} />
        <OperationButton
          className={`${theme}operation operation`}
          value={"-"}
          operationModifier={setMath}
        >
          <IconMinus width={"66.667%"} fill={"#F98319"} />
        </OperationButton>
        <DigitButton digit={7} digitModifier={addDigit} />
        <DigitButton digit={8} digitModifier={addDigit} />
        <DigitButton digit={9} digitModifier={addDigit} />
        <OperationButton
          className={`${theme}operation operation`}
          value={"+"}
          operationModifier={setMath}
        >
          <IconPlus width={"66.667%"} fill={"#F98319"} />
        </OperationButton>
        <DigitButton digit={0} digitModifier={addDigit} />
        <DigitButton digit={"."} digitModifier={addDigit} />
        <DefaultButton className={`${theme}equal equal`} onClick={executeMath}>
          <IconEqual width={"28.572%"} height={"66.667%"} fill={"#F98319"} />
        </DefaultButton>
      </div>
    </div>
  );
}
