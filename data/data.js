export const data = {
  income: [
    { name: 'salary', amount: 8669 },
    { name: 'wellbeing budget', amount: 500 },
    { name: 'pension contribution', amount: 440 },
  ],
  outgoings: [
    { name: 'Tax Pot', amount: 3316 },
    {
      name: 'After Tax',
      amount: 6158,
      children: [
        {
          name: 'Monzo Personal',
          amount: 2000,
          children: [
            {
              name: 'joint-account',
              amount: 500,
              children: [
                { name: 'utility-bill', amount: 91 },
                { name: 'groceries', amount: 250 },
              ],
            },
            { name: 'rent', amount: 700 },
          ],
        },
        {
          name: 'Wise Business',
          children: [
            {
              name: 'savings',
              children: [
                { name: 'Vanguard Pension', amount: 960 },
                { name: 'Company savings', amount: 2740 },
              ],
            },
            { name: 'LBC-donation', amount: 51 },
            { name: 'phone', amount: 15 },
            { name: 'Adobe', amount: 50 },
            {
              name: 'Wellbeing budget',
              amount: 365,
              children: [
                { name: 'Stillpoint', amount: 90 },
                { name: 'Kat', amount: 100 },
                { name: 'Third Space', amount: 210 },
              ],
            },
          ],
        },
      ],
    },
  ],
};
