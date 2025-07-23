import React from "react";
import Sidebar from "./Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Bug, WifiOff, UserPlus, X } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const RightSideBar = ({
  rightSidebarOpen,
  isLoading,
  setRightSidebarOpen,
  mode,
}) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full z-30 max-w-[100px] sm:max-w-[200px] ${
        rightSidebarOpen ? "block" : "hidden"
      } space-y-2`}
    >
      <Sidebar isOpen={rightSidebarOpen} position='right' mode={mode}>
        <div className='p-4 overflow-y-auto max-h-full pr-1 text-sm sm:text-xs'>
          {/* Notifications */}
          <section className='py-2'>
            <div className='flex items-center justify-between mb-2'>
              <p className='font-semibold text-xs text-black dark:text-white mb-2 sm:mb-1'>
                Notifications
              </p>
              <div className='flex items-center justify-end'>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button
                    onClick={() => setRightSidebarOpen(false)}
                    className='cursor-pointer w-8 h-8 sm:w-6 sm:h-6'
                    variant='ghost'
                    aria-label='Close sidebar'
                  >
                    <X className='w-5 h-5 sm:w-4 sm:h-4' />
                  </Button>
                </motion.div>
              </div>
            </div>

            {isLoading ? (
              <div className='space-y-2 sm:space-y-1 bg-primary dark:bg-card-grey p-2 rounded-lg'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='flex items-start gap-2 sm:gap-1'>
                    <Skeleton className='w-7 h-7 rounded-full sm:w-5 sm:h-5' />
                    <div className='space-y-1 sm:space-y-0.5'>
                      <Skeleton className='h-3 w-full sm:h-2' />
                      <Skeleton className='h-2 w-[60px] sm:h-1.5 sm:w-[40px]' />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className='space-y-2 text-xs sm:text-[10px] mb-4 text-muted-foreground'>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-lg bg-bug w-8 h-8 sm:w-6 sm:h-6'>
                    <Bug className='w-4 h-4 sm:w-3 sm:h-3 text-black-500' />
                  </div>
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      You have a bug that needs fixing...
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      Just now
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-lg bg-user w-8 h-8 sm:w-6 sm:h-6'>
                    <UserPlus className='w-4 h-4 sm:w-3 sm:h-3 text-black-500' />
                  </div>
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      New user registered
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      59 minutes ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-lg bg-bug w-8 h-8 sm:w-6 sm:h-6'>
                    <Bug className='w-4 h-4 sm:w-3 sm:h-3 text-black-500' />
                  </div>
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      You have a bug that needs fixing...
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      12 hours ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-lg bg-user w-8 h-8 sm:w-6 sm:h-6'>
                    <WifiOff className='w-4 h-4 sm:w-3 sm:h-3 text-gray-500' />
                  </div>
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      Andi Lane subscribed to you
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      Today, 11:59 AM
                    </p>
                  </div>
                </li>
              </ul>
            )}
          </section>

          {/* Activities */}
          <section>
            <p className='font-semibold text-xs text-black dark:text-white mb-2'>
              Activities
            </p>

            {isLoading ? (
              <div className='space-y-2 sm:space-y-1'>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='flex items-start gap-2 sm:gap-1'>
                    <Skeleton className='h-6 w-6 rounded-full sm:h-4 sm:w-4' />
                    <div className='space-y-1 sm:space-y-0.5'>
                      <Skeleton className='h-3 w-[100px] sm:h-2 sm:w-[60px]' />
                      <Skeleton className='h-2 w-[40px] sm:h-1.5 sm:w-[30px]' />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className='space-y-2 text-xs sm:text-[10px] text-muted-foreground mb-4'>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/10.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      You have a bug that needs fixing...
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      Just now
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/11.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      Released a new version
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      59 minutes ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/women/15.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      Submitted a bug
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      12 hours ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/16.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      Modified A data in Page X
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      Today, 11:59 AM
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/women/18.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='text-black dark:text-white line-clamp-1'>
                      Deleted a page in Project X
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 sm:text-[8px]'>
                      Feb 2, 2023
                    </p>
                  </div>
                </li>
              </ul>
            )}
          </section>

          {/* Contacts */}
          <section>
            <h3 className='font-semibold text-sm text-black dark:text-white mb-2'>
              Contacts
            </h3>

            {isLoading ? (
              <ul className='space-y-2 sm:space-y-1'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='flex items-center gap-2 sm:gap-1'>
                    <Skeleton className='h-7 w-7 rounded-full sm:h-5 sm:w-5' />
                    <Skeleton className='h-3 w-[60px] sm:h-2 sm:w-[40px]' />
                  </div>
                ))}
              </ul>
            ) : (
              <ul className='space-y-2 text-xs sm:text-[10px] text-muted-foreground'>
                {[
                  { name: "Natali Craig", img: "women/31" },
                  { name: "Drew Cano", img: "men/33" },
                  { name: "Orlando Diggs", img: "men/34" },
                  { name: "Andi Lane", img: "women/35" },
                  { name: "Kate Morrison", img: "women/36" },
                  { name: "Koray Okumus", img: "men/37" },
                ].map(({ name, img }, i) => (
                  <li
                    key={i}
                    className='flex cursor-pointer items-center gap-2 sm:gap-1 p-1 sm:p-0.5 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${img}.jpg`}
                      alt={name}
                      className='w-6 h-6 rounded-full'
                    />
                    <span className='text-black dark:text-white line-clamp-1 text-xs sm:text-[10px]'>
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </Sidebar>
    </div>
  );
};

export default RightSideBar;
