'use server'
//this is the main server component ,here we use it in other client component 
import ProductList from "@/components/product-list"



async function fetchListOfProducts(){
    try{
        const apiResponse = await fetch("https://dummyjson.com/products")
        const data = await apiResponse.json();
        return data?.products;

    }catch(e){
        console.error("Failed to fetch data:", e);
    }
}

// async function fetchInstructions(){
//     try{
//         const apiResponse = await fetch("https://dummyjson.com/recipes")
//         const data = await apiResponse.json();
//         return data?.recipes;

//     }catch(e){
//         throw new Error(e) ;
//     }
// }


export default async function Products(){
    const productList = await fetchListOfProducts();
    // const recipeId = await fetchInstructions();

    return (
    <ProductList productList={productList} />
    // <InstructionDrawer recipeId={recipeId}/>
    
)
}