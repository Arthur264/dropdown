/**
 * Created by eugene on 07/21/17.
 */

var LIST = [{
        city: 'Lviv',
        population: '727968'
    },
    {
        city: 'Kyiv',
        population: '2906569'
    },
    {
        city: 'Paris',
        population: '2220445'
    },
    {
        city: 'Odesa',
        population: '1010848'
    },
    {
        city: 'Ternopil',
        population: '218022'
    },
    {
        city: 'Sidney',
        population: '3908643'
    }
];
var listsearch = "";

function CreateList() {
    for (let i = 0; i < LIST.length; i++) {
        listsearch += LIST[i].city.toLowerCase() + " ";
    }
};
CreateList();