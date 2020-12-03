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


