import { State } from './component';

export const INITIAL_STATE: State = {
  products: [
    {
      id: '46c9daf8-563d-452d-8564-9c012a45cd7b',
      name: 'Plum pudding',
      measure: 'UNITS'
    },
    {
      id: '29b65e64-e926-47cf-9541-6ec64bfbabea',
      name: 'Champagne',
      measure: 'UNITS'
    },
    {
      id: '981ec4ca-71fc-43d1-a1db-63e5c9f28e53',
      name: 'Morels',
      measure: 'WEIGHT_IN_KG'
    }
  ],
  batches: [
    {
      id: 'c67f5372-c145-4abd-bcf6-59f45e2394f8',
      productId: '46c9daf8-563d-452d-8564-9c012a45cd7b',
      expiryDate: new Date(2018, 11, 31),
      quantity: 40
    },
    {
      id: '764db624-34bc-4413-a4a3-01bf6b08ad72',
      productId: '46c9daf8-563d-452d-8564-9c012a45cd7b',
      expiryDate: new Date(2019, 2, 28),
      quantity: 40
    },
    {
      id: 'be8dd1d2-5e97-479a-93e0-b809a9f3caed',
      productId: '46c9daf8-563d-452d-8564-9c012a45cd7b',
      expiryDate: new Date(2019, 5, 17),
      quantity: 40
    },
    {
      id: 'bbcda39e-7ccc-41c2-b6a6-ef25f3dddcc7',
      productId: '46c9daf8-563d-452d-8564-9c012a45cd7b',
      expiryDate: new Date(2019, 7, 22),
      quantity: 40
    },
    {
      id: '214a47cb-abed-493b-8acf-1e7cec7920e2',
      productId: '29b65e64-e926-47cf-9541-6ec64bfbabea',
      expiryDate: new Date(2023, 11, 30),
      quantity: 6 * 15
    },
    {
      id: '740d32a0-b89d-4bfa-ae50-cd7b2d13cdf6',
      productId: '29b65e64-e926-47cf-9541-6ec64bfbabea',
      expiryDate: new Date(2023, 11, 30),
      quantity: 6 * 15
    },
    {
      id: '59f25d63-c0a2-4975-8fa1-bf8aaa999318',
      productId: '981ec4ca-71fc-43d1-a1db-63e5c9f28e53',
      expiryDate: new Date(2018, 11, 4),
      quantity: 10
    },
    {
      id: '24eb9b96-03ad-4743-a74a-98328afddad0',
      productId: '981ec4ca-71fc-43d1-a1db-63e5c9f28e53',
      expiryDate: new Date(2018, 11, 9),
      quantity: 6
    },
    {
      id: '2a92112d-873a-410b-9a38-554098bca515',
      productId: '981ec4ca-71fc-43d1-a1db-63e5c9f28e53',
      expiryDate: new Date(2018, 11, 15),
      quantity: 6
    }
  ]
};
