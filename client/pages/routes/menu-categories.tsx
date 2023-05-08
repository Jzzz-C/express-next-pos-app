import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import MultipleSelect from "../components/MultiSelect";

export default function MenuCategories() {
  const { menuCategories, fetchData } = useContext(AppContext);

  const [name, setname] = useState("");

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/menusPost`;

  const handleSubmit = async () => {
    console.log(name);
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
        <MultipleSelect />
      </Box>
    </Layout>
  );
}
