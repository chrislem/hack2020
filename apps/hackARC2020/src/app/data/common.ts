
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

export var mapCurrencyARR = new Map([
    ["EUR","ESTER"],
    ["USD","SOFR"],
    ["GBP","SONIA"],
    ["CHF","SARON"],
    ["JPY","TONAR"]
  ])

export var mapPeriodicity = new Map([
    ["3","1m"],
    ["4","3m"],
    ["5","6m"],
    ["6","12m"]]);

    export var mapMaturity = new Map([
        ["1","1m"],
        ["2","3m"],
        ["3","6m"],
        ["4","1y"],
        ["5","2y"],
        ["6","3y"],
        ["7","4y"],
        ["8","5y"],
        ["9","6y"],
        ["10","7y"],
        ["11","8y"],
        ["12","9y"],   
        ["13","10y"],
        ["14","15y"],
        ["15","20y"]
  
    ]);
