import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { setCurrentPage } from "@/lib/redux/features/users/userSlice";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationSectionProps {
	nbPages: number;
}

function PaginationSection({ nbPages }: PaginationSectionProps) {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector((state: any) => state.user.page);

	const handlePreviousClick = () => {
		if (currentPage > 1) {
			dispatch(setCurrentPage(currentPage - 1));
		}
	};

	const handleNextClick = () => {
		if (currentPage < nbPages) {
			dispatch(setCurrentPage(currentPage + 1));
		}
	};
	return (
<Pagination className="mt-4 rounded-full">
 <PaginationContent>
  <PaginationItem className="cursor-pointer">
   <PaginationPrevious onClick={handlePreviousClick} />
  </PaginationItem>
  <PaginationItem>
   <PaginationLink
    className="h3-semibold font-robotoSlab
    dark:text-veryBlack
    inline-flex items-center
    px-6 py-1
    border border-transparent
    bg-lime-500"
   >
    {currentPage}/{nbPages}
   </PaginationLink>
  </PaginationItem>
  <PaginationItem className="cursor-pointer">
   <PaginationNext onClick={handleNextClick} />
  </PaginationItem>
 </PaginationContent>
</Pagination>
	);
}

export default PaginationSection;
