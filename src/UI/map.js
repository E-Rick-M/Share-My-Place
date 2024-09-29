
export class Map{
    constructor(coords){
        // this.coordinates=coords
        this.render(coords)
    }
    render(coordinates){
        if(!google){
            alert('Could Not Load Maps Library Please try again later!')
            return;
        }
        console.log(google)

        const map=new google.maps.Map(document.getElementById('map'),{
            center:coordinates,
            zoom:16
        })

        const marker = new google.maps.Marker ({
            position:coordinates,
            map:map
        });
      
    }
//     createMarkerContent() {
//         // Create the HTML content for the marker
//         const markerContent = document.createElement('div');
//         markerContent.innerHTML = `
//             <div style="color: black; font-weight: bold;">My Location</div>
//         `;
//         return markerContent;
//     }
}