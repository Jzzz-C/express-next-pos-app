interface CategoryName {
  categoryName: string;
}

interface IdAndName {
  id: number;
  name: string;
}

export interface Menu {
  id: number;
  menu_name: string;
  location_name: string;
  available: boolean;
  price: number;
  url: string;
}

export interface MenuCategory {
  id: number;
  category_name: string;
}

export interface Addon {
  addon_name: string;
  price: number;
}

export interface AddonCategory extends CategoryName {
  isRequired: boolean;
}

export interface Location extends IdAndName {}
