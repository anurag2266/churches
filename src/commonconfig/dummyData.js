import { THEME_COLOR } from "./constStyle";
import images from "./images";

export const data = [
    {
        name: 'DEV Group',
        participants: '4',
        time: '2 MIN AGO',
        description: 'Hey Michael! Long time no see....',
        description2: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos',
        count: 3,
        check: true,
        designation: 'UI Designer',
        department: "Design Department",
    },
    {
        name: 'MGMT Group',
        participants: '4',
        time: '2 MIN AGO',
        description2: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos',
        description: 'Ahh, should have told you earli….',
        count: 0,
        check: false,
        designation: 'iOS Developer',
        department: "Dev Department",
    },

]

export const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,

    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,// optional
};

export const pieData = [
    {
        value: 30,
        color: '#7B5AA7',
    },
    {
        value: 50,
        color: '#C7AEE9',
    }, {
        value: 20,
        color: '#F0E7FC',
    }

];

export const lineChart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    // legend: ["Rainy Days"] // optional
};

export const download = [
    { id: 1, type: 'PDF' },
    { id: 2, type: 'Xlsx' },
    { id: 3, type: 'CSV' },
];
export const FilterValue = [
    { id: 1, type: 'Daily' },
    { id: 2, type: 'Weekly' },
    { id: 3, type: 'Monthly' },
];


export const swiperData = [
    {
        id: 1,
        coverImageUri: images.carwash, // Update with your image path
        cornerLabelColor: '#FFD300',
        cornerLabelText: 'GOTY',
        screen: 'BakeryAndSnacks'
    },
    {
        id: 2,
        coverImageUri: images.taj, // Update with your image path
        cornerLabelColor: '#0080ff',
        cornerLabelText: 'NEW',
        screen: 'Beverages'
    },
    {
        id: 3,
        coverImageUri: images.carwash, // Update with your image path
        cornerLabelColor: '#2ECC40',
        cornerLabelText: '-75%',
        screen: 'DiaryAndEgg'
    },
    {
        id: 4,
        coverImageUri: images.taj, // Update with your image path
        cornerLabelColor: '#2ECC40',
        cornerLabelText: '-20%',
        screen: 'FruitsAndVeg'
    },
];
