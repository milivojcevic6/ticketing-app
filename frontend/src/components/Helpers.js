export const handleLogError = (error) => {
    if (error.response) {
        console.log(error.response.data);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log(error.message);
    }
}

export const formatIban = (iban) =>{
    return iban.substring(0, 4) + " " + iban.substring(4, 8) + " " + iban.substring(8, 12) + " " + iban.substring(12, 16) + " " + iban.substring(16, 19)
}

export const formatAmount = (amount) => {
    return amount.substring(0,amount.length-2) + "," + amount.substring(amount.length-2)
}

export const divideReference = (reference) => {
    return [reference.substring(0,4),reference.substring(4,reference.length)]
}