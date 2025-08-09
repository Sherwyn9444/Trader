import { places } from "./Places";
import { resources } from "./Resource";

const roguelike = (max = 99)=>{
    let map = [];
    let res = resources(max);
    let res2 = resources(max);

    Object.entries(places).forEach((val) => {
        let key = val[0];
        let value = val[1];
        
        
        
        let temp = {};
        Object.entries(places).forEach((region) => {
            region[1].forEach((place)=>{
                temp[place] = 1 + Math.floor(Math.random() * 5);
            })
        });
        

        value.forEach((place)=>{         
            let favs = {};
            res.forEach(r=>{
                let rand = 1 + Math.floor(Math.random() * 10);
                favs[r.name] = rand;
            });

            map.push({
                region: key,
                place: place,
                distance: temp,
                values: favs,
            })
        })
    });

    return map;
}



export default roguelike;