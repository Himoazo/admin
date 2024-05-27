export interface Side {
    name: string;
    prices:{
        small: number;
        big: number;
    };
    created?: Date;
}
