interface IdAndName {
  id: number;
  name: string;
}

export interface Menu {
  id: number;
  menu_name: string;
  location_name: string;
  price: number;
  image_url: string;
}

export interface MenuCategory {
  id: number;
  category_name: string;
}

export interface Addon {
  id: number;
  addon_name: string;
  price: number;
}

export interface AddonCategory {
  id: number;
  category_name: string;
  isRequired: boolean;
}

export interface Location extends IdAndName {}
