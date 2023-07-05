// import {
//   Box,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   InputBase,
//   Button,
//   List,
//   ListItemAvatar,
//   ListItemText,
//   Divider,
//   ListItemButton,
//   Menu,
//   MenuItem,
//   Dialog,
//   TextField,
//   Grid,
//   CardContent,
//   Avatar,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { filterByCategory, getAllCategorys } from "../../../redux/actions";

// const FilterAndSort = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { allCategorys, categoryFilter } = useSelector((state) => state);
//   const [filterCategory, setFilterCategory] = useState("");

//   useEffect(() => {
//     dispatch(getAllCategorys());
//   }, [dispatch]);

//   const handlerByCategory = (event) => {
//     dispatch(filterByCategory(event.target.value));
//     setFilterCategory(event.target.value);
//     navigate("/filtros");
//   };

//   return (
//     <div>
//       <Box sx={{ flexGrow: 1, backgroundColor: "#f44336"}}>
//         <Box sx={{ margin: "10px 20px" }}>
//         <label>Categorias</label>
//         <select
//           name="categorys"
//           value={filterCategory}
//           onChange={(event) => handlerByCategory(event)}
//         >
//           <option value="">All</option>
//           {allCategorys?.map((cat) => {
//             return (
//               <option value={cat.name} key={cat.id}>
//                 {cat.name}
//               </option>
//             );
//           })}
//         </select>

//         </Box>

//         {/* <InputLabel>Categorias</InputLabel>
//         <Select
//         value={filterCategory}
//         onChange={(event) => handlerByCategory(event)}
//         name="categorys"
//         label="Categorias"
//         >
//         <MenuItem value="">All</MenuItem>
//         {allCategorys.map((cat) => (
//           <MenuItem value={cat.name} key={cat.id}>
//           {cat.name}
//           </MenuItem>
//           ))}
//         </Select> */}
//       </Box>
//     </div>
//   );
// };

// export default FilterAndSort;

import { Button } from "@mui/base";
import { Box, Typography, MenuItem, Menu } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterByCategory, filterByDate, getAllCategorys } from "../../../redux/actions";

const FilterAndSort = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategorys, categoryFilter, dateFilter } = useSelector((state) => state);
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

  const handleClick = (date) => {
    dispatch(filterByDate(date))
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f44336" }}>
      <Typography
        variant="h6"
        component="label"
        sx={{ marginBottom: "8px", cursor: "pointer", marginLeft: "20px"  }}
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
      
        {allCategorys?.map((cat) => (
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
        sx={{ marginBottom: "8px", cursor: "pointer", marginLeft: "40px"  }}
        onClick={handleClick}
      >
        Novedades
      </Typography>
    </Box>
  );
};

export default FilterAndSort;
