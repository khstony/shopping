export interface Cart {
  Id: number;
  ownerId : number;
  offerId : number;
  quantity : number;


  stock : number;
  productName : string;
  productPrice: number;
  discountRate: number;
  productImage : string;  
}