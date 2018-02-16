import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { WelcomePage } from '../welcome/welcome';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  passcode:any;
  pageStatus:any;
  codeone:any;
  codetwo:any;
  codethree:any;
  codefour:any;
  int :any;
  newPincount :any;
  message :any;
  finalPin :any;
  fingerPin :any;
  constructor(
  	    public faio: FingerprintAIO,
  	    public toastCtrl: ToastController,
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	  	public storage: Storage) 
  {
  	this.passcode = '';
  	this.finalPin = '';
  	this.message = true;
  	this.pageStatus = "Enter Pin"
  	this.int = 0;
  	this.newPincount = 0;
    this.fingerPin = false;
  }

  add(value) {
		this.storage.get('Securitypin').then((Securitypin) => {
		
			if(this.passcode.length < 4) {
	        	this.passcode = this.passcode + value;
					if(this.int == 0){
						this.codeone = value;
						this.int++
					}else if(this.int == 1){
						this.codetwo = value;
						this.int++
					}else if(this.int == 2){
						this.codethree = value;
						this.int++
					}else if(this.int == 3){
						this.codefour = value;
						this.int++
					}
			        if(this.passcode.length == 4) {
			            if(this.newPincount > 0){
			            	if(	this.finalPin == this.codeone+this.codetwo+this.codethree+this.codefour){
			            	    this.navCtrl.setRoot(WelcomePage).then(() => {
	            				
	            				});
			            		console.log("passwordMatched")
			            		this.message = true;
			            	}else{
			            		this.message = false;
			            	}
			            }else{
			                this.pageStatus = "Confirm Pin"
			        		this.newPincount++ 
			        		this.finalPin = this.codeone+this.codetwo+this.codethree+this.codefour
			                console.log("The four digit code was entered",	this.finalPin);
			            	this.codeone = null;
			            	this.codetwo= null;
			            	this.codethree = null;
			            	this.codefour = null;
			            	this.passcode = '';
			            	this.int = 0
	       					
			            }    
			        }
	    	}
        })
    }

    delete() {
    	if(this.passcode.length > 0) {
    		    if(this.passcode.length == 1){
					this.codeone = null
					this.int--
				}else if(this.passcode.length == 2){
					this.codetwo = null;
					this.int--
				}else if(this.passcode.length == 3){
					this.codethree = null;
					this.int--
				}else if(this.passcode.length == 4){
					this.codefour = null;
					this.int--
				}
            this.passcode = this.passcode.substr(0, this.passcode.length - 1);
    	}
    }

  	goTo(){
  		this.navCtrl.setRoot(WelcomePage).then(() => {
		        
		});
  	}
    open(){
	      this.faio.show({
	        clientId: 'Fingerprint-Demo',
	        clientSecret: 'password', //Only necessary for Android
	        disableBackup:true,  //Only for Android(optional)
	        localizedFallbackTitle: 'Use Pin', //Only for iOS
	        localizedReason: 'Please authenticate' //Only for iOS
	     })
	    .then((result: any) => 
	    	
	    	this.goTo()
	          )
	    .catch((error: any) => 
	    	console.log(error)
	    	);
  	}

}
