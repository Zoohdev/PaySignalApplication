import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Svg, Path,Rect,Defs,G ,ClipPath} from "react-native-svg";

export default (props) => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#2a2b37", // Background color of the tab bar
                    height: 60, // Height of the tab bar
                    borderTopWidth: 0, // Removes top border
                },
                tabBarActiveTintColor: "gold", // Color of the active tab icon/text
                tabBarInactiveTintColor: "#fff", // Color of the inactive tab icon/text
                tabBarLabelStyle: {
                    fontSize: 14, // Font size for tab labels
                    paddingBottom: 5, // Padding below the tab label
                },
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen 
                name="home" 
                options={{
                    headerShown: false,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => (
                        <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <Path d="M36 28V33C36 33.55 35.55 34 35 34H16" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M16 19H35C35.55 19 36 19.45 36 20V24" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M14 19V20V32" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M16 15C14.9 15 14 15.9 14 17C14 18.1 14.9 19 16 19" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M14 20V17" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M33 19V16C33 15.45 32.55 15 32 15H16" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M14 32C14 33.1 14.9 34 16 34" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M30 28C28.9 28 28 27.1 28 26C28 24.9 28.9 24 30 24" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M30 28H36C36.55 28 37 27.55 37 27V25C37 24.45 36.55 24 36 24H30" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    ),
                }} 
            />

            {/* List Tab */}
            <Tabs.Screen 
                name="list" 
                options={{
                    headerShown: false,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => (
                        <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <Path d="M35 33H14C13.45 33 13 32.55 13 32V19C13 18.45 13.45 18 14 18H35C35.55 18 36 18.45 36 19V32C36 32.55 35.55 33 35 33Z" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M36 21H13V24H36V21Z" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M15 29H19" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <Path d="M22 29H25" stroke={color} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    ),
                }} 
            />

            {/* Something Tab */}
            <Tabs.Screen
  name="something"
  options={{
    headerShown: false,
    tabBarLabel: () => null,
    tabBarIcon: ({ color }) => (
      <Svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G clipPath="url(#clip0_9576_2199)" fill={color}>
          <Path d="M37 21.087c0-.36-.135-.564-.224-.698-.06-.09-.073-.11-.073-.2 0-.09.014-.111.073-.201.09-.134.222-.34.222-.699a.468.468 0 00-.472-.461.468.468 0 00-.472.461c0 .09-.015.11-.074.2-.09.134-.221.34-.221.7 0 .359.134.564.221.698.06.09.074.11.074.2 0 .088-.015.111-.074.199-.09.133-.224.336-.224.698 0 .164.036.316.069.454.019.081.04.173.04.22 0 .09-.045.345-.24.456-.199.11-.55.048-.973-.166-.8-4.35-4.92-7.67-9.872-7.67-1.48 0-2.961.306-4.297.892a2.155 2.155 0 00-.53-1.213c-.8-.909-3.401-.957-3.916-.957a.467.467 0 00-.467.392c-.047.304-.437 2.995.38 3.922.233.265.526.47.857.602a9.03 9.03 0 00-1.15 1.759h-1.36c-.714 0-1.297.57-1.297 1.268v2.501c0 .699.583 1.268 1.298 1.268h.552c.338 2.318 1.66 4.48 3.641 5.954v3.87c0 .254.213.462.472.462h3.859c.26 0 .472-.208.472-.461v-1.932c1.064.147 2.14.136 3.204-.035v1.969c0 .253.213.461.473.461h3.858c.26 0 .472-.208.472-.461V31.49c2.223-1.754 3.497-4.302 3.497-6.997 0-.168-.005-.334-.014-.498.212.062.413.094.604.094.265 0 .505-.06.713-.177.52-.293.708-.853.713-1.245.002-.157-.033-.3-.066-.44a1.27 1.27 0 01-.045-.243c0-.087.014-.108.073-.198.09-.136.224-.339.224-.699zM30.541 30.9a.46.46 0 00-.184.364v3.814h-1.562v-.579a.468.468 0 00-.472-.461.468.468 0 00-.472.461v.579h-.409v-2.066a.452.452 0 00-.177-.36.478.478 0 00-.396-.09 9.893 9.893 0 01-3.955.047.48.48 0 00-.39.096.456.456 0 00-.172.355v2.018H20.85v-.579a.468.468 0 00-.472-.461.468.468 0 00-.472.461v.579h-.467v-3.643a.457.457 0 00-.196-.374c-2.008-1.418-3.285-3.55-3.5-5.851a.466.466 0 00-.47-.42h-.974a.35.35 0 01-.354-.346v-2.499a.35.35 0 01.354-.346h1.661a.475.475 0 00.432-.274 8.192 8.192 0 011.652-2.38.454.454 0 00.095-.497.473.473 0 00-.43-.284c-.42-.005-.79-.164-1.04-.45-.326-.369-.34-1.678-.215-2.782 1.135.046 2.459.255 2.784.624.293.335.387.796.257 1.266-.05.18.015.369.166.482a.478.478 0 00.519.041 9.712 9.712 0 014.604-1.148c5.005 0 9.076 3.722 9.076 8.294-.005 2.49-1.21 4.825-3.318 6.409z" />
          <Path d="M18.619 21.256c.26 0 .472-.207.472-.461a.467.467 0 00-.472-.462.467.467 0 00-.472.462c0 .254.211.46.472.46zM24.95 20.334c-2.633 0-4.776 2.093-4.776 4.666 0 2.573 2.143 4.666 4.776 4.666 2.634 0 4.777-2.093 4.777-4.666 0-2.573-2.143-4.666-4.777-4.666zM28.783 25c0 2.064-1.718 3.744-3.833 3.744-2.112 0-3.832-1.678-3.832-3.744 0-2.066 1.72-3.744 3.832-3.744 2.115 0 3.833 1.68 3.833 3.744z" />
          <Path d="M25.304 24.518c-.644-.26-.83-.42-.83-.705 0-.23.172-.498.654-.498.453 0 .738.159.86.226l.121.067.267-.688-.085-.048a2.017 2.017 0 00-.89-.258v-.697h-.689v.74c-.672.143-1.102.623-1.102 1.243 0 .747.614 1.086 1.277 1.34.533.212.75.426.75.74 0 .348-.302.583-.75.583-.345 0-.706-.104-.984-.288l-.125-.083-.255.699.073.05c.255.178.665.305 1.067.33v.724h.696v-.76c.693-.15 1.151-.665 1.151-1.308-.002-.65-.36-1.072-1.206-1.409z" />
        </G>
        <Defs>
          <ClipPath id="clip0_9576_2199">
            <Path fill="#fff" transform="translate(13 14)" d="M0 0H24V22H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    ),
  }}
/>

        </Tabs>
    );
};
