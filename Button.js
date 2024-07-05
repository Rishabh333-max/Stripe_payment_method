import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CommonButton=({
    text='DONE',
    onPress=()=>{},
    disable=false
})=>{
return(
    <TouchableOpacity disabled={disable} onPress={onPress} style={{height:40,marginHorizontal:20,backgroundColor:disable?'grey':"#D76540",borderRadius:10,
        alignItems:"center",justifyContent:"center",marginVertical:20,
    }}>
<Text style={{fontWeight:"bold",color:"white",fontSize:16}}>{text}</Text>
    </TouchableOpacity>
)
}

export default CommonButton