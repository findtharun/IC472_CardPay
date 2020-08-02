const firebaseConfig = {
    apiKey: "AIzaSyDYUN9o8ViC1uFs3OlGhXRY5sc6sy1Fwg4",
    authDomain: "cardpay-5a0c2.firebaseapp.com",
    databaseURL: "https://cardpay-5a0c2.firebaseio.com",
    projectId: "cardpay-5a0c2",
    storageBucket: "cardpay-5a0c2.appspot.com",
    messagingSenderId: "467588252342",
    appId: "1:467588252342:web:a22115d964ac6d6bf7dc17",
    measurementId: "G-QM36RWVGC7"
};


firebase.initializeApp(firebaseConfig);
var firestore=firebase.firestore();

// Start Grabbing Our DOM Elements
const submitBtn=document.querySelector('#submit');

let creditcardnumber=document.querySelector('#aname');
let amount=document.querySelector('#bname');
let expiryear=document.querySelector('#fname');
let expirymonth=document.querySelector('#gname');
let cvv=document.querySelector('#dname');



const db=firestore.collection("cards");
const db1=firestore.collection("users");
const db2=firestore.collection("notifications");

submitBtn.addEventListener('click', function()
{
    let creditcardnumberInput=creditcardnumber.value;
    let expirydateInput='0'+expiryear.value+'/'+expirymonth.value;
    let cvvInput=cvv.value;
    let amountInput=parseInt(amount.value,10);
    creditcardnumberInput = creditcardnumberInput.split(" ").join("");
    let count = 0;
    if(creditcardnumberInput.length<16){
        window.alert("Invalid Credit Card Number,Please check and reenter");

    }
    else if(cvvInput.length<3){
        window.alert("Invalid CVV Number,Please check and reenter");
    }
    else {
        db.get().then(function(doc) {
            doc.forEach(function(doc1) {
        
                if(doc1.data().cardnumber === creditcardnumberInput && doc1.data().expirydate===expirydateInput && doc1.data().cvv === cvvInput){
                    count = count+1;
                    if(doc1.data().isonline === 'lock')
                    {
                    db1.doc(doc1.id).get().then((doc)=> {
            
    
                            username1 = doc.data().username,
                            phone1 = doc.data().phone,
                            displayname1 = doc.data().displayname,
                            db2.doc(doc1.id).set({
                                amount: amountInput,
                                username: username1,
                                phone: phone1,
                                displayname: displayname1,
                            
                            }).then(function () {
                        
                                window.alert("CARD is Locked, App Authentication is required");
                                count = 1234;
                            })
    
    
                    })
                    
                }
                    
    
                }
               
    
            });
        });
        if(count < 1233) {
            window.alert("You  will be redirected to bank page")
        }

    }
    // Access the Data base collection
    



});

