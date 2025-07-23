import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import {
  LayoutDashboard,
  ShoppingCart,
  Folder,
  BookOpen,
  User,
  IdCard,
  X,
  Newspaper,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const LeftSideBar = ({
  leftSidebarOpen,
  isLoading,
  activeTab,
  setActiveTab,
  setLeftSidebarOpen,
  mode,
}) => {
  const [openSections, setOpenSections] = useState({
    ecommerce: false,
    projects: false,
    courses: false,
    userProfile: false,
    account: false,
  });

  const location = useLocation();

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed left-0 top-0 h-full z-30 w-[200px] ${
        leftSidebarOpen ? "block" : "hidden"
      } max-w-[100px] sm:max-w-[200px]`}
    >
      <Sidebar isOpen={leftSidebarOpen} position='left' mode={mode}>
        <div className='space-y-2 p-2 overflow-y-auto max-h-full pr-1 text-xs sm:text-sm'>
          {isLoading ? (
            <div className='space-y-6 p-4'>
              <div className='space-y-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <Skeleton className='w-6 h-6 rounded-full sm:w-5 sm:h-5' />
                  <Skeleton className='h-3 w-[60px] sm:h-2 sm:w-[40px]' />
                </div>
                <div className='flex gap-2'>
                  <Skeleton className='h-5 w-[60px] rounded-md sm:h-4 sm:w-[40px]' />
                  <Skeleton className='h-5 w-[60px] rounded-md sm:h-4 sm:w-[40px]' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                  <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                </div>
                <div>
                  <Skeleton className='h-2 w-[60px] mb-2 sm:h-1.5 sm:w-[40px]' />
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-full sm:h-2' />
                    <Skeleton className='h-3 w-full sm:h-2' />
                    <Skeleton className='h-3 w-full sm:h-2' />
                    <Skeleton className='h-3 w-full sm:h-2' />
                  </div>
                </div>
                <div>
                  <Skeleton className='h-2 w-[60px] mb-2 sm:h-1.5 sm:w-[40px]' />
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-[120px] sm:h-2 sm:w-[80px]' />
                    <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                    <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                    <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                    <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                    <Skeleton className='h-3 w-[80px] sm:h-2 sm:w-[50px]' />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='p-2 max-w-[200px]'>
              <div className='flex items-center justify-between w-full gap-2'>
                <div className='flex items-center justify-start gap-2 cursor-pointer hover:bg-primary dark:hover:bg-card-grey rounded-md p-1'>
                  <img
                    src='https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb'
                    className='w-6 h-6 rounded-full sm:w-5 sm:h-5'
                    alt='User'
                  />
                  <p className='text-xs'>ByeWind</p>
                </div>
                <div className='flex justify-end'>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Button
                      onClick={() => setLeftSidebarOpen(false)}
                      className='cursor-pointer w-8 h-8 sm:w-6 sm:h-6'
                      variant='ghost'
                      aria-label='Close sidebar'
                    >
                      <X className='w-5 h-5 sm:w-4 sm:h-4' />
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className='space-y-4 mb-4 sm:space-y-2'>
                {/* Favorites/Recents Toggle */}
                <div>
                  <div className='flex gap-1 sm:gap-0.5'>
                    <Toggle
                      pressed={activeTab === "favourites"}
                      onPressedChange={() => setActiveTab("favourites")}
                      className={`cursor-pointer transition-all px-1 py-0 rounded-none focus-visible:ring-0 font-semibold text-xs sm:text-[10px]
                        hover:bg-transparent data-[state=on]:bg-transparent
                        ${
                          activeTab === "favourites"
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                        }`}
                    >
                      Favorites
                    </Toggle>
                    <Toggle
                      pressed={activeTab === "recents"}
                      onPressedChange={() => setActiveTab("recents")}
                      className={`cursor-pointer transition-all px-1 py-0 rounded-none focus-visible:ring-0 font-semibold text-xs sm:text-[10px]
                        hover:bg-transparent data-[state=on]:bg-transparent
                        ${
                          activeTab === "recents"
                            ? "text-black dark:text-white"
                            : "text-muted-foreground"
                        }`}
                    >
                      Recently
                    </Toggle>
                  </div>

                  {/* Toggle Section Content */}
                  {activeTab === "favourites" && (
                    <ul className='mt-1 text-xs sm:text-[10px] text-muted-foreground dark:text-gray-300 pl-1'>
                      <li className='flex items-center gap-0.5 px-1 py-0.5 cursor-pointer hover:bg-primary dark:hover:bg-card-grey rounded-sm'>
                        <span className='text-base leading-none sm:text-sm'>
                          •
                        </span>
                        Overview
                      </li>
                      <li className='flex items-center gap-0.5 px-1 py-0.5 cursor-pointer hover:bg-primary dark:hover:bg-card-grey rounded-sm'>
                        <span className='text-base leading-none sm:text-sm'>
                          •
                        </span>
                        Projects
                      </li>
                    </ul>
                  )}
                  {activeTab === "recents" && (
                    <p className='text-start text-[10px] sm:text-xs text-muted-foreground mt-1 px-2'>
                      No recent items
                    </p>
                  )}
                </div>
              </div>

              <div className='space-y-4 sm:space-y-2 my-4 sm:mt-2'>
                <div className='space-y-4'>
                  <h3 className='text-xs sm:text-[10px] text-muted-foreground uppercase px-1 mb-1 font-semibold'>
                    Dashboards
                  </h3>
                  <ul className='flex flex-col text-xs sm:text-[10px] text-muted-foreground dark:text-gray-300'>
                    <Link to='/dashboard/default'>
                      <li
                        className={`flex items-center px-2 py-0.5 rounded-[2px] cursor-pointer
                          ${
                            isActive("/dashboard/default")
                              ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                              : "hover:bg-muted dark:hover:bg-card-grey"
                          }`}
                      >
                        <LayoutDashboard className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                        Default
                      </li>
                    </Link>

                    <li className='flex flex-col'>
                      <div
                        className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                        onClick={() => toggleSection("ecommerce")}
                      >
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSections.ecommerce ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          <ChevronRight
                            size={12}
                            className='text-muted-foreground'
                          />
                        </span>
                        <ShoppingCart className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                        <span>eCommerce</span>
                      </div>
                      {openSections.ecommerce && (
                        <div className='pl-6 py-0.5'>
                          <Link to='/dashboard/ecommorce/orders'>
                            <div
                              className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                                isActive("/dashboard/ecommorce/orders")
                                  ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Orders
                            </div>
                          </Link>
                          <Link to='/dashboard/ecommerce/sales'>
                            <div
                              className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                                isActive("/dashboard/ecommerce/sales")
                                  ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Sales
                            </div>
                          </Link>
                          <Link to='/dashboard/ecommerce/products'>
                            <div
                              className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                                isActive("/dashboard/ecommerce/products")
                                  ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Products
                            </div>
                          </Link>
                        </div>
                      )}
                    </li>

                    <li className='flex flex-col'>
                      <div
                        className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                        onClick={() => toggleSection("projects")}
                      >
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSections.projects ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          <ChevronRight
                            size={12}
                            className='text-muted-foreground'
                          />
                        </span>
                        <Folder className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                        <span>Projects</span>
                      </div>
                      {openSections.projects && (
                        <div className='pl-6 py-0.5'>
                          <Link to='/dashboard/projects/current'>
                            <div
                              className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                                isActive("/dashboard/projects/current")
                                  ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Current
                            </div>
                          </Link>
                          <Link to='/dashboard/projects/completed'>
                            <div
                              className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                                isActive("/dashboard/projects/completed")
                                  ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Completed
                            </div>
                          </Link>
                        </div>
                      )}
                    </li>

                    <li className='flex flex-col'>
                      <div
                        className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                        onClick={() => toggleSection("courses")}
                      >
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSections.courses ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          <ChevronRight
                            size={12}
                            className='text-muted-foreground'
                          />
                        </span>
                        <BookOpen className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                        <span>Online Courses</span>
                      </div>
                      {openSections.courses && (
                        <div className='pl-6 py-0.5'>
                          <Link to='/dashboard/courses/my-courses'>
                            <div
                              className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                                isActive("/dashboard/courses/my-courses")
                                  ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              My Courses
                            </div>
                          </Link>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className='space-y-4 sm:space-y-2 my-4 sm:mt-2'>
                <h3 className='text-xs sm:text-[10px] text-muted-foreground uppercase px-1 mb-1 font-semibold'>
                  Pages
                </h3>
                <ul className='flex flex-col text-xs sm:text-[10px] text-muted-foreground dark:text-gray-300'>
                  {/* User Profile */}
                  <li className='flex flex-col'>
                    <div
                      className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("userProfile")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.userProfile ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={12}
                          className='text-muted-foreground'
                        />
                      </span>
                      <User className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                      <span>User Profile</span>
                    </div>
                    {openSections.userProfile && (
                      <div className='pl-6 py-0.5'>
                        <Link to='/pages/user/overview'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/user/overview")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Overview
                          </div>
                        </Link>
                        <Link to='/pages/user/projects'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/user/projects")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Projects
                          </div>
                        </Link>
                        <Link to='/pages/user/campaigns'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/user/campaigns")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Campaigns
                          </div>
                        </Link>
                        <Link to='/pages/user/documents'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/user/documents")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Documents
                          </div>
                        </Link>
                        <Link to='/pages/user/followers'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/user/followers")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Followers
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Account */}
                  <li className='flex flex-col'>
                    <div
                      className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("account")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.account ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={12}
                          className='text-muted-foreground'
                        />
                      </span>
                      <IdCard className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                      <span>Account</span>
                    </div>
                    {openSections.account && (
                      <div className='pl-6 py-0.5'>
                        <Link to='/pages/account/overview'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/account/overview")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Overview
                          </div>
                        </Link>
                        <Link to='/pages/account/projects'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/account/projects")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Projects
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Corporate */}
                  <li className='flex flex-col'>
                    <div
                      className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("corporate")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.corporate ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={12}
                          className='text-muted-foreground'
                        />
                      </span>
                      <User className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                      <span>Corporate</span>
                    </div>
                    {openSections.corporate && (
                      <div className='pl-6 py-0.5'>
                        <Link to='/pages/corporate/team'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/corporate/team")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Team
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Blog */}
                  <li className='flex flex-col'>
                    <div
                      className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("blog")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.blog ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={12}
                          className='text-muted-foreground'
                        />
                      </span>
                      <Newspaper className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                      <span>Blog</span>
                    </div>
                    {openSections.blog && (
                      <div className='pl-6 py-0.5'>
                        <Link to='/pages/blog/posts'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/blog/posts")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Posts
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Social */}
                  <li className='flex flex-col'>
                    <div
                      className='flex items-center px-2 py-0.5 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("social")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.social ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={12}
                          className='text-muted-foreground'
                        />
                      </span>
                      <MessageCircle className='w-5 h-5 mr-1 sm:w-2 sm:h-2' />
                      <span>Social</span>
                    </div>
                    {openSections.social && (
                      <div className='pl-6 py-0.5'>
                        <Link to='/pages/social/feed'>
                          <div
                            className={`px-1 py-0.5 rounded-[2px] cursor-pointer ${
                              isActive("/pages/social/feed")
                                ? "border-l-2 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Feed
                          </div>
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default LeftSideBar;
