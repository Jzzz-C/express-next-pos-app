import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "../../components/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import MenuCatSelect from "../../components/MenuCatSelect";

export default function MenuCategories() {
  const { fetchData, menuCategories } = useContext(AppContext);

  const [name, setname] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/menuCategories`;

  const handleSubmit = async () => {
    if (!name) return console.log("This is empty...");

    const res = await axios.post(url, {
      name,
    });

    setname("");
    fetchData();
  };

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
          marginY: 15,
        }}
      >
        <TextField
          id="standard-basic"
          label="Menu Category Name"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          value={name}
          focused
          onChange={(e) => setname(e.target.value)}
        />
        <Button onClick={handleSubmit} variant="outlined">
          Create Menu Category
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <MenuCatSelect />
      </Box>
    </Layout>
  );
}
