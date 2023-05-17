import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddonSelect from "../components/AddonSelect";

export default function MenuCategories() {
  const { fetchData, addons } = useContext(AppContext);

  const [name, setname] = useState("");
  const [price, setPrice] = useState<Number>();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/addon`;

  const handleSubmit = async () => {
    if (!name || !price) return console.log("This is empty...");

    const res = await axios.post(url, {
      name,
      price,
    });

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
          label="Addon Name"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          focused
          onChange={(e) => setname(e.target.value)}
        />

        <TextField
          type="number"
          id="standard-basic"
          label="Price"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          focused
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <Button onClick={handleSubmit} variant="outlined">
          Create Addon
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AddonSelect />
      </Box>
    </Layout>
  );
}
