import { Box, Typography, MenuItem, Menu } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterByCategory,
  filterByDate,
  getAllCategorys,
} from "../../../redux/actions";

const FilterAndSort = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategorys, categoryFilter, dateFilter } = useSelector(
    (state) => state
  );
  const [filterCategory, setFilterCategory] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getAllCategorys());
  }, [dispatch]);

  const handlerByCategory = (event) => {
    dispatch(filterByCategory(event.target.value));
    setFilterCategory(event.target.value);
    navigate("/filtros");
    setAnchorEl(null);
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    dispatch(filterByDate());
    navigate("/novedades");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("date", dateFilter);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#222222",
        color: "#fff",
        padding: 2,
      }}
    >
      <Typography
        variant="h6"
        component="label"
        sx={{ marginBottom: "8px", cursor: "pointer", marginLeft: "20px" }}
        onMouseEnter={handleMouseEnter}
      >
        Categorías
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
      >
        {[...allCategorys].map((cat) => (
          <MenuItem
            value={cat.name}
            key={cat.id}
            onClick={() => handlerByCategory({ target: { value: cat.name } })}
          >
            {cat.name}
          </MenuItem>
        ))}
      </Menu>
      <Typography
        variant="h6"
        fontSize="18px"
        component="label"
        sx={{ marginBottom: "8px", cursor: "pointer", marginLeft: "40px" }}
        onClick={handleClick}
      >
        Novedades
      </Typography>
    </Box>
  );
};

export default FilterAndSort;
