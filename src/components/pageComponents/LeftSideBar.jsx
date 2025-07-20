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

const LeftSideBar = ({
  leftSidebarOpen,
  isLoading,
  activeTab,
  setActiveTab,
  setLeftSidebarOpen,
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
    <div className={`fixed lg:relative z-1000`}>
      <Sidebar isOpen={leftSidebarOpen} position='left'>
        <div className='space-y-2 p-2 overflow-y-auto max-h-full pr-1'>
          <div className='flex justify-end'>
            <Button
              onClick={() => setLeftSidebarOpen(false)}
              className='p-1 rounded-full hover:bg-primary dark:hover:bg-card-grey lg:hidden'
              variant='ghost'
              aria-label='Close sidebar'
            >
              <X className='w-5 h-5' />
            </Button>
          </div>

          {isLoading ? (
            <div className='space-y-6 p-4'>
              <div className='space-y-6'>
                <div className='flex items-center gap-2 mb-6'>
                  <Skeleton className='w-8 h-8 rounded-full' />
                  <Skeleton className='h-4 w-[80px]' />
                </div>
                <div className='flex gap-2'>
                  <Skeleton className='h-6 w-[80px] rounded-md' />
                  <Skeleton className='h-6 w-[80px] rounded-md' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[100px]' />
                  <Skeleton className='h-4 w-[100px]' />
                </div>
                <div>
                  <Skeleton className='h-3 w-[80px] mb-2' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                  </div>
                </div>
                <div>
                  <Skeleton className='h-3 w-[80px] mb-2' />
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[150px]' />
                    <Skeleton className='h-4 w-[100px]' />
                    <Skeleton className='h-4 w-[100px]' />
                    <Skeleton className='h-4 w-[100px]' />
                    <Skeleton className='h-4 w-[100px]' />
                    <Skeleton className='h-4 w-[100px]' />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='p-2'>
              <div className='flex items-center gap-2 mb-6 cursor-pointer hover:bg-primary dark:hover:bg-card-grey rounded-md p-2'>
                <img
                  src='https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb'
                  className='w-8 h-8 rounded-full'
                  alt='User'
                />
                <p className='font-medium'>ByeWind</p>
              </div>

              <div className='space-y-6'>
                {/* Favorites/Recents Toggle */}
                <div>
                  <div className='flex gap-2'>
                    <Toggle
                      pressed={activeTab === "favourites"}
                      onPressedChange={() => setActiveTab("favourites")}
                      className={`cursor-pointer transition-all px-2 py-0 rounded-none focus-visible:ring-0 font-semibold
                        hover:bg-transparent data-[state=on]:bg-transparent
                        ${
                          activeTab === "favourites"
                            ? "text-base text-black dark:text-white"
                            : "text-sm text-muted-foreground"
                        }`}
                    >
                      Favorites
                    </Toggle>
                    <Toggle
                      pressed={activeTab === "recents"}
                      onPressedChange={() => setActiveTab("recents")}
                      className={`cursor-pointer transition-all px-2 py-0 rounded-none focus-visible:ring-0 font-semibold
                        hover:bg-transparent data-[state=on]:bg-transparent
                        ${
                          activeTab === "recents"
                            ? "text-base text-black dark:text-white"
                            : "text-sm text-muted-foreground"
                        }`}
                    >
                      Recently
                    </Toggle>
                  </div>

                  {/* Toggle Section Content */}
                  {activeTab === "favourites" && (
                    <ul className='mt-2 text-sm text-muted-foreground dark:text-gray-300 pl-2'>
                      <li className='flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-primary dark:hover:bg-card-grey rounded-md'>
                        <span className='text-xl leading-none'>•</span>
                        Overview
                      </li>
                      <li className='flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-primary dark:hover:bg-card-grey rounded-md'>
                        <span className='text-xl leading-none'>•</span>
                        Projects
                      </li>
                    </ul>
                  )}
                  {activeTab === "recents" && (
                    <p className='text-start text-sm text-muted-foreground mt-2 px-4'>
                      No recent items
                    </p>
                  )}
                </div>
              </div>

              <div className='space-y-6 mt-6'>
                <div>
                  <h3 className='text-xs text-muted-foreground uppercase px-1 mb-1 font-semibold'>
                    Dashboards
                  </h3>
                  <ul className='flex flex-col text-sm text-muted-foreground dark:text-gray-300'>
                    <Link to='/dashboard/default'>
                      <li
                        className={`flex items-center px-3 py-1 rounded cursor-pointer
                          ${
                            isActive("/dashboard/default")
                              ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                              : "hover:bg-muted dark:hover:bg-card-grey"
                          }`}
                      >
                        <LayoutDashboard className='w-4 h-4 mr-2' />
                        Default
                      </li>
                    </Link>

                    <li className='flex flex-col'>
                      <div
                        className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                        onClick={() => toggleSection("ecommerce")}
                      >
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSections.ecommerce ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          <ChevronRight
                            size={16}
                            className='text-muted-foreground'
                          />
                        </span>
                        <ShoppingCart className='w-4 h-4 mr-2' />
                        <span>eCommerce</span>
                      </div>
                      {openSections.ecommerce && (
                        <div className='pl-8 py-1'>
                          <Link to='/dashboard/ecommorce/orders'>
                            <div
                              className={`px-2 py-1 rounded cursor-pointer ${
                                isActive("/dashboard/ecommorce/orders")
                                  ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Orders
                            </div>
                          </Link>
                          <Link to='/dashboard/ecommerce/sales'>
                            <div
                              className={`px-2 py-1 rounded cursor-pointer ${
                                isActive("/dashboard/ecommerce/sales")
                                  ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Sales
                            </div>
                          </Link>
                          <Link to='/dashboard/ecommerce/products'>
                            <div
                              className={`px-2 py-1 rounded cursor-pointer ${
                                isActive("/dashboard/ecommerce/products")
                                  ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
                        className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                        onClick={() => toggleSection("projects")}
                      >
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSections.projects ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          <ChevronRight
                            size={16}
                            className='text-muted-foreground'
                          />
                        </span>
                        <Folder className='w-4 h-4 mr-2' />
                        <span>Projects</span>
                      </div>
                      {openSections.projects && (
                        <div className='pl-8 py-1'>
                          <Link to='/dashboard/projects/current'>
                            <div
                              className={`px-2 py-1 rounded cursor-pointer ${
                                isActive("/dashboard/projects/current")
                                  ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                  : "hover:bg-muted dark:hover:bg-card-grey"
                              }`}
                            >
                              Current
                            </div>
                          </Link>
                          <Link to='/dashboard/projects/completed'>
                            <div
                              className={`px-2 py-1 rounded cursor-pointer ${
                                isActive("/dashboard/projects/completed")
                                  ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
                        className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                        onClick={() => toggleSection("courses")}
                      >
                        <span
                          className={`transform transition-transform duration-300 ${
                            openSections.courses ? "rotate-90" : "rotate-0"
                          }`}
                        >
                          <ChevronRight
                            size={16}
                            className='text-muted-foreground'
                          />
                        </span>
                        <BookOpen className='w-4 h-4 mr-2' />
                        <span>Online Courses</span>
                      </div>
                      {openSections.courses && (
                        <div className='pl-8 py-1'>
                          <Link to='/dashboard/courses/my-courses'>
                            <div
                              className={`px-2 py-1 rounded cursor-pointer ${
                                isActive("/dashboard/courses/my-courses")
                                  ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
              <div className='space-y-6 mt-6'>
                <h3 className='text-xs text-muted-foreground uppercase px-1 mb-1 font-semibold'>
                  Pages
                </h3>
                <ul className='flex flex-col text-sm text-muted-foreground dark:text-gray-300'>
                  {/* User Profile */}
                  <li className='flex flex-col'>
                    <div
                      className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("userProfile")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.userProfile ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className='text-muted-foreground'
                        />
                      </span>
                      <User className='w-4 h-4 mr-2' />
                      <span>User Profile</span>
                    </div>
                    {openSections.userProfile && (
                      <div className='pl-8 py-1'>
                        <Link to='/pages/user/overview'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/user/overview")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Overview
                          </div>
                        </Link>
                        <Link to='/pages/user/projects'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/user/projects")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Projects
                          </div>
                        </Link>
                        <Link to='/pages/user/campaigns'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/user/campaigns")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Campaigns
                          </div>
                        </Link>
                        <Link to='/pages/user/documents'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/user/documents")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Documents
                          </div>
                        </Link>
                        <Link to='/pages/user/followers'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/user/followers")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
                      className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("account")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.account ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className='text-muted-foreground'
                        />
                      </span>
                      <IdCard className='w-4 h-4 mr-2' />
                      <span>Account</span>
                    </div>
                    {openSections.account && (
                      <div className='pl-8 py-1'>
                        <Link to='/pages/account/overview'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/account/overview")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
                                : "hover:bg-muted dark:hover:bg-card-grey"
                            }`}
                          >
                            Overview
                          </div>
                        </Link>
                        <Link to='/pages/account/projects'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/account/projects")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
                      className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("corporate")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.corporate ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className='text-muted-foreground'
                        />
                      </span>
                      <User className='w-4 h-4 mr-2' />
                      <span>Corporate</span>
                    </div>
                    {openSections.corporate && (
                      <div className='pl-8 py-1'>
                        <Link to='/pages/corporate/team'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/corporate/team")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
                      className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("blog")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.blog ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className='text-muted-foreground'
                        />
                      </span>
                      <Newspaper className='w-4 h-4 mr-2' />
                      <span>Blog</span>
                    </div>
                    {openSections.blog && (
                      <div className='pl-8 py-1'>
                        <Link to='/pages/blog/posts'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/blog/posts")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
                      className='flex items-center px-3 py-1 hover:text-black dark:hover:text-white cursor-pointer'
                      onClick={() => toggleSection("social")}
                    >
                      <span
                        className={`transform transition-transform duration-300 ${
                          openSections.social ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <ChevronRight
                          size={16}
                          className='text-muted-foreground'
                        />
                      </span>
                      <MessageCircle className='w-4 h-4 mr-2' />
                      <span>Social</span>
                    </div>
                    {openSections.social && (
                      <div className='pl-8 py-1'>
                        <Link to='/pages/social/feed'>
                          <div
                            className={`px-2 py-1 rounded cursor-pointer ${
                              isActive("/pages/social/feed")
                                ? "border-l-4 dark:border-primary border-card-grey bg-muted dark:bg-card-grey text-black dark:text-white"
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
