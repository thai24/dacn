import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import IProduct from "../types/Product";
  import { getAllProducts, getOneProducts } from "../../services/products";
  import ICaterory from "../types/caterory";
  import IBrand from "../types/brand";
  import { getAllCaterory } from "../../services/caterory";
  import { getAllBrand } from "../../services/brand";
  import { getAllUsers } from "../../services/user";
  import IUser from "../types/user";
  
  interface TDashboard {
      products:IProduct[],
      caterory:ICaterory[],
      brand:IBrand[],
      users:IUser[]
  }
  
  export const UserContext = createContext<TDashboard>({
      products:[],
      caterory:[],
      brand:[],
      users:[]
  });
  
  interface dashboardProps {
    children: ReactNode;
  }
  const UserProvider: FC<dashboardProps> = ({ children }) => {
      
    const [products, setProducts] = useState<IProduct[]>([]);
    const [caterory,setCaterory] = useState<ICaterory[]>([])
    const [brand,setBrand] = useState<IBrand[]>([])
    const [users,setUsers] = useState<IUser[]>([])
    // all products 
    useEffect(() => {
      (async () => {
        try {
          const response = await getAllProducts();
          if (response.status !== 200) {
            console.log(response);
          }
          setProducts(response.data);
        } catch (error) {
          console.log("error:" + error);
        }
      })();
    }, []);
  
  
  
    //all caterory
    useEffect(() => {
      (async () => {
        try {
          const response = await getAllCaterory();
          if (response.status !== 200) {
            console.log(response);
          }
          setCaterory(response.data);
        } catch (error) {
          console.log("error:" + error);
        }
      })();
    }, []);
  
      //all brand
      useEffect(() => {
          (async () => {
            try {
              const response = await getAllBrand();
              if (response.status !== 200) {
                console.log(response);
              }
              setBrand(response.data);
            } catch (error) {
              console.log("error:" + error);
            }
          })();
      }, []);
  
      // all users
      useEffect(() => {
        (async () => {
          try {
            const response = await getAllUsers();
            if (response.status !== 200) {
              console.log(response);
            }
            setUsers(response.data);
          } catch (error) {
            console.log("error:" + error);
          }
        })();
    }, []);
  
    return (
      <UserContext.Provider value={{ products ,caterory,brand ,users }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;
  