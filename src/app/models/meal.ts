export interface Meal {
    name: string;
    ingredients: string;
    prices: {
      Singel: number;
      Double: number;
    };
    created?: Date;
}


