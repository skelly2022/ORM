const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll(
    {include: [{model: Product, through: ProductTag}]}
    );
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async(req, res) => {
  try {
    const categoryData = await Tag.findByPk(req.params.id,
      {include: [Product]}
    );
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err.message)
  }
});

router.post('/', async(req, res) => {
  try {
    // create a new category
    const categoryData = await Tag.create(req.body);
    res.json(categoryData);
} catch (err) {
  res.status(500).json(err)
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {const categoryData = await Tag.update({tag_name: req.body.tag_name},
    {where: {id: req.params.id}}
  );
  res.json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
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
  try {const categoryData = await Tag.update({category_name: req.body.category_name},
    {where: {id: req.params.id}}
  );
  res.json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const productData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(400).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
