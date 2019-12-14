validateCard = (num) => {
    let regExp = /^[0-9]{16,16}$/;
    if(regExp.test(num)){
        return true;
    } else{
        return false;
    }
};



module.exports = {
    validateCard,
}