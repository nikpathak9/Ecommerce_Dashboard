import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Sidebar = ({
  isOpen,
  position = "left",
  mode = "push", // "overlay" or "push"
  children,
}) => {
  const baseClasses = clsx(
    "h-full bg-white dark:bg-primary-dark z-30",
    "transition-transform duration-300 ease-in-out",
    "shadow-none border-gray-200 dark:border-gray-700",
    mode === "overlay" ? "absolute" : "fixed",
    position === "left"
      ? "top-0 left-0 w-[200px] border-r"
      : "top-0 right-0 w-[200px] border-l"
  );

  const translate = () => {
    if (position === "left")
      return isOpen ? "translate-x-0" : "-translate-x-full";
    else return isOpen ? "translate-x-0" : "translate-x-full";
  };

  return (
    <motion.div
      initial={false}
      animate={{ x: 0 }}
      className={clsx(baseClasses, translate())}
    >
      {children}
    </motion.div>
  );
};

export default Sidebar;
