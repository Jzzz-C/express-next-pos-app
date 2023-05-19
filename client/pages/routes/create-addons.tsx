import Layout from "@/components/Layout";
import { Box, TextField, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";

const CreateAddons = () => {
  const [count, setCount] = useState(0);
  const [addonCatName, setAddonCatName] = useState("");
  const [addonName, setAddonName] = useState<String[]>([]);
  const [addonPrice, setAddonPrice] = useState<Number[]>([]);

  const addonIds = Array.from({ length: count }, (_, index) => index + 1);

  console.log("count: ", count);
  console.log("addonIds: ", addonIds);

  console.log("addon name: ", addonName);
  console.log("addon price: ", addonPrice);

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

          {addonIds &&
            addonIds.map((e, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <TextField
                  id="standard-basic"
                  label="Addon Name"
                  variant="standard"
                  sx={{ mb: 1, mr: 3 }}
                  color="primary"
                  focused
                  onChange={(e) => setAddonName([...addonName, e.target.value])}
                />
                <TextField
                  id="standard-basic"
                  label="Price"
                  variant="standard"
                  type="number"
                  sx={{ mb: 1 }}
                  color="primary"
                  focused
                  onChange={(e) =>
                    setAddonPrice([...addonPrice, Number(e.target.value)])
                  }
                />
              </Box>
            ))}

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
