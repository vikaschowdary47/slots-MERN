const router = require('express').Router();
const Slot = require('../model/Slot')


router.post('/book',async(req,res) => {

    const slot = new Slot({
        name:req.body.name,
        email:req.body.email,
        date:Date.parse(req.body.date)
    })
    try{
        const bookSlot = await slot.save();
        res.send('slot booked!')
    } catch (error){
        res.status(400).send(error);
    }
});

router.get('/', async(req,res) => {
    // res.send('data is here its working')
    Slot.find()
        .then(slots => res.json(slots))
        .catch(err => res.status(400).json('Error ' +err))
})

// get slots by id
router.get('/:id', async(req,res) => {
    Slot.findById(req.params.id)
        .then((slot) => res.json(slot))
        .catch(err => res.status(400).json('Error ' +err))

})

// delteslots
router.delete('/:id', async(req,res) => {
    Slot.findByIdAndDelete(req.params.id)
        .then(() => res.json('slot unbooked!'))
        .catch(error => res.status(400).json(error))
})

// updateSlot 
router.post('/update/:id', (req,res) => {
    Slot.findById(req.params.id)
        .then(slot => {
            slot.date = Date.parse(req.body.date);

            slot.save()
                .then(() => res.json('Slot Changed!'))
                .catch(error => res.status(400).json('Error ' + error))
        })
})


module.exports = router;