const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }
})

const List = mongoose.model('List', TodoSchema);
module.exports = List;