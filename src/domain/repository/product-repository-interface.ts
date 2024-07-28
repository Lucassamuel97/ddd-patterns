import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
    // findByName(name: string): Promise<Product>;
    // findByCategory(category: string): Promise<Product[]>;
    // findByPrice(price: number): Promise<Product[]>;
    // findByPriceRange(min: number, max: number): Promise<Product[]>;
}