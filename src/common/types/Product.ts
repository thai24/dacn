import IBrand from "./brand";
import ICaterory from "./caterory";

interface IProduct {
  id: number;
  caterory: ICaterory;
  brand: IBrand;
  name: string;
  price: number;
  description?: string;
  image:string[]
  size: size[];
  color: color[];

  sold?: number;
  quantity: number;
  nComment?: number;
}

interface size {
  id: number;
  name: string;
}
interface color {
  id: number;
  name: string;
}

export default IProduct;
