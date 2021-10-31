class Bank{
    createAccount(){
    let first_name=fname.value;
    let acc_no=accno.value;
    let password=pwd1.value;
    let user={
        first_name,acc_no,password
    }
    localStorage.setItem(user.acc_no,JSON.stringify(user))
    alert("account created")
    location.href="./index2.html";
    }
    validateAccountNumber(accno){
        return accno in localStorage?true:false
    }
    authenticate(){
        let account_number=accno.value;
        console.log(account_number);
        let password=pwd1.value;
         if(this.validateAccountNumber(account_number)){
             let data=JSON.parse(localStorage.getItem(account_number))
             if(password==data.password){
                 sessionStorage.setItem("user",account_number)
                alert("login success")
                location.href="./userhome.html"
             }
             else{
                 alert("invalid password")
             }
         }
        else{
            alert("invalid account number")
        }
        
    }
    logout(){
            sessionStorage.removeItem("user")
            location.href="./index2.html"
    }
    getbalance(){
        let log_acno=sessionStorage.getItem("user")
        let data=JSON.parse(localStorage.getItem(log_acno))
        return data.balance
    }

balanceEnquiry(){
    
    document.querySelector("#result").innerHTML=`<p> your available balance ${this.getbalance()}</p>`
}
fundTransfer(){
    let to_accountnum=to_acno.value;
    let c_accno=c_acno.value;
    let amount=amt.value;
    if(to_accountnum==c_accno){
      if(this.validateAccountNumber(c_accno)){
            if(amount<Number(this.getbalance())){
                let user_acno=sessionStorage.getItem("user")
              let payer_deatils=this.getAccountDetails(sessionStorage.getItem("user"))
              let receiver_details=this.getAccountDetails(c_accno)
              let cur_bal=Number(receiver_details.balance)
              
              let bal=cur_bal+Number(amount)
              receiver_details["balance"]=bal
              localStorage.setItem(c_accno,JSON.stringify(receiver_details))
             
              payer_deatils["balance"]-=Number(amount)
              localStorage.setItem(user_acno,JSON.stringify(payer_deatils))
            }
            else{
                alert("insufficient balance")
            }
      }
      else{
          alert("invalid account number")
      }
    }
    else{
        alert("account number mismatch")
    }
}
getAccountDetails(accno){
           return JSON.parse(localStorage.getItem(accno))
}
}
var bank=new Bank();


// let user={
//     account_number:1000,
//     first_name:"nkhil",
//     password:"abc123",
//     balance:2000
// }
// function validateAccno(accno){
// return accno in localStorage?true:false
// }

// // localStorage.setItem(user.account_number,JSON.stringify(user))

// function getBalance(accno){
//     if (validateAccno(accno)){
//         let data=JSON.parse(localStorage.getItem(accno))
//         return data.balance
//     }
// }
// function authenticate(accno,password){
//     if(validateAccno(accno)){
//         let data=JSON.parse(localStorage.getItem(accno))
//         if(password==data.password){
//             console.log("login successs");
//         }
//         else{
//             console.log("failed");
//         }
//     }
// }

// function fundTransfer(from_ac,to_ac,amount){

 
  
