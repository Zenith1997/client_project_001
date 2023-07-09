export function priceCalculator(retailPrice, wholesalePrice, quantity, wholesaleQty) {
    let calculatedPrice;

    if (quantity >= wholesaleQty) {
        calculatedPrice = wholesalePrice * quantity;
    } else if (quantity > 1) {
        const unitPriceRange = (wholesalePrice - retailPrice) / wholesaleQty - 1;
        const unitPrice = retailPrice + (unitPriceRange * (quantity - 1));
        calculatedPrice = unitPrice * quantity;
    } else {
        calculatedPrice = retailPrice * quantity;
    }

    return Number(calculatedPrice.toFixed(2));
}

export function returnTotalPrice(itemList){
    let totalPrice = 0;
    itemList.forEach(item => {
        totalPrice = Number(totalPrice + priceCalculator(item.Price, item.Subtotal, item.Quantity, 1));
    });
    return totalPrice;
}