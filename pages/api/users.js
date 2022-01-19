const username = 'sam';

export default async (req, res) => {
  console.log('incoming request', req.body);
  if (req.method === 'POST') {
    // Process a POST request
    console.log('posting');
    // await addItem();
    // res.status(200).json({ text: 'hello' });
  } else {
    // Handle any other HTTP method
    // addUser();
    // addItemForUser(true, '1wWcVVtzSUguRNZtAgqy');
    const dataToReturn = await fetchData();
    res.status(200).json(dataToReturn);
  }
};

// function get
