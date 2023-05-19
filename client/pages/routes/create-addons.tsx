import Layout from "@/components/Layout";
import { Box, TextField, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";

const CreateAddons = () => {
  const [count, setCount] = useState<Number[]>([]);
  const [addonCatName, setAddonCatName] = useState("");

  const addons = () => {
    for (let i = 0; i < count?.length; i++) {
      return (
        <Box>
          <Box>{i}</Box>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              id="standard-basic"
              label="Addon Name"
              variant="standard"
              sx={{ mb: 1, mr: 3 }}
              color="primary"
              focused
              onChange={(e) => setAddonCatName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Price"
              variant="standard"
              type="number"
              sx={{ mb: 1 }}
              color="primary"
              focused
              onChange={(e) => setAddonCatName(e.target.value)}
            />
          </Box>
        </Box>
      );
    }
  };

  return (
    <Layout>
      <Box>
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
            onChange={(e) => setAddonCatName(e.target.value)}
          />

          {addons()}

          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              m: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddCircleIcon color="primary" />
          </Button>

          <Button variant="outlined">Create Addons</Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateAddons;
