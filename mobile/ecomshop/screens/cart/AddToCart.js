import Toast from 'react-native-toast-message';
import { showToastSuccess } from '../../Commons/Toast';

export default function addToCart(product,quantity,comingFrom){
   
    console.log("products  "+JSON.stringify(product))

    let itemAlredadyAdded = false;
    let previousQuantity=0;

    //check if the product already exists in the cart.......................
    product.cartItems.map(item => {
        if (item.product.name === product.product.name) {
            itemAlredadyAdded = true              
            previousQuantity=item.product.quantity
        }
    })

    console.log(itemAlredadyAdded)

    //if the product doesnt not exist in the cart, we add the product in the cart, other wise we update the quantity
    if (!itemAlredadyAdded) {
        showToastSuccess(product.product.name,' Added to Cart');

        //ADD Product to card 
        product.product.quantity = quantity
        product.addItemToCart(product.product); //addItemToCart is inside the product props as it was map to props by Redux
    } else {

        //update the quantity of the added product
        if(comingFrom=='productDetails'){
            product.updateCart(product,quantity) //if coming from product details page
            
        }else{
            product.updateCart(product,previousQuantity+quantity)

        }
        showToastSuccess(product.product.name,'Quantity Increased to '+(previousQuantity+1));

    }
}
