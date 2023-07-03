import { Paper, Button } from "@mui/material";

function Item({ item }) {
  return (
    <Paper>
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "100%", height: "75vh" }}
      />
      <div
        className="description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>{item.title}</h2>
      </div>
    </Paper>
  );
}

export default Item;
