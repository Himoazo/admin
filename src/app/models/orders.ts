export interface Orders {
    customer: {
        name: string;
        email: string;
      };
      items: {
        menuItem: string;
        itemName: string;
        itemType: 'meal' | 'side' | 'dipp';
        quantity: number;
        price: number;
      }[];
      total: number;
      status: 'pending' | 'in progress' | 'ready' | 'completed';
      createdAt?: Date; 
      updatedAt?: Date;
}
