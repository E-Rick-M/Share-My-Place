import {Modal} from './UI/modal'
import {Map} from './UI/map'
import {getCoordsFromAddress,getAddressFromCoords} from  './Utility/location'
class PlaceFinder{
    constructor(){
        const addressForm=document.querySelector('form');
        const locateUserBtn=document.getElementById('locate-btn')
        this.shareBtn=document.getElementById('share-btn')

        locateUserBtn.addEventListener('click',this.locateUserHandler.bind(this))
        addressForm.addEventListener('submit',this.findAddressHandler.bind(this))
        this.shareBtn.addEventListener('click',this.sharePlaceHandler)
    }

    sharePlaceHandler(){
        const shareLinkInputElement=document.getElementById('share-link');
        // shareLinkInputElement.select();
        if(!navigator.clipboard){
            shareLinkInputElement.select();
            return
        }

        navigator.clipboard.writeText(shareLinkInputElement.value).then(()=>{
            alert('Copied into Clipboard')
        }).catch(err=>{
            console.log(err)
            shareLinkInputElement.select();
        })
    }

    selectPlace(coordinates,address){
        if(this.map){
            this.map.render()
        }else{
            this.map=new Map(coordinates)
        }
        
       this.shareBtn.disabled=false;
       const shareLinkInputElement=document.getElementById('share-link');
       shareLinkInputElement.value=`${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    locateUserHandler(){
        if(!navigator.geolocation){
            alert('Location Feature not Available in your Browser')
            return
        }
        const modal=new Modal('loading-modal-content','Loading Location-Please Be patient!')
        modal.show();
        navigator.geolocation.getCurrentPosition(async(successResult)=>{
        
            const coordinates={
                lat:successResult.coords.latitude,
                lng:successResult.coords.longitude
            };
            const address=await getAddressFromCoords(coordinates)
            modal.Hide()
          this.selectPlace(coordinates,address)
        },error=>{
            modal.Hide()
            alert('Could not Locate You Unfortunately. Please Enter an Address Manually!')
        })
    }

    async findAddressHandler(event){
        event.preventDefault()
        const address=event.target.querySelector('input').value;

        if(!address|| address.trim().length===0){
            alert('Invalid Adress Entered Please Try Again')
            return
        }
        const modal=new Modal('loading-modal-content','Loading Location Please Wait!')
        modal.show()
        try {
              const coordinates=await getCoordsFromAddress(address)
              this.selectPlace(coordinates,address)
        } catch (error) {
            alert(error.message)
        }
      modal.Hide();
     
    }
}

new PlaceFinder()