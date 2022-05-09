const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll(
     {include: [Product]} 
    );
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

  // be sure to include its associated Products
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id,
      {include: [Product]}
    );
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err.message)
  }
  // be sure to include its associated Products
});

router.post('/',async (req, res) => {
try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
} catch (err) {
  res.status(500).json(err)
}
});

router.put('/:id', async(req, res) => {
  try {const categoryData = await Category.update({category_name: req.body.category_name},
    {where: {id: req.params.id}}
  );
  res.json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const productData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
