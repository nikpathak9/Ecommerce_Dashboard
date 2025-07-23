import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../context/ThemeContext";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";

const statuses = [
  { value: "all", label: "All" },
  { value: "in_progress", label: "In Progress" },
  { value: "complete", label: "Complete" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const getRandomStatus = () => {
  const orderStatuses = statuses.filter((status) => status.value !== "all");
  return orderStatuses[Math.floor(Math.random() * orderStatuses.length)].value;
};

const users = [
  { name: "Natali Craig", gender: "women", id: 31 },
  { name: "Kate Morrison", gender: "women", id: 36 },
  { name: "Drew Cano", gender: "men", id: 33 },
  { name: "Orlando Diggs", gender: "men", id: 34 },
  { name: "Andi Lane", gender: "women", id: 35 },
  { name: "Koray Okumus", gender: "men", id: 37 },
  { name: "Alex Morgan", gender: "men", id: 42 },
  { name: "Taylor Swift", gender: "women", id: 45 },
  { name: "Jamie Lee", gender: "women", id: 48 },
  { name: "Chris Evans", gender: "men", id: 51 },
];

const getRandomUser = () => {
  return users[Math.floor(Math.random() * users.length)];
};

const generateRandomOrders = (count) => {
  return Array(count)
    .fill()
    .map((_, i) => {
      const user = getRandomUser();
      return {
        id: `CM${9806 + i}`,
        user: user.name,
        userImage: `https://randomuser.me/api/portraits/${user.gender}/${user.id}.jpg`,
        project: [
          "Landing Page",
          "CRM Admin",
          "Client Project",
          "Admin Dashboard",
          "Mobile App",
          "E-commerce Site",
        ][Math.floor(Math.random() * 6)],
        address: [
          "Meadow Lane Oakland",
          "Larry San Francisco",
          "Bogwell Avenue Ocala",
          "Washburn Baton Rouge",
          "Nest Lane Olivette",
          "Park Avenue New York",
          "Main Street Boston",
        ][Math.floor(Math.random() * 7)],
        date: [
          "Just now",
          "A minute ago",
          "1 hour ago",
          "Yesterday",
          "Feb 2, 2023",
          "Jan 15, 2023",
          "Dec 24, 2022",
        ][Math.floor(Math.random() * 7)],
        status: getRandomStatus(),
      };
    });
};

const OrderList = ({ leftSidebarOpen, rightSidebarOpen, isZoomed }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const itemsPerPage = 10;
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders([
        {
          id: "CM9801",
          user: "Natali Craig",
          userImage: "https://randomuser.me/api/portraits/women/31.jpg",
          project: "Landing Page",
          address: "Meadow Lane Oakland",
          date: "Just now",
          status: "in_progress",
        },
        {
          id: "CM9802",
          user: "Kate Morrison",
          userImage: "https://randomuser.me/api/portraits/women/36.jpg",
          project: "CRM Admin pages",
          address: "Larry San Francisco",
          date: "A minute ago",
          status: "complete",
        },
        {
          id: "CM9803",
          user: "Drew Cano",
          userImage: "https://randomuser.me/api/portraits/men/33.jpg",
          project: "Client Project",
          address: "Bogwell Avenue Ocala",
          date: "1 hour ago",
          status: "pending",
        },
        {
          id: "CM9804",
          user: "Orlando Diggs",
          userImage: "https://randomuser.me/api/portraits/men/34.jpg",
          project: "Admin Dashboard",
          address: "Washburn Baton Rouge",
          date: "Yesterday",
          status: "approved",
        },
        {
          id: "CM9805",
          user: "Andi Lane",
          userImage: "https://randomuser.me/api/portraits/women/35.jpg",
          project: "App Landing Page",
          address: "Nest Lane Olivette",
          date: "Feb 2, 2023",
          status: "rejected",
        },
        ...generateRandomOrders(25),
      ]);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders];

  if (sortOption === "newest") {
    sortedOrders.sort((a, b) => b.id.localeCompare(a.id));
  } else if (sortOption === "oldest") {
    sortedOrders.sort((a, b) => a.id.localeCompare(b.id));
  } else if (sortOption === "status") {
    sortedOrders.sort((a, b) => a.status.localeCompare(b.status));
  }

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "in_progress":
        return (
          <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
            In Progress
          </Badge>
        );
      case "complete":
        return (
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            Complete
          </Badge>
        );
      case "pending":
        return (
          <Badge variant='secondary' className='bg-yellow-100 text-yellow-800'>
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant='secondary' className='bg-red-100 text-red-800'>
            Rejected
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className='p-6 space-y-6'>
        <Skeleton className='h-8 w-1/4 rounded' />
        <Skeleton className='h-12 w-full rounded' />
        <div className='space-y-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='h-10 w-full rounded' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6 overflow-y-auto'>
      <h1 className='text-2xl font-bold'>Order List</h1>

      <Card className='w-full h-full flex-grow shadow-none border-none bg-transparent'>
        <CardHeader className='rounded-xl bg-white dark:bg-card-grey p-4 sm:p-6 shadow-sm border border-border dark:border-muted'>
          <div className='flex flex-col lg:flex-row gap-4 lg:items-center justify-between w-full'>
            {/* Left Controls */}
            <div className='flex flex-col justify-center sm:flex-row flex-wrap gap-2 w-full lg:w-auto items-stretch'>
              {/* Sort Dropdown */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='w-full sm:w-auto'
              >
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className='w-full bg-user dark:bg-primary-dark text-sm border-none shadow-none'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent className='w-full'>
                    <SelectItem value='all'>All</SelectItem>
                    <SelectItem value='newest'>Newest</SelectItem>
                    <SelectItem value='oldest'>Oldest</SelectItem>
                    <SelectItem value='status'>Status</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Filter Dropdown */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='w-full sm:w-auto'
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full bg-user dark:bg-primary-dark flex gap-2 text-sm shadow-none border-none'
                    >
                      <SlidersHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56 max-md:w-36'>
                    {statuses.map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status.value}
                        checked={statusFilter === status.value}
                        onCheckedChange={() => setStatusFilter(status.value)}
                      >
                        {status.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>

              {/* Add New Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='w-full sm:w-auto'
              >
                <Button
                  className={`w-full flex gap-2 text-sm ${
                    theme === "dark"
                      ? "bg-primary-dark text-white hover:text-black"
                      : "bg-user text-black"
                  }`}
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </motion.div>
            </div>

            {/* Search */}
            <div className='relative w-full sm:w-auto lg:min-w-[200px]'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search orders...'
                className='pl-10 w-full text-sm'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className='p-0'>
          <Table className='text-[14px] border-collapse w-full'>
            <TableHeader>
              <TableRow className='border-b border-[#1C1C1C66] dark:border-gray-600'>
                <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                  Order ID
                </TableHead>
                <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                  User
                </TableHead>
                <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                  Project
                </TableHead>
                <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                  Address
                </TableHead>
                <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                  Date
                </TableHead>
                <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={`text-xs`}>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <TableRow
                    key={`${order.id}-${index}`}
                    className='text-xs lg:text-sm'
                  >
                    <TableCell className='p-4'>{order.id}</TableCell>
                    <TableCell className='p-4'>
                      <div className='flex items-center gap-2'>
                        <img
                          src={order.userImage}
                          alt={order.user}
                          className='w-4 h-4 sm:w-6 sm:h-6 rounded-full object-cover'
                        />
                        <span>{order.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className='p-4'>{order.project}</TableCell>
                    <TableCell className='p-4'>{order.address}</TableCell>
                    <TableCell className='p-4'>{order.date}</TableCell>
                    <TableCell className='text-right p-4 flex justify-end'>
                      {getStatusBadge(order.status)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='h-24 text-center'>
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className='flex items-center justify-between p-4 border-t'>
            <div className='text-xs sm:text-sm text-muted-foreground'>
              Showing{" "}
              <strong>
                {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, sortedOrders.length)}
              </strong>{" "}
              of <strong>{sortedOrders.length}</strong> orders
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;
