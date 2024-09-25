//importation of necessary module
const express = require('express')
const base = require('./Database')
const route = express.Router()

route.post('/todo', async (req, res) => {
    try {
        const newTodo = new base(req.body);
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
})

route.get('/todo', async (req, res) => {
    try {
        const todo = await base.find();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

route.get('/todo/:id', async (req, res) => {
    try {
        const todo = await base.findById(req.params.id);
        if(!todo) return res.status(404).json({error: 'Not found'});
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
})

route.put('/todo/:id', async (req, res) => {
    try {
      const updatedTodo = await base.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedTodo) return res.status(404).json({ error: 'To-Do not found' });
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  route.delete('/todo/:id', async (req, res) => {
    try {
      const deletedTodo = await base.findByIdAndDelete(req.params.id);
      if (!deletedTodo) return res.status(404).json({ error: 'To-Do not found' });
      res.status(200).json({ message: 'To-Do deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = route;