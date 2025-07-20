import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { X } from "lucide-react";

const Sidebar = ({ isOpen, position = "left", children }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when sidebar is open in mobile view
  useEffect(() => {
    if (isMobileView) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMobileView]);

  const isLeft = position === "left";

  const mobileVariants = {
    hidden: { x: isLeft ? "-100%" : "100%" },
    visible: { x: 0 },
  };

  const desktopVariants = {
    collapsed: { width: 0, opacity: 0 },
    expanded: { width: 240, opacity: 1 },
  };

  return (
    <>
      {/* Mobile View (up to lg) */}
      <AnimatePresence>
        {isMobileView && isOpen && (
          <motion.aside
            key='mobile-sidebar'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={mobileVariants}
            transition={{ duration: 0.3 }}
            className={clsx(
              "fixed top-0 z-50 h-full w-[240px] bg-white dark:bg-primary-dark shadow-lg lg:hidden",
              isLeft ? "left-0" : "right-0"
            )}
          >
            <div className='p-4 h-full overflow-y-auto'>{children}</div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop View (lg and up) */}
      {!isMobileView && (
        <motion.aside
          initial={position === "right" ? "hidden" : ""}
          animate={isOpen ? "expanded" : "collapsed"}
          variants={desktopVariants}
          transition={{ duration: 0.3 }}
          className={clsx(
            "hidden lg:flex flex-col h-full",
            "bg-white dark:bg-primary-dark border-r dark:border-gray-600 overflow-hidden",
            isLeft ? "" : "border-l border-r-0"
          )}
        >
          <div className='p-4 h-full overflow-y-auto min-w-[240px]'>
            {children}
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default Sidebar;
