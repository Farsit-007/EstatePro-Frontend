'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../../button';


const Pagination = ({
  page,
  totalPage,
}: {
  page: number;
  totalPage: number;
}) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const router = useRouter();
  const pathname = usePathname();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`, { scroll: false });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`, { scroll: false });
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 my-8">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-10 h-10 rounded-full flex items-center justify-center border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer text-gray-600" />
      </Button>

      <div className="flex items-center gap-2">
        {[...Array(totalPage)].map((_, index) => (
          <Button
            onClick={() => {
              setCurrentPage(index + 1);
              router.push(`${pathname}?page=${index + 1}`, { scroll: false });
            }}
            key={index}
            variant={currentPage === index + 1 ? 'default' : 'outline'}
            size="sm"
            className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${
                currentPage === index + 1
                  ? 'bg-black hover:bg-gray-700 text-white'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
              } transition-colors font-medium cursor-pointer`}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-10 h-10 rounded-full flex items-center  justify-center border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <ArrowRight className="w-5 h-5 cursor-pointer text-gray-600" />
      </Button>
    </div>
  );
};

export default Pagination;
