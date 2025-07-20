import {
  PanelLeftClose,
  PanelRightClose,
  Menu,
  Star,
  RotateCcw,
  Bell,
  Sun,
  Moon,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({
  leftSidebarOpen,
  rightSidebarOpen,
  setLeftSidebarOpen,
  setRightSidebarOpen,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const menuRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();

  // Get current path for breadcrumb
  const getBreadcrumbPath = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    if (pathnames.length === 0) return "Dashboard / Default";

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
    const checkMobile = () => setIsMobileView(window.innerWidth < 1024);
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

  const handleLeftSidebarToggle = () => {
    if (isMobileView && rightSidebarOpen) {
      setRightSidebarOpen(false);
      setTimeout(() => setLeftSidebarOpen(true), 300);
    } else {
      setLeftSidebarOpen(!leftSidebarOpen);
    }
  };

  const handleRightSidebarToggle = () => {
    if (isMobileView && leftSidebarOpen) {
      setLeftSidebarOpen(false);
      setTimeout(() => setRightSidebarOpen(true), 300);
    } else {
      setRightSidebarOpen(!rightSidebarOpen);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <nav className='flex justify-between items-center px-4 py-2 h-[68px] border-b border-gray-300 dark:border-gray-700 z-50 bg-white dark:bg-primary-dark'>
      {/* Left Sidebar Toggle & Breadcrumb */}
      <div className='flex gap-2 items-center'>
        {/* Hamburger menu for mobile view */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleLeftSidebarToggle}
            aria-label='Toggle left sidebar'
            className='lg:hidden'
            disabled={isMobileView && rightSidebarOpen}
          >
            <Menu
              className={`w-5 h-5 ${
                isMobileView && rightSidebarOpen ? "opacity-50" : ""
              }`}
            />
          </Button>
        </motion.div>

        {/* Desktop sidebar toggle */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
            aria-label='Toggle left sidebar'
            className='hidden lg:flex'
          >
            {leftSidebarOpen ? (
              <PanelLeftClose className='w-5 h-5' />
            ) : (
              <PanelRightClose className='w-5 h-5' />
            )}
          </Button>
        </motion.div>

        {/* Starred Button for desktop */}
        <motion.div
          initial='initial'
          animate='animate'
          variants={starVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant='ghost'
            size='icon'
            onClick={handleStarred}
            aria-label='Starred'
            className='hidden lg:flex'
          >
            <Star
              className='w-5 h-5'
              fill={
                isStarred ? "#FFD700" : theme === "light" ? "lightgray" : ""
              }
            />
          </Button>
        </motion.div>

        {/* Dynamic Breadcrumb */}
        <motion.div
          className='text-sm text-gray-600 dark:text-gray-300 hidden lg:block'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getBreadcrumbPath()}
        </motion.div>
      </div>

      <div className='flex gap-2 items-center'>
        {/* Search */}
        <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
          <input
            type='search'
            placeholder='Search'
            className='border rounded px-2 py-1 text-sm dark:bg-card-grey dark:text-white dark:border-gray-600 w-32 lg:w-auto transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50'
          />
        </motion.div>

        {/* Theme Toggle with Animation */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='relative overflow-hidden flex items-center justify-center h-10 w-10'
            aria-label='Toggle theme'
          >
            <motion.div
              className='absolute inset-0 flex items-center justify-center'
              initial={false}
              animate={{
                rotate: theme === "light" ? 0 : 360,
                transition: { duration: 0.5 },
              }}
            >
              <motion.div
                className='absolute'
                animate={{
                  opacity: theme === "light" ? 1 : 0,
                  scale: theme === "light" ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
              >
                <Moon className='w-5 h-5' fill='lightgray' />
              </motion.div>
              <motion.div
                className='absolute'
                animate={{
                  opacity: theme === "dark" ? 1 : 0,
                  scale: theme === "dark" ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
              >
                <Sun className='w-5 h-5' />
              </motion.div>
            </motion.div>
          </Button>
        </motion.div>

        {/* Desktop Icons */}
        <div className='hidden lg:flex items-center gap-2 h-full'>
          <motion.div
            whileHover='hover'
            whileTap='tap'
            variants={buttonVariants}
          >
            <Button
              variant='ghost'
              size='icon'
              aria-label='Refresh'
              onClick={handleRefresh}
              className='flex items-center justify-center h-10 w-10'
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: 1, duration: 0.5, ease: "linear" }}
              >
                <RotateCcw
                  className='w-5 h-5'
                  fill={theme === "light" ? "lightgray" : ""}
                />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover='hover'
            whileTap='tap'
            variants={buttonVariants}
          >
            <Button
              variant='ghost'
              size='icon'
              aria-label='Notifications'
              className='flex items-center justify-center h-10 w-10'
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Bell
                  className='w-4 h-4'
                  fill={theme === "light" ? "lightgray" : ""}
                />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover='hover'
            whileTap='tap'
            variants={buttonVariants}
          >
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              aria-label='Toggle right sidebar'
              className='flex items-center justify-center h-10 w-10'
            >
              {rightSidebarOpen ? (
                <PanelRightClose className='w-5 h-5' />
              ) : (
                <PanelLeftClose className='w-5 h-5' />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile View Right Sidebar Bell Toggle */}
        <motion.div whileHover='hover' whileTap='tap' variants={buttonVariants}>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleRightSidebarToggle}
            className='lg:hidden'
            aria-label='Toggle right sidebar'
            disabled={isMobileView && leftSidebarOpen}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Bell
                className={`w-5 h-5 ${
                  isMobileView && leftSidebarOpen ? "opacity-50" : ""
                }`}
                fill={theme === "light" ? "lightgray" : ""}
              />
            </motion.div>
          </Button>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <motion.div
          className='lg:hidden relative'
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            whileHover='hover'
            whileTap='tap'
            variants={buttonVariants}
          >
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label='Menu'
            >
              <MoreVertical className='w-5 h-5' />
            </Button>
          </motion.div>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-card-grey border dark:border-gray-700 z-50'
            >
              <div className='py-1'>
                <motion.button
                  className='w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left flex items-center gap-2'
                  onClick={handleStarred}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div animate={{ scale: isStarred ? [1, 1.2, 1] : 1 }}>
                    <Star
                      className='w-4 h-4'
                      fill={
                        isStarred
                          ? "#FFD700"
                          : theme === "light"
                          ? "lightgray"
                          : ""
                      }
                    />
                  </motion.div>
                  Starred
                </motion.button>
                <motion.button
                  className='w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left flex items-center gap-2'
                  onClick={handleRefresh}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RotateCcw
                      className='w-4 h-4'
                      fill={theme === "light" ? "lightgray" : ""}
                    />
                  </motion.div>
                  Refresh
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
