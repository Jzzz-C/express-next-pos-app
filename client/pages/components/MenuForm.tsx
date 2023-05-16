import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import MultipleSelect from "./MultiSelect";
import AddonSelect from "./AddonSelect";
import FileDropZone from "./FileDropZone";
import LocationsSelect from "./LocationsSelect";

export default function MunuForm() {
  const { menuCategories, addonCategories, addons } = useContext(AppContext);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${apiBaseUrl}/image`;

  const [menuImage, setMenuImage] = useState<File>();
  const [selectedLocationIds, setSelectedLocationIds] = useState<Number[]>();
  const [selectedMenuCatIds, setSelectMenuCatedIds] = useState<Number[]>();
  const [selectedAddonCatIds, setSelectedAddonCatIds] = useState<Number[]>();
  const [selectedAddonIds, setSelectedAddonIds] = useState<Number[]>();

  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    locationIds: [],
    menuCatIds: [],
    addonCatIds: [],
    addon: [],
  });

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setSelectedLocationIds(childStateSelectedLocationIds);
  };

  const menuCatStateChange = (childStateSelectedMenuCatIds: any) => {
    setSelectMenuCatedIds(childStateSelectedMenuCatIds);
  };

  const addonCatStateChange = (childStateSelectedAddonCatIds: any) => {
    setSelectedAddonCatIds(childStateSelectedAddonCatIds);
  };

  const addonStateChange = (childStateSelectedAddonIds: any) => {
    setSelectedAddonIds(childStateSelectedAddonIds);
  };

  const createMenu = async () => {
    try {
      if (menuImage) {
        const formData = new FormData();
        formData.append("files", menuImage as Blob);
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const responseJSON = await response.json();
        console.log(responseJSON.assetUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-3xl px-28 py-7 m-auto mt-12  bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <p className="font-semibold text-xl">Create A New Menu</p>
        <div className="mt-10 space-y-4">
          <div className="max-w-md sm:col-span-4">
            {/* <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location Name
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Ma Ma"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div> */}
            <LocationsSelect onStateChange={locationStateChange} />
          </div>

          <div className="flex justify-normal">
            <div className="max-w-sm space-y-5 mr-14">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Menu Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ah Toke"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0000"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <FileDropZone onFileSelected={onFileSelected} />

              <div className="flex items-center">
                <input
                  disabled
                  checked
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                >
                  Available
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <MultipleSelect
                title="Menu Categories"
                menuAndAddonCategories={menuCategories}
                onStateChange={menuCatStateChange}
              />
              <MultipleSelect
                title="Addon Categories"
                menuAndAddonCategories={addonCategories}
                onStateChange={addonCatStateChange}
              />

              <AddonSelect addons={addons} onStateChange={addonStateChange} />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={createMenu}
            >
              Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
