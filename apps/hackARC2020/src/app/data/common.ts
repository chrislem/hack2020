import { IContract, ICustomer } from "./interface";


export var graphbg = '#ffffff'
export var barcolor = [
    '#eb823d',
    '#ae296d',
    ''
]

export var linecolor = [
    '#c85a51',
    '#d1204e',
    
    ''
]

//ENUMS
export var currencies = [
    'EUR',
    'USD',
    'GBP',
    'JPY',
    'CHF'
];

export var basis = [
    'Act/Act',
    'Act/360',
    'Act/365'
];

export var ARCbasis = [
    'Exact/Exact',
    'Exact/360',
    'Exact/365'

]

export var periodicity = [
    '1m',
    '3m',
    '6m',
    '12m'
];

export var amoType_list = [
'Bullet',
'Constant Capital'
];

export var maturities = [
'1m',
'3m',
'6m',
'1y',
'2y',
'3y',
'4y',
'5y',
'6y',
'7y',
'8y',
'9y',
'10y',
'15y',
'20y'
];

export var ARR_Indexes = [
    'ESTER',
    'SOFR',
    'SONIA',
    'SARON',
    'TONAR'
]

export var ARRInterestMethods = [
    'RFRAVRSimple',
    'RFRAVRCompounding'
]

export var amortizationTypes = [
    'Bullet',
    'Constant Capital'
  //  'Constant K+I'    
]


//MAPS
export var mapCurrencyARR = new Map([
    ["EUR","ESTER"],
    ["USD","SOFR"],
    ["GBP","SONIA"],
    ["CHF","SARON"],
    ["JPY","TONAR"]
  ])

export var mapPeriodicity = new Map([
    [1,"1m"],
    [2,"3m"],
    [3,"6m"],
    [4,"12m"]]);

export var mapMaturity = new Map([
        [1,"1m"],
        [2,"3m"],
        [3,"6m"],
        [4,"1y"],
        [5,"2y"],
        [6,"3y"],
        [7,"4y"],
        [8,"5y"],
        [9,"6y"],
        [10,"7y"],
        [11,"8y"],
        [12,"9y"],   
        [13,"10y"],
        [14,"15y"],
        [15,"20y"]
          ]);

export var mapInterestMethod = new Map([
            ["RFRAVRSimple","Simple"],
            ["RFRAVRCompounding","Compounding"]
              ]);

export var mapAmotype = new Map([
    ['Bullet',"Bullet"],
    ['Constant Capital',"ConstantPrincipalAnnuity"]
   //['Constant K+I',"ConstantPrincipalAndInterestAnnuity"]
]);

export var mapBasis = new Map( [
    ['Exact/Exact', 'Act/Act'],
    ['Exact/360', 'Act/360'],
    ['Exact/365', 'Act/365']
]);

export var mapRevertBasis = new Map( [
    ['Act/Act', 'Exact/Exact'],
    ['Act/360', 'Exact/360'],
    ['Act/365', 'Exact/365']
]);

export var mapFlag = new Map( [
    ['EUR', 'flag-icon-eu'],
    ['GBP', 'flag-icon-gb'],
    ['USD', 'flag-icon-us'],
    ['CHF', 'flag-icon-ch'],
    ['JPY', 'flag-icon-jp']
])

export var mapCurrencySymbol = new Map( [
    ['EUR', '€'],
    ['GBP', '£'],
    ['USD', '$'],
    ['CHF', 'CHF'],
    ['JPY', '¥']
])

export var contractTypes = [
    'Mortgage',
    'Consumer Loan',
    'Car Loan',
    'Corporate Loan'

]


