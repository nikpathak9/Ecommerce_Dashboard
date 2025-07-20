import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const salesData = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    quantity: 82,
    amount: "$6,518.18",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    quantity: 37,
    amount: "$4,754.50",
  },
  {
    name: "Half Sleeve Shirt",
    price: "$39.99",
    quantity: 64,
    amount: "$2,559.36",
  },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    quantity: 184,
    amount: "$3,680.00",
  },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
];

const TopSelling = () => {
  return (
    <Card className=' w-full h-full p-4 bg-primary dark:bg-card-grey rounded-[16px] border-none'>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className='text-[14px] border-collapse w-full'>
          <TableHeader>
            <TableRow className='border-b border-[#1C1C1C66] dark:border-gray-600'>
              <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                Name
              </TableHead>
              <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                Price
              </TableHead>
              <TableHead className='text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                Quantity
              </TableHead>
              <TableHead className='text-right text-[#1C1C1C66] dark:text-gray-400 font-semibold py-3'>
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((product, index) => (
              <TableRow key={index} className='border-none'>
                <TableCell className='font-medium py-3'>
                  {product.name}
                </TableCell>
                <TableCell className='py-3'>{product.price}</TableCell>
                <TableCell className='py-3'>{product.quantity}</TableCell>
                <TableCell className='text-right py-3'>
                  {product.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSelling;
