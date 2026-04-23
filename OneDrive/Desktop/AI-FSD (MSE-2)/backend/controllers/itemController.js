import Item from "../models/Item.js";

// ADD ITEM
export const addItem = async (req, res) => {
  try {
    const item = new Item({ ...req.body, userId: req.user.id });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL ITEMS
export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// SEARCH
export const searchItems = async (req, res) => {
  const query = req.query.q;

  const items = await Item.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } }
    ]
  });

  res.json(items);
};

// UPDATE
export const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE
export const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await item.deleteOne();
  res.json({ message: "Deleted successfully" });
};