import {Ionicons} from "@expo/vector-icons";

const iconNames  = {
    home: 'home-outline',
    albums : 'albums-outline',
    archive : 'archive-outline',
    add : 'add-outline',
    // albums : 'album-outline',
    // albums : 'album-outline',
} as const;


export type iconName = keyof typeof iconNames;

const Icon = ({named , size = 20 , color = 'black'}:{named:iconName,size:number,color?:string}) => {
    return <Ionicons name={iconNames[named]} size ={size} color={color}></Ionicons>
}

export default Icon;