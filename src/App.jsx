import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LeftSideBar from "./components/pageComponents/LeftSideBar";
import RightSideBar from "./components/pageComponents/RightSideBar";
import MainPage from "./components/pageComponents/MainPage";
import Navbar from "./components/pageComponents/Navbar";
import OrderList from "./components/pageComponents/OrderList";
import { Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

const FallbackPage = () => (
  <div className='flex flex-col items-center justify-center h-full gap-6 p-4'>
    <Card className='w-full max-w-md bg-transparent shadow-none border-none'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl'>Page Coming Soon</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-4'>
        <div className='flex items-center justify-center p-4'>
          <Hourglass className='w-12 h-12 text-gray-500 animate-spin' />
        </div>
        <p className='text-muted-foreground text-center'>
          Please check back later or contact support for more information.
        </p>
        <Button variant='outline' onClick={() => window.history.back()}>
          Go Back
        </Button>
      </CardContent>
    </Card>
  </div>
);

const App = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("favourites");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    setLeftSidebarOpen(isDesktop);
    setRightSidebarOpen(isDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      leftSidebarOpen || rightSidebarOpen ? "hidden" : "auto";
  }, [leftSidebarOpen, rightSidebarOpen]);

  const handleMainClick = (e) => {
    if (e.target.closest("nav")) return;
    if (window.innerWidth < 1200) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  };

  return (
    <div className='relative flex h-screen w-screen overflow-hidden bg-white dark:bg-primary-dark'>
      <LeftSideBar
        leftSidebarOpen={leftSidebarOpen}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setLeftSidebarOpen={setLeftSidebarOpen}
      />

      <div
        className='flex-1 flex flex-col h-full overflow-hidden'
        onClick={handleMainClick}
      >
        <Navbar
          leftSidebarOpen={leftSidebarOpen}
          rightSidebarOpen={rightSidebarOpen}
          setLeftSidebarOpen={setLeftSidebarOpen}
          setRightSidebarOpen={setRightSidebarOpen}
        />

        <Routes>
          <Route
            path='/'
            element={
              <MainPage
                leftSidebarOpen={leftSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setLeftSidebarOpen={setLeftSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            }
          />
          <Route path='/dashboard/default' element={<MainPage />} />
          <Route path='/dashboard/ecommorce/orders' element={<OrderList />} />

          {/* Fallbacks for Sidebar Routes */}
          <Route path='*' element={<FallbackPage />} />
        </Routes>
      </div>

      <RightSideBar
        rightSidebarOpen={rightSidebarOpen}
        isLoading={isLoading}
        setRightSidebarOpen={setRightSidebarOpen}
      />
    </div>
  );
};

export default App;
