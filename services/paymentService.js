const PagaCollectClient = require('paga-collect');
const randomString = require('randomstring');
const moment = require('moment');

const pagaCollectClient = new PagaCollectClient().setApiKey("5b3da28c1d7d464483d15a25d543b6fef60004437ddf400781719ea6b925c7258a931cf0a068439e92c11d09851941da8330d5de60bf4785a47fe06b37a7ba40").setClientId("F196FC10-627B-4201-829A-D9C5BD5D0453").setPassword("kX7%Bns5eh2y4nK").setTest(true).build();

async function createPaymentRequest(amount, name, phoneNumber, email, paymentMethod) {
    let expiryDate = moment().add(1, 'days').format();
    expiryDate = expiryDate.substring(0, expiryDate.length - 6)
    let requestData = {
        referenceNumber: randomString.generate(),
        amount,
        currency: "NGN",
        payee: {
            bankAccountNumber: "2097582221",
            bankId: "40090E2F-7446-4217-9345-7BBAB7043C4C",
            name: "Okerentie misan",
            accountNumber: "2856196652"
          },
        payer: {
            email,
            name,
            bankId: "40090E2F-7446-4217-9345-7BBAB7043C4C",
            phoneNumber
        },
        expiryDateTimeUTC: expiryDate ,
        isSuppressMessages:false,
        payerCollectionFeeShare:  1.0,
        recipientCollectionFeeShare: 0.0,
        isAllowPartialPayments:false,
        callBackUrl:"http://localhost:8080/test-callback",
        paymentMethods: [`${paymentMethod}`],
    };
    // console.log(requestData);
    const result = await pagaCollectClient.paymentRequest(requestData);
    return result;
}

async function getOrderStatus(transactionId){
    const result = await pagaCollectClient.paymentStatus(transactionId);
    return result;
}

module.exports.createPaymentRequest = createPaymentRequest; 
module.exports.getOrderStatus = getOrderStatus;