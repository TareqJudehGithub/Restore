import type { Pagination as PaginationType } from "../../models/pagination";
import { useAppDispatch } from "../../store/store";
import { setPageNumber } from "../../features/catalog/catalogSlice";

import { Box, Pagination, Typography, IconButton } from "@mui/material";
import { FirstPage, LastPage } from "@mui/icons-material";

export default function AppPagination({
	metaData,
	onPageChange,
}: AppPaginationProps) {
	const dispatch = useAppDispatch();
	const { currentPage, totalPages, pageSize, totalCount } = metaData;

	const startItem = (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalCount);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				marginTop: 3,
			}}
		>
			<Typography>
				Displaying {startItem} - {endItem} of {totalCount} items
			</Typography>

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					px: 0,
					mx: 0,
				}}
			>
				<IconButton size="medium" onClick={() => dispatch(setPageNumber(1))}>
					<FirstPage />
				</IconButton>
				<Pagination
					color="secondary"
					size="large"
					count={totalPages}
					page={currentPage}
					onChange={(_, page) => onPageChange(page)}
				/>
				<IconButton
					size="medium"
					onClick={() => dispatch(setPageNumber(totalPages))}
				>
					<LastPage />
				</IconButton>
			</Box>
		</Box>
	);
}

type AppPaginationProps = {
	metaData: PaginationType;
	onPageChange: (page: number) => void;
};
