export interface Hamburger {
    _id: string;
    name: string;
    ingredients: string;
    prices: {
      Singel: number;
      Double: number;
    };
    created: Date;
  }
  
  export interface Side {
    _id: string;
    name: string;
    prices: {
      small: number;
      big: number;
    };
    created: Date;
  }
  
  export interface Dipp {
    _id: string;
    name: string;
    price: number;
    created: Date;
  }
  
  export interface Menu {
    meals: Hamburger[];
    sides: Side[];
    dipps: Dipp[];
  }