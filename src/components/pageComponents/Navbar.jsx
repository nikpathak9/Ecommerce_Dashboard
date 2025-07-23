import {
  PanelLeftClose,
  PanelRightClose,
  Star,
  RotateCcw,
  Bell,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({
  leftSidebarOpen,
  rightSidebarOpen,
  setLeftSidebarOpen,
  setRightSidebarOpen,
  isZoomed,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isStarred, setIsStarred] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();

  // Get current path for breadcrumb
  const getBreadcrumbPath = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    if (pathnames.length === 0) return "Dashboard";

    // For mobile view, just return the last path segment
    if (isMobileView) {
      const lastPath = pathnames[pathnames.length - 1];
      return lastPath
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // For desktop view, return the full breadcrumb
    return pathnames.map((path, i) => {
      const isLast = i === pathnames.length - 1;
      const formattedPath = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return isLast ? (
        <span key={path} className='font-medium'>
          {formattedPath}
        </span>
      ) : (
        <span key={path}>{formattedPath} / </span>
      );
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRefresh = () => {
    window.location.reload(false);
  };

  const handleStarred = () => {
    setIsStarred(!isStarred);
  };

  // Micro-interaction variants
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const starVariants = {
    initial: { scale: 1 },
    animate: {
      scale: isStarred ? [1, 1.2, 1] : 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav className='flex items-center justify-between px-4 py-2 h-[68px] border-b border-gray-300 dark:border-gray-700 z-50 bg-white dark:bg-primary-dark'>
      {/* Left Section */}
      <div className='flex items-center gap-2'>
        {/* Left Sidebar Toggle */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            aria-label='Toggle left sidebar'
            className='w-4 h-4 cursor-pointer'
          >
            {leftSidebarOpen ? (
              <PanelLeftClose className='w-4 h-4' />
            ) : (
              <PanelRightClose className='w-4 h-4' />
            )}
          </Button>
        </motion.div>

        {/* Starred Button */}
        <motion.div
          initial='initial'
          animate='animate'
          variants={starVariants}
          whileHover='hover'
          whileTap='tap'
        >
          <Button
            variant='ghost'
            size='icon'
            onClick={handleStarred}
            aria-label='Starred'
            className='w-4 h-4 cursor-pointer'
          >
            <Star
              className='w-4 h-4'
              fill={
                isStarred ? "#FFD700" : theme === "light" ? "lightgray" : ""
              }
            />
          </Button>
        </motion.div>

        {/* Dynamic Breadcrumb */}
        <motion.div
          className='text-sm text-gray-600 dark:text-gray-300 overflow-hidden whitespace-nowrap'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getBreadcrumbPath()}
        </motion.div>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-2 justify-center'>
        {/* Search */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          {isMobileView && isZoomed ? (
            <Button
              variant='ghost'
              size='icon'
              aria-label='Search'
              className='w-4 h-4 cursor-pointer'
            >
              <Search className='w-4 h-4' />
            </Button>
          ) : (
            <div className='relative flex items-center'>
              <input
                type='text'
                placeholder='Search'
                className='cursor-pointer w-[160px] h-[28px] border border-gray-300 dark:border-gray-700 bg-transparent rounded-md pl-8 pr-2 py-1 text-xs text-gray-600 dark:text-gray-300 focus:outline-none'
              />
              <Search className='absolute left-2 w-4 h-4 text-muted-foreground cursor-pointer' />
            </div>
          )}
        </motion.div>

        {/* Theme Toggle */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='w-4 h-4 cursor-pointer'
            aria-label='Toggle theme'
          >
            <motion.div
              className='flex items-center justify-center'
              initial={false}
              animate={{
                rotate: theme === "light" ? 0 : 360,
                transition: { duration: 0.5 },
              }}
            >
              {theme === "light" ? (
                <Moon className='w-4 h-4' fill='lightgray' />
              ) : (
                <Sun className='w-4 h-4' />
              )}
            </motion.div>
          </Button>
        </motion.div>

        {/* Refresh */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Refresh'
            onClick={handleRefresh}
            className='w-4 h-4 cursor-pointer'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: 1, duration: 0.5, ease: "linear" }}
            >
              <RotateCcw
                className='w-4 h-4'
                fill={theme === "light" ? "lightgray" : ""}
              />
            </motion.div>
          </Button>
        </motion.div>

        {/* Notifications */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Notifications'
            className='w-4 h-4 cursor-pointer'
          >
            <Bell
              className='w-4 h-4'
              fill={theme === "light" ? "lightgray" : ""}
            />
          </Button>
        </motion.div>

        {/* Right Sidebar Toggle */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
            aria-label='Toggle right sidebar'
            className='w-4 h-4 cursor-pointer'
          >
            {rightSidebarOpen ? (
              <PanelRightClose className='w-4 h-4' />
            ) : (
              <PanelLeftClose className='w-4 h-4' />
            )}
          </Button>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
