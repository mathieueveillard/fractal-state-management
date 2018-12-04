# Code jam: fractal state management

December 6th, 2018

## Case study

Mark runs a luxury grocery shop, which is known to be the best grocery shop of the neighborhood, with always fresh, first quality products. For him, quality matters a lot, hence when his suppliers deliver, say, a batch of those delicious goat cheese and spinach raviolis, Mark conscienciousely registers the corresponding serial number and the date of the day in a record-keeping book. Then, when he fills the shelves of his shop, Mark pays attention to using the first-entered batch, this practice being known as FIFO (First In, First Out). Thanks to his book, Mark always knows what are the stocks and is able to place orders to his suppliers before running out of stock. But it might happen, for whatever reason, that a batch is about to expire. In such a case, Mark will promote the product, making it visible in the showcase and offering a small discount. Should the expiry date be reached, Mark would trash the whole batch, because quality matters, again.

So, business grows year after year and soon Mark buys the shop next door, after the old lady who was making hats has retired. Now there are more than 300 references (products) in his warehouse from everywhere in Europe: plum pudding, whisky, waffles, foie gras, sauerkraut and mozzarella di buffala. Everyday tens of batches are delivered, so managing that is more and more a full-time job.

Hence, in addition of hiring a warehouse manager, Mark considers using a Web app that would ease the whole process. That's where he needs you!

## The application

First things first, you and Mark decide to focus on stock management, although you both envision that the application could also help with order management. After further discussions, it appears that a modelisation based on `Product` and `Batch` is sufficient. No need to work with single unit items of food. Hence the model:

- A `Product` might be associated to 0 (empty stock) or many `Batch`
- A `Batch` is relative to one and only one `Product` (no mixed batch)

The application allows one to register products and associate batches to them. At this stage, stocks can only increase, since the input of sold quantities is not possible yet. But still, there is an added value: Mark can keep track of expiry dates.

The application is made of 3 routes:

- `/products`: the list of all products;
- `/product/:id`: the detail of one single product, as well as the list of the batches that relate to it;
- `/batch/:id`: the detail of one single batch.

## Your turn

For the sake of learning, a feature has been removed that allows to input the quantity of products in a batch (`/batch/:id` route).

Your work is to rewrite it.

## Gettings started

You'll find the complete application on `master` branch. On `code-jam` branch, however, the key feature has been removed so that you can rewrite it.

```
git clone https://github.com/mathieueveillard/fractal-state-management.git
git checkout code-jam
npm install
npm start
```

Project will run at [http://localhost:8080/products](http://localhost:8080/products)

## API documentation

- [CycleJS](https://cycle.js.org/) (framework)
- [xstream](https://github.com/staltz/xstream) (default stream library used by CycleJS)
- [@cycle/state](https://cycle.js.org/api/state.html) (focus on state management)
