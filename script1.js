
window.addEventListener("load" ,()=>{
    let longitude;
    let latitude;
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((Position) => {
    
        longitude=Position.coords.longitude;
        latitude=Position.coords.latitude;
                
               
              fetch(`api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then((response) =>{
                return response.json();
              })
              
              
              
              .then(data1 => {
                    const{name}=data1;
                    const{feels_like}=data1.main;
                    const{id,main}=data1.weather[0];
                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);
                    console.log(data1);
  
                })
            })
    }
    
    })