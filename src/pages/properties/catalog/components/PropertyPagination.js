import React from "react";
import { Box, Pagination } from "@mui/material";

const PropertyPagination = ({ count = 1, page = 1, onChange }) => {
  if (count <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "13px",
            fontWeight: 700,
            borderRadius: "8px",
            color: "#64748B",
            "&.Mui-selected": {
              bgcolor: "#017E53",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "#016744" },
            },
          },
        }}
      />
    </Box>
  );
};

export default PropertyPagination;