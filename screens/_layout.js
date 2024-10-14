import { Stack } from "expo-router";

const StackLaout = () =>{
    return(
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        </Stack>
    );
}