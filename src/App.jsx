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

// Fallback for unknown routes
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

// Detect actual mobile device (based on userAgent)
const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const App = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("favourites");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Detect actual mobile device once
  useEffect(() => {
    setIsMobileView(isMobileDevice());
  }, []);

  // Detect zoom level or small screen
  useEffect(() => {
    const detectZoomOrSize = () => {
      setIsZoomed(window.devicePixelRatio !== 1 || window.innerWidth <= 1024);
    };

    detectZoomOrSize(); // initial check
    window.addEventListener("resize", detectZoomOrSize);
    return () => window.removeEventListener("resize", detectZoomOrSize);
  }, []);

  // Ensure sidebars are open by default unless on small screen
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    setLeftSidebarOpen(isDesktop);
    setRightSidebarOpen(isDesktop);
  }, []);

  // Disable body scroll when sidebar(s) are open
  useEffect(() => {
    document.body.style.overflow =
      leftSidebarOpen || rightSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [leftSidebarOpen, rightSidebarOpen]);

  // Handle background click to close sidebars on small screens
  const handleMainClick = (e) => {
    if (e.target.closest("nav")) return;
    if (window.innerWidth < 1200) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  };

  // Determine sidebar layout type
  const sidebarMode = isMobileView ? "overlay" : "push";

  return (
    <div className='relative h-screen w-screen overflow-hidden bg-white dark:bg-primary-dark'>
      {/* Left Sidebar */}
      <LeftSideBar
        mode={sidebarMode}
        leftSidebarOpen={leftSidebarOpen}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setLeftSidebarOpen={setLeftSidebarOpen}
      />

      {/* Main area + Navbar */}
      <div
        className='flex flex-col h-full transition-all duration-300'
        style={{
          marginLeft:
            sidebarMode === "push" && leftSidebarOpen ? "200px" : "0px",
          marginRight:
            sidebarMode === "push" && rightSidebarOpen ? "200px" : "0px",
        }}
      >
        <div className='sticky top-0 z-20'>
          <Navbar
            leftSidebarOpen={leftSidebarOpen}
            rightSidebarOpen={rightSidebarOpen}
            setLeftSidebarOpen={setLeftSidebarOpen}
            setRightSidebarOpen={setRightSidebarOpen}
            isZoomed={isZoomed}
          />
        </div>

        <div className='flex-1 overflow-y-auto' onClick={handleMainClick}>
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
            <Route
              path='/dashboard/ecommorce/orders'
              element={
                <OrderList
                  leftSidebarOpen={leftSidebarOpen}
                  rightSidebarOpen={rightSidebarOpen}
                  isZoomed={isZoomed}
                />
              }
            />
            <Route path='*' element={<FallbackPage />} />
          </Routes>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSideBar
        mode={sidebarMode}
        rightSidebarOpen={rightSidebarOpen}
        isLoading={isLoading}
        setRightSidebarOpen={setRightSidebarOpen}
      />
    </div>
  );
};

export default App;