export var stockDeals=[
    {contractref:"BANK14343264",currency:"GBP",interestperiodicity:"1d",amortizationType:"Bullet",balance:629677,basis:"Exact/360",clientratespread:2.20941597046824,interestrateindex:"GBP_LIBOR_Overnight",maturitydate:new Date("2023-11-11T00:00:00"),origindate:new Date("2020-11-01T00:00:00"),contractType:"Mortgage",partyref:"party1"},
    {contractref:"BANK19988905",currency:"GBP",interestperiodicity:"1w",amortizationType:"Bullet",balance:891237,basis:"Exact/360",clientratespread:0.553981737005902,interestrateindex:"GBP_LIBOR_1W",maturitydate:new Date("2024-01-09T00:00:00"),origindate:new Date("2020-11-18T00:00:00"),contractType:"Mortgage",partyref:"party2"},
    {contractref:"BANK16555484",currency:"GBP",interestperiodicity:"1m",amortizationType:"Bullet",balance:659445,basis:"Exact/360",clientratespread:1.3159463157439,interestrateindex:"GBP_LIBOR_1M",maturitydate:new Date("2023-02-01T00:00:00"),origindate:new Date("2020-09-10T00:00:00"),contractType:"Mortgage",partyref:"party3"},
    {contractref:"BANK10081604",currency:"GBP",interestperiodicity:"3m",amortizationType:"ConstantPrincipalAnnuity",balance:574661,basis:"Exact/365",clientratespread:1.79101562376317,interestrateindex:"GBP_LIBOR_3M",maturitydate:new Date("2022-11-20T00:00:00"),origindate:new Date("2020-07-10T00:00:00"),contractType:"Mortgage",partyref:"party4"},
    {contractref:"BANK18061552",currency:"GBP",interestperiodicity:"6m",amortizationType:"ConstantPrincipalAnnuity",balance:341565,basis:"Exact/365",clientratespread:0.0731211556311082,interestrateindex:"GBP_LIBOR_6M",maturitydate:new Date("2022-06-12T00:00:00"),origindate:new Date("2020-11-25T00:00:00"),contractType:"Mortgage",partyref:"party5"},
    {contractref:"BANK11678886",currency:"GBP",interestperiodicity:"9m",amortizationType:"ConstantPrincipalAnnuity",balance:901786,basis:"Exact/365",clientratespread:1.1442732550204,interestrateindex:"GBP_LIBOR_9M",maturitydate:new Date("2022-05-05T00:00:00"),origindate:new Date("2020-08-14T00:00:00"),contractType:"Mortgage",partyref:"party6"},
    {contractref:"BANK11896709",currency:"GBP",interestperiodicity:"12m",amortizationType:"ConstantPrincipalAnnuity",balance:314497,basis:"Exact/365",clientratespread:2.83664967579402,interestrateindex:"GBP_LIBOR_12M",maturitydate:new Date("2022-11-21T00:00:00"),origindate:new Date("2020-09-24T00:00:00"),contractType:"Mortgage",partyref:"party7"},
    {contractref:"BANK19286655",currency:"GBP",interestperiodicity:"1d",amortizationType:"Bullet",balance:784933,basis:"Exact/360",clientratespread:2.20941597046824,interestrateindex:"GBP_LIBOR_Overnight",maturitydate:new Date("2023-11-11T00:00:00"),origindate:new Date("2020-11-01T00:00:00"),contractType:"Mortgage",partyref:"party8"},
    {contractref:"BANK19998233",currency:"GBP",interestperiodicity:"1w",amortizationType:"Bullet",balance:746120,basis:"Exact/360",clientratespread:0.553981737005902,interestrateindex:"GBP_LIBOR_1W",maturitydate:new Date("2024-01-09T00:00:00"),origindate:new Date("2020-11-18T00:00:00"),contractType:"Car Loan",partyref:"party1"},
    {contractref:"BANK12865082",currency:"GBP",interestperiodicity:"1m",amortizationType:"Bullet",balance:759465,basis:"Exact/360",clientratespread:1.3159463157439,interestrateindex:"GBP_LIBOR_1M",maturitydate:new Date("2023-02-01T00:00:00"),origindate:new Date("2020-09-10T00:00:00"),contractType:"Car Loan",partyref:"party8"},
    {contractref:"BANK12988397",currency:"GBP",interestperiodicity:"3m",amortizationType:"ConstantPrincipalAnnuity",balance:784856,basis:"Exact/365",clientratespread:1.79101562376317,interestrateindex:"GBP_LIBOR_3M",maturitydate:new Date("2022-11-20T00:00:00"),origindate:new Date("2020-07-10T00:00:00"),contractType:"Car Loan",partyref:"party6"},
    {contractref:"BANK13745314",currency:"GBP",interestperiodicity:"6m",amortizationType:"ConstantPrincipalAnnuity",balance:718389,basis:"Exact/365",clientratespread:0.0731211556311082,interestrateindex:"GBP_LIBOR_6M",maturitydate:new Date("2022-06-12T00:00:00"),origindate:new Date("2020-11-25T00:00:00"),contractType:"Car Loan",partyref:"party5"},
    {contractref:"BANK19071732",currency:"GBP",interestperiodicity:"9m",amortizationType:"ConstantPrincipalAnnuity",balance:52880,basis:"Exact/365",clientratespread:1.1442732550204,interestrateindex:"GBP_LIBOR_9M",maturitydate:new Date("2022-05-05T00:00:00"),origindate:new Date("2020-08-14T00:00:00"),contractType:"Car Loan",partyref:"party9"},
    {contractref:"BANK13347094",currency:"GBP",interestperiodicity:"12m",amortizationType:"ConstantPrincipalAnnuity",balance:559820,basis:"Exact/365",clientratespread:2.83664967579402,interestrateindex:"GBP_LIBOR_12M",maturitydate:new Date("2022-11-21T00:00:00"),origindate:new Date("2020-09-24T00:00:00"),contractType:"Car Loan",partyref:"party9"},
    {contractref:"BANK13902230",currency:"GBP",interestperiodicity:"1d",amortizationType:"Bullet",balance:725357,basis:"Exact/360",clientratespread:2.20941597046824,interestrateindex:"GBP_LIBOR_Overnight",maturitydate:new Date("2023-11-11T00:00:00"),origindate:new Date("2020-11-01T00:00:00"),contractType:"Consumer Loan",partyref:"party1"},
    {contractref:"BANK13552783",currency:"GBP",interestperiodicity:"1w",amortizationType:"Bullet",balance:765137,basis:"Exact/360",clientratespread:0.553981737005902,interestrateindex:"GBP_LIBOR_1W",maturitydate:new Date("2024-01-09T00:00:00"),origindate:new Date("2020-11-18T00:00:00"),contractType:"Consumer Loan",partyref:"party2"},
    {contractref:"BANK10596409",currency:"GBP",interestperiodicity:"1m",amortizationType:"Bullet",balance:156453,basis:"Exact/360",clientratespread:1.3159463157439,interestrateindex:"GBP_LIBOR_1M",maturitydate:new Date("2023-02-01T00:00:00"),origindate:new Date("2020-09-10T00:00:00"),contractType:"Consumer Loan",partyref:"party4"},
    {contractref:"BANK19235325",currency:"GBP",interestperiodicity:"3m",amortizationType:"ConstantPrincipalAnnuity",balance:94768,basis:"Exact/365",clientratespread:1.79101562376317,interestrateindex:"GBP_LIBOR_3M",maturitydate:new Date("2022-11-20T00:00:00"),origindate:new Date("2020-07-10T00:00:00"),contractType:"Consumer Loan",partyref:"party5"},
    {contractref:"BANK12404611",currency:"GBP",interestperiodicity:"6m",amortizationType:"ConstantPrincipalAnnuity",balance:111923,basis:"Exact/365",clientratespread:0.0731211556311082,interestrateindex:"GBP_LIBOR_6M",maturitydate:new Date("2022-06-12T00:00:00"),origindate:new Date("2020-11-25T00:00:00"),contractType:"Consumer Loan",partyref:"party7"},
    {contractref:"BANK16145773",currency:"GBP",interestperiodicity:"9m",amortizationType:"ConstantPrincipalAnnuity",balance:892846,basis:"Exact/365",clientratespread:1.1442732550204,interestrateindex:"GBP_LIBOR_9M",maturitydate:new Date("2022-05-05T00:00:00"),origindate:new Date("2020-08-14T00:00:00"),contractType:"Consumer Loan",partyref:"party7"},
    {contractref:"BANK17813332",currency:"GBP",interestperiodicity:"12m",amortizationType:"ConstantPrincipalAnnuity",balance:499429,basis:"Exact/365",clientratespread:2.83664967579402,interestrateindex:"GBP_LIBOR_12M",maturitydate:new Date("2022-11-21T00:00:00"),origindate:new Date("2020-09-24T00:00:00"),contractType:"Consumer Loan",partyref:"party8"},
    {contractref:"BANK13330622",currency:"GBP",interestperiodicity:"1d",amortizationType:"Bullet",balance:1778486,basis:"Exact/360",clientratespread:2.20941597046824,interestrateindex:"GBP_LIBOR_Overnight",maturitydate:new Date("2023-11-11T00:00:00"),origindate:new Date("2020-11-01T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK16573029",currency:"GBP",interestperiodicity:"1w",amortizationType:"Bullet",balance:1327992,basis:"Exact/360",clientratespread:0.553981737005902,interestrateindex:"GBP_LIBOR_1W",maturitydate:new Date("2024-01-09T00:00:00"),origindate:new Date("2020-11-18T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},
    {contractref:"BANK19300599",currency:"GBP",interestperiodicity:"1m",amortizationType:"Bullet",balance:770879,basis:"Exact/360",clientratespread:1.3159463157439,interestrateindex:"GBP_LIBOR_1M",maturitydate:new Date("2023-02-01T00:00:00"),origindate:new Date("2020-09-10T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK12887300",currency:"GBP",interestperiodicity:"3m",amortizationType:"ConstantPrincipalAnnuity",balance:1432278,basis:"Exact/365",clientratespread:1.79101562376317,interestrateindex:"GBP_LIBOR_3M",maturitydate:new Date("2022-11-20T00:00:00"),origindate:new Date("2020-07-10T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},
    {contractref:"BANK10763663",currency:"GBP",interestperiodicity:"6m",amortizationType:"ConstantPrincipalAnnuity",balance:1840463,basis:"Exact/365",clientratespread:0.0731211556311082,interestrateindex:"GBP_LIBOR_6M",maturitydate:new Date("2022-06-12T00:00:00"),origindate:new Date("2020-11-25T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK13812843",currency:"GBP",interestperiodicity:"9m",amortizationType:"ConstantPrincipalAnnuity",balance:1690458,basis:"Exact/365",clientratespread:1.1442732550204,interestrateindex:"GBP_LIBOR_9M",maturitydate:new Date("2022-05-05T00:00:00"),origindate:new Date("2020-08-14T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},
    {contractref:"BANK14701067",currency:"GBP",interestperiodicity:"12m",amortizationType:"ConstantPrincipalAnnuity",balance:1677772,basis:"Exact/365",clientratespread:2.83664967579402,interestrateindex:"GBP_LIBOR_12M",maturitydate:new Date("2022-11-21T00:00:00"),origindate:new Date("2020-09-24T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK16851224",currency:"GBP",interestperiodicity:"1d",amortizationType:"Bullet",balance:1800419,basis:"Exact/360",clientratespread:2.20941597046824,interestrateindex:"GBP_LIBOR_Overnight",maturitydate:new Date("2023-11-11T00:00:00"),origindate:new Date("2020-11-01T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},
    {contractref:"BANK16044401",currency:"GBP",interestperiodicity:"1w",amortizationType:"Bullet",balance:1113744,basis:"Exact/360",clientratespread:0.553981737005902,interestrateindex:"GBP_LIBOR_1W",maturitydate:new Date("2024-01-09T00:00:00"),origindate:new Date("2020-11-18T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK17838423",currency:"GBP",interestperiodicity:"1m",amortizationType:"Bullet",balance:1501874,basis:"Exact/360",clientratespread:1.3159463157439,interestrateindex:"GBP_LIBOR_1M",maturitydate:new Date("2023-02-01T00:00:00"),origindate:new Date("2020-09-10T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},
    {contractref:"BANK12769887",currency:"GBP",interestperiodicity:"3m",amortizationType:"ConstantPrincipalAnnuity",balance:1296150,basis:"Exact/365",clientratespread:1.79101562376317,interestrateindex:"GBP_LIBOR_3M",maturitydate:new Date("2022-11-20T00:00:00"),origindate:new Date("2020-07-10T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK10306306",currency:"GBP",interestperiodicity:"6m",amortizationType:"ConstantPrincipalAnnuity",balance:1854334,basis:"Exact/365",clientratespread:0.0731211556311082,interestrateindex:"GBP_LIBOR_6M",maturitydate:new Date("2022-06-12T00:00:00"),origindate:new Date("2020-11-25T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},
    {contractref:"BANK18099518",currency:"GBP",interestperiodicity:"9m",amortizationType:"ConstantPrincipalAnnuity",balance:1260177,basis:"Exact/365",clientratespread:1.1442732550204,interestrateindex:"GBP_LIBOR_9M",maturitydate:new Date("2022-05-05T00:00:00"),origindate:new Date("2020-08-14T00:00:00"),contractType:"Corporate Loan",partyref:"party10"},
    {contractref:"BANK19886245",currency:"GBP",interestperiodicity:"12m",amortizationType:"ConstantPrincipalAnnuity",balance:1527572,basis:"Exact/365",clientratespread:2.83664967579402,interestrateindex:"GBP_LIBOR_12M",maturitydate:new Date("2022-11-21T00:00:00"),origindate:new Date("2020-09-24T00:00:00"),contractType:"Corporate Loan",partyref:"party11"},  
]

export var Customers: { [id: string]: ICustomer; } = {
"party1":{ first_name:"Karoline",last_name:"Ragsdall", email:"kragsdall0@shinystat.com", gender:"Female", address:"79 Forest Dale Pass", city:"Glasgow", country:"United Kingdom"},
"party2":{ first_name:"Traci",last_name:"Seiffert", email:"tseiffert1@vkontakte.ru", gender:"Female", address:"06076 Delaware Trail", city:"Norton", country:"United Kingdom"},
"party3":{ first_name:"Stevena",last_name:"Marquet", email:"smarquet2@dropbox.com", gender:"Female", address:"69857 Main Parkway", city:"Langley", country:"United Kingdom"},
"party4":{ first_name:"Beverley",last_name:"Vasilchenko", email:"bvasilchenko3@abc.net.au", gender:"Female", address:"564 Columbus Way", city:"Belfast", country:"United Kingdom"},
"party5":{ first_name:"Doria",last_name:"Caesar", email:"dcaesar4@ameblo.jp", gender:"Female", address:"96 Springs Way", city:"Carlton", country:"United Kingdom"},
"party6":{ first_name:"Lilian",last_name:"Snawdon", email:"lsnawdon5@miitbeian.gov.cn", gender:"Female", address:"264 South Alley", city:"Upton", country:"United Kingdom"},
"party7":{ first_name:"Lauralee",last_name:"Vassie", email:"lvassie6@opera.com", gender:"Female", address:"4 Cordelia Crossing", city:"Swindon", country:"United Kingdom"},
"party8":{ first_name:"Heywood",last_name:"Crosen", email:"hcrosen7@about.com", gender:"Male", address:"82 Monica Circle", city:"Wootton", country:"United Kingdom"},
"party9":{ first_name:"Teddie",last_name:"Joerning", email:"tjoerning8@cornell.edu", gender:"Male", address:"2375 Brentwood Center", city:"Sheffield", country:"United Kingdom"},
"party10":{ first_name:"Cameron",last_name:"Rooms", email:"crooms9@dion.ne.jp", gender:"Male", address:"91944 Leroy Court", city:"Tullich", country:"United Kingdom"},
"party11":{ first_name:"Freedman",last_name:"Buckwell", email:"fbuckwella@istockphoto.com", gender:"Male", address:"7674 Eastwood Drive", city:"Whitwell", country:"United Kingdom"},
"party12":{ first_name:"Abrahan",last_name:"Cotterell", email:"acotterellb@nps.gov", gender:"Male", address:"8 Manley Point", city:"Swindon", country:"United Kingdom"},
"party13":{ first_name:"Yehudi",last_name:"Franey", email:"yfraneyc@redcross.org", gender:"Male", address:"42 Harper Park", city:"Weston", country:"United Kingdom"},
"party14":{ first_name:"Town",last_name:"Barbery", email:"tbarberyd@youtube.com", gender:"Male", address:"0 Karstens Lane", city:"Newton", country:"United Kingdom"},
"party15":{ first_name:"Germaine",last_name:"Alves", email:"galvese@cam.ac.uk", gender:"Male", address:"78 Stuart Drive", city:"Church End", country:"United Kingdom"},
"party16":{ first_name:"Jeniffer",last_name:"Casero", email:"jcaserof@oaic.gov.au", gender:"Female", address:"2 Esch Parkway", city:"Newtown", country:"United Kingdom"},
"party17":{ first_name:"Rafaellle",last_name:"Kay", email:"rkayg@columbia.edu", gender:"Male", address:"56017 Mifflin Way", city:"Hatton", country:"United Kingdom"},
"party18":{ first_name:"Moreen",last_name:"Regina", email:"mreginah@ovh.net", gender:"Female", address:"5 Sachs Terrace", city:"London", country:"United Kingdom"},
"party19":{ first_name:"Mahmoud",last_name:"Bison", email:"mbisoni@pcworld.com", gender:"Male", address:"5460 Forest Terrace", city:"Upton", country:"United Kingdom"},
"party20":{ first_name:"Mathias",last_name:"Seydlitz", email:"mseydlitzj@mtv.com", gender:"Male", address:"1592 Rusk Circle", city:"Twyford", country:"United Kingdom"},
"party21":{ first_name:"Gayleen",last_name:"Evens", email:"gevensk@businessinsider.com", gender:"Female", address:"70 Mccormick Court", city:"Newport", country:"United Kingdom"},
"party22":{ first_name:"Mohandas",last_name:"Neames", email:"mneamesl@huffingtonpost.com", gender:"Male", address:"7258 Crownhardt Point", city:"Seaton", country:"United Kingdom"},
"party23":{ first_name:"Hakim",last_name:"Rumin", email:"hruminm@trellian.com", gender:"Male", address:"290 Pankratz Parkway", city:"Milton", country:"United Kingdom"},
"party24":{ first_name:"Natka",last_name:"O'Brien", email:"nobrienn@google.com.br", gender:"Female", address:"0 Trailsway Point", city:"Upton", country:"United Kingdom"},
"party25":{ first_name:"Earlie",last_name:"Paling", email:"epalingo@miibeian.gov.cn", gender:"Male", address:"774 Becker Plaza", city:"Denton", country:"United Kingdom"},
"party26":{ first_name:"Alaster",last_name:"Huyge", email:"ahuygep@wufoo.com", gender:"Male", address:"4 Glendale Street", city:"Ford", country:"United Kingdom"},
"party27":{ first_name:"Faydra",last_name:"Scarre", email:"fscarreq@addthis.com", gender:"Female", address:"1807 Browning Circle", city:"Edinburgh", country:"United Kingdom"},
"party28":{ first_name:"Kelbee",last_name:"Offell", email:"koffellr@army.mil", gender:"Male", address:"2639 Burrows Center", city:"West End", country:"United Kingdom"},
"party29":{ first_name:"Roberta",last_name:"Merryman", email:"rmerrymans@hexun.com", gender:"Female", address:"94 Fordem Hill", city:"Ford", country:"United Kingdom"},
"party30":{ first_name:"Noelani",last_name:"McPhee", email:"nmcpheet@google.com.au", gender:"Female", address:"8 Daystar Hill", city:"London", country:"United Kingdom"},
"party31":{ first_name:"Webb",last_name:"von Hagt", email:"wvonhagtu@businessweek.com", gender:"Male", address:"37954 Porter Lane", city:"Newton", country:"United Kingdom"},
"party32":{ first_name:"Erinn",last_name:"Laxen", email:"elaxenv@bandcamp.com", gender:"Female", address:"4624 Welch Place", city:"Whitwell", country:"United Kingdom"},
"party33":{ first_name:"Shandee",last_name:"Toffolini", email:"stoffoliniw@businesswire.com", gender:"Female", address:"42 Pleasure Drive", city:"London", country:"United Kingdom"},
"party34":{ first_name:"Melamie",last_name:"Redolfi", email:"mredolfix@yellowpages.com", gender:"Female", address:"09 Boyd Pass", city:"Linton", country:"United Kingdom"},
"party35":{ first_name:"Chad",last_name:"Goldman", email:"cgoldmany@mediafire.com", gender:"Female", address:"62 Hoard Road", city:"Hatton", country:"United Kingdom"},
"party36":{ first_name:"Camellia",last_name:"Charrisson", email:"ccharrissonz@uol.com.br", gender:"Female", address:"58442 David Center", city:"Swindon", country:"United Kingdom"},
"party37":{ first_name:"Karly",last_name:"Almeida", email:"kalmeida10@etsy.com", gender:"Female", address:"86 Jenifer Center", city:"Pentre", country:"United Kingdom"},
"party38":{ first_name:"Rriocard",last_name:"Rossiter", email:"rrossiter11@webeden.co.uk", gender:"Male", address:"3782 Talisman Street", city:"Aberdeen", country:"United Kingdom"},
"party39":{ first_name:"Gallard",last_name:"Boggon", email:"gboggon12@lulu.com", gender:"Male", address:"127 Blue Bill Park Drive", city:"London", country:"United Kingdom"},
"party40":{ first_name:"Daryl",last_name:"Yendall", email:"dyendall13@moonfruit.com", gender:"Female", address:"77 Little Fleur Parkway", city:"Newbiggin", country:"United Kingdom"},
"party41":{ first_name:"Chloette",last_name:"Papez", email:"cpapez14@umn.edu", gender:"Female", address:"1 Oak Valley Plaza", city:"London", country:"United Kingdom"},
"party42":{ first_name:"Corina",last_name:"Jelley", email:"cjelley15@deviantart.com", gender:"Female", address:"8278 Stang Avenue", city:"London", country:"United Kingdom"},
"party43":{ first_name:"Fedora",last_name:"Avramchik", email:"favramchik16@constantcontact.com", gender:"Female", address:"8684 Oakridge Street", city:"Charlton", country:"United Kingdom"},
"party44":{ first_name:"Dunstan",last_name:"Fayerman", email:"dfayerman17@liveinternet.ru", gender:"Male", address:"9340 Cottonwood Center", city:"Newport", country:"United Kingdom"},
"party45":{ first_name:"Lauren",last_name:"Chapell", email:"lchapell18@washingtonpost.com", gender:"Male", address:"63123 Summer Ridge Terrace", city:"Merton", country:"United Kingdom"},
"party46":{ first_name:"Dalton",last_name:"Woollin", email:"dwoollin19@printfriendly.com", gender:"Male", address:"28 Holy Cross Way", city:"Bristol", country:"United Kingdom"},
"party47":{ first_name:"Barnabas",last_name:"Glaum", email:"bglaum1a@businessinsider.com", gender:"Male", address:"81 Cascade Circle", city:"Kirkton", country:"United Kingdom"},
"party48":{ first_name:"Christean",last_name:"Garrood", email:"cgarrood1b@xinhuanet.com", gender:"Female", address:"398 Ramsey Park", city:"Aston", country:"United Kingdom"},
"party49":{ first_name:"Ysabel",last_name:"Fishly", email:"yfishly1c@amazon.co.uk", gender:"Female", address:"1813 Talmadge Road", city:"Thorpe", country:"United Kingdom"},
"party50":{ first_name:"Reiko",last_name:"Allsobrook", email:"rallsobrook1d@quantcast.com", gender:"Female", address:"1 Welch Junction", city:"Newport", country:"United Kingdom"}
}