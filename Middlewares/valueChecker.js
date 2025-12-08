export const valueCheker = async (set) => {
    for(let i in set){
        if(set[i] == null || set[i] == "" || set[i] == "Insert Info"){
            delete set[i];
        }
    }
    return set;
}