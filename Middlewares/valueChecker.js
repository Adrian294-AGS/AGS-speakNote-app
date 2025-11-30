export const valueCheker = async (set) => {
    for(let i in set){
        if(set[i] == null || set[i] == ""){
            delete set[i];
        }
    }
    return set;
}