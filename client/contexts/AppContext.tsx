import { createContext, useState, useEffect, useCallback } from "react";
import {
  Addon,
  AddonCategory,
  Location,
  MenuCategory,
  Menu,
  AddonAddonCat,
  MenusAddonCat,
  MenusMenuCat,
} from "../typings/types";
import axios from "axios";
import { getAccessToken } from "@/libs/getAccessToken";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  accessToken: string;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  accessToken: "",
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = ({ children }: any) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/getAllData`;

  const [data, updateData] = useState(defaultContext);

  // console.log("data is", data);

  const fetchData = async () => {
    await axios
      .get(url)
      .then((res) => {
        const { menuCategories, addons, addonCategories, locations } = res.data;
        updateData({
          ...data,
          menuCategories,
          addons,
          addonCategories,
          locations,
        });
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  // const getMenusByLocationId = async (id: string) => {
  //   await axios
  //     .get(`/api/menusPost?id=${id}`)
  //     .then((res) => {
  //       const { menus } = res.data;
  //       updateData({ ...data, menus });
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // };

  // useEffect(() => {
  //   console.log("location id effect");
  //   const locationId = localStorage.getItem("locationId");
  //   if (!locationId) {
  //     localStorage.setItem("locationId", String(1));
  //     return;
  //   } else {
  //     getMenusByLocationId(locationId);
  //   }
  // }, []);

  // const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   if (accessToken) {
  //     fetchData();
  //   }
  // }, [accessToken]);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) fetchData();
  }, [accessToken]);

  // const fetchData = async () => {
  //   const response = await fetch(url);
  //   const responseJson = await response.json();
  //   const { menus, menuCategories, addons, addonCategories } = responseJson;
  //   updateData({
  //     ...data,
  //     menus,
  //     menuCategories,
  //     addons,
  //     addonCategories,
  //   });
  // };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
