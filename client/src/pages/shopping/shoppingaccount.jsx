import { Orders } from "./shoppingorders"
import { Address } from "./address"


export const ShoppingAccount=()=>{
  return(<div className="flex flex-col">
    <div className="relative h-[350px] w-full overflow-hidden">
      <img src="/images/banner3.avif" alt="" className="h-full w-full object-cover object-center" />
    </div>
    
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/2 h-auto"><Orders/></div>
      <div className="lg:w-1/2  h-auto"><Address/></div>
      
    </div>
    
  </div>)
}