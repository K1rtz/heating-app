import { colors, spacingY } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icons from 'phosphor-react-native';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomTabs({ state, descriptors, navigation } : BottomTabBarProps) {
//   const { colors } = useTheme();
//   const { buildHref } = useLinkBuilder();

    const tabberIcons: any ={
        surveyHistory: (isFocused: boolean)=>(
        <Icons.NoteIcon
            size={verticalScale(30)}
            weight={isFocused? 'fill' : 'regular'}
            color={isFocused? colors.primary : colors.neutral400}
        />
        ),
        createSurvey: (isFocused: boolean)=>(
        <Icons.NotePencilIcon
            size={verticalScale(30)}
            weight={isFocused? 'fill' : 'regular'}
            color={isFocused? colors.primary : colors.neutral400}
        />
        ),
        home: (isFocused: boolean)=>(
            <MaterialCommunityIcons
                name="home"
                size={30}
                color={isFocused ? colors.primary : colors.neutral400}
            />
        ),
        // home: (isFocused: boolean)=>(
        //     <Icons.HouseIcon
        //         size={verticalScale(30)}
        //         weight={isFocused? 'fill' : 'regular'}
        //         color={isFocused? colors.primary : colors.neutral400}
        //     />
        // ),

        profile: (isFocused: boolean)=>(
            <MaterialCommunityIcons
                name="account-circle-outline"
                size={32}
                color={isFocused ? colors.primary : colors.neutral400}
                // color={isFocused ? '#f6c23e' : colors.neutral400}
            />
        ),
        // profile: (isFocused: boolean)=>(
        //     <Icons.UserCircleIcon
        //         size={verticalScale(30)}
        //         weight={isFocused? 'fill' : 'regular'}
        //         color={isFocused? colors.primary : colors.neutral400}
        //     />
        // ),
        report: (isFocused: boolean)=>(
            <MaterialCommunityIcons
                name="exclamation-thick"
                size={32}
                color={isFocused ? colors.primary : colors.neutral400}
                // color={isFocused ? '#e74a3b' : colors.neutral400}
            />
        ),
        // report: (isFocused: boolean)=>(
        //     <Icons.WarningCircleIcon
        //         size={verticalScale(30)}
        //         weight={isFocused? 'fill' : 'regular'}
        //         color={isFocused? colors.primary : colors.neutral400}
        //     />
        // ),


        surveys: (isFocused: boolean)=>(
            <MaterialCommunityIcons
                name="notebook-edit"
                size={32}
                color={isFocused ? colors.primary : colors.neutral400}
                // color={isFocused ? '#4e73df' : colors.neutral400}
            />
        ),
        // surveys: (isFocused: boolean)=>(
        //     <Icons.NotepadIcon
        //         size={verticalScale(30)}
        //         weight={isFocused? 'fill' : 'regular'}
        //         color={isFocused? colors.primary : colors.neutral400}
        //     />
        // ),

        tips: (isFocused: boolean)=>(
            <MaterialCommunityIcons
                name="lightbulb-on-outline"
                size={32}
                color={isFocused ? colors.primary : colors.neutral400}
                // color={isFocused ? '#1cc88a' : colors.neutral400}
            />
        ),
        receivedReports: (isFocused: boolean) => (
            <MaterialCommunityIcons
                name="exclamation-thick"
                size={32}
                color={isFocused ? '#e74a3b' : colors.neutral400}
            />
        ),
        // tips: (isFocused: boolean)=>(
        //     <Icons.BooksIcon
        //         size={verticalScale(30)}
        //         weight={isFocused? 'fill' : 'regular'}
        //         color={isFocused? colors.primary : colors.neutral400}
        //     />
        // )

        }

  return (
    <SafeAreaView edges={['bottom']} style={styles.tabbar}>

    <View style={styles.innerTabber}>
      {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label : any=
          options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;
          
          const isFocused = state.index === index;
          
          const onPress = () => {
              const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                }
            };
            
            const onLongPress = () => {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                });
            };
            
            return (
                <TouchableOpacity
                // href={buildHref(route.name, route.params)}
                key={route.name}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabbarItem}
                >
            {/* <Text style={{ color: isFocused ? colors.primary : colors.white }}>
              {label}
              </Text> */}
            {
                tabberIcons[route.name] && tabberIcons[route.name](isFocused)
            }
          </TouchableOpacity>
        );
    })}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    tabbar:{flexDirection: 'row',
    width: '100%',
    height: Platform.OS =='ios' ? verticalScale(73) : verticalScale(65),
    backgroundColor: colors.neutral800,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: colors.neutral700,
    borderTopWidth: 1,
    },
    innerTabber:{
        flexDirection: 'row',
        width: '100%',
        height: Platform.OS =='ios' ? verticalScale(73) : verticalScale(55),
        backgroundColor: colors.neutral800,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: colors.neutral700,
        borderTopWidth: 1,
    },
    tabbarItem:{
        marginBottom: Platform.OS == 'ios' ? spacingY._10 : spacingY._5,
        justifyContent: 'center',
        alignItems: 'center',
    }



})