import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "../../components/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import AddonCatSelect from "../../components/AddonCatSelect";

export default function MenuCategories() {
  const { fetchData, addonCategories } = useContext(AppContext);

  const [name, setname] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/addonCategories`;

  const handleSubmit = async () => {
    if (!name) return console.log("This is empty...");

    const res = await axios.post(url, {
      name,
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
          label="Addon Category Name"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          focused
          onChange={(e) => setname(e.target.value)}
        />
        <Button onClick={handleSubmit} variant="outlined">
          Create Addon Category
        </Button>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AddonCatSelect />
      </Box>
    </Layout>
  );
}
