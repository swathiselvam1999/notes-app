const express = require('express');
const Task = require('../models/Task.js')
const router = express.Router();

// Create a new Task
router.post('/', async(req, res)=>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

// Get all tasks
router.get('/', async(req, res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

// Get a single task
router.get('/:id', async(req, res)=>{
    try{
       
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({error:"Task Not Found"})
        }
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;