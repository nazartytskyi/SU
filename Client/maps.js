const url = 'wss://8e3860e06bec.ngrok.io' //ws://localhost:8080/
let market;


function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.840128, lng: 23.9960064},
        zoom: 9
    });

     
}

    const heartRate = document.getElementById('heart-rate')

    window.onload = () => {
        let marker
        const ws = new WebSocket(url);
        ws.onmessage = ({ data }) => {
            const message = JSON.parse(data)
            
            switch (message.type) {
                case 'INFO_UPDATE':
                    if (message.data.position) {  
                        if (marker) {
                            marker.setPosition(message.data.position)
                            map.setCenter(message.data.position)
                        } else {
                            marker = new google.maps.Marker({position: {lat: 49.840128, lng: 23.9960064}, map: map});
                        }

                    }

                    if (message.data.heartRate) {    
                        heartRate.innerText = message.data.heartRate;
                    }
                    
                    break;
                case 'REGISTER_GADGET':
                    id.innerText = message.data.id;
                    break;
            
                default:
                    break;
            }
        }

        submit.onclick = ({target}) => {
            ws.send(JSON.stringify({
                type: 'SUBSCRIBE',
                data: {
                    id: id.value
                }
            }))
        }
    }
    

function connectWebSocket() {

}

  

  



