const express = require('express');
const Service = require('../Model/serviceSchema');
const router = express.Router();

router.post('/service', async (req, res) => {
    const { name, description, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Service name required  and price must be bigger then 0' });
    }

    try {
        const newService = new Service({ name, description, price });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error adding service', error });
    }
});
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error to  fetching services', error });
    }
});
router.put('/service/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        service.name = name || service.name; // find new then update else perv. will be added again
        service.description = description || service.description;
        service.price = price || service.price;

        await service.save();
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
});
router.delete('/service/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
});

module.exports = router;