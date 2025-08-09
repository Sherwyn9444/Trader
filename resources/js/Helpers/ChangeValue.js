export const SetValue = (resource, place)=>{
    let res = [];
    Object.entries(place.values).forEach(element => {
        let crop = resource.find((r) => r.name == element[0]);
        crop.value = element[1];
        res.push(crop);
    });
    return res;
}