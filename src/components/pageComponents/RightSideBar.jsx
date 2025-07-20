import React from "react";
import Sidebar from "./Sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Bug, WifiOff, UserPlus, X } from "lucide-react";
import { Button } from "../ui/button";

const RightSideBar = ({ rightSidebarOpen, isLoading, setRightSidebarOpen }) => {
  return (
    <div>
      <Sidebar isOpen={rightSidebarOpen} position='right'>
        <div className='space-y-2 p-2 overflow-y-auto max-h-full pr-1'>
          <div className='flex justify-end'>
            <Button
              onClick={() => setRightSidebarOpen(false)}
              className='p-1 cursor-pointer rounded-full hover:bg-primary dark:hover:bg-card-grey lg:hidden'
              variant='ghost'
              aria-label='Close sidebar'
            >
              <X className='w-5 h-5' />
            </Button>
          </div>

          {/* Notifications */}
          <section>
            <h3 className='font-semibold text-sm text-black dark:text-white mb-3'>
              Notifications
            </h3>

            {isLoading ? (
              <div className='space-y-4'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <Skeleton className='w-7 h-7 rounded-full' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-3 w-[100px]' />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className='space-y-4 text-sm text-muted-foreground'>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-full bg-bug w-14 h-8'>
                    <Bug className='w-4 h-4 text-black-500' />
                  </div>
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      You have a bug that needs fixing...
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      Just now
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-full bg-user w-8 h-8'>
                    <UserPlus className='w-4 h-4 text-black-500' />
                  </div>
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      New user registered
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      59 minutes ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-full bg-bug w-14 h-8'>
                    <Bug className='w-4 h-4 text-black-500' />
                  </div>
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      You have a bug that needs fixing...
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      12 hours ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey  transition-colors duration-200'>
                  <div className='flex items-center justify-center rounded-full bg-user w-12 h-8'>
                    <WifiOff className='w-4 h-4 text-gray-500' />
                  </div>
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      Andi Lane subscribed to you
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      Today, 11:59 AM
                    </p>
                  </div>
                </li>
              </ul>
            )}
          </section>

          {/* Activities */}
          <section>
            <h3 className='font-semibold text-sm text-black dark:text-white mb-3'>
              Activities
            </h3>

            {isLoading ? (
              <div className='space-y-4'>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <Skeleton className='h-6 w-6 rounded-full' />
                    <div className='space-y-1'>
                      <Skeleton className='h-4 w-[160px]' />
                      <Skeleton className='h-3 w-[80px]' />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className='space-y-4 text-sm text-muted-foreground'>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/10.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      You have a bug that needs fixing...
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      Just now
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/11.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      Released a new version
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      59 minutes ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/women/15.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      Submitted a bug
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      12 hours ago
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/men/16.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      Modified A data in Page X
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      Today, 11:59 AM
                    </p>
                  </div>
                </li>
                <li className='flex cursor-pointer items-start gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'>
                  <img
                    src='https://randomuser.me/api/portraits/women/18.jpg'
                    alt=''
                    className='w-6 h-6 rounded-full'
                  />
                  <div>
                    <p className='group-hover:text-black dark:group-hover:text-white'>
                      Deleted a page in Project X
                    </p>
                    <p className='text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'>
                      Feb 2, 2023
                    </p>
                  </div>
                </li>
              </ul>
            )}
          </section>

          {/* Contacts */}
          <section>
            <h3 className='font-semibold text-sm text-black dark:text-white mb-3'>
              Contacts
            </h3>

            {isLoading ? (
              <ul className='space-y-4'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <Skeleton className='h-7 w-7 rounded-full' />
                    <Skeleton className='h-4 w-[100px]' />
                  </div>
                ))}
              </ul>
            ) : (
              <ul className='space-y-2 text-sm text-muted-foreground'>
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
                    className='flex cursor-pointer items-center gap-3 p-2 rounded-lg hover:bg-primary dark:hover:bg-card-grey transition-colors duration-200'
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${img}.jpg`}
                      alt={name}
                      className='w-7 h-7 rounded-full'
                    />
                    <span className='group-hover:text-black dark:group-hover:text-white'>
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
